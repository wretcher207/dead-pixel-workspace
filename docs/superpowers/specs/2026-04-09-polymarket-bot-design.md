# Polymarket Trading Bot — Design Spec

## Overview

A modular Polymarket trading bot built in Python. Scans prediction markets, runs pluggable analysis strategies, surfaces opportunities via Telegram with approve/reject controls, and supports both paper and live trading modes.

**Goals:** Learn bot architecture and prediction market mechanics. Build something solid enough to eventually trade real money if desired.

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Polymarket  │◄───►│  Core Engine  │◄───►│  Telegram    │
│  API (CLOB)  │     │              │     │  Interface   │
└─────────────┘     │  ┌────────┐  │     └─────────────┘
                    │  │Strategy│  │
                    │  │Manager │  │     ┌─────────────┐
                    │  └────────┘  │◄───►│  SQLite DB   │
                    │  ┌────────┐  │     │  (trades,    │
                    │  │Trade   │  │     │   markets,   │
                    │  │Manager │  │     │   P&L)       │
                    │  └────────┘  │     └─────────────┘
                    └──────────────┘
```

### Components

- **Core Engine** — Main loop. Polls markets on a configurable interval, feeds data to strategies, routes signals to Telegram.
- **Market Scanner** — Interfaces with Polymarket's CLOB REST API and WebSocket. REST polling for broad scans, WebSocket for real-time monitoring of flagged markets.
- **Strategy Manager** — Loads strategy plugins, feeds them market data, collects and filters signals by confidence threshold.
- **Trade Manager** — Paper and live execution behind one interface. Tracks positions, enforces risk limits, calculates P&L.
- **Telegram Interface** — Alerts with approve/reject buttons, commands for status/config/history.
- **Data Store** — SQLite for trade history, market snapshots, P&L tracking.

## Polymarket API Integration

- Polymarket uses a CLOB (Central Limit Order Book) on Polygon chain.
- Official Python SDK: `py-clob-client`.
- Authentication via Ethereum/Polygon wallet (generated programmatically).
- Currency: USDC on Polygon.
- REST API for market listing, prices, order books, trade history.
- WebSocket for real-time price feeds on specific markets.
- Paper trading mocks the execution layer — no wallet needed.

## Strategy System

Each strategy implements a base interface:

```python
class BaseStrategy:
    def analyze(self, market_data) -> list[Signal]:
        """Analyze market data and return signals."""
        ...

    def get_confidence(self, signal) -> float:
        """Return confidence score 0-1."""
        ...

    def get_description(self) -> str:
        """Human-readable explanation of the signal."""
        ...
```

### Strategy 1: Market Signals (built first)

- Monitors price movements, volume spikes, new markets.
- Configurable thresholds for price change percentage and volume multiplier.
- Example signal: "Market X moved 15% in 10 minutes on 3x normal volume."

### Strategy 2: Arbitrage

- Compares related markets for pricing inconsistencies.
- Catches complement mispricing (Yes + No should equal ~$1.00).
- Catches logical inconsistencies between related markets.

### Strategy 3: News/Sentiment (future)

- Pulls from news APIs, compares against market positions.
- Most complex strategy, added last.

### Signal Flow

1. Strategy produces signal with confidence score (0-1).
2. Signal must pass minimum confidence threshold (configurable per strategy).
3. Passing signals sent to Telegram with details + approve/reject buttons.
4. User approval triggers Trade Manager.

## Trade Manager

### Modes

- **Paper mode (default)** — Logs simulated trades. Tracks positions and P&L as if real. No wallet needed.
- **Live mode** — Executes real trades via Polymarket CLOB SDK. Same logic, real API.

### Risk Controls

- Max bet per trade (e.g. $5).
- Max total exposure (e.g. $50).
- Max trades per day.
- Per-market position limit.
- All configurable via config file.

### Trade Lifecycle

1. Strategy fires signal.
2. Telegram alert sent with details.
3. User taps Approve.
4. Trade Manager checks risk limits.
5. Within limits: execute (paper log or live order).
6. Over limits: respond with reason.
7. Position tracked until market resolves.
8. P&L recorded.

### Position Tracking

- Every trade logged to SQLite (paper and live).
- Running P&L calculation.
- Open/closed positions, win/loss record.
- Per-strategy performance tracking.

## Telegram Interface

### Commands

- `/status` — Open positions, total P&L, active strategies.
- `/markets` — Currently watched markets.
- `/strategies` — Enable/disable strategies, per-strategy performance.
- `/config` — View/change risk limits, trading mode.
- `/history` — Recent trades and outcomes.

### Alerts

- Opportunity detected: market name, current price, strategy reasoning, confidence, suggested action, Approve/Reject buttons.
- Position resolved: P&L update.
- Risk limit hit: warning.

### Example Alert

```
Signal: Market Surge
Market: "Will X happen by June?"
Current: YES @ $0.35 (was $0.22 two hours ago)
Volume: 4.2x normal
Strategy: Market Signals (confidence: 0.78)
Suggested: BUY YES @ $0.35, $5.00

[Approve]  [Reject]
```

## Data Layer

### SQLite Tables

- `markets` — Cached market data, prices, metadata.
- `trades` — Every trade (paper + live), entry/exit price, P&L, triggering strategy.
- `snapshots` — Periodic market price snapshots for historical analysis.

### Config (YAML)

```yaml
mode: paper
polling_interval: 30
telegram:
  bot_token: ""
  chat_id: ""
wallet:
  private_key: ""
risk:
  max_bet: 5.00
  max_exposure: 50.00
  max_daily_trades: 20
strategies:
  market_signals:
    enabled: true
    min_confidence: 0.6
    price_move_threshold: 0.10
    volume_spike_threshold: 3.0
  arbitrage:
    enabled: false
    min_confidence: 0.7
  sentiment:
    enabled: false
```

## Project Structure

```
projects/polymarket-bot/
├── config.yaml
├── requirements.txt
├── run.py
├── src/
│   ├── core/
│   │   ├── engine.py
│   │   ├── market_scanner.py
│   │   └── trade_manager.py
│   ├── strategies/
│   │   ├── base.py
│   │   ├── market_signals.py
│   │   ├── arbitrage.py
│   │   └── sentiment.py
│   ├── telegram/
│   │   └── bot.py
│   ├── data/
│   │   └── database.py
│   └── utils/
│       └── config.py
├── tests/
└── data/
    └── polymarket.db
```

## Tech Stack

- Python 3.11+
- `py-clob-client` — Polymarket CLOB SDK
- `python-telegram-bot` — Telegram bot framework
- `aiohttp` / `websockets` — Async HTTP and WebSocket
- `sqlite3` — Built-in, no external DB dependency
- `pyyaml` — Config parsing
- `asyncio` — Async runtime for concurrent market monitoring

## Build Order

1. Project scaffold + config loader
2. Polymarket API integration (market listing, price fetching)
3. SQLite data layer
4. Strategy base class + Market Signals strategy
5. Trade Manager (paper mode)
6. Telegram bot (alerts + approve/reject + commands)
7. Arbitrage strategy
8. Live trading mode
9. Sentiment strategy (future)
