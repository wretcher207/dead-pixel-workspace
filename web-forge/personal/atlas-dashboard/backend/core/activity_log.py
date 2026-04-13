"""
Append-only activity log. Every action the system takes gets recorded here.
Matches the ActivityEntry TypeScript interface.
"""
import json
import uuid
import logging
from datetime import datetime, timezone
from pathlib import Path

logger = logging.getLogger(__name__)

LOG_PATH = Path(__file__).parent.parent / 'logs' / 'agent-activity.log'
MAX_MEMORY_ENTRIES = 500  # Keep last N entries in memory for API responses

# In-memory log for fast API access (populated from file on first read)
_entries: list[dict] = []
_loaded = False


def _ensure_log_dir():
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)


def _load_from_file():
    global _entries, _loaded
    if _loaded:
        return
    _loaded = True
    _ensure_log_dir()
    if not LOG_PATH.exists():
        return
    try:
        with open(LOG_PATH, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line:
                    try:
                        _entries.append(json.loads(line))
                    except json.JSONDecodeError:
                        pass
        # Keep only the last MAX_MEMORY_ENTRIES in memory
        if len(_entries) > MAX_MEMORY_ENTRIES:
            _entries = _entries[-MAX_MEMORY_ENTRIES:]
    except Exception as e:
        logger.error("Failed to load activity log: %s", e)


def log_action(
    agent: str,
    action: str,
    target: str,
    result: str,  # 'success' | 'failed' | 'pending_approval'
    details: str | None = None
) -> dict:
    """
    Record an action to the activity log. Returns the ActivityEntry dict.
    result must be one of: 'success', 'failed', 'pending_approval'
    """
    _load_from_file()
    _ensure_log_dir()

    entry = {
        'id': str(uuid.uuid4()),
        'timestamp': datetime.now(timezone.utc).isoformat(),
        'agent': agent,
        'action': action,
        'target': target,
        'result': result,
    }
    if details:
        entry['details'] = details

    _entries.append(entry)
    if len(_entries) > MAX_MEMORY_ENTRIES:
        _entries.pop(0)

    try:
        with open(LOG_PATH, 'a', encoding='utf-8') as f:
            f.write(json.dumps(entry) + '\n')
    except Exception as e:
        logger.error("Failed to write activity log entry: %s", e)

    return entry


def get_recent(limit: int = 50) -> list[dict]:
    """Return the most recent N activity log entries, newest first."""
    _load_from_file()
    return list(reversed(_entries[-limit:]))
