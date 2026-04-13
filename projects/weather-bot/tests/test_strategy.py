"""Tests for the strategy engine — probability calculations and signal generation."""

import pytest
from src.models import Forecast, WeatherMarket, TempBucket
from src.strategy import calculate_bucket_probabilities, find_signals, _bucket_probability


class TestBucketProbability:
    """Test the normal distribution probability calculations."""

    def test_center_bucket_gets_highest_probability(self):
        """The bucket containing the forecast temp should have the highest probability."""
        # Forecast: 65°F, std_dev: 2°F
        # Bucket 64-66 should have highest probability
        prob = _bucket_probability(mean=65, std_dev=2, low=64, high=66)
        assert prob > 0.3  # should be significant

    def test_distant_bucket_gets_low_probability(self):
        """A bucket far from forecast should have very low probability."""
        # Forecast: 65°F, bucket 80-82 is way off
        prob = _bucket_probability(mean=65, std_dev=2, low=80, high=82)
        assert prob < 0.01

    def test_probabilities_sum_to_approximately_one(self):
        """All buckets covering the full range should sum to ~1.0."""
        mean = 70
        std_dev = 3
        total = 0
        # Create buckets from 50 to 90 in 2-degree increments
        for low in range(50, 90, 2):
            total += _bucket_probability(mean, std_dev, low, low + 2)
        # Won't be exactly 1.0 because we don't cover -inf to 50 and 90 to +inf
        # but should be very close
        assert total > 0.95

    def test_lower_boundary_bucket(self):
        """'X or below' bucket should use CDF from -inf."""
        prob = _bucket_probability(mean=65, std_dev=2, low=float("-inf"), high=60)
        assert 0 < prob < 0.5  # should be non-trivial but less than 50%

    def test_upper_boundary_bucket(self):
        """'X or higher' bucket should use 1 - CDF."""
        prob = _bucket_probability(mean=65, std_dev=2, low=70, high=float("inf"))
        assert 0 < prob < 0.5

    def test_wider_std_dev_spreads_probability(self):
        """Larger forecast error should spread probability more evenly."""
        tight = _bucket_probability(mean=65, std_dev=1, low=64, high=66)
        wide = _bucket_probability(mean=65, std_dev=5, low=64, high=66)
        assert tight > wide  # tight distribution concentrates more in center


class TestFindSignals:
    """Test signal generation from forecast + market comparison."""

    def _make_market(self, buckets_data: list[tuple[str, float, float, float]]) -> WeatherMarket:
        """Helper to create a market with specified buckets.

        buckets_data: list of (label, low, high, market_price)
        """
        buckets = [
            TempBucket(label=label, low=low, high=high, token_id=f"tok_{i}", market_price=price)
            for i, (label, low, high, price) in enumerate(buckets_data)
        ]
        return WeatherMarket(
            condition_id="test_condition",
            city="NYC",
            date="2026-04-10",
            question="Highest temperature in NYC on April 10?",
            buckets=buckets,
        )

    def _make_forecast(self, temp: float, days_out: int = 1) -> Forecast:
        return Forecast(city="NYC", date="2026-04-10", max_temp=temp, unit="F", days_out=days_out)

    def test_finds_underpriced_bucket(self):
        """Should generate a signal when market underprices the likely bucket."""
        market = self._make_market([
            ("62-64 F", 62, 64, 0.05),
            ("64-66 F", 64, 66, 0.05),  # Underpriced — NOAA says ~65, this should be ~30%+
            ("66-68 F", 66, 68, 0.05),
            ("68-70 F", 68, 70, 0.05),
        ])
        forecast = self._make_forecast(temp=65.0, days_out=1)

        signals = find_signals(forecast, market)
        assert len(signals) > 0
        # The 64-66 bucket should be flagged as underpriced
        bucket_labels = [s.bucket.label for s in signals]
        assert "64-66 F" in bucket_labels

    def test_no_signal_when_fairly_priced(self):
        """Should not generate signals when market prices match our estimates."""
        # Create a market where prices roughly match a normal distribution around 65°F
        market = self._make_market([
            ("60-61 F", 60, 61, 0.02),
            ("62-63 F", 62, 63, 0.09),
            ("64-65 F", 64, 65, 0.30),
            ("66-67 F", 66, 67, 0.30),
            ("68-69 F", 68, 69, 0.09),
            ("70-71 F", 70, 71, 0.02),
        ])
        forecast = self._make_forecast(temp=65.5, days_out=1)

        signals = find_signals(forecast, market)
        # With a 10% edge threshold, fairly priced markets should produce few/no signals
        assert len(signals) == 0

    def test_edge_calculation(self):
        """Signal edge should be our_probability minus market_price."""
        market = self._make_market([
            ("64-65 F", 64, 65, 0.05),  # Market says 5%, we'll estimate higher
        ])
        forecast = self._make_forecast(temp=64.5, days_out=1)

        signals = find_signals(forecast, market)
        if signals:
            signal = signals[0]
            expected_edge = signal.bucket.our_probability - signal.bucket.market_price
            assert abs(signal.edge - expected_edge) < 0.001

    def test_skips_near_zero_probability(self):
        """Should not signal on buckets where our probability is < 5%."""
        market = self._make_market([
            ("90-91 F", 90, 91, 0.01),  # Very unlikely given forecast of 65
        ])
        forecast = self._make_forecast(temp=65.0, days_out=1)

        signals = find_signals(forecast, market)
        assert len(signals) == 0

    def test_signals_sorted_by_edge(self):
        """Signals should be sorted by edge descending."""
        market = self._make_market([
            ("62-63 F", 62, 63, 0.01),
            ("64-65 F", 64, 65, 0.01),
            ("66-67 F", 66, 67, 0.01),
        ])
        forecast = self._make_forecast(temp=65.0, days_out=1)

        signals = find_signals(forecast, market)
        if len(signals) >= 2:
            for i in range(len(signals) - 1):
                assert signals[i].edge >= signals[i + 1].edge
