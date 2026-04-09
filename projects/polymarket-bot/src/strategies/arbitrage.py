from src.strategies.base import BaseStrategy, Signal


class ArbitrageStrategy(BaseStrategy):
    def __init__(self, config):
        super().__init__(config)
        self.min_spread = config.get("min_spread", 0.03)

    def analyze_market(self, market_id, question, token_id, current, snapshots):
        return []

    def check_complement(self, market):
        yes_price = market["yes_price"]
        no_price = market["no_price"]
        total = yes_price + no_price
        spread = abs(total - 1.0)
        if spread < self.min_spread:
            return []
        confidence = min(0.6 + spread * 2, 0.95)
        if total < 1.0:
            return self.filter_signals([Signal(
                strategy_name="arbitrage", market_id=market["condition_id"],
                market_question=market["question"], token_id=market["outcome_yes_token"],
                side="BUY", price=yes_price, confidence=confidence,
                reason=f"Complement underpriced: YES({yes_price:.2f}) + NO({no_price:.2f}) = {total:.2f} < 1.00. Buy both for guaranteed {spread:.2f} profit.")])
        else:
            return self.filter_signals([Signal(
                strategy_name="arbitrage", market_id=market["condition_id"],
                market_question=market["question"], token_id=market["outcome_yes_token"],
                side="SELL", price=yes_price, confidence=confidence,
                reason=f"Complement overpriced: YES({yes_price:.2f}) + NO({no_price:.2f}) = {total:.2f} > 1.00. Sell both for guaranteed {spread:.2f} profit.")])

    def check_related_markets(self, markets):
        signals = []
        for i, m1 in enumerate(markets):
            for m2 in markets[i + 1:]:
                words1 = set(m1["question"].lower().split())
                words2 = set(m2["question"].lower().split())
                overlap = words1 & words2
                overlap -= {"will", "the", "a", "an", "in", "by", "?", "of", "to"}
                if len(overlap) < 2:
                    continue
                p1 = m1["yes_price"]
                p2 = m2["yes_price"]
                spread = abs(p1 - p2)
                if spread >= self.min_spread:
                    signals.append(Signal(
                        strategy_name="arbitrage", market_id=m1["condition_id"],
                        market_question=f"{m1['question']} vs {m2['question']}",
                        token_id=m1["outcome_yes_token"],
                        side="BUY" if p1 < p2 else "SELL", price=p1,
                        confidence=min(0.5 + spread, 0.85),
                        reason=f"Related markets with price gap: '{m1['question']}' @ {p1:.2f} vs '{m2['question']}' @ {p2:.2f}"))
        return self.filter_signals(signals)
