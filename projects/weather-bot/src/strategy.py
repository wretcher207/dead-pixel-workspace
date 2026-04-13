"""Strategy engine — compare NOAA forecasts to Polymarket prices, find edges."""

from scipy.stats import norm
from .config import FORECAST_ERROR, MIN_EDGE_THRESHOLD
from .models import Forecast, WeatherMarket, TempBucket, Signal


def calculate_bucket_probabilities(forecast: Forecast, market: WeatherMarket) -> list[TempBucket]:
    """Calculate our estimated probability for each temperature bucket.

    Models temperature as a normal distribution:
    - Mean = NOAA forecast max temp
    - Std dev = historical forecast error for that number of days out

    Returns the market's buckets with our_probability filled in.
    """
    mean = forecast.max_temp
    unit = forecast.unit

    # Get standard deviation based on days out and unit
    error_table = FORECAST_ERROR.get(unit, FORECAST_ERROR["F"])
    days_out = min(forecast.days_out, max(error_table.keys()))
    std_dev = error_table.get(days_out, error_table[max(error_table.keys())])

    for bucket in market.buckets:
        bucket.our_probability = _bucket_probability(mean, std_dev, bucket.low, bucket.high)

    return market.buckets


def _bucket_probability(mean: float, std_dev: float, low: float, high: float) -> float:
    """Calculate probability mass in a temperature range using normal CDF."""
    if low == float("-inf"):
        return norm.cdf(high, loc=mean, scale=std_dev)
    if high == float("inf"):
        return 1.0 - norm.cdf(low, loc=mean, scale=std_dev)
    return norm.cdf(high, loc=mean, scale=std_dev) - norm.cdf(low, loc=mean, scale=std_dev)


def find_signals(forecast: Forecast, market: WeatherMarket) -> list[Signal]:
    """Find trading signals where our probability estimate exceeds market price.

    A signal is generated when:
    - edge (our_prob - market_price) > MIN_EDGE_THRESHOLD
    - our_probability > market_price (we think it's underpriced)
    """
    calculate_bucket_probabilities(forecast, market)

    signals = []
    for bucket in market.buckets:
        edge = bucket.our_probability - bucket.market_price

        if edge < MIN_EDGE_THRESHOLD:
            continue

        # Skip near-zero probabilities (noise)
        if bucket.our_probability < 0.05:
            continue

        # Expected value: probability of winning * payout - cost
        ev = bucket.our_probability * 1.0 - bucket.market_price

        confidence = _assess_confidence(forecast, edge)

        signals.append(Signal(
            market=market,
            bucket=bucket,
            edge=round(edge, 4),
            expected_value=round(ev, 4),
            confidence=confidence,
        ))

    # Sort by edge descending — best opportunities first
    signals.sort(key=lambda s: s.edge, reverse=True)
    return signals


def _assess_confidence(forecast: Forecast, edge: float) -> str:
    """Assess confidence level based on forecast reliability and edge size."""
    # Closer forecasts are more reliable
    if forecast.days_out <= 1 and edge >= 0.20:
        return "high"
    if forecast.days_out <= 2 and edge >= 0.15:
        return "medium"
    if forecast.days_out <= 1 and edge >= 0.10:
        return "medium"
    return "low"


def format_signal(signal: Signal) -> str:
    """Format a signal for console output."""
    b = signal.bucket
    return (
        f"  {signal.market.city} {signal.market.date} | "
        f"{b.label} | "
        f"Market: {b.market_price:.0%} → Our est: {b.our_probability:.0%} | "
        f"Edge: {signal.edge:.0%} | "
        f"EV: ${signal.expected_value:.3f}/share | "
        f"Confidence: {signal.confidence}"
    )
