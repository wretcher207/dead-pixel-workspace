from src.data.database import Database
from src.strategies.base import Signal


class RiskLimitError(Exception):
    pass


class TradeManager:
    def __init__(self, db: Database, risk_config: dict, mode: str, scanner):
        self.db = db
        self.risk_config = risk_config
        self.mode = mode
        self.scanner = scanner

    def check_risk(self, signal: Signal, size: float) -> tuple[bool, str]:
        if size > self.risk_config["max_bet"]:
            return False, f"Size {size} exceeds max_bet {self.risk_config['max_bet']}"
        cost = signal.price * size
        current_exposure = self.db.get_total_exposure()
        if current_exposure + cost > self.risk_config["max_exposure"]:
            return False, f"Exposure would be {current_exposure + cost:.2f}, exceeds max_exposure {self.risk_config['max_exposure']}"
        daily_count = self.db.get_daily_trade_count()
        if daily_count >= self.risk_config["max_daily_trades"]:
            return False, f"Already placed {daily_count} trades today, max daily trades is {self.risk_config['max_daily_trades']}"
        return True, ""

    def execute_trade(self, signal: Signal, size: float) -> dict:
        ok, reason = self.check_risk(signal, size)
        if not ok:
            raise RiskLimitError(reason)
        if self.mode == "live" and self.scanner:
            self.scanner.place_order(token_id=signal.token_id, price=signal.price, size=size, side=signal.side)
        trade_id = self.db.insert_trade(
            market_id=signal.market_id, strategy=signal.strategy_name, side=signal.side,
            token_id=signal.token_id, price=signal.price, size=size, mode=self.mode)
        return {"trade_id": trade_id, "mode": self.mode, "status": "open",
                "market": signal.market_question, "side": signal.side, "price": signal.price, "size": size}

    def get_open_positions(self):
        return self.db.get_open_trades()

    def get_pnl_summary(self):
        open_trades = self.db.get_open_trades()
        all_trades = self.db.conn.execute("SELECT * FROM trades WHERE status='closed'").fetchall()
        total_pnl = sum(dict(t)["pnl"] or 0 for t in all_trades)
        wins = sum(1 for t in all_trades if dict(t)["pnl"] and dict(t)["pnl"] > 0)
        losses = sum(1 for t in all_trades if dict(t)["pnl"] and dict(t)["pnl"] <= 0)
        return {"open_positions": len(open_trades), "closed_trades": len(all_trades),
                "wins": wins, "losses": losses, "total_pnl": total_pnl, "current_exposure": self.db.get_total_exposure()}
