"""Main bot loop — scan, evaluate, trade, log."""

import json
import time
from datetime import datetime, date
from pathlib import Path
from dataclasses import asdict

from .config import (
    DRY_RUN, WALLET_BALANCE, MAX_TRADE_PCT, MAX_CITY_PCT,
    DAILY_LOSS_CAP_PCT, MIN_CONFIDENCE, SCAN_INTERVAL_SECONDS,
)
from .noaa import fetch_all_forecasts, get_forecast_for
from .polymarket import fetch_weather_markets, place_buy_order
from .strategy import find_signals, format_signal
from .models import Signal, Trade

DATA_DIR = Path(__file__).parent.parent / "data"
TRADE_LOG = DATA_DIR / "trade_log.json"

# Confidence ranking for filtering
CONFIDENCE_RANK = {"low": 0, "medium": 1, "high": 2}


class WeatherBot:
    def __init__(self):
        self.wallet_balance = WALLET_BALANCE
        self.dry_run = DRY_RUN
        self.trades: list[dict] = []
        self.daily_pnl = 0.0
        self.city_exposure: dict[str, float] = {}
        self._load_trades()

    def _load_trades(self):
        """Load existing trade log."""
        if TRADE_LOG.exists():
            with open(TRADE_LOG) as f:
                self.trades = json.load(f)

    def _save_trades(self):
        """Persist trade log to disk."""
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        with open(TRADE_LOG, "w") as f:
            json.dump(self.trades, f, indent=2, default=str)

    def scan(self):
        """Run one full scan cycle: fetch data, find signals, execute trades."""
        print(f"\n{'='*60}")
        print(f"SCAN @ {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"Mode: {'DRY RUN' if self.dry_run else 'LIVE'} | Balance: ${self.wallet_balance:.2f}")
        print(f"{'='*60}")

        # Check daily loss cap
        if self._hit_daily_loss_cap():
            print("  DAILY LOSS CAP HIT — skipping this scan")
            return

        # Fetch data
        print("\n[1] Fetching NOAA forecasts...")
        forecasts = fetch_all_forecasts()
        total_forecasts = sum(len(v) for v in forecasts.values())
        print(f"  Got {total_forecasts} forecasts across {len(forecasts)} cities")

        print("\n[2] Fetching Polymarket weather markets...")
        markets = fetch_weather_markets()
        print(f"  Got {len(markets)} active weather markets")

        # Match forecasts to markets and find signals
        print("\n[3] Analyzing for signals...")
        all_signals = []
        for market in markets:
            forecast = get_forecast_for(market.city, market.date)
            if not forecast:
                continue

            signals = find_signals(forecast, market)
            all_signals.extend(signals)

        # Filter by minimum confidence
        min_rank = CONFIDENCE_RANK.get(MIN_CONFIDENCE, 1)
        tradeable = [s for s in all_signals if CONFIDENCE_RANK.get(s.confidence, 0) >= min_rank]

        print(f"  Found {len(all_signals)} total signals, {len(tradeable)} meet confidence threshold")

        if not tradeable:
            print("\n  No actionable signals this scan.")
            return

        # Display and execute
        print("\n[4] Signals:")
        for signal in tradeable:
            print(format_signal(signal))

        print(f"\n[5] {'Logging trades (DRY RUN)' if self.dry_run else 'Executing trades'}...")
        for signal in tradeable:
            self._execute(signal)

        self._save_trades()
        self._print_summary()

    def _execute(self, signal: Signal):
        """Execute a trade (or log it in dry-run mode)."""
        # Position sizing
        max_trade = self.wallet_balance * MAX_TRADE_PCT
        max_city = self.wallet_balance * MAX_CITY_PCT
        city_used = self.city_exposure.get(signal.market.city, 0)
        city_remaining = max_city - city_used

        amount = min(max_trade, city_remaining)
        if amount < 1.0:
            print(f"  SKIP {signal.market.city} — city exposure limit reached")
            return

        price = signal.bucket.market_price
        shares = amount / price if price > 0 else 0

        trade_record = {
            "timestamp": datetime.now().isoformat(),
            "city": signal.market.city,
            "date": signal.market.date,
            "bucket": signal.bucket.label,
            "market_price": price,
            "our_probability": signal.bucket.our_probability,
            "edge": signal.edge,
            "confidence": signal.confidence,
            "amount_usd": round(amount, 2),
            "shares": round(shares, 2),
            "dry_run": self.dry_run,
            "status": "simulated" if self.dry_run else "pending",
            "order_id": "",
        }

        if self.dry_run:
            print(f"  [DRY] Would buy {shares:.1f} shares of '{signal.bucket.label}' @ ${price:.3f} for ${amount:.2f}")
        else:
            try:
                result = place_buy_order(
                    token_id=signal.bucket.token_id,
                    amount_usd=amount,
                    max_price=price,
                )
                trade_record["order_id"] = result.get("order_id", "")
                trade_record["status"] = result.get("status", "unknown")
                print(f"  [LIVE] Bought '{signal.bucket.label}' — order: {result['order_id']}, status: {result['status']}")

                # Update balance and exposure tracking
                self.wallet_balance -= amount
                self.city_exposure[signal.market.city] = city_used + amount
            except Exception as e:
                trade_record["status"] = "failed"
                trade_record["error"] = str(e)
                print(f"  [ERROR] Failed to buy '{signal.bucket.label}': {e}")

        self.trades.append(trade_record)

    def _hit_daily_loss_cap(self) -> bool:
        """Check if today's losses exceed the daily cap."""
        today = date.today().isoformat()
        today_trades = [t for t in self.trades if t["timestamp"][:10] == today and t.get("pnl", 0) < 0]
        daily_loss = sum(t.get("pnl", 0) for t in today_trades)
        cap = WALLET_BALANCE * DAILY_LOSS_CAP_PCT
        return abs(daily_loss) >= cap

    def _print_summary(self):
        """Print end-of-scan summary."""
        today = date.today().isoformat()
        today_trades = [t for t in self.trades if t["timestamp"][:10] == today]
        print(f"\n--- Summary ---")
        print(f"  Trades today: {len(today_trades)}")
        print(f"  Balance: ${self.wallet_balance:.2f}")
        if self.city_exposure:
            print(f"  City exposure: {', '.join(f'{k}: ${v:.2f}' for k, v in self.city_exposure.items())}")

    def run(self):
        """Run the bot continuously on a timer."""
        print(f"Weather Bot starting — {'DRY RUN' if self.dry_run else 'LIVE'} mode")
        print(f"Scan interval: {SCAN_INTERVAL_SECONDS}s ({SCAN_INTERVAL_SECONDS // 60}min)")
        print(f"Press Ctrl+C to stop.\n")

        while True:
            try:
                self.scan()
            except KeyboardInterrupt:
                print("\nBot stopped by user.")
                self._save_trades()
                break
            except Exception as e:
                print(f"\n[ERROR] Scan failed: {e}")

            print(f"\nNext scan in {SCAN_INTERVAL_SECONDS // 60} minutes...")
            time.sleep(SCAN_INTERVAL_SECONDS)


def main():
    bot = WeatherBot()
    bot.run()


if __name__ == "__main__":
    main()
