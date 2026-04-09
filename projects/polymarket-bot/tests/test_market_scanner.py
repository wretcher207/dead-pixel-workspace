import pytest
from unittest.mock import MagicMock, patch, AsyncMock
from src.core.market_scanner import MarketScanner


@pytest.fixture
def scanner_config():
    return {
        "polymarket": {"clob_host": "https://clob.polymarket.com", "gamma_host": "https://gamma-api.polymarket.com"},
        "wallet": {"private_key": "0xfakekey", "chain_id": 137},
    }


def test_scanner_init(scanner_config):
    with patch("src.core.market_scanner.ClobClient") as mock_clob:
        scanner = MarketScanner(scanner_config)
        assert scanner is not None
        mock_clob.assert_called_once()


def test_parse_markets():
    raw_markets = [
        {"condition_id": "0x123", "question": "Will it rain?", "tokens": [{"token_id": "tok_yes", "outcome": "Yes"}, {"token_id": "tok_no", "outcome": "No"}], "active": True},
        {"condition_id": "0x456", "question": "Will it snow?", "tokens": [{"token_id": "tok_yes2", "outcome": "Yes"}, {"token_id": "tok_no2", "outcome": "No"}], "active": False},
    ]
    parsed = MarketScanner.parse_markets(raw_markets)
    assert len(parsed) == 2
    assert parsed[0]["condition_id"] == "0x123"
    assert parsed[0]["outcome_yes_token"] == "tok_yes"
    assert parsed[0]["outcome_no_token"] == "tok_no"


def test_parse_markets_skips_malformed():
    raw = [
        {"condition_id": "0x1", "question": "Good", "tokens": [{"token_id": "y", "outcome": "Yes"}, {"token_id": "n", "outcome": "No"}], "active": True},
        {"condition_id": "0x2"},
    ]
    parsed = MarketScanner.parse_markets(raw)
    assert len(parsed) == 1


def test_get_price(scanner_config):
    with patch("src.core.market_scanner.ClobClient") as mock_clob_cls:
        mock_client = MagicMock()
        mock_client.get_midpoint.return_value = 0.65
        mock_clob_cls.return_value = mock_client
        scanner = MarketScanner(scanner_config)
        price = scanner.get_price("tok_123")
        assert price == 0.65
        mock_client.get_midpoint.assert_called_once_with(token_id="tok_123")


def test_get_order_book(scanner_config):
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
