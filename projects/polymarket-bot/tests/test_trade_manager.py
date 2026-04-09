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
    return {"max_bet": 5.0, "max_exposure": 50.0, "max_daily_trades": 20, "max_per_market": 10.0}


@pytest.fixture
def manager(db, risk_config):
    return TradeManager(db=db, risk_config=risk_config, mode="paper", scanner=None)


@pytest.fixture
def sample_signal():
    return Signal(strategy_name="market_signals", market_id="0x123", market_question="Will it rain?",
                  token_id="tok_yes", side="BUY", price=0.35, confidence=0.78, reason="Price moved up 15%")


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
    for i in range(9):
        sig = Signal("s", f"0x{i}", "Q", f"t{i}", "BUY", 0.50, 0.8, "r")
        manager.execute_trade(sig, size=5.0)
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
    db.close_trade(result["trade_id"], exit_price=0.50)
    summary = manager.get_pnl_summary()
    assert summary["total_pnl"] != 0
    assert summary["open_positions"] == 0
    assert summary["closed_trades"] == 1
