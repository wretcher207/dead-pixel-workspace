import pytest
from src.strategies.base import Signal
from src.strategies.market_signals import MarketSignalsStrategy


@pytest.fixture
def strategy():
    return MarketSignalsStrategy({"min_confidence": 0.6, "price_move_threshold": 0.10, "volume_spike_threshold": 3.0, "lookback_minutes": 60})


def test_signal_dataclass():
    signal = Signal(strategy_name="test", market_id="0x1", market_question="Will it rain?", token_id="tok_yes", side="BUY", price=0.35, confidence=0.78, reason="Price moved 15%")
    assert signal.strategy_name == "test"
    assert signal.confidence == 0.78


def test_price_move_signal(strategy):
    snapshots = [{"price": 0.20, "volume": 100}] * 3
    current = {"price": 0.35, "volume": 100}
    signals = strategy.analyze_market("0x1", "Will it rain?", "tok_yes", current, snapshots)
    assert len(signals) >= 1
    assert signals[0].confidence >= 0.6
    assert "price" in signals[0].reason.lower()


def test_no_signal_small_move(strategy):
    snapshots = [{"price": 0.30, "volume": 100}, {"price": 0.31, "volume": 100}]
    current = {"price": 0.32, "volume": 100}
    signals = strategy.analyze_market("0x1", "Test?", "tok", current, snapshots)
    assert len(signals) == 0


def test_volume_spike_signal(strategy):
    snapshots = [{"price": 0.30, "volume": 100}, {"price": 0.30, "volume": 110}, {"price": 0.30, "volume": 90}]
    current = {"price": 0.31, "volume": 400}
    signals = strategy.analyze_market("0x1", "Volume test?", "tok", current, snapshots)
    assert len(signals) >= 1
    assert any("volume" in s.reason.lower() for s in signals)


def test_no_signal_normal_volume(strategy):
    snapshots = [{"price": 0.30, "volume": 100}, {"price": 0.30, "volume": 110}]
    current = {"price": 0.30, "volume": 120}
    signals = strategy.analyze_market("0x1", "Test?", "tok", current, snapshots)
    volume_signals = [s for s in signals if "volume" in s.reason.lower()]
    assert len(volume_signals) == 0


def test_confidence_scales_with_move_size(strategy):
    snapshots = [{"price": 0.20, "volume": 100}] * 5
    small_move = {"price": 0.32, "volume": 100}
    big_move = {"price": 0.50, "volume": 100}
    signals_small = strategy.analyze_market("0x1", "Q?", "t", small_move, snapshots)
    signals_big = strategy.analyze_market("0x1", "Q?", "t", big_move, snapshots)
    assert len(signals_small) >= 1
    assert len(signals_big) >= 1
    assert signals_big[0].confidence >= signals_small[0].confidence


def test_analyze_returns_empty_on_no_snapshots(strategy):
    current = {"price": 0.5, "volume": 100}
    signals = strategy.analyze_market("0x1", "Q?", "t", current, [])
    assert signals == []
