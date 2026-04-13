"""
Supervisor Agent — Orchestration & Synthesis
Runs all 5 agents in order, synthesizes findings, calculates system health,
and produces the DashboardState and SupervisorPayload that the UI consumes.

Agent run order: Gatekeeper → Mechanic → Janitor → Archivist → Scout
Health score weights: Gatekeeper 30%, Mechanic 20%, Janitor 20%, Archivist 15%, Scout 15%
"""
import os
import sys
import uuid
import json
import logging
from datetime import datetime, timezone
from pathlib import Path
import psutil

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agents.base_agent import BaseAgent
from agents.gatekeeper import GatekeeperAgent
from agents.mechanic import MechanicAgent
from agents.janitor import JanitorAgent
from agents.archivist import ArchivistAgent
from agents.scout import ScoutAgent
from core import report_builder, approval_queue, activity_log

logger = logging.getLogger(__name__)

# Health score weights (must sum to 1.0)
WEIGHTS = {
    'gatekeeper': 0.30,
    'mechanic': 0.20,
    'janitor': 0.20,
    'archivist': 0.15,
    'scout': 0.15,
}


def _status_to_score(status: str) -> int:
    """Convert agent status to a 0-100 score contribution."""
    return {'healthy': 100, 'attention': 65, 'critical': 30}.get(status, 50)


class SupervisorAgent(BaseAgent):
    name = 'supervisor'
    display_name = 'Supervisor'

    def scan(self) -> dict:
        """
        Run all agents, synthesize results, and return both SupervisorPayload
        and DashboardState written to disk.
        """
        self.logger.info("Starting Supervisor orchestration (dry_run=%s)...", self.dry_run)
        payloads = {}
        agent_statuses = {}

        # --- Run each agent in order ---
        agents = [
            ('gatekeeper', GatekeeperAgent),
            ('mechanic', MechanicAgent),
            ('janitor', JanitorAgent),
            ('archivist', ArchivistAgent),
            ('scout', ScoutAgent),
        ]

        for agent_name, AgentClass in agents:
            self.logger.info("Running %s...", agent_name)
            try:
                agent = AgentClass(dry_run=self.dry_run)
                payload = agent.scan()
                payloads[agent_name] = payload
                agent_statuses[agent_name] = payload.get('status', 'healthy')

                # Save individual agent report
                envelope = report_builder.build_envelope(payload, source=agent_name, run_type='daily')
                report_builder.save_report(envelope, f'{agent_name}-report.json', run_type='daily')
                self.logger.info("  %s: %s", agent_name, payload.get('status', 'unknown'))
            except Exception as e:
                self.logger.error("Agent %s failed: %s", agent_name, e)
                payloads[agent_name] = {'status': 'attention', 'findings': [], 'metrics': {}}
                agent_statuses[agent_name] = 'attention'

        # --- Calculate weighted health score ---
        health_score = int(sum(
            _status_to_score(agent_statuses.get(name, 'healthy')) * weight
            for name, weight in WEIGHTS.items()
        ))

        # --- Build top priorities from all findings ---
        top_priorities = self._build_top_priorities(payloads)

        # --- Detect cross-agent patterns ---
        cross_patterns = self._detect_cross_agent_patterns(payloads, agent_statuses)

        # --- Build SupervisorPayload ---
        supervisor_payload = {
            'systemHealth': {'score': health_score, 'trend': 'flat'},
            'agentStatuses': agent_statuses,
            'topPriorities': top_priorities,
            'crossAgentPatterns': cross_patterns,
            'maintenanceWindow': self._recommend_maintenance_window(payloads),
        }

        # Save supervisor report
        sup_envelope = report_builder.build_envelope(supervisor_payload, source='supervisor', run_type='daily')
        report_builder.save_report(sup_envelope, 'supervisor-report.json', run_type='daily')

        # --- Build DashboardState ---
        dashboard_state = self._build_dashboard_state(
            health_score=health_score,
            agent_statuses=agent_statuses,
            payloads=payloads,
        )

        # Save dashboard state (the main file the UI reads)
        data_dir = Path(__file__).parent.parent / 'data'
        data_dir.mkdir(parents=True, exist_ok=True)
        with open(data_dir / 'dashboard-state.json', 'w', encoding='utf-8') as f:
            json.dump(dashboard_state, f, indent=2)

        overall_status = 'critical' if health_score < 40 else 'attention' if health_score < 70 else 'healthy'
        self.logger.info(
            "Supervisor complete. Health: %d/100 (%s)", health_score, overall_status
        )
        self.log_action('orchestration', 'all agents', 'success',
                        f"Health score: {health_score}/100, Status: {overall_status}")

        return supervisor_payload

    def _build_top_priorities(self, payloads: dict) -> list:
        """Extract and rank the top 5 priority findings across all agents."""
        all_findings = []

        severity_order = {'high': 0, 'medium': 1, 'low': 2}

        for agent_name, payload in payloads.items():
            for finding in payload.get('findings', []):
                if finding.get('status') == 'pending':
                    all_findings.append({
                        'agent': agent_name,
                        'finding': finding,
                        'severity': finding.get('severity', 'low'),
                    })

        # Sort by severity
        all_findings.sort(key=lambda x: severity_order.get(x['severity'], 2))

        priorities = []
        for i, item in enumerate(all_findings[:5], 1):
            f = item['finding']
            priorities.append({
                'rank': i,
                'agent': item['agent'],
                'description': f.get('description', '')[:120],
                'severity': item['severity'],
                'category': f.get('category', 'general'),
            })

        return priorities

    def _detect_cross_agent_patterns(self, payloads: dict, statuses: dict) -> list:
        """Detect patterns that span multiple agents."""
        patterns = []

        # Pattern 1: Security + Organization both bad → systemic neglect
        if (statuses.get('gatekeeper') == 'critical'
                and statuses.get('archivist') in ('attention', 'critical')):
            patterns.append({
                'pattern': 'System maintenance has been neglected',
                'involvedAgents': ['gatekeeper', 'archivist'],
                'severity': 'high',
                'recommendation': 'Enable Windows security features and organize files — the system needs a full cleanup pass.',
            })

        # Pattern 2: Chrome eating RAM + Downloads full of media
        gk_chrome_ram = payloads.get('mechanic', {}).get('metrics', {}).get('chromeRamBytes', 0)
        downloads_count = payloads.get('janitor', {}).get('metrics', {}).get('downloadsFileCount', 0)
        if gk_chrome_ram > 3 * (1024**3) and downloads_count > 50:
            patterns.append({
                'pattern': 'Heavy Chrome usage combined with Downloads folder overflow',
                'involvedAgents': ['mechanic', 'janitor'],
                'severity': 'medium',
                'recommendation': 'Close unused Chrome tabs and clean out the Downloads folder to recover performance and disk space.',
            })

        # Pattern 3: Temp files + stale files → storage pressure
        temp_bytes = payloads.get('janitor', {}).get('metrics', {}).get('tempSizeBytes', 0)
        reclaimable_gb = payloads.get('janitor', {}).get('metrics', {}).get('totalReclaimableGB', 0)
        if reclaimable_gb > 10:
            patterns.append({
                'pattern': f'{reclaimable_gb:.0f} GB of reclaimable disk space identified',
                'involvedAgents': ['janitor', 'archivist'],
                'severity': 'medium',
                'recommendation': 'Run Janitor cleanup to reclaim disk space from temp files, duplicates, and large unused files.',
            })

        return patterns[:3]  # Max 3 patterns

    def _recommend_maintenance_window(self, payloads: dict) -> dict:
        """Suggest a maintenance window based on findings."""
        # Simple heuristic: suggest running at 2 AM
        return {
            'recommended': '02:00 AM',
            'reason': 'System is typically idle overnight. Auto-cleanup tasks run fastest when disk is not in use.',
            'estimatedDuration': '15–30 minutes',
        }

    def _build_dashboard_state(
        self,
        health_score: int,
        agent_statuses: dict,
        payloads: dict,
    ) -> dict:
        """
        Build the DashboardState object that the Overview page reads.
        Must match the DashboardState TypeScript interface exactly.
        """
        now_iso = datetime.now(timezone.utc).isoformat()

        # --- Alerts ---
        alerts = self._build_alerts(payloads, agent_statuses)

        # --- Recent activity ---
        recent_activity = activity_log.get_recent(limit=10)

        # --- Disk usage ---
        disk = psutil.disk_usage('C:\\')
        disk_total = disk.total
        disk_used = disk.used
        disk_free = disk.free
        disk_free_pct = round((disk_free / disk_total) * 100, 1)

        # --- Pull metrics from agent payloads ---
        mech_metrics = payloads.get('mechanic', {}).get('metrics', {})
        gk_metrics = payloads.get('gatekeeper', {}).get('metrics', {})
        arch_metrics = payloads.get('archivist', {}).get('metrics', {})
        scout_metrics = payloads.get('scout', {}).get('metrics', {})
        janitor_metrics = payloads.get('janitor', {}).get('metrics', {})

        # chromeRamBytes → chromeRamGB
        chrome_ram_bytes = mech_metrics.get('chromeRamBytes', 0)
        chrome_ram_gb = round(chrome_ram_bytes / (1024**3), 2)

        return {
            'lastUpdated': now_iso,
            'systemHealth': {'score': health_score, 'trend': 'flat'},
            'agentStatuses': agent_statuses,
            'alerts': alerts,
            'recentActivity': recent_activity,
            'metrics': {
                'diskUsage': {
                    'totalBytes': disk_total,
                    'usedBytes': disk_used,
                    'freeBytes': disk_free,
                    'freePercent': disk_free_pct,
                },
                'performance': {
                    'bootTimeSeconds': mech_metrics.get('bootTimeSeconds', 0),
                    'ramUsagePercent': mech_metrics.get('ramUsagePercent', 0),
                    'chromeRamGB': chrome_ram_gb,
                    'chromeTabCount': mech_metrics.get('chromeTabCount', 0),
                    'ssdHealthPercent': mech_metrics.get('ssdHealthPercent', None),
                },
                'security': {
                    'securityScore': gk_metrics.get('securityScore', 0),
                    'defenderEnabled': gk_metrics.get('defenderEnabled', False),
                    'firewallEnabled': gk_metrics.get('firewallEnabled', False),
                    'pendingPatches': gk_metrics.get('pendingSecurityPatches', 0),
                },
                'organization': {
                    'organizationalScore': arch_metrics.get('organizationalScore', 0),
                    'misplacedFiles': arch_metrics.get('misplacedFileCount', 0),
                    'desktopClutter': arch_metrics.get('desktopFileCount', 0),
                },
                'updates': {
                    'totalPending': scout_metrics.get('totalUpdatesAvailable', 0),
                    'criticalPending': scout_metrics.get('criticalUpdates', 0),
                },
            },
        }

    def _build_alerts(self, payloads: dict, statuses: dict) -> list:
        """Build Alert objects for critical and high-severity findings."""
        alerts = []
        now = datetime.now(timezone.utc).isoformat()

        for agent_name, payload in payloads.items():
            for finding in payload.get('findings', []):
                severity = finding.get('severity', 'low')
                if severity == 'high':
                    level = 'critical'
                elif severity == 'medium':
                    level = 'warning'
                else:
                    continue  # Skip low severity from alerts

                alerts.append({
                    'id': str(uuid.uuid4()),
                    'level': level,
                    'agent': agent_name,
                    'message': finding.get('description', '')[:120],
                    'timestamp': now,
                })

        # Sort: critical first, then warning
        level_order = {'critical': 0, 'warning': 1, 'info': 2}
        alerts.sort(key=lambda a: level_order.get(a['level'], 2))

        return alerts[:10]  # Cap at 10 alerts


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO, format='%(levelname)s %(name)s: %(message)s')
    agent = SupervisorAgent(dry_run=True)
    result = agent.scan()
    print(json.dumps(result, indent=2))
