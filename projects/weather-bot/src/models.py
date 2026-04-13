"""Data classes for weather bot."""

from dataclasses import dataclass, field
from datetime import datetime


@dataclass
class City:
    name: str
    lat: float
    lon: float
    grid_office: str = ""
    grid_x: int = 0
    grid_y: int = 0
    temp_unit: str = "F"  # F or C


@dataclass
class Forecast:
    city: str
    date: str  # YYYY-MM-DD
    max_temp: float
    unit: str  # F or C
    fetched_at: datetime = field(default_factory=datetime.now)
    days_out: int = 0  # 0 = today, 1 = tomorrow, etc.


@dataclass
class TempBucket:
    label: str  # e.g. "64-65 F"
    low: float
    high: float
    token_id: str
    market_price: float  # current YES price (0.0-1.0)
    our_probability: float = 0.0  # our model's estimate


@dataclass
class WeatherMarket:
    condition_id: str
    city: str
    date: str  # YYYY-MM-DD
    question: str  # e.g. "Highest temperature in NYC on April 10?"
    buckets: list[TempBucket] = field(default_factory=list)


@dataclass
class Signal:
    market: WeatherMarket
    bucket: TempBucket
    edge: float  # our_probability - market_price
    expected_value: float  # edge * payout
    confidence: str  # "low", "medium", "high"
    timestamp: datetime = field(default_factory=datetime.now)


@dataclass
class Trade:
    signal: Signal
    amount_usd: float
    shares: float
    price: float
    order_id: str = ""
    status: str = "pending"  # pending, filled, failed, resolved
    pnl: float = 0.0
    timestamp: datetime = field(default_factory=datetime.now)
