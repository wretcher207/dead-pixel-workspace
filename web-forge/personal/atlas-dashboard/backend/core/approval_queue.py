"""
CRUD operations for the approval queue.
Matches the ApprovalItem TypeScript interface exactly.

Every item the system wants to act on (but needs David's OK) goes here.
David can approve, reject, or defer items from the dashboard.
"""
import json
import uuid
import logging
from datetime import datetime, timezone
from pathlib import Path

logger = logging.getLogger(__name__)

QUEUE_PATH = Path(__file__).parent.parent / 'queue' / 'approval-queue.json'
STALE_DAYS = 14  # Items older than this get marked stale (but NOT auto-rejected)


def _ensure_queue_file():
    QUEUE_PATH.parent.mkdir(parents=True, exist_ok=True)
    if not QUEUE_PATH.exists():
        with open(QUEUE_PATH, 'w', encoding='utf-8') as f:
            json.dump([], f)


def load() -> list[dict]:
    """Load all items from the approval queue."""
    _ensure_queue_file()
    try:
        with open(QUEUE_PATH, 'r', encoding='utf-8') as f:
            items = json.load(f)
        # Update ageDays on every load
        now = datetime.now(timezone.utc)
        for item in items:
            if 'createdAt' in item:
                try:
                    created = datetime.fromisoformat(item['createdAt'])
                    item['ageDays'] = (now - created).days
                except Exception:
                    pass
        return items
    except Exception as e:
        logger.error("Failed to load approval queue: %s", e)
        return []


def save(items: list[dict]) -> None:
    """Save the full queue back to disk."""
    _ensure_queue_file()
    try:
        with open(QUEUE_PATH, 'w', encoding='utf-8') as f:
            json.dump(items, f, indent=2)
    except Exception as e:
        logger.error("Failed to save approval queue: %s", e)


def add_item(
    agent: str,
    action: str,
    target: str,
    risk: str,        # 'low' | 'medium' | 'high'
    benefit: str,
    approval_level: str,  # 'no_approval' | 'approval_recommended' | 'explicit_approval'
    description: str,
    reversible: bool,
    category: str,
) -> dict:
    """
    Add a new item to the approval queue.
    Returns the created ApprovalItem dict.
    Skips adding if an identical pending item already exists for the same target+action.
    """
    items = load()

    # Dedup: don't add if same agent+action+target is already pending
    for existing in items:
        if (existing.get('agent') == agent
                and existing.get('action') == action
                and existing.get('target') == target
                and existing.get('status') == 'pending'):
            logger.debug("Skipping duplicate approval queue item: %s %s %s", agent, action, target)
            return existing

    now = datetime.now(timezone.utc).isoformat()
    item = {
        'id': str(uuid.uuid4()),
        'agent': agent,
        'action': action,
        'target': target,
        'risk': risk,
        'benefit': benefit,
        'ageDays': 0,
        'approvalLevel': approval_level,
        'status': 'pending',
        'description': description,
        'reversible': reversible,
        'category': category,
        'createdAt': now,  # Internal field for age calculation
    }
    items.append(item)
    save(items)
    logger.info("Added approval queue item: [%s] %s → %s", agent, action, target[:60])
    return item


def approve(item_id: str) -> dict | None:
    """Mark an item as approved. Returns the item, or None if not found."""
    items = load()
    for item in items:
        if item['id'] == item_id:
            item['status'] = 'approved'
            save(items)
            return item
    return None


def reject(item_id: str) -> dict | None:
    """Mark an item as rejected."""
    items = load()
    for item in items:
        if item['id'] == item_id:
            item['status'] = 'rejected'
            save(items)
            return item
    return None


def defer(item_id: str) -> dict | None:
    """Mark an item as deferred."""
    items = load()
    for item in items:
        if item['id'] == item_id:
            item['status'] = 'deferred'
            save(items)
            return item
    return None


def complete(item_id: str) -> dict | None:
    """Mark an approved item as completed after execution."""
    items = load()
    for item in items:
        if item['id'] == item_id:
            item['status'] = 'completed'
            save(items)
            return item
    return None


def get_pending() -> list[dict]:
    """Return all pending items, sorted by risk (high first) then age."""
    risk_order = {'high': 0, 'medium': 1, 'low': 2}
    pending = [i for i in load() if i['status'] == 'pending']
    return sorted(pending, key=lambda x: (risk_order.get(x.get('risk', 'low'), 2), -x.get('ageDays', 0)))


def get_by_id(item_id: str) -> dict | None:
    """Look up a single item by ID."""
    for item in load():
        if item['id'] == item_id:
            return item
    return None
