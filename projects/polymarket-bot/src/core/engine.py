import asyncio
import logging
from src.utils.config import load_config
from src.data.database import Database
from src.core.market_scanner import MarketScanner
from src.core.trade_manager import TradeManager
from src.strategies.market_signals import MarketSignalsStrategy
from src.strategies.arbitrage import ArbitrageStrategy
from src.telegram.bot import TelegramBot

logger = logging.getLogger(__name__)


class Engine:
    def __init__(self, config_path: str):
        self.config = load_config(config_path)
        self.running = False

        # Database
        self.db = Database("data/polymarket.db")
        self.db.initialize()

        # Market scanner
        self.scanner = MarketScanner(self.config)

        # Trade manager
        self.trade_manager = TradeManager(
            db=self.db,
            risk_config=self.config["risk"],
            mode=self.config["mode"],
            scanner=self.scanner if self.config["mode"] == "live" else None,
        )

        # Strategies
        self.strategies = []
        strat_config = self.config["strategies"]

        if strat_config.get("market_signals", {}).get("enabled"):
            self.strategies.append(
                MarketSignalsStrategy(strat_config["market_signals"])
            )

        if strat_config.get("arbitrage", {}).get("enabled"):
            self.strategies.append(
                ArbitrageStrategy(strat_config["arbitrage"])
            )

        # Telegram
        self.telegram = TelegramBot(self.config, self.trade_manager, self.db)

        # Suggested bet size (use half of max_bet as default)
        self.default_size = self.config["risk"]["max_bet"] / 2

    async def start(self):
        logger.info("Starting Polymarket bot (mode: %s)", self.config["mode"])
        self.running = True

        await self.telegram.start()
        await self.telegram.send_message(
            f"Bot started in *{self.config['mode']}* mode. "
            f"Monitoring with {len(self.strategies)} strategy(ies)."
        )

        try:
            await self._main_loop()
        except asyncio.CancelledError:
            logger.info("Bot shutting down...")
        finally:
            await self.telegram.stop()
            self.db.close()

    async def _main_loop(self):
        interval = self.config["polling_interval"]

        while self.running:
            try:
                await self._scan_cycle()
            except Exception as e:
                logger.error("Error in scan cycle: %s", e, exc_info=True)
                await self.telegram.send_message(f"Scan error: {e}")

            await asyncio.sleep(interval)

    async def _scan_cycle(self):
        # Fetch markets
        markets, _ = self.scanner.fetch_markets()

        for market in markets:
            if not market.get("active", True):
                continue

            # Cache market in DB
            self.db.upsert_market(
                condition_id=market["condition_id"],
                question=market["question"],
                outcome_yes_token=market["outcome_yes_token"],
                outcome_no_token=market["outcome_no_token"],
                active=True,
            )

            token_id = market["outcome_yes_token"]

            # Get current price data
            try:
                price = self.scanner.get_price(token_id)
            except Exception:
                continue

            current = {"price": price, "volume": 0}

            # Snapshot for history
            self.db.insert_snapshot(
                market["condition_id"], token_id, price, 0
            )

            # Get historical snapshots for strategy analysis
            snapshots = self.db.get_snapshots(
                market["condition_id"], limit=20
            )
            snapshot_dicts = [
                {"price": s["price"], "volume": s["volume"] or 0}
                for s in snapshots[1:]  # exclude the one we just inserted
            ]

            # Run strategies
            for strategy in self.strategies:
                signals = strategy.analyze_market(
                    market_id=market["condition_id"],
                    question=market["question"],
                    token_id=token_id,
                    current=current,
                    snapshots=snapshot_dicts,
                )

                for signal in signals:
                    logger.info(
                        "Signal: %s on %s (confidence: %.2f)",
                        signal.strategy_name,
                        signal.market_question,
                        signal.confidence,
                    )
                    await self.telegram.send_signal_alert(
                        signal, self.default_size
                    )

    def stop(self):
        self.running = False
