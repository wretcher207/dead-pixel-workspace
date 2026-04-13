"""
Mechanic Agent — Performance Monitoring
Tracks RAM, CPU, boot time, Chrome memory, SSD health, and startup programs.

Auto-execute: None (performance snapshots/logging only).
Everything else goes to the approval queue.
"""
import os
import sys
import uuid
import json
import time
import logging
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import psutil
from agents.base_agent import BaseAgent
from core import powershell

logger = logging.getLogger(__name__)

# Thresholds
CHROME_TAB_THRESHOLD = 30       # Tabs above this → medium severity
CHROME_RAM_GB_THRESHOLD = 4.0   # Chrome RAM above this (GB) → high severity
BOOT_TIME_ALERT_SECONDS = 120   # Boot time above this → flagged
RAM_ALERT_PERCENT = 85          # RAM usage above this → flagged
CPU_ALERT_PERCENT = 80          # Sustained CPU above this → flagged


class MechanicAgent(BaseAgent):
    name = 'mechanic'
    display_name = 'Mechanic'

    def scan(self) -> dict:
        """Run performance checks and return a MechanicPayload dict."""
        self.logger.info("Starting Mechanic scan...")

        findings = []

        # --- RAM ---
        ram = self._check_ram()
        findings.extend(ram['findings'])

        # --- CPU ---
        cpu = self._check_cpu()
        findings.extend(cpu['findings'])

        # --- Boot time ---
        boot = self._check_boot_time()
        findings.extend(boot['findings'])

        # --- Chrome ---
        chrome = self._check_chrome()
        findings.extend(chrome['findings'])

        # --- Top processes ---
        top_processes = self._get_top_processes()

        # --- Startup programs ---
        startup = self._check_startup_programs()
        findings.extend(startup['findings'])

        # --- SSD health ---
        ssd = self._check_ssd_health()
        findings.extend(ssd['findings'])

        metrics = {
            'bootTimeSeconds': boot['seconds'],
            'totalRamBytes': ram['total_bytes'],
            'usedRamBytes': ram['used_bytes'],
            'ramUsagePercent': ram['percent'],
            'chromeRamBytes': chrome['ram_bytes'],
            'chromeTabCount': chrome['tab_count'],
            'cpuUsagePercent': cpu['percent'],
            'startupProgramCount': startup['total_count'],
            'startupNonEssentialCount': startup['non_essential_count'],
            'ssdHealthPercent': ssd['health_percent'],
            'ssdTemperatureCelsius': ssd['temperature_celsius'],
            'topProcesses': top_processes,
        }

        status = self.determine_status(findings)
        self.logger.info(
            "Mechanic scan complete. Status: %s, RAM: %.1f%%, CPU: %.1f%%",
            status, ram['percent'], cpu['percent']
        )
        self.log_action('scan', 'system performance', 'success',
                        f"RAM: {ram['percent']:.0f}%, CPU: {cpu['percent']:.0f}%, Boot: {boot['seconds']}s")

        return {
            'status': status,
            'findings': findings,
            'metrics': metrics,
        }

    def _check_ram(self) -> dict:
        """Check RAM usage via psutil."""
        findings = []
        vm = psutil.virtual_memory()
        total_bytes = vm.total
        used_bytes = vm.used
        percent = vm.percent

        if percent >= RAM_ALERT_PERCENT:
            finding = self._make_finding(
                category='memory',
                description=f'RAM usage is at {percent:.0f}% ({self._format_gb(used_bytes)} of {self._format_gb(total_bytes)} used).',
                process_name=None,
                pid=None,
                memory_bytes=used_bytes,
                cpu_percent=None,
                severity='high' if percent >= 95 else 'medium',
                approval_level='approval_recommended',
                suggested_action='Consider closing unused applications or adding more RAM.',
            )
            findings.append(finding)

        return {
            'total_bytes': total_bytes,
            'used_bytes': used_bytes,
            'percent': round(percent, 1),
            'findings': findings,
        }

    def _check_cpu(self) -> dict:
        """Check CPU usage (sample over 1 second for accuracy)."""
        findings = []
        # Sample CPU over 1 second interval
        percent = psutil.cpu_percent(interval=1)

        if percent >= CPU_ALERT_PERCENT:
            finding = self._make_finding(
                category='cpu',
                description=f'CPU usage is at {percent:.0f}% — system may be under heavy load.',
                process_name=None,
                pid=None,
                memory_bytes=None,
                cpu_percent=percent,
                severity='high' if percent >= 95 else 'medium',
                approval_level='approval_recommended',
                suggested_action='Check Task Manager for processes consuming high CPU.',
            )
            findings.append(finding)

        return {'percent': round(percent, 1), 'findings': findings}

    def _check_boot_time(self) -> dict:
        """Calculate how long the system has been running since last boot."""
        findings = []
        boot_epoch = psutil.boot_time()
        now_epoch = time.time()
        uptime_seconds = int(now_epoch - boot_epoch)

        # Report the boot time (uptime) in seconds
        if uptime_seconds > BOOT_TIME_ALERT_SECONDS:
            days = uptime_seconds // 86400
            if days > 7:
                severity = 'medium'
                desc = f'System has been running for {days} days without a restart. A restart can improve performance and apply pending updates.'
            else:
                severity = 'low'
                desc = f'System uptime is {uptime_seconds // 3600} hours.'

            if days > 7:
                finding = self._make_finding(
                    category='uptime',
                    description=desc,
                    process_name=None,
                    pid=None,
                    memory_bytes=None,
                    cpu_percent=None,
                    severity=severity,
                    approval_level='no_approval',
                    suggested_action='Schedule a system restart during a low-activity period.',
                )
                findings.append(finding)

        return {'seconds': uptime_seconds, 'findings': findings}

    def _check_chrome(self) -> dict:
        """Aggregate Chrome memory usage and estimate tab count."""
        findings = []
        chrome_ram_bytes = 0
        chrome_process_count = 0

        for proc in psutil.process_iter(['name', 'memory_info']):
            try:
                if proc.info['name'] and proc.info['name'].lower() == 'chrome.exe':
                    if proc.info['memory_info']:
                        chrome_ram_bytes += proc.info['memory_info'].rss
                    chrome_process_count += 1
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                pass

        # Chrome spawns multiple processes: 1 main + 1 per tab (approximately) + GPU/plugins
        # Rough estimate: subtract ~4 processes for main/GPU/extension/plugin overhead
        estimated_tabs = max(0, chrome_process_count - 4)
        chrome_ram_gb = chrome_ram_bytes / (1024 ** 3)

        if chrome_ram_gb > CHROME_RAM_GB_THRESHOLD:
            finding = self._make_finding(
                category='memory',
                description=f'Chrome is using {chrome_ram_gb:.1f} GB of RAM across {chrome_process_count} processes. This is impacting system performance.',
                process_name='chrome.exe',
                pid=None,
                memory_bytes=chrome_ram_bytes,
                cpu_percent=None,
                severity='high',
                approval_level='approval_recommended',
                suggested_action='Close unused Chrome tabs or restart Chrome to free memory.',
            )
            findings.append(finding)
        elif estimated_tabs > CHROME_TAB_THRESHOLD:
            finding = self._make_finding(
                category='memory',
                description=f'Chrome has approximately {estimated_tabs} tabs open, using {chrome_ram_gb:.1f} GB RAM.',
                process_name='chrome.exe',
                pid=None,
                memory_bytes=chrome_ram_bytes,
                cpu_percent=None,
                severity='medium',
                approval_level='no_approval',
                suggested_action=f'Consider closing some Chrome tabs. {estimated_tabs} open tabs is a lot.',
            )
            findings.append(finding)

        return {
            'ram_bytes': chrome_ram_bytes,
            'tab_count': estimated_tabs,
            'findings': findings,
        }

    def _get_top_processes(self) -> list[dict]:
        """Get the top 10 processes by RAM usage. Matches TopProcess interface."""
        processes = []
        for proc in psutil.process_iter(['pid', 'name', 'memory_info', 'cpu_percent']):
            try:
                mem = proc.info['memory_info']
                if mem:
                    processes.append({
                        'name': proc.info['name'] or 'Unknown',
                        'pid': proc.info['pid'],
                        'ramBytes': mem.rss,
                        'cpuPercent': round(proc.info.get('cpu_percent') or 0.0, 1),
                    })
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                pass

        # Sort by RAM descending, return top 10
        processes.sort(key=lambda p: p['ramBytes'], reverse=True)
        return processes[:10]

    def _check_startup_programs(self) -> dict:
        """Check startup programs via PowerShell."""
        findings = []

        raw = powershell.run(
            'Get-CimInstance Win32_StartupCommand | '
            'Select-Object Name, Command, Location | ConvertTo-Json'
        )

        programs = []
        if raw:
            try:
                data = json.loads(raw)
                if isinstance(data, dict):
                    data = [data]
                programs = data if isinstance(data, list) else []
            except Exception:
                pass

        total_count = len(programs)

        # Known non-essential startup programs to flag
        non_essential_keywords = [
            'spotify', 'discord', 'steam', 'epic games', 'teams', 'skype',
            'dropbox', 'onedrive', 'googledrive', 'zoom', 'slack'
        ]
        non_essential = [
            p for p in programs
            if any(kw in (p.get('Name', '') + p.get('Command', '')).lower()
                   for kw in non_essential_keywords)
        ]
        non_essential_count = len(non_essential)

        if non_essential_count > 3:
            names = ', '.join(p.get('Name', 'Unknown') for p in non_essential[:5])
            finding = self._make_finding(
                category='startup',
                description=f'{non_essential_count} non-essential startup programs detected: {names}. These slow down boot time.',
                process_name=None,
                pid=None,
                memory_bytes=None,
                cpu_percent=None,
                severity='low' if non_essential_count <= 5 else 'medium',
                approval_level='approval_recommended',
                suggested_action='Disable non-essential startup programs via Task Manager > Startup tab.',
            )
            findings.append(finding)
            self.queue_for_approval(
                action='Disable non-essential startup programs',
                target=f'Startup Programs ({non_essential_count} identified)',
                risk='low',
                benefit='Reduces boot time and frees memory at startup.',
                approval_level='approval_recommended',
                description=f'{non_essential_count} non-essential startup programs found: {names}. Disabling them will speed up boot time.',
                reversible=True,
                category='startup',
            )

        return {
            'total_count': total_count,
            'non_essential_count': non_essential_count,
            'findings': findings,
        }

    def _check_ssd_health(self) -> dict:
        """Check SSD/disk health via PowerShell."""
        findings = []
        health_percent = None
        temperature_celsius = None

        raw = powershell.run(
            'Get-PhysicalDisk | Select-Object MediaType, HealthStatus, OperationalStatus | ConvertTo-Json'
        )

        if raw:
            try:
                data = json.loads(raw)
                if isinstance(data, dict):
                    data = [data]
                for disk in (data if isinstance(data, list) else []):
                    health = disk.get('HealthStatus', '')
                    status = disk.get('OperationalStatus', '')
                    media = disk.get('MediaType', '')

                    if health == 'Healthy' and status == 'OK':
                        health_percent = 100
                    elif health == 'Warning':
                        health_percent = 70
                        finding = self._make_finding(
                            category='storage',
                            description=f'SSD/disk health is in Warning state. Drive may be failing.',
                            process_name=None,
                            pid=None,
                            memory_bytes=None,
                            cpu_percent=None,
                            severity='high',
                            approval_level='approval_recommended',
                            suggested_action='Back up your data immediately and consider replacing the drive.',
                        )
                        findings.append(finding)
                    elif health == 'Unhealthy':
                        health_percent = 30
                        finding = self._make_finding(
                            category='storage',
                            description='SSD/disk is in Unhealthy state — drive failure is imminent.',
                            process_name=None,
                            pid=None,
                            memory_bytes=None,
                            cpu_percent=None,
                            severity='high',
                            approval_level='explicit_approval',
                            suggested_action='Back up data immediately. Drive replacement required.',
                        )
                        findings.append(finding)
            except Exception as e:
                self.logger.debug("Failed to parse disk health: %s", e)

        return {
            'health_percent': health_percent,
            'temperature_celsius': temperature_celsius,
            'findings': findings,
        }

    def _make_finding(
        self,
        category: str,
        description: str,
        process_name,
        pid,
        memory_bytes,
        cpu_percent,
        severity: str,
        approval_level: str,
        suggested_action: str,
    ) -> dict:
        """Build a MechanicFinding dict matching the TypeScript interface."""
        return {
            'id': str(uuid.uuid4()),
            'category': category,
            'description': description,
            'processName': process_name,
            'pid': pid,
            'memoryBytes': memory_bytes,
            'cpuPercent': cpu_percent,
            'severity': severity,
            'approvalLevel': approval_level,
            'suggestedAction': suggested_action,
            'status': 'pending',
        }

    @staticmethod
    def _format_gb(bytes_val: int) -> str:
        return f"{bytes_val / (1024**3):.1f} GB"


if __name__ == '__main__':
    import json
    logging.basicConfig(level=logging.INFO, format='%(levelname)s %(name)s: %(message)s')
    agent = MechanicAgent(dry_run=True)
    result = agent.scan()
    print(json.dumps(result, indent=2))
