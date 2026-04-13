"""Bot configuration and city definitions."""

import os
from dotenv import load_dotenv
from .models import City

load_dotenv()

# --- API ---
PRIVATE_KEY = os.getenv("PRIVATE_KEY", "")
POLYMARKET_HOST = "https://clob.polymarket.com"
POLYMARKET_CHAIN_ID = 137  # Polygon
GAMMA_API_URL = "https://gamma-api.polymarket.com"
NOAA_BASE_URL = "https://api.weather.gov"
NOAA_USER_AGENT = "WeatherBot/1.0 (contact@deadpixeldesign.com)"

# --- Trading ---
DRY_RUN = os.getenv("DRY_RUN", "true").lower() == "true"
WALLET_BALANCE = float(os.getenv("WALLET_BALANCE", "200"))

# Position sizing
MAX_TRADE_PCT = 0.05       # 5% of wallet per trade
MAX_CITY_PCT = 0.20        # 20% max exposure per city
DAILY_LOSS_CAP_PCT = 0.10  # 10% daily loss cap

# Strategy
MIN_EDGE_THRESHOLD = 0.10  # 10% minimum edge to trigger a signal
MIN_CONFIDENCE = "medium"   # minimum confidence level to trade

# NOAA forecast error (standard deviation in degrees)
# Based on historical NWS accuracy data
FORECAST_ERROR = {
    "F": {0: 2.0, 1: 2.5, 2: 3.5, 3: 4.5, 4: 5.5, 5: 6.5, 6: 7.5},
    "C": {0: 1.1, 1: 1.4, 2: 1.9, 3: 2.5, 4: 3.1, 5: 3.6, 6: 4.2},
}

# --- Scan interval ---
SCAN_INTERVAL_SECONDS = 1800  # 30 minutes

# --- Cities (US only for now — NOAA coverage) ---
CITIES = [
    City(name="NYC", lat=40.7128, lon=-74.0060, temp_unit="F"),
    City(name="Miami", lat=25.7617, lon=-80.1918, temp_unit="F"),
    City(name="Chicago", lat=41.8781, lon=-87.6298, temp_unit="F"),
    City(name="Dallas", lat=32.7767, lon=-96.7970, temp_unit="F"),
    City(name="Los Angeles", lat=34.0522, lon=-118.2437, temp_unit="F"),
    City(name="Seattle", lat=47.6062, lon=-122.3321, temp_unit="F"),
]
