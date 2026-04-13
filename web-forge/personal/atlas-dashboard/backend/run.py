"""
ATLAS Backend — Main entry point.
Runs a full maintenance scan cycle via the Supervisor agent.

Usage:
    python run.py              # Live mode (executes safe auto-actions)
    python run.py --dry-run   # Dry run (scan only, no actions taken)
    python run.py --quick     # Quick scan (daily)
    python run.py --full      # Full scan (weekly)
"""
import sys
import logging
import argparse
from pathlib import Path

# Ensure backend root is in path
sys.path.insert(0, str(Path(__file__).parent))

from agents.supervisor import SupervisorAgent


def setup_logging(verbose: bool = False):
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(
        level=level,
        format='%(asctime)s %(levelname)s %(name)s: %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S',
        handlers=[
            logging.StreamHandler(sys.stdout),
            logging.FileHandler(
                Path(__file__).parent / 'logs' / 'agent-activity.log',
                mode='a', encoding='utf-8'
            ),
        ]
    )


def main():
    parser = argparse.ArgumentParser(description='ATLAS System Maintenance Backend')
    parser.add_argument('--dry-run', action='store_true',
                        help='Scan only — no files deleted, no actions taken')
    parser.add_argument('--quick', action='store_true',
                        help='Quick daily scan (default)')
    parser.add_argument('--full', action='store_true',
                        help='Full weekly scan')
    parser.add_argument('--verbose', '-v', action='store_true',
                        help='Verbose logging')
    args = parser.parse_args()

    # Ensure logs directory exists
    (Path(__file__).parent / 'logs').mkdir(parents=True, exist_ok=True)
    setup_logging(args.verbose)

    logger = logging.getLogger('atlas.run')

    dry_run = args.dry_run
    mode = 'DRY RUN' if dry_run else 'LIVE'
    scan_type = 'full' if args.full else 'daily'

    logger.info("=" * 60)
    logger.info("ATLAS Maintenance System — %s mode (%s scan)", mode, scan_type)
    logger.info("=" * 60)

    supervisor = SupervisorAgent(dry_run=dry_run)
    result = supervisor.scan()

    score = result.get('systemHealth', {}).get('score', 0)
    logger.info("=" * 60)
    logger.info("Scan complete. System health: %d/100", score)

    if score < 40:
        logger.warning("CRITICAL: System health is below 40. Immediate attention required.")
    elif score < 70:
        logger.info("ATTENTION: System health needs some work.")
    else:
        logger.info("System is in good shape.")

    logger.info("Dashboard data written to: backend/data/")
    logger.info("=" * 60)

    return 0


if __name__ == '__main__':
    sys.exit(main())
