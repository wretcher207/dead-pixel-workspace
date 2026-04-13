"""Polymarket API client — fetch weather markets and place orders."""

import requests
from typing import Optional
from .config import POLYMARKET_HOST, POLYMARKET_CHAIN_ID, PRIVATE_KEY, GAMMA_API_URL
from .models import WeatherMarket, TempBucket

# Lazy-init the CLOB client (only when trading, not for read-only ops)
_clob_client = None


def _get_clob_client():
    """Initialize and return the authenticated CLOB client."""
    global _clob_client
    if _clob_client is not None:
        return _clob_client

    from py_clob_client.client import ClobClient

    if not PRIVATE_KEY:
        raise ValueError("PRIVATE_KEY not set in .env — cannot authenticate with Polymarket")

    client = ClobClient(
        host=POLYMARKET_HOST,
        chain_id=POLYMARKET_CHAIN_ID,
        key=PRIVATE_KEY,
        signature_type=0,  # EOA wallet
    )
    client.set_api_creds(client.create_or_derive_api_creds())
    _clob_client = client
    return client


def fetch_weather_markets() -> list[WeatherMarket]:
    """Fetch all active weather/temperature markets from the Gamma API.

    Filters for markets with 'temperature' or 'weather' in the question,
    then parses into WeatherMarket objects with temperature buckets.
    """
    markets = []
    offset = 0
    limit = 100

    while True:
        resp = requests.get(
            f"{GAMMA_API_URL}/markets",
            params={
                "closed": "false",
                "limit": limit,
                "offset": offset,
                "tag": "temperature",
            },
            timeout=15,
        )
        resp.raise_for_status()
        batch = resp.json()

        if not batch:
            break

        for m in batch:
            market = _parse_weather_market(m)
            if market:
                markets.append(market)

        if len(batch) < limit:
            break
        offset += limit

    return markets


def _parse_weather_market(data: dict) -> Optional[WeatherMarket]:
    """Parse a Gamma API market response into a WeatherMarket with TempBuckets."""
    question = data.get("question", "")
    condition_id = data.get("conditionId", "")

    # Extract city and date from question
    # Format: "Highest temperature in NYC on April 10?"
    city = _extract_city(question)
    date = _extract_date(question)

    if not city or not condition_id:
        return None

    # Parse outcome tokens into temperature buckets
    buckets = []
    tokens = data.get("tokens", [])
    for token in tokens:
        outcome = token.get("outcome", "")
        token_id = token.get("token_id", "")
        price = float(token.get("price", 0))

        bucket = _parse_temp_bucket(outcome, token_id, price)
        if bucket:
            buckets.append(bucket)

    if not buckets:
        return None

    return WeatherMarket(
        condition_id=condition_id,
        city=city,
        date=date or "",
        question=question,
        buckets=buckets,
    )


def _extract_city(question: str) -> str:
    """Extract city name from market question."""
    # Ordered longest-first to avoid partial matches (e.g. "LA" in "Atlantis")
    known_cities = [
        ("Los Angeles", ["Los Angeles"]),
        ("New York", ["NYC", "New York"]),
        ("Miami", ["Miami"]),
        ("Chicago", ["Chicago"]),
        ("Dallas", ["Dallas"]),
        ("Seattle", ["Seattle"]),
        ("Toronto", ["Toronto"]),
        ("London", ["London"]),
        ("Tokyo", ["Tokyo"]),
        ("Seoul", ["Seoul"]),
    ]
    q_lower = question.lower()
    for city_key, aliases in known_cities:
        for alias in aliases:
            if alias.lower() in q_lower:
                # Map display names back to config keys
                key_map = {"New York": "NYC", "Los Angeles": "Los Angeles"}
                return key_map.get(city_key, city_key)
    return ""


def _extract_date(question: str) -> str:
    """Extract date from market question. Returns YYYY-MM-DD or empty string."""
    # Markets use formats like "April 10" or "April 10, 2026"
    import re
    from datetime import datetime

    months = {
        "january": 1, "february": 2, "march": 3, "april": 4,
        "may": 5, "june": 6, "july": 7, "august": 8,
        "september": 9, "october": 10, "november": 11, "december": 12,
    }

    pattern = r"(?:on\s+)?(\w+)\s+(\d{1,2})(?:,?\s*(\d{4}))?"
    match = re.search(pattern, question, re.IGNORECASE)
    if not match:
        return ""

    month_name = match.group(1).lower()
    day = int(match.group(2))
    year = int(match.group(3)) if match.group(3) else datetime.now().year

    month = months.get(month_name)
    if not month:
        return ""

    try:
        return f"{year}-{month:02d}-{day:02d}"
    except ValueError:
        return ""


def _parse_temp_bucket(outcome: str, token_id: str, price: float) -> Optional[TempBucket]:
    """Parse an outcome string like '64-65 F' or '18 C' into a TempBucket."""
    import re

    outcome = outcome.strip()

    # Handle "X or below" / "X or higher" boundaries
    below_match = re.match(r"(\d+)\s*°?\s*[FC]?\s*or\s+below", outcome, re.IGNORECASE)
    if below_match:
        val = float(below_match.group(1))
        return TempBucket(label=outcome, low=float("-inf"), high=val, token_id=token_id, market_price=price)

    above_match = re.match(r"(\d+)\s*°?\s*[FC]?\s*or\s+higher", outcome, re.IGNORECASE)
    if above_match:
        val = float(above_match.group(1))
        return TempBucket(label=outcome, low=val, high=float("inf"), token_id=token_id, market_price=price)

    # Handle "64-65 F" or "64-65" range format
    range_match = re.match(r"(\d+)\s*-\s*(\d+)\s*°?\s*[FC]?", outcome)
    if range_match:
        low = float(range_match.group(1))
        high = float(range_match.group(2))
        return TempBucket(label=outcome, low=low, high=high, token_id=token_id, market_price=price)

    # Handle single value "18 C" (1-degree buckets)
    single_match = re.match(r"(\d+)\s*°?\s*[FC]", outcome)
    if single_match:
        val = float(single_match.group(1))
        return TempBucket(label=outcome, low=val, high=val + 1, token_id=token_id, market_price=price)

    return None


def get_market_prices(condition_id: str) -> dict[str, float]:
    """Fetch current prices for all outcomes in a market."""
    client = _get_clob_client()
    try:
        book = client.get_order_book(condition_id)
        # Return midpoint prices keyed by token_id
        prices = {}
        if hasattr(book, "bids") and hasattr(book, "asks"):
            for token_id in set(b.get("asset_id") for b in book.get("bids", [])):
                price = client.get_midpoint(token_id)
                prices[token_id] = float(price) if price else 0.0
        return prices
    except Exception as e:
        print(f"  [Polymarket] Error fetching prices for {condition_id}: {e}")
        return {}


def place_buy_order(token_id: str, amount_usd: float, max_price: float) -> dict:
    """Place a Fill-or-Kill buy order.

    Args:
        token_id: The outcome token to buy
        amount_usd: Dollar amount to spend
        max_price: Maximum price per share (0.0-1.0)

    Returns:
        Order result dict with order_id, status, etc.
    """
    from py_clob_client.clob_types import MarketOrderArgs, OrderType
    from py_clob_client.order_builder.constants import BUY

    client = _get_clob_client()

    order = MarketOrderArgs(
        token_id=token_id,
        amount=amount_usd,
        side=BUY,
    )

    signed = client.create_market_order(order)
    result = client.post_order(signed, OrderType.FOK)

    return {
        "order_id": result.get("orderID", ""),
        "status": result.get("status", "unknown"),
        "raw": result,
    }
