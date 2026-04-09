import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from src.telegram.bot import TelegramBot
from src.strategies.base import Signal


def test_format_signal_message():
    signal = Signal(strategy_name="market_signals", market_id="0x1", market_question="Will it rain?",
                    token_id="tok_yes", side="BUY", price=0.35, confidence=0.78, reason="Price moved up 15%")
    message = TelegramBot.format_signal_message(signal, suggested_size=5.0)
    assert "Will it rain?" in message
    assert "0.35" in message
    assert "0.78" in message
    assert "market_signals" in message


def test_format_status_message():
    summary = {"open_positions": 1, "closed_trades": 3, "wins": 2, "losses": 1,
               "total_pnl": 4.50, "current_exposure": 1.75}
    message = TelegramBot.format_status_message(summary)
    assert "4.50" in message
    assert "1" in message


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
    assert len(keyboard) == 1
    assert len(keyboard[0]) == 2
    assert keyboard[0][0]["text"] == "Approve"
    assert keyboard[0][1]["text"] == "Reject"
    assert "approve_sig_001" in keyboard[0][0]["callback_data"]
    assert "reject_sig_001" in keyboard[0][1]["callback_data"]
