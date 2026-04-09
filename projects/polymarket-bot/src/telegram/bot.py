import asyncio
import uuid
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CallbackQueryHandler, CommandHandler, ContextTypes
from src.strategies.base import Signal


class TelegramBot:
    def __init__(self, config, trade_manager, db):
        self.config = config
        self.trade_manager = trade_manager
        self.db = db
        self.chat_id = config["telegram"]["chat_id"]
        self.pending_signals = {}

        self.app = Application.builder().token(config["telegram"]["bot_token"]).build()
        self.app.add_handler(CommandHandler("status", self._cmd_status))
        self.app.add_handler(CommandHandler("markets", self._cmd_markets))
        self.app.add_handler(CommandHandler("strategies", self._cmd_strategies))
        self.app.add_handler(CommandHandler("config", self._cmd_config))
        self.app.add_handler(CommandHandler("history", self._cmd_history))
        self.app.add_handler(CallbackQueryHandler(self._handle_callback))

    async def start(self):
        await self.app.initialize()
        await self.app.start()
        await self.app.updater.start_polling()

    async def stop(self):
        await self.app.updater.stop()
        await self.app.stop()
        await self.app.shutdown()

    async def send_signal_alert(self, signal, suggested_size):
        signal_id = uuid.uuid4().hex[:12]
        self.pending_signals[signal_id] = (signal, suggested_size)
        message = self.format_signal_message(signal, suggested_size)
        keyboard_data = self.build_approval_keyboard(signal_id)
        keyboard = InlineKeyboardMarkup(
            [[InlineKeyboardButton(b["text"], callback_data=b["callback_data"]) for b in row] for row in keyboard_data])
        await self.app.bot.send_message(chat_id=self.chat_id, text=message, reply_markup=keyboard, parse_mode="Markdown")

    async def send_message(self, text):
        await self.app.bot.send_message(chat_id=self.chat_id, text=text, parse_mode="Markdown")

    @staticmethod
    def format_signal_message(signal, suggested_size):
        return (f"*Signal: {signal.strategy_name}*\n"
                f"Market: {signal.market_question}\n"
                f"Side: {signal.side} @ ${signal.price:.2f}\n"
                f"Confidence: {signal.confidence:.2f}\n"
                f"Reason: {signal.reason}\n"
                f"Suggested size: ${suggested_size:.2f}")

    @staticmethod
    def format_status_message(summary):
        return (f"*Portfolio Status*\n"
                f"Open positions: {summary['open_positions']}\n"
                f"Closed trades: {summary['closed_trades']}\n"
                f"Wins: {summary['wins']} | Losses: {summary['losses']}\n"
                f"Total P&L: ${summary['total_pnl']:.2f}\n"
                f"Current exposure: ${summary['current_exposure']:.2f}")

    @staticmethod
    def parse_callback_data(data):
        action, signal_id = data.split("_", 1)
        return action, signal_id

    @staticmethod
    def build_approval_keyboard(signal_id):
        return [[
            {"text": "Approve", "callback_data": f"approve_{signal_id}"},
            {"text": "Reject", "callback_data": f"reject_{signal_id}"},
        ]]

    async def _handle_callback(self, update, context):
        query = update.callback_query
        await query.answer()
        action, signal_id = self.parse_callback_data(query.data)
        if signal_id not in self.pending_signals:
            await query.edit_message_text("Signal expired or already handled.")
            return
        signal, size = self.pending_signals.pop(signal_id)
        if action == "approve":
            try:
                result = self.trade_manager.execute_trade(signal, size)
                await query.edit_message_text(
                    f"Trade executed ({result['mode']})\n{signal.side} {signal.market_question} @ ${signal.price:.2f}\n"
                    f"Size: ${size:.2f} | Trade ID: {result['trade_id']}")
            except Exception as e:
                await query.edit_message_text(f"Trade failed: {e}")
        else:
            await query.edit_message_text(f"Rejected: {signal.market_question}")

    async def _cmd_status(self, update, context):
        summary = self.trade_manager.get_pnl_summary()
        await update.message.reply_text(self.format_status_message(summary), parse_mode="Markdown")

    async def _cmd_markets(self, update, context):
        positions = self.trade_manager.get_open_positions()
        if not positions:
            await update.message.reply_text("No open positions.")
            return
        lines = [f"- {p['market_id']}: {p['side']} @ ${p['price']:.2f}" for p in positions]
        await update.message.reply_text("*Watched Markets*\n" + "\n".join(lines), parse_mode="Markdown")

    async def _cmd_strategies(self, update, context):
        for name in ["market_signals", "arbitrage"]:
            stats = self.db.get_strategy_stats(name)
            await update.message.reply_text(
                f"*{name}*\nTrades: {stats['total_trades']} | Wins: {stats['wins']} | Losses: {stats['losses']}\n"
                f"P&L: ${stats['total_pnl']:.2f}", parse_mode="Markdown")

    async def _cmd_config(self, update, context):
        risk = self.trade_manager.risk_config
        mode = "paper" if self.trade_manager.mode == "paper" else "LIVE"
        await update.message.reply_text(
            f"*Config*\nMode: {mode}\nMax bet: ${risk['max_bet']:.2f}\nMax exposure: ${risk['max_exposure']:.2f}\n"
            f"Max daily trades: {risk['max_daily_trades']}", parse_mode="Markdown")

    async def _cmd_history(self, update, context):
        cur = self.db.conn.execute("SELECT * FROM trades ORDER BY created_at DESC LIMIT 10")
        trades = [dict(row) for row in cur.fetchall()]
        if not trades:
            await update.message.reply_text("No trade history.")
            return
        lines = []
        for t in trades:
            pnl_str = f"${t['pnl']:.2f}" if t["pnl"] is not None else "open"
            lines.append(f"- {t['side']} {t['market_id'][:10]}... @ ${t['price']:.2f} | {t['status']} | P&L: {pnl_str}")
        await update.message.reply_text("*Recent Trades*\n" + "\n".join(lines), parse_mode="Markdown")
