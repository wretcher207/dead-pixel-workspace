"""
Wraps agent payloads in the ReportEnvelope TypeScript interface.
Every agent report gets a UUID, ISO timestamp, run type, source, and version.
"""
import uuid
import json
from datetime import datetime, timezone
from pathlib import Path


DATA_DIR = Path(__file__).parent.parent / 'data'
REPORTS_DIR = Path(__file__).parent.parent / 'reports'


def build_envelope(payload: dict, source: str, run_type: str = 'on-demand') -> dict:
    """
    Wrap a payload dict in a ReportEnvelope.
    Matches the ReportEnvelope<T> TypeScript interface exactly.
    """
    return {
        'reportId': str(uuid.uuid4()),
        'timestamp': datetime.now(timezone.utc).isoformat(),
        'runType': run_type,
        'source': source,
        'version': '1.0',
        'payload': payload,
    }


def save_report(envelope: dict, filename: str, run_type: str = 'on-demand') -> None:
    """
    Save a report envelope to data/ (for current state) and
    reports/daily|weekly|monthly/ (for history).
    """
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    # Always write to data/ as the current state
    data_path = DATA_DIR / filename
    with open(data_path, 'w', encoding='utf-8') as f:
        json.dump(envelope, f, indent=2)

    # Also archive to reports/
    if run_type in ('daily', 'weekly', 'monthly'):
        archive_dir = REPORTS_DIR / run_type
        archive_dir.mkdir(parents=True, exist_ok=True)
        ts = datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S')
        archive_path = archive_dir / f"{ts}-{filename}"
        with open(archive_path, 'w', encoding='utf-8') as f:
            json.dump(envelope, f, indent=2)


def load_report(filename: str) -> dict | None:
    """Load a saved report from data/. Returns None if not found."""
    path = DATA_DIR / filename
    if not path.exists():
        return None
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return None
