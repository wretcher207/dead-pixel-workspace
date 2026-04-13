"""
ATLAS Backend — Flask API Server
Serves agent data to the React dashboard at localhost:5173.

Run with: python server.py
API available at: http://localhost:5000/api/
"""
import sys
import logging
import threading
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from flask import Flask, jsonify, request, abort
from flask_cors import CORS

from core import approval_queue, activity_log, settings_store, report_builder
from agents.supervisor import SupervisorAgent

# ── App setup ──────────────────────────────────────────────────────────────
app = Flask(__name__)

# Allow requests from Vite dev server and preview server
CORS(app, origins=[
    'http://localhost:5173',
    'http://localhost:4173',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:4173',
])

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(name)s: %(message)s',
    datefmt='%H:%M:%S',
)
logger = logging.getLogger('atlas.server')

DATA_DIR = Path(__file__).parent / 'data'

# Lock to prevent concurrent scans
_scan_lock = threading.Lock()
_scan_running = False


# ── Helper ─────────────────────────────────────────────────────────────────
def load_json(filename: str):
    """Load a JSON file from data/ or return None."""
    return report_builder.load_report(filename)


def json_response(data, status_code: int = 200):
    """Return a JSON response."""
    if data is None:
        return jsonify({'error': 'Data not available. Run a scan first.'}), 503
    return jsonify(data), status_code


# ── Dashboard ───────────────────────────────────────────────────────────────
@app.route('/api/dashboard')
def get_dashboard():
    """Returns the current DashboardState."""
    data = load_json('dashboard-state.json')
    # dashboard-state.json is NOT wrapped in a ReportEnvelope, just raw DashboardState
    if data is None:
        # Try loading directly (it's saved as raw DashboardState, not wrapped)
        path = DATA_DIR / 'dashboard-state.json'
        if path.exists():
            import json
            with open(path, 'r', encoding='utf-8') as f:
                data = json.load(f)
    return json_response(data)


# ── Agent reports ───────────────────────────────────────────────────────────
VALID_AGENTS = {'janitor', 'mechanic', 'gatekeeper', 'archivist', 'scout'}

@app.route('/api/agents/<agent_name>')
def get_agent_report(agent_name: str):
    """Returns the full ReportEnvelope for a specific agent."""
    if agent_name not in VALID_AGENTS:
        abort(404, description=f"Unknown agent: {agent_name}")
    data = load_json(f'{agent_name}-report.json')
    return json_response(data)


# ── Supervisor ──────────────────────────────────────────────────────────────
@app.route('/api/supervisor')
def get_supervisor():
    """Returns the SupervisorPayload report envelope."""
    data = load_json('supervisor-report.json')
    return json_response(data)


# ── Approval queue ──────────────────────────────────────────────────────────
@app.route('/api/approval-queue')
def get_approval_queue():
    """Returns all items in the approval queue."""
    items = approval_queue.load()
    return jsonify(items)


@app.route('/api/approval-queue/<item_id>/approve', methods=['POST'])
def approve_item(item_id: str):
    """Approve an item and execute its action."""
    item = approval_queue.get_by_id(item_id)
    if not item:
        abort(404, description=f"Item {item_id} not found")

    # Mark as approved
    approved = approval_queue.approve(item_id)

    # Log the approval
    activity_log.log_action(
        agent=item.get('agent', 'Unknown'),
        action=f"Approved: {item.get('action', 'action')}",
        target=item.get('target', ''),
        result='success',
        details=f"User approved item from dashboard. Category: {item.get('category', '')}",
    )

    # For now, approved items are marked and execution is handled by the next scan.
    # Auto-executable items (no_approval tier) would have been executed during the scan.
    approval_queue.complete(item_id)

    return jsonify({'success': True, 'item': approved})


@app.route('/api/approval-queue/<item_id>/reject', methods=['POST'])
def reject_item(item_id: str):
    """Reject an approval queue item."""
    item = approval_queue.get_by_id(item_id)
    if not item:
        abort(404, description=f"Item {item_id} not found")

    rejected = approval_queue.reject(item_id)
    activity_log.log_action(
        agent=item.get('agent', 'Unknown'),
        action=f"Rejected: {item.get('action', 'action')}",
        target=item.get('target', ''),
        result='success',
        details=f"User rejected item from dashboard.",
    )

    return jsonify({'success': True, 'item': rejected})


@app.route('/api/approval-queue/<item_id>/defer', methods=['POST'])
def defer_item(item_id: str):
    """Defer an approval queue item."""
    item = approval_queue.get_by_id(item_id)
    if not item:
        abort(404, description=f"Item {item_id} not found")

    deferred = approval_queue.defer(item_id)
    activity_log.log_action(
        agent=item.get('agent', 'Unknown'),
        action=f"Deferred: {item.get('action', 'action')}",
        target=item.get('target', ''),
        result='success',
        details=f"User deferred item from dashboard.",
    )

    return jsonify({'success': True, 'item': deferred})


# ── Activity log ─────────────────────────────────────────────────────────────
@app.route('/api/activity-log')
def get_activity_log():
    """Returns recent activity log entries."""
    limit = request.args.get('limit', 50, type=int)
    entries = activity_log.get_recent(limit=limit)
    return jsonify(entries)


# ── Scans ─────────────────────────────────────────────────────────────────────
def _run_scan_async(dry_run: bool = True):
    """Run a scan in a background thread."""
    global _scan_running
    try:
        supervisor = SupervisorAgent(dry_run=dry_run)
        supervisor.scan()
    except Exception as e:
        logger.error("Background scan failed: %s", e)
    finally:
        _scan_running = False


@app.route('/api/scan/quick', methods=['POST'])
def trigger_quick_scan():
    """Trigger a quick daily scan (dry_run=True for safety)."""
    global _scan_running
    if _scan_running:
        return jsonify({'error': 'A scan is already running'}), 409

    _scan_running = True
    thread = threading.Thread(target=_run_scan_async, kwargs={'dry_run': True}, daemon=True)
    thread.start()

    return jsonify({'success': True, 'message': 'Quick scan started. Refresh dashboard in 2–3 minutes.'})


@app.route('/api/scan/full', methods=['POST'])
def trigger_full_scan():
    """Trigger a full scan with auto-execute enabled (dry_run=False)."""
    global _scan_running
    if _scan_running:
        return jsonify({'error': 'A scan is already running'}), 409

    _scan_running = True
    thread = threading.Thread(target=_run_scan_async, kwargs={'dry_run': False}, daemon=True)
    thread.start()

    return jsonify({'success': True, 'message': 'Full scan started with auto-cleanup enabled. Refresh dashboard in 2–3 minutes.'})


@app.route('/api/scan/status')
def scan_status():
    """Check if a scan is currently running."""
    return jsonify({'running': _scan_running})


# ── Settings ──────────────────────────────────────────────────────────────────
@app.route('/api/settings')
def get_settings():
    """Returns current settings."""
    return jsonify(settings_store.load())


@app.route('/api/settings', methods=['POST'])
def update_settings():
    """Update settings. Accepts a partial settings object."""
    updates = request.get_json(silent=True)
    if not updates:
        abort(400, description="Request body must be JSON")

    new_settings = settings_store.update(updates)
    return jsonify(new_settings)


# ── Health check ──────────────────────────────────────────────────────────────
@app.route('/api/health')
def health_check():
    """Simple health check endpoint."""
    return jsonify({'status': 'ok', 'service': 'ATLAS Backend'})


# ── Error handlers ────────────────────────────────────────────────────────────
@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': str(e)}), 404


@app.errorhandler(400)
def bad_request(e):
    return jsonify({'error': str(e)}), 400


@app.errorhandler(500)
def server_error(e):
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    logger.info("ATLAS Backend starting on http://localhost:5000")
    logger.info("Dashboard should connect from http://localhost:5173")
    logger.info("Run 'python run.py --dry-run' first to generate scan data.")
    app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)
