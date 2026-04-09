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
    db.upsert_market(condition_id="0xabc", question="Will it rain?", outcome_yes_token="tok_yes", outcome_no_token="tok_no", active=True)
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
    trade_id = db.insert_trade(market_id="0xabc", strategy="market_signals", side="BUY", token_id="tok_yes", price=0.35, size=5.0, mode="paper")
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
    assert trade["pnl"] == pytest.approx(2.5)


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
    assert exposure == pytest.approx(6.5)


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
    db.close_trade(t1, 0.6)
    db.close_trade(t2, 0.4)
    stats = db.get_strategy_stats("market_signals")
    assert stats["total_trades"] == 2
    assert stats["wins"] == 1
    assert stats["losses"] == 1
    assert stats["total_pnl"] == pytest.approx(2.0)
