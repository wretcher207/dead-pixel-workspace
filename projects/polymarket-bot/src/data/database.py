import sqlite3
from datetime import date, datetime


class Database:
    def __init__(self, db_path: str):
        self.db_path = db_path
        self.conn = sqlite3.connect(db_path)
        self.conn.row_factory = sqlite3.Row

    def initialize(self):
        cur = self.conn.cursor()
        cur.executescript("""
            CREATE TABLE IF NOT EXISTS markets (
                condition_id TEXT PRIMARY KEY,
                question TEXT NOT NULL,
                outcome_yes_token TEXT,
                outcome_no_token TEXT,
                active BOOLEAN DEFAULT 1,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS trades (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                market_id TEXT NOT NULL,
                strategy TEXT NOT NULL,
                side TEXT NOT NULL,
                token_id TEXT NOT NULL,
                price REAL NOT NULL,
                size REAL NOT NULL,
                mode TEXT NOT NULL,
                status TEXT DEFAULT 'open',
                exit_price REAL,
                pnl REAL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                closed_at TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS snapshots (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                condition_id TEXT NOT NULL,
                token_id TEXT NOT NULL,
                price REAL NOT NULL,
                volume REAL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        self.conn.commit()

    def close(self):
        self.conn.close()

    def list_tables(self) -> list[str]:
        cur = self.conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table'"
        )
        return [row["name"] for row in cur.fetchall()]

    def upsert_market(self, condition_id, question, outcome_yes_token, outcome_no_token, active):
        self.conn.execute(
            """INSERT INTO markets (condition_id, question, outcome_yes_token, outcome_no_token, active, updated_at)
               VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
               ON CONFLICT(condition_id) DO UPDATE SET
                 question=excluded.question, outcome_yes_token=excluded.outcome_yes_token,
                 outcome_no_token=excluded.outcome_no_token, active=excluded.active, updated_at=CURRENT_TIMESTAMP""",
            (condition_id, question, outcome_yes_token, outcome_no_token, active))
        self.conn.commit()

    def get_market(self, condition_id):
        cur = self.conn.execute("SELECT * FROM markets WHERE condition_id = ?", (condition_id,))
        row = cur.fetchone()
        if row is None:
            return None
        result = dict(row)
        result["active"] = bool(result["active"])
        return result

    def insert_trade(self, market_id, strategy, side, token_id, price, size, mode):
        cur = self.conn.execute(
            "INSERT INTO trades (market_id, strategy, side, token_id, price, size, mode) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (market_id, strategy, side, token_id, price, size, mode))
        self.conn.commit()
        return cur.lastrowid

    def get_trade(self, trade_id):
        cur = self.conn.execute("SELECT * FROM trades WHERE id = ?", (trade_id,))
        row = cur.fetchone()
        return dict(row) if row else None

    def close_trade(self, trade_id, exit_price):
        trade = self.get_trade(trade_id)
        if not trade: return
        pnl = (exit_price - trade["price"]) * trade["size"]
        self.conn.execute("UPDATE trades SET status='closed', exit_price=?, pnl=?, closed_at=CURRENT_TIMESTAMP WHERE id=?",
            (exit_price, pnl, trade_id))
        self.conn.commit()

    def get_open_trades(self):
        cur = self.conn.execute("SELECT * FROM trades WHERE status='open'")
        return [dict(row) for row in cur.fetchall()]

    def get_total_exposure(self):
        cur = self.conn.execute("SELECT COALESCE(SUM(price * size), 0) as total FROM trades WHERE status='open'")
        return cur.fetchone()["total"]

    def get_daily_trade_count(self):
        today = date.today().isoformat()
        cur = self.conn.execute("SELECT COUNT(*) as cnt FROM trades WHERE date(created_at) = ?", (today,))
        return cur.fetchone()["cnt"]

    def insert_snapshot(self, condition_id, token_id, price, volume):
        self.conn.execute("INSERT INTO snapshots (condition_id, token_id, price, volume) VALUES (?, ?, ?, ?)",
            (condition_id, token_id, price, volume))
        self.conn.commit()

    def get_snapshots(self, condition_id, limit=100):
        cur = self.conn.execute("SELECT * FROM snapshots WHERE condition_id = ? ORDER BY created_at DESC LIMIT ?",
            (condition_id, limit))
        return [dict(row) for row in cur.fetchall()]

    def get_strategy_stats(self, strategy):
        cur = self.conn.execute(
            """SELECT COUNT(*) as total_trades,
                 SUM(CASE WHEN pnl > 0 THEN 1 ELSE 0 END) as wins,
                 SUM(CASE WHEN pnl <= 0 THEN 1 ELSE 0 END) as losses,
                 COALESCE(SUM(pnl), 0) as total_pnl
               FROM trades WHERE strategy = ? AND status = 'closed'""", (strategy,))
        return dict(cur.fetchone())
