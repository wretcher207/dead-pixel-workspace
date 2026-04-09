from py_clob_client.client import ClobClient
from py_clob_client.order_builder.constants import BUY, SELL


class MarketScanner:
    def __init__(self, config: dict):
        pm_config = config["polymarket"]
        wallet = config["wallet"]
        self.client = ClobClient(
            host=pm_config["clob_host"],
            key=wallet["private_key"],
            chain_id=wallet["chain_id"],
        )
        self._creds_set = False

    def _ensure_creds(self):
        if not self._creds_set:
            creds = self.client.create_or_derive_api_creds()
            self.client.set_api_creds(creds)
            self._creds_set = True

    def fetch_markets(self, next_cursor=""):
        response = self.client.get_markets(next_cursor=next_cursor)
        raw_markets = response if isinstance(response, list) else response.get("data", [])
        next_cur = "" if isinstance(response, list) else response.get("next_cursor", "")
        return self.parse_markets(raw_markets), next_cur

    @staticmethod
    def parse_markets(raw_markets):
        parsed = []
        for m in raw_markets:
            tokens = m.get("tokens")
            if not tokens or not isinstance(tokens, list) or len(tokens) < 2:
                continue
            yes_token = no_token = None
            for t in tokens:
                outcome = t.get("outcome", "").lower()
                if outcome == "yes": yes_token = t.get("token_id")
                elif outcome == "no": no_token = t.get("token_id")
            if not yes_token or not no_token:
                continue
            parsed.append({
                "condition_id": m["condition_id"],
                "question": m.get("question", ""),
                "outcome_yes_token": yes_token,
                "outcome_no_token": no_token,
                "active": m.get("active", True),
            })
        return parsed

    def get_price(self, token_id):
        return self.client.get_midpoint(token_id=token_id)

    def get_order_book(self, token_id):
        book = self.client.get_order_book(token_id=token_id)
        return {"bids": book.bids if hasattr(book, "bids") else [], "asks": book.asks if hasattr(book, "asks") else []}

    def get_spread(self, token_id):
        return self.client.get_spread(token_id=token_id)

    def get_last_trade_price(self, token_id):
        return self.client.get_last_trade_price(token_id=token_id)

    def place_order(self, token_id, price, size, side):
        self._ensure_creds()
        order_side = BUY if side == "BUY" else SELL
        order = self.client.create_order(order_args={"token_id": token_id, "price": price, "size": size, "side": order_side})
        return self.client.post_order(order)

    def cancel_order(self, order_id):
        self._ensure_creds()
        return self.client.cancel(order_id=order_id)
