from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass
class Signal:
    strategy_name: str
    market_id: str
    market_question: str
    token_id: str
    side: str
    price: float
    confidence: float
    reason: str


class BaseStrategy(ABC):
    def __init__(self, config: dict):
        self.config = config
        self.min_confidence = config.get("min_confidence", 0.6)

    @abstractmethod
    def analyze_market(self, market_id, question, token_id, current, snapshots) -> list[Signal]:
        pass

    def filter_signals(self, signals):
        return [s for s in signals if s.confidence >= self.min_confidence]
