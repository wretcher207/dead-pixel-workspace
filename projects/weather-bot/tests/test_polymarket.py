"""Tests for Polymarket client — parsing market data."""

import pytest
from src.polymarket import _extract_city, _extract_date, _parse_temp_bucket


class TestExtractCity:
    def test_extracts_nyc(self):
        assert _extract_city("Highest temperature in NYC on April 10?") == "NYC"

    def test_extracts_new_york(self):
        assert _extract_city("Highest temperature in New York on April 10?") == "NYC"

    def test_extracts_miami(self):
        assert _extract_city("Highest temperature in Miami on April 10?") == "Miami"

    def test_extracts_chicago(self):
        assert _extract_city("Highest temperature in Chicago on April 12?") == "Chicago"

    def test_returns_empty_for_unknown_city(self):
        assert _extract_city("Highest temperature in Atlantis on April 10?") == ""


class TestExtractDate:
    def test_extracts_date_with_year(self):
        assert _extract_date("Highest temperature in NYC on April 10, 2026?") == "2026-04-10"

    def test_extracts_date_without_year(self):
        result = _extract_date("Highest temperature in NYC on April 10?")
        assert result.endswith("-04-10")

    def test_returns_empty_for_no_date(self):
        assert _extract_date("What is the weather?") == ""


class TestParseTempBucket:
    def test_parses_range_bucket(self):
        bucket = _parse_temp_bucket("64-65 F", "tok_1", 0.25)
        assert bucket is not None
        assert bucket.low == 64
        assert bucket.high == 65
        assert bucket.market_price == 0.25

    def test_parses_or_below(self):
        bucket = _parse_temp_bucket("58 F or below", "tok_2", 0.05)
        assert bucket is not None
        assert bucket.low == float("-inf")
        assert bucket.high == 58

    def test_parses_or_higher(self):
        bucket = _parse_temp_bucket("80 F or higher", "tok_3", 0.03)
        assert bucket is not None
        assert bucket.low == 80
        assert bucket.high == float("inf")

    def test_parses_single_celsius(self):
        bucket = _parse_temp_bucket("18 C", "tok_4", 0.15)
        assert bucket is not None
        assert bucket.low == 18
        assert bucket.high == 19

    def test_returns_none_for_garbage(self):
        assert _parse_temp_bucket("???", "tok_5", 0.0) is None
