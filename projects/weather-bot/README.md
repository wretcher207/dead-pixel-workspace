# Weather Market Arbitrage Bot

Trades Polymarket weather/temperature markets using NOAA forecast data as an edge.

## How It Works

1. Fetches NOAA max temperature forecasts for US cities
2. Models temperature as a normal distribution (mean = forecast, σ = historical error)
3. Compares our probability estimates to Polymarket bucket prices
4. Buys underpriced buckets when edge exceeds threshold

## Setup

```bash
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your private key and settings
```

## Run

```bash
# Dry run (no real trades, just logs signals)
python run.py

# Live trading (set DRY_RUN=false in .env)
python run.py
```

## Run Tests

```bash
# Unit tests only (no network)
pytest tests/ -m "not network"

# All tests including network calls
pytest tests/
```

## Configuration

Edit `src/config.py` or override via `.env`:

- `DRY_RUN` — true/false (default: true)
- `WALLET_BALANCE` — starting balance for position sizing
- `PRIVATE_KEY` — Polygon wallet private key
