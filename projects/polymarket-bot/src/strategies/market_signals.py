from src.strategies.base import BaseStrategy, Signal


class MarketSignalsStrategy(BaseStrategy):
    def __init__(self, config):
        super().__init__(config)
        self.price_move_threshold = config.get("price_move_threshold", 0.10)
        self.volume_spike_threshold = config.get("volume_spike_threshold", 3.0)

    def analyze_market(self, market_id, question, token_id, current, snapshots):
        if not snapshots:
            return []
        signals = []
        price_signal = self._check_price_move(market_id, question, token_id, current, snapshots)
        if price_signal:
            signals.append(price_signal)
        volume_signal = self._check_volume_spike(market_id, question, token_id, current, snapshots)
        if volume_signal:
            signals.append(volume_signal)
        return self.filter_signals(signals)

    def _check_price_move(self, market_id, question, token_id, current, snapshots):
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
            strategy_name="market_signals", market_id=market_id, market_question=question,
            token_id=token_id, side=side, price=current_price, confidence=confidence,
            reason=f"Price moved {direction} {move:.0%} from avg {avg_price:.2f} to {current_price:.2f}")

    def _check_volume_spike(self, market_id, question, token_id, current, snapshots):
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
            strategy_name="market_signals", market_id=market_id, market_question=question,
            token_id=token_id, side="BUY", price=current["price"], confidence=confidence,
            reason=f"Volume spike: {spike:.1f}x normal ({current_volume:.0f} vs avg {avg_volume:.0f})")
