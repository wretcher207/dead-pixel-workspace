"""
Base class for all ATLAS agents.
Every agent (Gatekeeper, Mechanic, Janitor, etc.) inherits from this.

The key safety feature: dry_run=True means the agent will scan and report
but will NOT take any actions (no deletions, no changes).
"""
import logging
import sys
from abc import ABC, abstractmethod

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core import activity_log, protected_zones, approval_queue

logger = logging.getLogger(__name__)


class BaseAgent(ABC):
    name: str = 'base'           # e.g., 'gatekeeper'
    display_name: str = 'Base'  # e.g., 'Gatekeeper'

    def __init__(self, dry_run: bool = True):
        """
        dry_run=True (default): scan and report only, NO actions taken.
        dry_run=False: will execute auto-resolvable actions.
        """
        self.dry_run = dry_run
        self.logger = logging.getLogger(f'atlas.{self.name}')

    @abstractmethod
    def scan(self) -> dict:
        """
        Perform the scan and return a payload dict matching the
        agent's TypeScript interface (e.g., GatekeeperPayload).
        """
        raise NotImplementedError

    def check_protected_zone(self, path: str) -> int:
        """
        Returns the protection tier (0–3) for a file path.
        0 = never touch, 1 = critical, 2 = sensitive, 3 = standard.
        """
        return protected_zones.check_tier(path)

    def approval_level(self, path: str) -> str:
        """Returns the ApprovalLevel string for a given path."""
        tier = self.check_protected_zone(path)
        return protected_zones.approval_level_for_tier(tier)

    def log_action(self, action: str, target: str, result: str, details: str | None = None):
        """Log an action to the activity log."""
        activity_log.log_action(
            agent=self.display_name,
            action=action,
            target=target,
            result=result,
            details=details,
        )

    def queue_for_approval(
        self,
        action: str,
        target: str,
        risk: str,
        benefit: str,
        approval_level: str,
        description: str,
        reversible: bool,
        category: str,
    ) -> dict:
        """Add an item to the approval queue and log it."""
        item = approval_queue.add_item(
            agent=self.display_name,
            action=action,
            target=target,
            risk=risk,
            benefit=benefit,
            approval_level=approval_level,
            description=description,
            reversible=reversible,
            category=category,
        )
        self.log_action(action, target, 'pending_approval', f"Queued for approval: {description[:80]}")
        return item

    def determine_status(self, findings: list[dict]) -> str:
        """
        Derive 'healthy' | 'attention' | 'critical' from a list of findings
        based on their severity field.
        """
        if not findings:
            return 'healthy'
        severities = {f.get('severity', 'low') for f in findings}
        if 'high' in severities:
            return 'critical'
        elif 'medium' in severities:
            return 'attention'
        return 'healthy'

    @classmethod
    def from_cli_args(cls):
        """Parse --dry-run flag from CLI and return an instance."""
        dry_run = '--dry-run' not in sys.argv
        instance = cls(dry_run=dry_run)
        mode = 'DRY RUN (no actions)' if dry_run else 'LIVE (actions enabled)'
        instance.logger.info("Starting %s in %s mode", cls.display_name, mode)
        return instance
