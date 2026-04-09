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
