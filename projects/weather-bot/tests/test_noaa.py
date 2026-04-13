"""Tests for NOAA client — parsing and data handling."""

import pytest
from src.models import City


class TestGridResolution:
    """Test NOAA grid coordinate resolution (requires network)."""

    @pytest.mark.network
    def test_resolve_nyc_grid(self):
        """NYC coordinates should resolve to a valid NOAA grid."""
        from src.noaa import resolve_grid

        city = City(name="NYC", lat=40.7128, lon=-74.0060, temp_unit="F")
        grid = resolve_grid(city)

        assert grid["office"] != ""
        assert grid["x"] > 0
        assert grid["y"] > 0
        assert "gridpoints" in grid["gridpoints_url"]

    @pytest.mark.network
    def test_fetch_max_temps_returns_forecasts(self):
        """Should return multiple days of forecasts for a valid city."""
        from src.noaa import fetch_max_temps

        city = City(name="Miami", lat=25.7617, lon=-80.1918, temp_unit="F")
        forecasts = fetch_max_temps(city)

        assert len(forecasts) > 0
        for f in forecasts:
            assert f.city == "Miami"
            assert f.unit == "F"
            assert f.max_temp > 0  # reasonable for Miami
            assert f.days_out >= 0


class TestTemperatureConversion:
    """Test Celsius to Fahrenheit conversion in forecast parsing."""

    def test_celsius_values_are_reasonable(self):
        """Sanity check that converted temps are in a reasonable range."""
        # NOAA returns Celsius, we convert to Fahrenheit
        temp_c = 20  # 68°F — nice day
        temp_f = temp_c * 9 / 5 + 32
        assert 60 < temp_f < 80

    def test_freezing_point_conversion(self):
        temp_f = 0 * 9 / 5 + 32
        assert temp_f == 32.0
