"""NOAA weather API client — fetches max temperature forecasts for US cities."""

import requests
from datetime import datetime, timedelta
from typing import Optional
from .config import NOAA_BASE_URL, NOAA_USER_AGENT, CITIES
from .models import City, Forecast

# Cache grid lookups so we don't re-resolve lat/lon every scan
_grid_cache: dict[str, dict] = {}

# Cache forecasts to avoid hammering the API
_forecast_cache: dict[str, tuple[Forecast, datetime]] = {}
CACHE_TTL_SECONDS = 600  # 10 minutes


def _headers() -> dict:
    return {"User-Agent": NOAA_USER_AGENT, "Accept": "application/geo+json"}


def resolve_grid(city: City) -> dict:
    """Convert lat/lon to NOAA grid coordinates. Cached per city."""
    if city.name in _grid_cache:
        return _grid_cache[city.name]

    url = f"{NOAA_BASE_URL}/points/{city.lat:.4f},{city.lon:.4f}"
    resp = requests.get(url, headers=_headers(), timeout=10)
    resp.raise_for_status()

    props = resp.json()["properties"]
    grid = {
        "office": props["gridId"],
        "x": props["gridX"],
        "y": props["gridY"],
        "forecast_url": props["forecast"],
        "gridpoints_url": f"{NOAA_BASE_URL}/gridpoints/{props['gridId']}/{props['gridX']},{props['gridY']}",
    }

    city.grid_office = grid["office"]
    city.grid_x = grid["x"]
    city.grid_y = grid["y"]

    _grid_cache[city.name] = grid
    return grid


def fetch_max_temps(city: City) -> list[Forecast]:
    """Fetch max temperature forecasts for the next 7 days from NOAA gridpoint data.

    Returns a list of Forecast objects, one per day.
    """
    grid = resolve_grid(city)

    # Check cache
    cache_key = f"{city.name}_maxtemp"
    if cache_key in _forecast_cache:
        cached, cached_at = _forecast_cache[cache_key]
        if (datetime.now() - cached_at).total_seconds() < CACHE_TTL_SECONDS:
            return _forecast_cache[f"{cache_key}_list"]

    url = grid["gridpoints_url"]
    resp = requests.get(url, headers=_headers(), timeout=15)
    resp.raise_for_status()

    props = resp.json()["properties"]
    max_temp_data = props.get("maxTemperature", {})

    if not max_temp_data or "values" not in max_temp_data:
        return []

    source_unit = max_temp_data.get("uom", "wmoUnit:degC")
    is_celsius = "degC" in source_unit

    forecasts = []
    today = datetime.now().date()

    for entry in max_temp_data["values"]:
        # Parse ISO 8601 interval: "2026-04-07T06:00:00+00:00/P1D"
        time_str = entry["validTime"].split("/")[0]
        try:
            forecast_date = datetime.fromisoformat(time_str.replace("+00:00", "+00:00")).date()
        except ValueError:
            # Handle various timezone offset formats
            forecast_date = datetime.fromisoformat(time_str[:19]).date()

        days_out = (forecast_date - today).days
        if days_out < 0:
            continue  # skip past dates

        temp_c = entry["value"]
        if temp_c is None:
            continue

        # Convert to city's preferred unit
        if city.temp_unit == "F" and is_celsius:
            temp = temp_c * 9 / 5 + 32
        elif city.temp_unit == "C" and not is_celsius:
            temp = (temp_c - 32) * 5 / 9
        else:
            temp = temp_c

        forecasts.append(Forecast(
            city=city.name,
            date=forecast_date.isoformat(),
            max_temp=round(temp, 1),
            unit=city.temp_unit,
            days_out=days_out,
        ))

    # Cache the results
    _forecast_cache[f"{cache_key}_list"] = forecasts
    _forecast_cache[cache_key] = (forecasts[0] if forecasts else None, datetime.now())

    return forecasts


def fetch_all_forecasts() -> dict[str, list[Forecast]]:
    """Fetch forecasts for all configured cities.

    Returns dict keyed by city name.
    """
    results = {}
    for city in CITIES:
        try:
            results[city.name] = fetch_max_temps(city)
        except requests.RequestException as e:
            print(f"  [NOAA] Error fetching {city.name}: {e}")
            results[city.name] = []
    return results


def get_forecast_for(city_name: str, date: str) -> Optional[Forecast]:
    """Get a specific city+date forecast from cache or fetch fresh."""
    city = next((c for c in CITIES if c.name == city_name), None)
    if not city:
        return None

    forecasts = fetch_max_temps(city)
    return next((f for f in forecasts if f.date == date), None)
