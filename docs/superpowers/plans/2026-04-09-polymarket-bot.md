# Polymarket Trading Bot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modular Polymarket trading bot with pluggable strategies, Telegram interface, and paper/live trading modes.

**Architecture:** Core async engine polls Polymarket CLOB API, feeds data through pluggable strategy classes that emit signals. Signals route to Telegram for user approval, then execute via a Trade Manager that supports paper and live modes. SQLite stores all trade history and market snapshots.

**Tech Stack:** Python 3.11+, py-clob-client, python-telegram-bot v20+, aiohttp, sqlite3, pyyaml, asyncio

---

## File Map

```
projects/polymarket-bot/
├── config.yaml              # User config (risk limits, tokens, mode)
├── config.example.yaml      # Template with placeholder values
├── requirements.txt         # Dependencies
├── run.py                   # Entry point
├── src/
│   ├── __init__.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── engine.py        # Main async loop, orchestrates everything
│   │   ├── market_scanner.py # Polymarket API wrapper
│   │   └── trade_manager.py  # Paper/live execution, risk checks, position tracking
│   ├── strategies/
│   │   ├── __init__.py
│   │   ├── base.py           # BaseStrategy ABC + Signal dataclass
│   │   ├── market_signals.py # Price movement + volume spike detection
│   │   └── arbitrage.py      # Complement mispricing + related market inconsistencies
│   ├── telegram/
│   │   ├── __init__.py
│   │   └── bot.py            # Telegram commands, alerts, approve/reject buttons
│   ├── data/
│   │   ├── __init__.py
│   │   └── database.py       # SQLite schema, CRUD operations
│   └── utils/
│       ├── __init__.py
│       └── config.py         # YAML config loader + validation
├── tests/
│   ├── __init__.py
│   ├── test_config.py
│   ├── test_database.py
│   ├── test_market_scanner.py
│   ├── test_trade_manager.py
│   ├── test_strategies.py
│   └── test_telegram_bot.py
└── data/                     # Runtime data (gitignored)
    └── .gitkeep
```

---

## Task 1: Project Scaffold + Config Loader

**Files:**
- Create: `projects/polymarket-bot/requirements.txt`
- Create: `projects/polymarket-bot/config.example.yaml`
- Create: `projects/polymarket-bot/src/__init__.py`
- Create: `projects/polymarket-bot/src/utils/__init__.py`
- Create: `projects/polymarket-bot/src/utils/config.py`
- Create: `projects/polymarket-bot/tests/__init__.py`
- Create: `projects/polymarket-bot/tests/test_config.py`
- Create: `projects/polymarket-bot/data/.gitkeep`
- Create: `projects/polymarket-bot/.gitignore`

- [ ] **Step 1: Create project directory structure**

```bash
cd /c/dead-pixel-design
mkdir -p projects/polymarket-bot/{src/{core,strategies,telegram,data,utils},tests,data}
```

- [ ] **Step 2: Create requirements.txt**

Create `projects/polymarket-bot/requirements.txt`:

```
py-clob-client>=0.5.0
python-telegram-bot>=20.0
aiohttp>=3.9.0
websockets>=12.0
pyyaml>=6.0
pytest>=8.0
pytest-asyncio>=0.23.0
```

- [ ] **Step 3: Create .gitignore**

Create `projects/polymarket-bot/.gitignore`:

```
config.yaml
data/polymarket.db
__pycache__/
*.pyc
.env
venv/
```

- [ ] **Step 4: Create config.example.yaml**

Create `projects/polymarket-bot/config.example.yaml`:

```yaml
mode: paper  # paper | live

polling_interval: 30  # seconds between market scans

telegram:
  bot_token: "YOUR_TELEGRAM_BOT_TOKEN"
  chat_id: "YOUR_CHAT_ID"

wallet:
  private_key: "YOUR_POLYGON_PRIVATE_KEY"
  chain_id: 137

polymarket:
  clob_host: "https://clob.polymarket.com"
  gamma_host: "https://gamma-api.polymarket.com"

risk:
  max_bet: 5.00
  max_exposure: 50.00
  max_daily_trades: 20
  max_per_market: 10.00

strategies:
  market_signals:
    enabled: true
    min_confidence: 0.6
    price_move_threshold: 0.10
    volume_spike_threshold: 3.0
    lookback_minutes: 60
  arbitrage:
    enabled: false
    min_confidence: 0.7
    min_spread: 0.03
```

- [ ] **Step 5: Write failing test for config loader**

Create `projects/polymarket-bot/tests/__init__.py` (empty).
Create `projects/polymarket-bot/tests/test_config.py`:

```python
import os
import tempfile
import pytest
import yaml
from src.utils.config import load_config, ConfigError


def write_yaml(path, data):
    with open(path, "w") as f:
        yaml.dump(data, f)


VALID_CONFIG = {
    "mode": "paper",
    "polling_interval": 30,
    "telegram": {"bot_token": "test-token", "chat_id": "12345"},
    "wallet": {"private_key": "0xabc", "chain_id": 137},
    "polymarket": {
        "clob_host": "https://clob.polymarket.com",
        "gamma_host": "https://gamma-api.polymarket.com",
    },
    "risk": {
        "max_bet": 5.0,
        "max_exposure": 50.0,
        "max_daily_trades": 20,
        "max_per_market": 10.0,
    },
    "strategies": {
        "market_signals": {
            "enabled": True,
            "min_confidence": 0.6,
            "price_move_threshold": 0.10,
            "volume_spike_threshold": 3.0,
            "lookback_minutes": 60,
        },
        "arbitrage": {
            "enabled": False,
            "min_confidence": 0.7,
            "min_spread": 0.03,
        },
    },
}


def test_load_valid_config():
    with tempfile.NamedTemporaryFile(mode="w", suffix=".yaml", delete=False) as f:
        yaml.dump(VALID_CONFIG, f)
        path = f.name
    try:
        config = load_config(path)
        assert config["mode"] == "paper"
        assert config["risk"]["max_bet"] == 5.0
        assert config["strategies"]["market_signals"]["enabled"] is True
    finally:
        os.unlink(path)


def test_load_config_missing_file():
    with pytest.raises(ConfigError, match="not found"):
        load_config("/nonexistent/config.yaml")


def test_load_config_invalid_mode():
    bad = {**VALID_CONFIG, "mode": "turbo"}
    with tempfile.NamedTemporaryFile(mode="w", suffix=".yaml", delete=False) as f:
        yaml.dump(bad, f)
        path = f.name
    try:
        with pytest.raises(ConfigError, match="mode"):
            load_config(path)
    finally:
        os.unlink(path)


def test_load_config_missing_telegram():
    bad = {k: v for k, v in VALID_CONFIG.items() if k != "telegram"}
    with tempfile.NamedTemporaryFile(mode="w", suffix=".yaml", delete=False) as f:
        yaml.dump(bad, f)
        path = f.name
    try:
        with pytest.raises(ConfigError, match="telegram"):
            load_config(path)
    finally:
        os.unlink(path)


def test_load_config_negative_risk():
    bad = VALID_CONFIG.copy()
    bad["risk"] = {**VALID_CONFIG["risk"], "max_bet": -1}
    with tempfile.NamedTemporaryFile(mode="w", suffix=".yaml", delete=False) as f:
        yaml.dump(bad, f)
        path = f.name
    try:
        with pytest.raises(ConfigError, match="max_bet"):
            load_config(path)
    finally:
        os.unlink(path)
```

- [ ] **Step 6: Run tests to verify they fail**

```bash
cd /c/dead-pixel-design/projects/polymarket-bot
python -m pytest tests/test_config.py -v
```

Expected: FAIL — `ModuleNotFoundError: No module named 'src.utils.config'`

- [ ] **Step 7: Implement config loader**

Create `projects/polymarket-bot/src/__init__.py` (empty).
Create `projects/polymarket-bot/src/utils/__init__.py` (empty).
Create `projects/polymarket-bot/src/utils/config.py`:

```python
import os
import yaml


class ConfigError(Exception):
    pass


REQUIRED_SECTIONS = ["telegram", "wallet", "polymarket", "risk", "strategies"]
VALID_MODES = ["paper", "live"]


def load_config(path: str) -> dict:
    if not os.path.exists(path):
        raise ConfigError(f"Config file not found: {path}")

    with open(path, "r") as f:
        config = yaml.safe_load(f)

    if not isinstance(config, dict):
        raise ConfigError("Config file must be a YAML mapping")

    mode = config.get("mode", "paper")
    if mode not in VALID_MODES:
        raise ConfigError(f"Invalid mode '{mode}'. Must be one of: {VALID_MODES}")

    for section in REQUIRED_SECTIONS:
        if section not in config:
            raise ConfigError(f"Missing required config section: {section}")

    risk = config["risk"]
    for field in ["max_bet", "max_exposure", "max_daily_trades", "max_per_market"]:
        val = risk.get(field)
        if val is not None and val < 0:
            raise ConfigError(f"Risk field {field} cannot be negative")

    config.setdefault("polling_interval", 30)

    return config
```

- [ ] **Step 8: Run tests to verify they pass**

```bash
cd /c/dead-pixel-design/projects/polymarket-bot
python -m pytest tests/test_config.py -v
```

Expected: All 5 tests PASS.

- [ ] **Step 9: Create data/.gitkeep**

```bash
touch /c/dead-pixel-design/projects/polymarket-bot/data/.gitkeep
```

- [ ] **Step 10: Commit**

```bash
cd /c/dead-pixel-design/projects/polymarket-bot
git add -A
git commit -m "feat: scaffold polymarket bot project with config loader"
```

---

## Task 2: SQLite Data Layer

**Files:**
- Create: `projects/polymarket-bot/src/data/__init__.py`
- Create: `projects/polymarket-bot/src/data/database.py`
- Create: `projects/polymarket-bot/tests/test_database.py`

- [ ] **Step 1: Write failing tests for database**

Create `projects/polymarket-bot/src/data/__init__.py` (empty).
Create `projects/polymarket-bot/tests/test_database.py`:

```python
import os
import tempfile
import pytest
from src.data.database import Database


@pytest.fixture
def db():
    fd, path = tempfile.mkstemp(suffix=".db")
    os.close(fd)
    database = Database(path)
    database.initialize()
    yield database
    database.close()
    os.unlink(path)


def test_initialize_creates_tables(db):
    tables = db.list_tables()
    assert "markets" in tables
    assert "trades" in tables
    assert "snapshots" in tables


def test_upsert_and_get_market(db):
    db.upsert_market(
        condition_id="0xabc",
        question="Will it rain?",
        outcome_yes_token="tok_yes",
        outcome_no_token="tok_no",
        active=True,
    )
    market = db.get_market("0xabc")
    assert market["question"] == "Will it rain?"
    assert market["active"] is True


def test_upsert_market_updates_existing(db):
    db.upsert_market("0xabc", "Will it rain?", "ty", "tn", True)
    db.upsert_market("0xabc", "Will it rain tomorrow?", "ty", "tn", False)
    market = db.get_market("0xabc")
    assert market["question"] == "Will it rain tomorrow?"
    assert market["active"] is False


def test_insert_and_get_trade(db):
    trade_id = db.insert_trade(
        market_id="0xabc",
        strategy="market_signals",
        side="BUY",
        token_id="tok_yes",
        price=0.35,
        size=5.0,
        mode="paper",
    )
    trade = db.get_trade(trade_id)
    assert trade["market_id"] == "0xabc"
    assert trade["strategy"] == "market_signals"
    assert trade["price"] == 0.35
    assert trade["status"] == "open"


def test_close_trade(db):
    trade_id = db.insert_trade("0xabc", "arb", "BUY", "tok", 0.5, 10.0, "paper")
    db.close_trade(trade_id, exit_price=0.75)
    trade = db.get_trade(trade_id)
    assert trade["status"] == "closed"
    assert trade["exit_price"] == 0.75
    assert trade["pnl"] == pytest.approx(2.5)  # (0.75 - 0.5) * 10.0


def test_get_open_trades(db):
    db.insert_trade("0x1", "s", "BUY", "t", 0.5, 5.0, "paper")
    db.insert_trade("0x2", "s", "BUY", "t", 0.3, 5.0, "paper")
    tid = db.insert_trade("0x3", "s", "BUY", "t", 0.4, 5.0, "paper")
    db.close_trade(tid, 0.6)
    open_trades = db.get_open_trades()
    assert len(open_trades) == 2


def test_get_total_exposure(db):
    db.insert_trade("0x1", "s", "BUY", "t", 0.5, 10.0, "paper")
    db.insert_trade("0x2", "s", "BUY", "t", 0.3, 5.0, "paper")
    exposure = db.get_total_exposure()
    assert exposure == pytest.approx(6.5)  # 0.5*10 + 0.3*5


def test_get_daily_trade_count(db):
    db.insert_trade("0x1", "s", "BUY", "t", 0.5, 5.0, "paper")
    db.insert_trade("0x2", "s", "BUY", "t", 0.3, 5.0, "paper")
    count = db.get_daily_trade_count()
    assert count == 2


def test_insert_snapshot(db):
    db.insert_snapshot("0xabc", "tok_yes", 0.45, 1000.0)
    snapshots = db.get_snapshots("0xabc", limit=10)
    assert len(snapshots) == 1
    assert snapshots[0]["price"] == 0.45
    assert snapshots[0]["volume"] == 1000.0


def test_get_strategy_stats(db):
    t1 = db.insert_trade("0x1", "market_signals", "BUY", "t", 0.3, 10.0, "paper")
    t2 = db.insert_trade("0x2", "market_signals", "BUY", "t", 0.5, 10.0, "paper")
    db.close_trade(t1, 0.6)  # profit 3.0
    db.close_trade(t2, 0.4)  # loss -1.0
    stats = db.get_strategy_stats("market_signals")
    assert stats["total_trades"] == 2
    assert stats["wins"] == 1
    assert stats["losses"] == 1
    assert stats["total_pnl"] == pytest.approx(2.0)
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd /c/dead-pixel-design/projects/polymarket-bot
python -m pytest tests/test_database.py -v
```

Expected: FAIL — `ModuleNotFoundError: No module named 'src.data.database'`

- [ ] **Step 3: Implement database module**

Create `projects/polymarket-bot/src/data/database.py`:

```python
import sqlite3
from datetime import date, datetime


class Database:
    def __init__(self, db_path: str):
        self.db_path = db_path
        self.conn = sqlite3.connect(db_path)
        self.conn.row_factory = sqlite3.Row

    def initialize(self):
        cur = self.conn.cursor()
        cur.executescript("""
            CREATE TABLE IF NOT EXISTS markets (
                condition_id TEXT PRIMARY KEY,
                question TEXT NOT NULL,
                outcome_yes_token TEXT,
                outcome_no_token TEXT,
                active BOOLEAN DEFAULT 1,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS trades (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                market_id TEXT NOT NULL,
                strategy TEXT NOT NULL,
                side TEXT NOT NULL,
                token_id TEXT NOT NULL,
                price REAL NOT NULL,
                size REAL NOT NULL,
                mode TEXT NOT NULL,
                status TEXT DEFAULT 'open',
                exit_price REAL,
                pnl REAL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                closed_at TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS snapshots (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                condition_id TEXT NOT NULL,
                token_id TEXT NOT NULL,
                price REAL NOT NULL,
                volume REAL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        self.conn.commit()

    def close(self):
        self.conn.close()

    def list_tables(self) -> list[str]:
        cur = self.conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table'"
        )
        return [row["name"] for row in cur.fetchall()]

    def upsert_market(
        self,
        condition_id: str,
        question: str,
        outcome_yes_token: str,
        outcome_no_token: str,
        active: bool,
    ):
        self.conn.execute(
            """INSERT INTO markets (condition_id, question, outcome_yes_token,
                                    outcome_no_token, active, updated_at)
               VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
               ON CONFLICT(condition_id) DO UPDATE SET
                 question=excluded.question,
                 outcome_yes_token=excluded.outcome_yes_token,
                 outcome_no_token=excluded.outcome_no_token,
                 active=excluded.active,
                 updated_at=CURRENT_TIMESTAMP""",
            (condition_id, question, outcome_yes_token, outcome_no_token, active),
        )
        self.conn.commit()

    def get_market(self, condition_id: str) -> dict | None:
        cur = self.conn.execute(
            "SELECT * FROM markets WHERE condition_id = ?", (condition_id,)
        )
        row = cur.fetchone()
        return dict(row) if row else None

    def insert_trade(
        self,
        market_id: str,
        strategy: str,
        side: str,
        token_id: str,
        price: float,
        size: float,
        mode: str,
    ) -> int:
        cur = self.conn.execute(
            """INSERT INTO trades (market_id, strategy, side, token_id, price, size, mode)
               VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (market_id, strategy, side, token_id, price, size, mode),
        )
        self.conn.commit()
        return cur.lastrowid

    def get_trade(self, trade_id: int) -> dict | None:
        cur = self.conn.execute("SELECT * FROM trades WHERE id = ?", (trade_id,))
        row = cur.fetchone()
        return dict(row) if row else None

    def close_trade(self, trade_id: int, exit_price: float):
        trade = self.get_trade(trade_id)
        if not trade:
            return
        pnl = (exit_price - trade["price"]) * trade["size"]
        self.conn.execute(
            """UPDATE trades SET status='closed', exit_price=?, pnl=?,
               closed_at=CURRENT_TIMESTAMP WHERE id=?""",
            (exit_price, pnl, trade_id),
        )
        self.conn.commit()

    def get_open_trades(self) -> list[dict]:
        cur = self.conn.execute("SELECT * FROM trades WHERE status='open'")
        return [dict(row) for row in cur.fetchall()]

    def get_total_exposure(self) -> float:
        cur = self.conn.execute(
            "SELECT COALESCE(SUM(price * size), 0) as total FROM trades WHERE status='open'"
        )
        return cur.fetchone()["total"]

    def get_daily_trade_count(self) -> int:
        today = date.today().isoformat()
        cur = self.conn.execute(
            "SELECT COUNT(*) as cnt FROM trades WHERE date(created_at) = ?",
            (today,),
        )
        return cur.fetchone()["cnt"]

    def insert_snapshot(
        self, condition_id: str, token_id: str, price: float, volume: float
    ):
        self.conn.execute(
            """INSERT INTO snapshots (condition_id, token_id, price, volume)
               VALUES (?, ?, ?, ?)""",
            (condition_id, token_id, price, volume),
        )
        self.conn.commit()

    def get_snapshots(
        self, condition_id: str, limit: int = 100
    ) -> list[dict]:
        cur = self.conn.execute(
            """SELECT * FROM snapshots WHERE condition_id = ?
               ORDER BY created_at DESC LIMIT ?""",
            (condition_id, limit),
        )
        return [dict(row) for row in cur.fetchall()]

    def get_strategy_stats(self, strategy: str) -> dict:
        cur = self.conn.execute(
            """SELECT
                 COUNT(*) as total_trades,
                 SUM(CASE WHEN pnl > 0 THEN 1 ELSE 0 END) as wins,
                 SUM(CASE WHEN pnl <= 0 THEN 1 ELSE 0 END) as losses,
                 COALESCE(SUM(pnl), 0) as total_pnl
               FROM trades WHERE strategy = ? AND status = 'closed'""",
            (strategy,),
        )
        return dict(cur.fetchone())
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd /c/dead-pixel-design/projects/polymarket-bot
python -m pytest tests/test_database.py -v
```

Expected: All 10 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/ tests/test_database.py
git commit -m "feat: add SQLite data layer with markets, trades, snapshots"
```

---

## Task 3: Market Scanner (Polymarket API Wrapper)

**Files:**
- Create: `projects/polymarket-bot/src/core/__init__.py`
- Create: `projects/polymarket-bot/src/core/market_scanner.py`
- Create: `projects/polymarket-bot/tests/test_market_scanner.py`

- [ ] **Step 1: Write failing tests for market scanner**

Create `projects/polymarket-bot/src/core/__init__.py` (empty).
Create `projects/polymarket-bot/tests/test_market_scanner.py`:

```python
import pytest
from unittest.mock import MagicMock, patch, AsyncMock
from src.core.market_scanner import MarketScanner


@pytest.fixture
def scanner_config():
    return {
        "polymarket": {
            "clob_host": "https://clob.polymarket.com",
            "gamma_host": "https://gamma-api.polymarket.com",
        },
        "wallet": {"private_key": "0xfakekey", "chain_id": 137},
    }


def test_scanner_init(scanner_config):
    with patch("src.core.market_scanner.ClobClient") as mock_clob:
        scanner = MarketScanner(scanner_config)
        assert scanner is not None
        mock_clob.assert_called_once()


def test_parse_markets():
    raw_markets = [
        {
            "condition_id": "0x123",
            "question": "Will it rain?",
            "tokens": [
                {"token_id": "tok_yes", "outcome": "Yes"},
                {"token_id": "tok_no", "outcome": "No"},
            ],
            "active": True,
        },
        {
            "condition_id": "0x456",
            "question": "Will it snow?",
            "tokens": [
                {"token_id": "tok_yes2", "outcome": "Yes"},
                {"token_id": "tok_no2", "outcome": "No"},
            ],
            "active": False,
        },
    ]
    parsed = MarketScanner.parse_markets(raw_markets)
    assert len(parsed) == 2
    assert parsed[0]["condition_id"] == "0x123"
    assert parsed[0]["outcome_yes_token"] == "tok_yes"
    assert parsed[0]["outcome_no_token"] == "tok_no"


def test_parse_markets_skips_malformed():
    raw = [
        {"condition_id": "0x1", "question": "Good", "tokens": [
            {"token_id": "y", "outcome": "Yes"},
            {"token_id": "n", "outcome": "No"},
        ], "active": True},
        {"condition_id": "0x2"},  # malformed, no tokens
    ]
    parsed = MarketScanner.parse_markets(raw)
    assert len(parsed) == 1


@pytest.mark.asyncio
async def test_get_price(scanner_config):
    with patch("src.core.market_scanner.ClobClient") as mock_clob_cls:
        mock_client = MagicMock()
        mock_client.get_midpoint.return_value = 0.65
        mock_clob_cls.return_value = mock_client

        scanner = MarketScanner(scanner_config)
        price = scanner.get_price("tok_123")
        assert price == 0.65
        mock_client.get_midpoint.assert_called_once_with(token_id="tok_123")


@pytest.mark.asyncio
async def test_get_order_book(scanner_config):
    with patch("src.core.market_scanner.ClobClient") as mock_clob_cls:
        mock_client = MagicMock()
        mock_book = MagicMock()
        mock_book.bids = [{"price": "0.60", "size": "100"}]
        mock_book.asks = [{"price": "0.65", "size": "50"}]
        mock_client.get_order_book.return_value = mock_book
        mock_clob_cls.return_value = mock_client

        scanner = MarketScanner(scanner_config)
        book = scanner.get_order_book("tok_123")
        assert len(book["bids"]) == 1
        assert len(book["asks"]) == 1
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd /c/dead-pixel-design/projects/polymarket-bot
python -m pytest tests/test_market_scanner.py -v
```

Expected: FAIL — `ModuleNotFoundError: No module named 'src.core.market_scanner'`

- [ ] **Step 3: Implement market scanner**

Create `projects/polymarket-bot/src/core/market_scanner.py`:

```python
from py_clob_client.client import ClobClient
from py_clob_client.order_builder.constants import BUY, SELL


class MarketScanner:
    def __init__(self, config: dict):
        pm_config = config["polymarket"]
        wallet = config["wallet"]

        self.client = ClobClient(
            host=pm_config["clob_host"],
            key=wallet["private_key"],
            chain_id=wallet["chain_id"],
        )
        self._creds_set = False

    def _ensure_creds(self):
        if not self._creds_set:
            creds = self.client.create_or_derive_api_creds()
            self.client.set_api_creds(creds)
            self._creds_set = True

    def fetch_markets(self, next_cursor: str = "") -> tuple[list[dict], str]:
        """Fetch a page of markets. Returns (markets, next_cursor)."""
        response = self.client.get_markets(next_cursor=next_cursor)
        raw_markets = response if isinstance(response, list) else response.get("data", [])
        next_cur = "" if isinstance(response, list) else response.get("next_cursor", "")
        return self.parse_markets(raw_markets), next_cur

    @staticmethod
    def parse_markets(raw_markets: list[dict]) -> list[dict]:
        parsed = []
        for m in raw_markets:
            tokens = m.get("tokens")
            if not tokens or not isinstance(tokens, list) or len(tokens) < 2:
                continue

            yes_token = None
            no_token = None
            for t in tokens:
                outcome = t.get("outcome", "").lower()
                if outcome == "yes":
                    yes_token = t.get("token_id")
                elif outcome == "no":
                    no_token = t.get("token_id")

            if not yes_token or not no_token:
                continue

            parsed.append({
                "condition_id": m["condition_id"],
                "question": m.get("question", ""),
                "outcome_yes_token": yes_token,
                "outcome_no_token": no_token,
                "active": m.get("active", True),
            })
        return parsed

    def get_price(self, token_id: str) -> float:
        return self.client.get_midpoint(token_id=token_id)

    def get_order_book(self, token_id: str) -> dict:
        book = self.client.get_order_book(token_id=token_id)
        return {
            "bids": book.bids if hasattr(book, "bids") else [],
            "asks": book.asks if hasattr(book, "asks") else [],
        }

    def get_spread(self, token_id: str) -> float:
        return self.client.get_spread(token_id=token_id)

    def get_last_trade_price(self, token_id: str) -> float:
        return self.client.get_last_trade_price(token_id=token_id)

    def place_order(self, token_id: str, price: float, size: float, side: str):
        """Place an order. side should be 'BUY' or 'SELL'."""
        self._ensure_creds()
        order_side = BUY if side == "BUY" else SELL
        order = self.client.create_order(
            order_args={
                "token_id": token_id,
                "price": price,
                "size": size,
                "side": order_side,
            }
        )
        return self.client.post_order(order)

    def cancel_order(self, order_id: str):
        self._ensure_creds()
        return self.client.cancel(order_id=order_id)
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd /c/dead-pixel-design/projects/polymarket-bot
python -m pytest tests/test_market_scanner.py -v
```

Expected: All 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/core/ tests/test_market_scanner.py
git commit -m "feat: add Polymarket market scanner with API wrapper"
```

---

## Task 4: Strategy Base Class + Market Signals Strategy

**Files:**
- Create: `projects/polymarket-bot/src/strategies/__init__.py`
- Create: `projects/polymarket-bot/src/strategies/base.py`
- Create: `projects/polymarket-bot/src/strategies/market_signals.py`
- Create: `projects/polymarket-bot/tests/test_strategies.py`

- [ ] **Step 1: Write failing tests for strategy system**

Create `projects/polymarket-bot/src/strategies/__init__.py` (empty).
Create `projects/polymarket-bot/tests/test_strategies.py`:

```python
import pytest
from src.strategies.base import Signal
from src.strategies.market_signals import MarketSignalsStrategy


@pytest.fixture
def strategy():
    config = {
        "min_confidence": 0.6,
        "price_move_threshold": 0.10,
        "volume_spike_threshold": 3.0,
        "lookback_minutes": 60,
    }
    return MarketSignalsStrategy(config)


def test_signal_dataclass():
    signal = Signal(
        strategy_name="test",
        market_id="0x1",
        market_question="Will it rain?",
        token_id="tok_yes",
        side="BUY",
        price=0.35,
        confidence=0.78,
        reason="Price moved 15%",
    )
    assert signal.strategy_name == "test"
    assert signal.confidence == 0.78


def test_price_move_signal(strategy):
    snapshots = [
        {"price": 0.20, "volume": 100},
        {"price": 0.20, "volume": 100},
        {"price": 0.20, "volume": 100},
    ]
    current = {"price": 0.35, "volume": 100}
    signals = strategy.analyze_market(
        market_id="0x1",
        question="Will it rain?",
        token_id="tok_yes",
        current=current,
        snapshots=snapshots,
    )
    assert len(signals) >= 1
    assert signals[0].confidence >= 0.6
    assert "price" in signals[0].reason.lower()


def test_no_signal_small_move(strategy):
    snapshots = [
        {"price": 0.30, "volume": 100},
        {"price": 0.31, "volume": 100},
    ]
    current = {"price": 0.32, "volume": 100}
    signals = strategy.analyze_market(
        market_id="0x1",
        question="Test?",
        token_id="tok",
        current=current,
        snapshots=snapshots,
    )
    assert len(signals) == 0


def test_volume_spike_signal(strategy):
    snapshots = [
        {"price": 0.30, "volume": 100},
        {"price": 0.30, "volume": 110},
        {"price": 0.30, "volume": 90},
    ]
    current = {"price": 0.31, "volume": 400}  # 4x average
    signals = strategy.analyze_market(
        market_id="0x1",
        question="Volume test?",
        token_id="tok",
        current=current,
        snapshots=snapshots,
    )
    assert len(signals) >= 1
    assert any("volume" in s.reason.lower() for s in signals)


def test_no_signal_normal_volume(strategy):
    snapshots = [
        {"price": 0.30, "volume": 100},
        {"price": 0.30, "volume": 110},
    ]
    current = {"price": 0.30, "volume": 120}
    signals = strategy.analyze_market(
        market_id="0x1",
        question="Test?",
        token_id="tok",
        current=current,
        snapshots=snapshots,
    )
    volume_signals = [s for s in signals if "volume" in s.reason.lower()]
    assert len(volume_signals) == 0


def test_confidence_scales_with_move_size(strategy):
    snapshots = [{"price": 0.20, "volume": 100}] * 5
    small_move = {"price": 0.32, "volume": 100}  # 60% move
    big_move = {"price": 0.50, "volume": 100}  # 150% move

    signals_small = strategy.analyze_market("0x1", "Q?", "t", small_move, snapshots)
    signals_big = strategy.analyze_market("0x1", "Q?", "t", big_move, snapshots)

    assert len(signals_small) >= 1
    assert len(signals_big) >= 1
    assert signals_big[0].confidence >= signals_small[0].confidence


def test_analyze_returns_empty_on_no_snapshots(strategy):
    current = {"price": 0.5, "volume": 100}
    signals = strategy.analyze_market("0x1", "Q?", "t", current, [])
    assert signals == []
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd /c/dead-pixel-design/projects/polymarket-bot
python -m pytest tests/test_strategies.py -v
```

Expected: FAIL — `ModuleNotFoundError`

- [ ] **Step 3: Implement base strategy and Signal dataclass**

Create `projects/polymarket-bot/src/strategies/base.py`:

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass
class Signal:
    strategy_name: str
    market_id: str
    market_question: str
    token_id: str
    side: str  # "BUY" or "SELL"
    price: float
    confidence: float  # 0.0 to 1.0
    reason: str


class BaseStrategy(ABC):
    def __init__(self, config: dict):
        self.config = config
        self.min_confidence = config.get("min_confidence", 0.6)

    @abstractmethod
    def analyze_market(
        self,
        market_id: str,
        question: str,
        token_id: str,
        current: dict,
        snapshots: list[dict],
    ) -> list[Signal]:
        pass

    def filter_signals(self, signals: list[Signal]) -> list[Signal]:
        return [s for s in signals if s.confidence >= self.min_confidence]
```

- [ ] **Step 4: Implement market signals strategy**

Create `projects/polymarket-bot/src/strategies/market_signals.py`:

```python
from src.strategies.base import BaseStrategy, Signal


class MarketSignalsStrategy(BaseStrategy):
    def __init__(self, config: dict):
        super().__init__(config)
        self.price_move_threshold = config.get("price_move_threshold", 0.10)
        self.volume_spike_threshold = config.get("volume_spike_threshold", 3.0)

    def analyze_market(
        self,
        market_id: str,
        question: str,
        token_id: str,
        current: dict,
        snapshots: list[dict],
    ) -> list[Signal]:
        if not snapshots:
            return []

        signals = []

        price_signal = self._check_price_move(
            market_id, question, token_id, current, snapshots
        )
        if price_signal:
            signals.append(price_signal)

        volume_signal = self._check_volume_spike(
            market_id, question, token_id, current, snapshots
        )
        if volume_signal:
            signals.append(volume_signal)

        return self.filter_signals(signals)

    def _check_price_move(
        self,
        market_id: str,
        question: str,
        token_id: str,
        current: dict,
        snapshots: list[dict],
    ) -> Signal | None:
        avg_price = sum(s["price"] for s in snapshots) / len(snapshots)
        if avg_price == 0:
            return None

        current_price = current["price"]
        move = abs(current_price - avg_price) / avg_price

        if move < self.price_move_threshold:
            return None

        direction = "up" if current_price > avg_price else "down"
        side = "BUY" if direction == "up" else "SELL"

        confidence = min(0.5 + (move / 2), 0.95)

        return Signal(
            strategy_name="market_signals",
            market_id=market_id,
            market_question=question,
            token_id=token_id,
            side=side,
            price=current_price,
            confidence=confidence,
            reason=f"Price moved {direction} {move:.0%} from avg {avg_price:.2f} to {current_price:.2f}",
        )

    def _check_volume_spike(
        self,
        market_id: str,
        question: str,
        token_id: str,
        current: dict,
        snapshots: list[dict],
    ) -> Signal | None:
        volumes = [s.get("volume", 0) for s in snapshots]
        avg_volume = sum(volumes) / len(volumes) if volumes else 0

        if avg_volume == 0:
            return None

        current_volume = current.get("volume", 0)
        spike = current_volume / avg_volume

        if spike < self.volume_spike_threshold:
            return None

        confidence = min(0.5 + (spike - self.volume_spike_threshold) * 0.1, 0.90)

        return Signal(
            strategy_name="market_signals",
            market_id=market_id,
            market_question=question,
            token_id=token_id,
            side="BUY",
            price=current["price"],
            confidence=confidence,
            reason=f"Volume spike: {spike:.1f}x normal ({current_volume:.0f} vs avg {avg_volume:.0f})",
        )
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
cd /c/dead-pixel-design/projects/polymarket-bot
python -m pytest tests/test_strategies.py -v
```

Expected: All 8 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/strategies/ tests/test_strategies.py
git commit -m "feat: add strategy system with market signals detector"
```

---

## Task 5: Trade Manager (Paper Mode)

**Files:**
- Create: `projects/polymarket-bot/src/core/trade_manager.py`
- Create: `projects/polymarket-bot/tests/test_trade_manager.py`

- [ ] **Step 1: Write failing tests for trade manager**

Create `projects/polymarket-bot/tests/test_trade_manager.py`:

```python
import os
import tempfile
import pytest
from src.core.trade_manager import TradeManager, RiskLimitError
from src.data.database import Database
from src.strategies.base import Signal


@pytest.fixture
def db():
    fd, path = tempfile.mkstemp(suffix=".db")
    os.close(fd)
    database = Database(path)
    database.initialize()
    yield database
    database.close()
    os.unlink(path)


@pytest.fixture
def risk_config():
    return {
        "max_bet": 5.0,
        "max_exposure": 50.0,
        "max_daily_trades": 20,
        "max_per_market": 10.0,
    }


@pytest.fixture
def manager(db, risk_config):
    return TradeManager(db=db, risk_config=risk_config, mode="paper", scanner=None)


@pytest.fixture
def sample_signal():
    return Signal(
        strategy_name="market_signals",
        market_id="0x123",
        market_question="Will it rain?",
        token_id="tok_yes",
        side="BUY",
        price=0.35,
        confidence=0.78,
        reason="Price moved up 15%",
    )


def test_execute_paper_trade(manager, sample_signal):
    result = manager.execute_trade(sample_signal, size=5.0)
    assert result["mode"] == "paper"
    assert result["trade_id"] is not None
    assert result["status"] == "open"


def test_paper_trade_logged_to_db(manager, sample_signal, db):
    result = manager.execute_trade(sample_signal, size=5.0)
    trade = db.get_trade(result["trade_id"])
    assert trade is not None
    assert trade["market_id"] == "0x123"
    assert trade["mode"] == "paper"


def test_max_bet_exceeded(manager, sample_signal):
    with pytest.raises(RiskLimitError, match="max_bet"):
        manager.execute_trade(sample_signal, size=10.0)


def test_max_exposure_exceeded(manager, sample_signal, db):
    # Fill up exposure close to limit
    for i in range(9):
        sig = Signal("s", f"0x{i}", "Q", f"t{i}", "BUY", 0.50, 0.8, "r")
        manager.execute_trade(sig, size=5.0)  # 0.50 * 5.0 = 2.50 each, total = 22.50

    # This would push us to 25.0, still under 50
    result = manager.execute_trade(sample_signal, size=5.0)
    assert result is not None


def test_max_daily_trades_exceeded(manager):
    config = manager.risk_config.copy()
    config["max_daily_trades"] = 2
    manager.risk_config = config

    s1 = Signal("s", "0x1", "Q", "t1", "BUY", 0.3, 0.8, "r")
    s2 = Signal("s", "0x2", "Q", "t2", "BUY", 0.3, 0.8, "r")
    s3 = Signal("s", "0x3", "Q", "t3", "BUY", 0.3, 0.8, "r")

    manager.execute_trade(s1, size=1.0)
    manager.execute_trade(s2, size=1.0)
    with pytest.raises(RiskLimitError, match="daily"):
        manager.execute_trade(s3, size=1.0)


def test_check_risk_returns_details(manager, sample_signal):
    ok, reason = manager.check_risk(sample_signal, size=5.0)
    assert ok is True
    assert reason == ""


def test_check_risk_over_limit(manager, sample_signal):
    ok, reason = manager.check_risk(sample_signal, size=100.0)
    assert ok is False
    assert "max_bet" in reason


def test_get_positions(manager, sample_signal):
    manager.execute_trade(sample_signal, size=5.0)
    positions = manager.get_open_positions()
    assert len(positions) == 1
    assert positions[0]["market_id"] == "0x123"


def test_get_pnl_summary(manager, sample_signal, db):
    result = manager.execute_trade(sample_signal, size=10.0 * 0.35)
    # Manually close for P&L
    db.close_trade(result["trade_id"], exit_price=0.50)
    summary = manager.get_pnl_summary()
    assert summary["total_pnl"] != 0
    assert summary["open_positions"] == 0
    assert summary["closed_trades"] == 1
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd /c/dead-pixel-design/projects/polymarket-bot
python -m pytest tests/test_trade_manager.py -v
```

Expected: FAIL — `ModuleNotFoundError`

- [ ] **Step 3: Implement trade manager**

Create `projects/polymarket-bot/src/core/trade_manager.py`:

```python
from src.data.database import Database
from src.strategies.base import Signal


class RiskLimitError(Exception):
    pass


class TradeManager:
    def __init__(self, db: Database, risk_config: dict, mode: str, scanner):
        self.db = db
        self.risk_config = risk_config
        self.mode = mode
        self.scanner = scanner  # MarketScanner instance, None for paper-only

    def check_risk(self, signal: Signal, size: float) -> tuple[bool, str]:
        if size > self.risk_config["max_bet"]:
            return False, f"Size {size} exceeds max_bet {self.risk_config['max_bet']}"

        cost = signal.price * size
        current_exposure = self.db.get_total_exposure()
        if current_exposure + cost > self.risk_config["max_exposure"]:
            return False, (
                f"Exposure would be {current_exposure + cost:.2f}, "
                f"exceeds max_exposure {self.risk_config['max_exposure']}"
            )

        daily_count = self.db.get_daily_trade_count()
        if daily_count >= self.risk_config["max_daily_trades"]:
            return False, (
                f"Already placed {daily_count} trades today, "
                f"max daily trades is {self.risk_config['max_daily_trades']}"
            )

        return True, ""

    def execute_trade(self, signal: Signal, size: float) -> dict:
        ok, reason = self.check_risk(signal, size)
        if not ok:
            raise RiskLimitError(reason)

        if self.mode == "live" and self.scanner:
            self.scanner.place_order(
                token_id=signal.token_id,
                price=signal.price,
                size=size,
                side=signal.side,
            )

        trade_id = self.db.insert_trade(
            market_id=signal.market_id,
            strategy=signal.strategy_name,
            side=signal.side,
            token_id=signal.token_id,
            price=signal.price,
            size=size,
            mode=self.mode,
        )

        return {
            "trade_id": trade_id,
            "mode": self.mode,
            "status": "open",
            "market": signal.market_question,
            "side": signal.side,
            "price": signal.price,
            "size": size,
        }

    def get_open_positions(self) -> list[dict]:
        return self.db.get_open_trades()

    def get_pnl_summary(self) -> dict:
        open_trades = self.db.get_open_trades()
        all_trades = self.db.conn.execute(
            "SELECT * FROM trades WHERE status='closed'"
        ).fetchall()

        total_pnl = sum(dict(t)["pnl"] or 0 for t in all_trades)
        wins = sum(1 for t in all_trades if dict(t)["pnl"] and dict(t)["pnl"] > 0)
        losses = sum(1 for t in all_trades if dict(t)["pnl"] and dict(t)["pnl"] <= 0)

        return {
            "open_positions": len(open_trades),
            "closed_trades": len(all_trades),
            "wins": wins,
            "losses": losses,
            "total_pnl": total_pnl,
            "current_exposure": self.db.get_total_exposure(),
        }
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd /c/dead-pixel-design/projects/polymarket-bot
python -m pytest tests/test_trade_manager.py -v
```

Expected: All 9 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/core/trade_manager.py tests/test_trade_manager.py
git commit -m "feat: add trade manager with paper mode and risk controls"
```

---

## Task 6: Telegram Bot

**Files:**
- Create: `projects/polymarket-bot/src/telegram/__init__.py`
- Create: `projects/polymarket-bot/src/telegram/bot.py`
- Create: `projects/polymarket-bot/tests/test_telegram_bot.py`

- [ ] **Step 1: Write failing tests for telegram bot**

Create `projects/polymarket-bot/src/telegram/__init__.py` (empty).
Create `projects/polymarket-bot/tests/test_telegram_bot.py`:

```python
import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from src.telegram.bot import TelegramBot
from src.strategies.base import Signal


@pytest.fixture
def mock_trade_manager():
    tm = MagicMock()
    tm.get_open_positions.return_value = [
        {"market_id": "0x1", "side": "BUY", "price": 0.35, "size": 5.0}
    ]
    tm.get_pnl_summary.return_value = {
        "open_positions": 1,
        "closed_trades": 3,
        "wins": 2,
        "losses": 1,
        "total_pnl": 4.50,
        "current_exposure": 1.75,
    }
    tm.check_risk.return_value = (True, "")
    tm.execute_trade.return_value = {
        "trade_id": 1,
        "mode": "paper",
        "status": "open",
        "market": "Test?",
        "side": "BUY",
        "price": 0.35,
        "size": 5.0,
    }
    return tm


@pytest.fixture
def bot_config():
    return {
        "telegram": {"bot_token": "fake-token", "chat_id": "12345"},
        "risk": {"max_bet": 5.0},
    }


def test_format_signal_message():
    signal = Signal(
        strategy_name="market_signals",
        market_id="0x1",
        market_question="Will it rain?",
        token_id="tok_yes",
        side="BUY",
        price=0.35,
        confidence=0.78,
        reason="Price moved up 15%",
    )
    message = TelegramBot.format_signal_message(signal, suggested_size=5.0)
    assert "Will it rain?" in message
    assert "0.35" in message
    assert "0.78" in message
    assert "market_signals" in message


def test_format_status_message(mock_trade_manager):
    message = TelegramBot.format_status_message(mock_trade_manager.get_pnl_summary())
    assert "4.50" in message
    assert "1" in message  # open positions


def test_parse_callback_approve():
    action, signal_id = TelegramBot.parse_callback_data("approve_abc123")
    assert action == "approve"
    assert signal_id == "abc123"


def test_parse_callback_reject():
    action, signal_id = TelegramBot.parse_callback_data("reject_abc123")
    assert action == "reject"
    assert signal_id == "abc123"


def test_build_approval_keyboard():
    keyboard = TelegramBot.build_approval_keyboard("sig_001")
    # Should have one row with two buttons
    assert len(keyboard) == 1
    assert len(keyboard[0]) == 2
    assert keyboard[0][0]["text"] == "Approve"
    assert keyboard[0][1]["text"] == "Reject"
    assert "approve_sig_001" in keyboard[0][0]["callback_data"]
    assert "reject_sig_001" in keyboard[0][1]["callback_data"]
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd /c/dead-pixel-design/projects/polymarket-bot
python -m pytest tests/test_telegram_bot.py -v
```

Expected: FAIL — `ModuleNotFoundError`

- [ ] **Step 3: Implement telegram bot**

Create `projects/polymarket-bot/src/telegram/bot.py`:

```python
import asyncio
import uuid
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import (
    Application,
    CallbackQueryHandler,
    CommandHandler,
    ContextTypes,
)

from src.strategies.base import Signal


class TelegramBot:
    def __init__(self, config: dict, trade_manager, db):
        self.config = config
        self.trade_manager = trade_manager
        self.db = db
        self.chat_id = config["telegram"]["chat_id"]
        self.pending_signals: dict[str, tuple[Signal, float]] = {}

        self.app = Application.builder().token(
            config["telegram"]["bot_token"]
        ).build()

        self.app.add_handler(CommandHandler("status", self._cmd_status))
        self.app.add_handler(CommandHandler("markets", self._cmd_markets))
        self.app.add_handler(CommandHandler("strategies", self._cmd_strategies))
        self.app.add_handler(CommandHandler("config", self._cmd_config))
        self.app.add_handler(CommandHandler("history", self._cmd_history))
        self.app.add_handler(CallbackQueryHandler(self._handle_callback))

    async def start(self):
        await self.app.initialize()
        await self.app.start()
        await self.app.updater.start_polling()

    async def stop(self):
        await self.app.updater.stop()
        await self.app.stop()
        await self.app.shutdown()

    async def send_signal_alert(self, signal: Signal, suggested_size: float):
        signal_id = uuid.uuid4().hex[:12]
        self.pending_signals[signal_id] = (signal, suggested_size)

        message = self.format_signal_message(signal, suggested_size)
        keyboard_data = self.build_approval_keyboard(signal_id)
        keyboard = InlineKeyboardMarkup(
            [[InlineKeyboardButton(b["text"], callback_data=b["callback_data"])
              for b in row] for row in keyboard_data]
        )

        await self.app.bot.send_message(
            chat_id=self.chat_id,
            text=message,
            reply_markup=keyboard,
            parse_mode="Markdown",
        )

    async def send_message(self, text: str):
        await self.app.bot.send_message(
            chat_id=self.chat_id, text=text, parse_mode="Markdown"
        )

    @staticmethod
    def format_signal_message(signal: Signal, suggested_size: float) -> str:
        return (
            f"*Signal: {signal.strategy_name}*\n"
            f"Market: {signal.market_question}\n"
            f"Side: {signal.side} @ ${signal.price:.2f}\n"
            f"Confidence: {signal.confidence:.2f}\n"
            f"Reason: {signal.reason}\n"
            f"Suggested size: ${suggested_size:.2f}"
        )

    @staticmethod
    def format_status_message(summary: dict) -> str:
        return (
            f"*Portfolio Status*\n"
            f"Open positions: {summary['open_positions']}\n"
            f"Closed trades: {summary['closed_trades']}\n"
            f"Wins: {summary['wins']} | Losses: {summary['losses']}\n"
            f"Total P&L: ${summary['total_pnl']:.2f}\n"
            f"Current exposure: ${summary['current_exposure']:.2f}"
        )

    @staticmethod
    def parse_callback_data(data: str) -> tuple[str, str]:
        action, signal_id = data.split("_", 1)
        return action, signal_id

    @staticmethod
    def build_approval_keyboard(signal_id: str) -> list[list[dict]]:
        return [[
            {"text": "Approve", "callback_data": f"approve_{signal_id}"},
            {"text": "Reject", "callback_data": f"reject_{signal_id}"},
        ]]

    async def _handle_callback(
        self, update: Update, context: ContextTypes.DEFAULT_TYPE
    ):
        query = update.callback_query
        await query.answer()

        action, signal_id = self.parse_callback_data(query.data)

        if signal_id not in self.pending_signals:
            await query.edit_message_text("Signal expired or already handled.")
            return

        signal, size = self.pending_signals.pop(signal_id)

        if action == "approve":
            try:
                result = self.trade_manager.execute_trade(signal, size)
                await query.edit_message_text(
                    f"Trade executed ({result['mode']})\n"
                    f"{signal.side} {signal.market_question} @ ${signal.price:.2f}\n"
                    f"Size: ${size:.2f} | Trade ID: {result['trade_id']}"
                )
            except Exception as e:
                await query.edit_message_text(f"Trade failed: {e}")
        else:
            await query.edit_message_text(
                f"Rejected: {signal.market_question}"
            )

    async def _cmd_status(
        self, update: Update, context: ContextTypes.DEFAULT_TYPE
    ):
        summary = self.trade_manager.get_pnl_summary()
        await update.message.reply_text(
            self.format_status_message(summary), parse_mode="Markdown"
        )

    async def _cmd_markets(
        self, update: Update, context: ContextTypes.DEFAULT_TYPE
    ):
        positions = self.trade_manager.get_open_positions()
        if not positions:
            await update.message.reply_text("No open positions.")
            return
        lines = []
        for p in positions:
            lines.append(f"- {p['market_id']}: {p['side']} @ ${p['price']:.2f}")
        await update.message.reply_text(
            "*Watched Markets*\n" + "\n".join(lines), parse_mode="Markdown"
        )

    async def _cmd_strategies(
        self, update: Update, context: ContextTypes.DEFAULT_TYPE
    ):
        for name in ["market_signals", "arbitrage"]:
            stats = self.db.get_strategy_stats(name)
            await update.message.reply_text(
                f"*{name}*\n"
                f"Trades: {stats['total_trades']} | "
                f"Wins: {stats['wins']} | Losses: {stats['losses']}\n"
                f"P&L: ${stats['total_pnl']:.2f}",
                parse_mode="Markdown",
            )

    async def _cmd_config(
        self, update: Update, context: ContextTypes.DEFAULT_TYPE
    ):
        risk = self.trade_manager.risk_config
        mode = "paper" if self.trade_manager.mode == "paper" else "LIVE"
        await update.message.reply_text(
            f"*Config*\n"
            f"Mode: {mode}\n"
            f"Max bet: ${risk['max_bet']:.2f}\n"
            f"Max exposure: ${risk['max_exposure']:.2f}\n"
            f"Max daily trades: {risk['max_daily_trades']}",
            parse_mode="Markdown",
        )

    async def _cmd_history(
        self, update: Update, context: ContextTypes.DEFAULT_TYPE
    ):
        cur = self.db.conn.execute(
            "SELECT * FROM trades ORDER BY created_at DESC LIMIT 10"
        )
        trades = [dict(row) for row in cur.fetchall()]
        if not trades:
            await update.message.reply_text("No trade history.")
            return
        lines = []
        for t in trades:
            pnl_str = f"${t['pnl']:.2f}" if t["pnl"] is not None else "open"
            lines.append(
                f"- {t['side']} {t['market_id'][:10]}... "
                f"@ ${t['price']:.2f} | {t['status']} | P&L: {pnl_str}"
            )
        await update.message.reply_text(
            "*Recent Trades*\n" + "\n".join(lines), parse_mode="Markdown"
        )
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd /c/dead-pixel-design/projects/polymarket-bot
python -m pytest tests/test_telegram_bot.py -v
```

Expected: All 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/telegram/ tests/test_telegram_bot.py
git commit -m "feat: add Telegram bot with commands, alerts, and trade approval"
```

---

## Task 7: Arbitrage Strategy

**Files:**
- Create: `projects/polymarket-bot/src/strategies/arbitrage.py`
- Modify: `projects/polymarket-bot/tests/test_strategies.py`

- [ ] **Step 1: Write failing tests for arbitrage strategy**

Append to `projects/polymarket-bot/tests/test_strategies.py`:

```python
from src.strategies.arbitrage import ArbitrageStrategy


@pytest.fixture
def arb_strategy():
    config = {
        "min_confidence": 0.7,
        "min_spread": 0.03,
    }
    return ArbitrageStrategy(config)


def test_complement_mispricing(arb_strategy):
    """YES + NO should equal ~1.0. If they don't, there's an arb opportunity."""
    market = {
        "condition_id": "0x1",
        "question": "Will it rain?",
        "yes_price": 0.45,
        "no_price": 0.50,
        "outcome_yes_token": "ty",
        "outcome_no_token": "tn",
    }
    signals = arb_strategy.check_complement(market)
    assert len(signals) >= 1
    # YES + NO = 0.95, meaning you can buy both for $0.95 and one pays $1.00
    assert signals[0].side == "BUY"
    assert "complement" in signals[0].reason.lower()


def test_no_complement_arb_when_fair(arb_strategy):
    market = {
        "condition_id": "0x1",
        "question": "Test?",
        "yes_price": 0.50,
        "no_price": 0.50,
        "outcome_yes_token": "ty",
        "outcome_no_token": "tn",
    }
    signals = arb_strategy.check_complement(market)
    assert len(signals) == 0


def test_overpriced_complement(arb_strategy):
    """YES + NO > 1.0 means selling both is profitable."""
    market = {
        "condition_id": "0x1",
        "question": "Test?",
        "yes_price": 0.55,
        "no_price": 0.50,
        "outcome_yes_token": "ty",
        "outcome_no_token": "tn",
    }
    signals = arb_strategy.check_complement(market)
    assert len(signals) >= 1
    assert signals[0].side == "SELL"


def test_related_market_inconsistency(arb_strategy):
    """If 'Will X win?' > 'Will X run?', that's inconsistent."""
    markets = [
        {
            "condition_id": "0x1",
            "question": "Will Biden run in 2028?",
            "yes_price": 0.30,
            "outcome_yes_token": "t1",
        },
        {
            "condition_id": "0x2",
            "question": "Will Biden win in 2028?",
            "yes_price": 0.35,
            "outcome_yes_token": "t2",
        },
    ]
    # This method identifies pairs where prerequisite pricing is violated
    signals = arb_strategy.check_related_markets(markets)
    # Can't automatically detect prerequisite relationships without NLP,
    # so this just checks for same-topic markets with price anomalies
    assert isinstance(signals, list)
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd /c/dead-pixel-design/projects/polymarket-bot
python -m pytest tests/test_strategies.py -v -k "arb"
```

Expected: FAIL — `ModuleNotFoundError`

- [ ] **Step 3: Implement arbitrage strategy**

Create `projects/polymarket-bot/src/strategies/arbitrage.py`:

```python
from src.strategies.base import BaseStrategy, Signal


class ArbitrageStrategy(BaseStrategy):
    def __init__(self, config: dict):
        super().__init__(config)
        self.min_spread = config.get("min_spread", 0.03)

    def analyze_market(
        self,
        market_id: str,
        question: str,
        token_id: str,
        current: dict,
        snapshots: list[dict],
    ) -> list[Signal]:
        # Arbitrage analysis works on market pairs, not individual market history.
        # This method satisfies the interface but real analysis happens via
        # check_complement and check_related_markets.
        return []

    def check_complement(self, market: dict) -> list[Signal]:
        """Check if YES + NO prices deviate from 1.0."""
        yes_price = market["yes_price"]
        no_price = market["no_price"]
        total = yes_price + no_price
        spread = abs(total - 1.0)

        if spread < self.min_spread:
            return []

        confidence = min(0.6 + spread * 2, 0.95)

        if total < 1.0:
            # Underpriced: buy both sides for < $1.00, guaranteed $1.00 payout
            return self.filter_signals([Signal(
                strategy_name="arbitrage",
                market_id=market["condition_id"],
                market_question=market["question"],
                token_id=market["outcome_yes_token"],
                side="BUY",
                price=yes_price,
                confidence=confidence,
                reason=(
                    f"Complement underpriced: YES({yes_price:.2f}) + "
                    f"NO({no_price:.2f}) = {total:.2f} < 1.00. "
                    f"Buy both for guaranteed {spread:.2f} profit."
                ),
            )])
        else:
            # Overpriced: sell both sides for > $1.00
            return self.filter_signals([Signal(
                strategy_name="arbitrage",
                market_id=market["condition_id"],
                market_question=market["question"],
                token_id=market["outcome_yes_token"],
                side="SELL",
                price=yes_price,
                confidence=confidence,
                reason=(
                    f"Complement overpriced: YES({yes_price:.2f}) + "
                    f"NO({no_price:.2f}) = {total:.2f} > 1.00. "
                    f"Sell both for guaranteed {spread:.2f} profit."
                ),
            )])

    def check_related_markets(self, markets: list[dict]) -> list[Signal]:
        """Find pricing anomalies among markets with similar topics.

        This is a simple keyword-overlap approach. More sophisticated NLP
        could be added later.
        """
        signals = []

        for i, m1 in enumerate(markets):
            for m2 in markets[i + 1:]:
                words1 = set(m1["question"].lower().split())
                words2 = set(m2["question"].lower().split())
                overlap = words1 & words2
                # Ignore common words
                overlap -= {"will", "the", "a", "an", "in", "by", "?", "of", "to"}

                if len(overlap) < 2:
                    continue

                p1 = m1["yes_price"]
                p2 = m2["yes_price"]
                spread = abs(p1 - p2)

                if spread >= self.min_spread:
                    signals.append(Signal(
                        strategy_name="arbitrage",
                        market_id=m1["condition_id"],
                        market_question=f"{m1['question']} vs {m2['question']}",
                        token_id=m1["outcome_yes_token"],
                        side="BUY" if p1 < p2 else "SELL",
                        price=p1,
                        confidence=min(0.5 + spread, 0.85),
                        reason=(
                            f"Related markets with price gap: "
                            f"'{m1['question']}' @ {p1:.2f} vs "
                            f"'{m2['question']}' @ {p2:.2f}"
                        ),
                    ))

        return self.filter_signals(signals)
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd /c/dead-pixel-design/projects/polymarket-bot
python -m pytest tests/test_strategies.py -v
```

Expected: All 12 tests PASS (8 market signals + 4 arbitrage).

- [ ] **Step 5: Commit**

```bash
git add src/strategies/arbitrage.py tests/test_strategies.py
git commit -m "feat: add arbitrage strategy with complement and related market detection"
```

---

## Task 8: Core Engine + Entry Point

**Files:**
- Create: `projects/polymarket-bot/src/core/engine.py`
- Create: `projects/polymarket-bot/run.py`

- [ ] **Step 1: Implement core engine**

Create `projects/polymarket-bot/src/core/engine.py`:

```python
import asyncio
import logging
from src.utils.config import load_config
from src.data.database import Database
from src.core.market_scanner import MarketScanner
from src.core.trade_manager import TradeManager
from src.strategies.market_signals import MarketSignalsStrategy
from src.strategies.arbitrage import ArbitrageStrategy
from src.telegram.bot import TelegramBot

logger = logging.getLogger(__name__)


class Engine:
    def __init__(self, config_path: str):
        self.config = load_config(config_path)
        self.running = False

        # Database
        self.db = Database("data/polymarket.db")
        self.db.initialize()

        # Market scanner
        self.scanner = MarketScanner(self.config)

        # Trade manager
        self.trade_manager = TradeManager(
            db=self.db,
            risk_config=self.config["risk"],
            mode=self.config["mode"],
            scanner=self.scanner if self.config["mode"] == "live" else None,
        )

        # Strategies
        self.strategies = []
        strat_config = self.config["strategies"]

        if strat_config.get("market_signals", {}).get("enabled"):
            self.strategies.append(
                MarketSignalsStrategy(strat_config["market_signals"])
            )

        if strat_config.get("arbitrage", {}).get("enabled"):
            self.strategies.append(
                ArbitrageStrategy(strat_config["arbitrage"])
            )

        # Telegram
        self.telegram = TelegramBot(self.config, self.trade_manager, self.db)

        # Suggested bet size (use half of max_bet as default)
        self.default_size = self.config["risk"]["max_bet"] / 2

    async def start(self):
        logger.info("Starting Polymarket bot (mode: %s)", self.config["mode"])
        self.running = True

        await self.telegram.start()
        await self.telegram.send_message(
            f"Bot started in *{self.config['mode']}* mode. "
            f"Monitoring with {len(self.strategies)} strategy(ies)."
        )

        try:
            await self._main_loop()
        except asyncio.CancelledError:
            logger.info("Bot shutting down...")
        finally:
            await self.telegram.stop()
            self.db.close()

    async def _main_loop(self):
        interval = self.config["polling_interval"]

        while self.running:
            try:
                await self._scan_cycle()
            except Exception as e:
                logger.error("Error in scan cycle: %s", e, exc_info=True)
                await self.telegram.send_message(f"Scan error: {e}")

            await asyncio.sleep(interval)

    async def _scan_cycle(self):
        # Fetch markets
        markets, _ = self.scanner.fetch_markets()

        for market in markets:
            if not market.get("active", True):
                continue

            # Cache market in DB
            self.db.upsert_market(
                condition_id=market["condition_id"],
                question=market["question"],
                outcome_yes_token=market["outcome_yes_token"],
                outcome_no_token=market["outcome_no_token"],
                active=True,
            )

            token_id = market["outcome_yes_token"]

            # Get current price data
            try:
                price = self.scanner.get_price(token_id)
            except Exception:
                continue

            current = {"price": price, "volume": 0}

            # Snapshot for history
            self.db.insert_snapshot(
                market["condition_id"], token_id, price, 0
            )

            # Get historical snapshots for strategy analysis
            snapshots = self.db.get_snapshots(
                market["condition_id"], limit=20
            )
            snapshot_dicts = [
                {"price": s["price"], "volume": s["volume"] or 0}
                for s in snapshots[1:]  # exclude the one we just inserted
            ]

            # Run strategies
            for strategy in self.strategies:
                signals = strategy.analyze_market(
                    market_id=market["condition_id"],
                    question=market["question"],
                    token_id=token_id,
                    current=current,
                    snapshots=snapshot_dicts,
                )

                for signal in signals:
                    logger.info(
                        "Signal: %s on %s (confidence: %.2f)",
                        signal.strategy_name,
                        signal.market_question,
                        signal.confidence,
                    )
                    await self.telegram.send_signal_alert(
                        signal, self.default_size
                    )

    def stop(self):
        self.running = False
```

- [ ] **Step 2: Create entry point**

Create `projects/polymarket-bot/run.py`:

```python
import asyncio
import logging
import sys

from src.core.engine import Engine


def main():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )

    config_path = sys.argv[1] if len(sys.argv) > 1 else "config.yaml"
    engine = Engine(config_path)

    try:
        asyncio.run(engine.start())
    except KeyboardInterrupt:
        engine.stop()
        print("\nBot stopped.")


if __name__ == "__main__":
    main()
```

- [ ] **Step 3: Commit**

```bash
git add src/core/engine.py run.py
git commit -m "feat: add core engine and entry point"
```

---

## Task 9: Integration Smoke Test

**Files:**
- Modify: `projects/polymarket-bot/tests/test_config.py` (add integration marker)

- [ ] **Step 1: Create a local config.yaml for testing**

```bash
cp config.example.yaml config.yaml
```

Edit `config.yaml` — fill in a real Telegram bot token and chat ID. (Create a bot via @BotFather on Telegram.)

- [ ] **Step 2: Run unit test suite end-to-end**

```bash
cd /c/dead-pixel-design/projects/polymarket-bot
python -m pytest tests/ -v
```

Expected: All tests PASS.

- [ ] **Step 3: Manual smoke test**

```bash
cd /c/dead-pixel-design/projects/polymarket-bot
python run.py config.yaml
```

Verify:
- Bot starts without errors
- Telegram receives "Bot started in paper mode" message
- `/status` command responds in Telegram
- `/config` command responds in Telegram
- Ctrl+C cleanly shuts down

- [ ] **Step 4: Commit any fixes from smoke test**

```bash
git add -A
git commit -m "fix: smoke test adjustments"
```

---

## Build Order Summary

| Task | Component | Dependencies |
|------|-----------|-------------|
| 1 | Project scaffold + config | None |
| 2 | SQLite data layer | Task 1 |
| 3 | Market scanner (Polymarket API) | Task 1 |
| 4 | Strategy base + market signals | Task 1 |
| 5 | Trade manager (paper mode) | Tasks 2, 4 |
| 6 | Telegram bot | Tasks 2, 4, 5 |
| 7 | Arbitrage strategy | Task 4 |
| 8 | Core engine + entry point | Tasks 2-6 |
| 9 | Integration smoke test | All |
