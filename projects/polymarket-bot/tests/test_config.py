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
