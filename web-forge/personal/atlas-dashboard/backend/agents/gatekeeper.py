"""
Gatekeeper Agent — Security & Integrity
Highest priority agent: scans for security vulnerabilities on David's Windows 11 system.

Checks: Windows Defender, Firewall, definition age, patches, Chrome extensions,
open ports, and exposed credential files.

Auto-execute: Update Defender definitions only.
Everything else goes to the approval queue.
"""
import os
import re
import uuid
import logging
import subprocess
from datetime import datetime, timezone
from pathlib import Path

import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agents.base_agent import BaseAgent
from core import powershell, approval_queue as aq, activity_log

logger = logging.getLogger(__name__)

# Ports that are expected on a normal Windows machine (not flagged as suspicious)
EXPECTED_PORTS = {
    135, 445, 139, 5040, 7680, 49152, 49153, 49154, 49155, 49156, 49157,
    3389,   # RDP (expected on Windows)
    1900,   # UPnP (expected)
    5353,   # mDNS (expected)
}

# Chrome extensions that are well-known and safe (by extension ID)
SAFE_EXTENSION_IDS = {
    'nmmhkkegccagdldgiimedpiccmgmieda',  # Google Wallet
    'aapocclcgogkmnckokdopfmhonfmgoek',  # Google Slides
    'aohghmighlieiainnegkcijnfilokake',  # Google Docs
    'apdfllckaahabafndbhieahigkjlhalf',  # Google Drive
    'blpcfgokakmgnkcojhhkbfbldkacnbeo',  # YouTube
    'coobgpohoikkiipiblmjeljniedjpjpf',  # Google Search
    'felcaaldnbdncclmgdcncolpebgiejap',  # Google Sheets
    'ghbmnnjooekpmoecnnnilnnbdlolhkhi',  # Google Docs Offline
    'ienfalfjdbdpebioblfackkekamfmbnh',  # Google Keep
    'pjkljhegncpnkpknbcohdijeoejaedia',  # Gmail
    'aapocclcgogkmnckokdopfmhonfmgoek',  # Google Slides
    'mfehgcgbbipciphmccgaenjidiccnmng',  # Cloud Print
    'nkeimhogjdpnpccoofpliimaahmaaome',  # Google Hangouts
    'ggppiobljnfpciocjlhhgiogkaekjfmh',  # TalkBack
    'hnimpnehoodheedghdeeijklkeaacbdc',  # Google Accessibility Helper
    'kbfnbcaeplbcioakkpcpgfkobkghlhen',  # Grammarly
    'hdokiejnpimakedhajhdlcegeplioahd',  # LastPass
    'cfhdojbkjhnklbpkdaibdccddilifddb',  # Adblock Plus
    'gighmmpiobklfepjocnamgkkbiglidom',  # AdBlock
    'eimadpbcbfnmbkopoojfekhnkhdbieeh',  # Dark Reader
    'cjpalhdlnbpafiamejdnhcphjbkeiagm',  # uBlock Origin
    'dhdgffkkebhmkfjojejmpbldmpobfkfo',  # Tampermonkey
    'fmkadmapgofadopljbjfkapdkoienihi',  # React DevTools
    'lmhkpmbekcpmknklioeibfkpmmfibljd',  # Redux DevTools
    'nkbihfbeogaeaoehlefnkodbefgpgknn',  # MetaMask
    'bfnaelmomeimhlpmgjnjophhpkkoljpa',  # Pocket
    'oemmndcbldboiebfnladdacbdfmadadm',  # Google Docs Viewer
    'gbkeegbaiigmenfmjfclcdgdpimamgkj',  # Office Editing for Docs, Sheets & Slides
    'pkedcjkdefgpdelpbcmbmeomcjbeemfm',  # Chrome Remote Desktop
    'mooikfkahbdckldjjndioackbalphokd',  # Screen Reader
    'hfhhnacclhffhdffklopdkcgdhifgngh',  # Honey
}

USER_DIR = Path(r'C:\Users\david')
CHROME_EXTENSIONS_DIR = USER_DIR / 'AppData' / 'Local' / 'Google' / 'Chrome' / 'User Data' / 'Default' / 'Extensions'

CREDENTIAL_PATTERNS = ['*.env', 'id_rsa', 'id_ed25519', '*.pem', 'passwords.txt', 'credentials.json', '.netrc']
CREDENTIAL_SCAN_DIRS = [
    USER_DIR / 'Desktop',
    USER_DIR / 'Documents',
    USER_DIR / 'Downloads',
    USER_DIR / '.ssh',
]


class GatekeeperAgent(BaseAgent):
    name = 'gatekeeper'
    display_name = 'Gatekeeper'

    def scan(self) -> dict:
        """Run all security checks and return a GatekeeperPayload dict."""
        self.logger.info("Starting Gatekeeper scan...")

        findings = []

        # --- Defender status ---
        defender = self._check_defender()
        findings.extend(defender['findings'])

        # --- Firewall status ---
        firewall = self._check_firewall()
        findings.extend(firewall['findings'])

        # --- Pending security patches ---
        patches = self._check_patches()
        findings.extend(patches['findings'])

        # --- Chrome extensions ---
        extensions = self._check_extensions()
        findings.extend(extensions['findings'])

        # --- Open ports ---
        ports = self._check_ports()
        findings.extend(ports['findings'])

        # --- Exposed credential files ---
        creds = self._check_credential_files()
        findings.extend(creds['findings'])

        # --- Auto-execute: update Defender definitions ---
        self._maybe_update_definitions(defender['enabled'])

        # --- Calculate security score ---
        score = self._calculate_score(
            defender_enabled=defender['enabled'],
            definitions_current=defender['definitions_current'],
            firewall_enabled=firewall['all_enabled'],
            patches_ok=patches['count'] == 0,
            extensions_ok=extensions['risky_count'] == 0,
            ports_ok=ports['suspicious_count'] == 0,
        )

        # Build the metrics dict (must match GatekeeperPayload.metrics exactly)
        metrics = {
            'securityScore': score,
            'securityScoreTrend': 'flat',  # Trend requires historical data; starts flat
            'defenderEnabled': defender['enabled'],
            'defenderDefinitionAge': defender['definition_age_days'],
            'defenderLastScan': defender['last_scan'],
            'firewallEnabled': firewall['all_enabled'],
            'firewallProfiles': firewall['profiles'],
            'pendingSecurityPatches': patches['count'],
            'riskyExtensionCount': extensions['risky_count'],
            'openPortCount': ports['total_count'],
            'vulnerableSoftwareCount': 0,  # Scout handles this
            'exposedCredentialFiles': creds['count'],
        }

        status = self.determine_status(findings)
        self.logger.info(
            "Gatekeeper scan complete. Status: %s, Score: %d/100, Findings: %d",
            status, score, len(findings)
        )
        self.log_action('scan', 'system security', 'success',
                        f"Security score: {score}/100, {len(findings)} findings")

        return {
            'status': status,
            'findings': findings,
            'metrics': metrics,
        }

    def _check_defender(self) -> dict:
        """Check Windows Defender status via PowerShell."""
        findings = []
        enabled = False
        definition_age_days = 999
        last_scan = None
        definitions_current = False

        raw = powershell.run(
            'Get-MpComputerStatus | Select-Object AMServiceEnabled, AntispywareEnabled, '
            'AntivirusEnabled, AntivirusSignatureAge, QuickScanAge, FullScanAge, '
            'AntivirusSignatureLastUpdated | ConvertTo-Json'
        )

        if raw:
            try:
                import json
                data = json.loads(raw)
                enabled = bool(data.get('AntivirusEnabled', False))
                definition_age_days = int(data.get('AntivirusSignatureAge', 999))
                definitions_current = definition_age_days <= 2

                # Parse last scan date
                sig_updated = data.get('AntivirusSignatureLastUpdated')
                if sig_updated:
                    last_scan = sig_updated
            except Exception as e:
                self.logger.debug("Failed to parse Defender status: %s", e)

        if not enabled:
            finding = self._make_finding(
                category='antivirus',
                description='Windows Defender is disabled. Your system has no real-time malware protection.',
                target='Windows Defender',
                severity='high',
                cve_id=None,
                approval_level='explicit_approval',
                suggested_action='Enable Windows Defender real-time protection via Windows Security settings.',
            )
            findings.append(finding)
            self.queue_for_approval(
                action='Enable Windows Defender',
                target='Windows Security / Real-Time Protection',
                risk='low',
                benefit='Enables real-time malware protection — critical for system security.',
                approval_level='explicit_approval',
                description='Windows Defender is currently disabled. Enabling it protects against malware, ransomware, and viruses.',
                reversible=True,
                category='antivirus',
            )

        if definition_age_days > 7:
            finding = self._make_finding(
                category='antivirus',
                description=f'Defender virus definitions are {definition_age_days} days old. Outdated definitions miss new threats.',
                target='Windows Defender Definitions',
                severity='high' if definition_age_days > 14 else 'medium',
                cve_id=None,
                approval_level='no_approval',
                suggested_action='Update Defender definitions (auto-update enabled).',
            )
            findings.append(finding)
        elif definition_age_days > 2:
            finding = self._make_finding(
                category='antivirus',
                description=f'Defender virus definitions are {definition_age_days} days old.',
                target='Windows Defender Definitions',
                severity='low',
                cve_id=None,
                approval_level='no_approval',
                suggested_action='Update Defender definitions.',
            )
            findings.append(finding)

        return {
            'enabled': enabled,
            'definition_age_days': definition_age_days,
            'definitions_current': definitions_current,
            'last_scan': last_scan,
            'findings': findings,
        }

    def _check_firewall(self) -> dict:
        """Check Windows Firewall status for all profiles."""
        findings = []
        profiles = {'domain': False, 'private': False, 'public': False}
        all_enabled = False

        raw = powershell.run(
            'Get-NetFirewallProfile | Select-Object Name, Enabled | ConvertTo-Json'
        )

        if raw:
            try:
                import json
                data = json.loads(raw)
                if isinstance(data, dict):
                    data = [data]
                for profile in data:
                    name = profile.get('Name', '').lower()
                    enabled = bool(profile.get('Enabled', False))
                    if 'domain' in name:
                        profiles['domain'] = enabled
                    elif 'private' in name:
                        profiles['private'] = enabled
                    elif 'public' in name:
                        profiles['public'] = enabled
            except Exception as e:
                self.logger.debug("Failed to parse firewall status: %s", e)

        all_enabled = all(profiles.values())

        disabled_profiles = [k for k, v in profiles.items() if not v]
        if disabled_profiles:
            profile_str = ', '.join(p.title() for p in disabled_profiles)
            finding = self._make_finding(
                category='firewall',
                description=f'Windows Firewall is disabled for: {profile_str}. Your system is exposed to network attacks.',
                target='Windows Firewall',
                severity='high',
                cve_id=None,
                approval_level='explicit_approval',
                suggested_action=f'Enable Windows Firewall for all profiles ({profile_str}).',
            )
            findings.append(finding)
            self.queue_for_approval(
                action='Enable Windows Firewall',
                target=f'Windows Firewall ({profile_str} profiles)',
                risk='low',
                benefit=f'Blocks unauthorized network access on {profile_str} network profiles.',
                approval_level='explicit_approval',
                description=f'Windows Firewall is disabled for {profile_str} profiles. This exposes your machine to inbound network attacks.',
                reversible=True,
                category='firewall',
            )

        return {
            'all_enabled': all_enabled,
            'profiles': profiles,
            'findings': findings,
        }

    def _check_patches(self) -> dict:
        """Check for pending security updates."""
        findings = []
        count = 0

        raw = powershell.run(
            '(Get-HotFix | Where-Object {$_.InstalledOn -ne $null} | '
            'Measure-Object).Count'
        )

        # Check if there are pending Windows updates via Windows Update COM object
        pending_raw = powershell.run(
            '$UpdateSession = New-Object -ComObject Microsoft.Update.Session; '
            '$UpdateSearcher = $UpdateSession.CreateUpdateSearcher(); '
            'try { $Results = $UpdateSearcher.Search("IsInstalled=0 and Type=\'Software\'"); '
            '$Results.Updates.Count } catch { 0 }',
            timeout=60
        )

        try:
            count = int(pending_raw.strip()) if pending_raw.strip().isdigit() else 0
        except Exception:
            count = 0

        if count > 0:
            severity = 'high' if count >= 5 else 'medium'
            finding = self._make_finding(
                category='patches',
                description=f'{count} pending Windows security update(s) detected. Unpatched systems are vulnerable to known exploits.',
                target='Windows Update',
                severity=severity,
                cve_id=None,
                approval_level='approval_recommended',
                suggested_action='Install pending Windows updates via Windows Update settings.',
            )
            findings.append(finding)
            self.queue_for_approval(
                action='Install Windows Updates',
                target=f'Windows Update ({count} pending)',
                risk='low',
                benefit='Patches known security vulnerabilities and improves system stability.',
                approval_level='approval_recommended',
                description=f'{count} Windows update(s) are pending installation. These include security patches for known vulnerabilities.',
                reversible=False,
                category='patches',
            )

        return {'count': count, 'findings': findings}

    def _check_extensions(self) -> dict:
        """Scan Chrome extensions for potentially risky ones."""
        findings = []
        risky_count = 0

        if not CHROME_EXTENSIONS_DIR.exists():
            return {'risky_count': 0, 'findings': findings}

        try:
            extension_ids = [
                d.name for d in CHROME_EXTENSIONS_DIR.iterdir()
                if d.is_dir() and d.name != 'Temp'
            ]
        except PermissionError:
            return {'risky_count': 0, 'findings': findings}

        total = len(extension_ids)
        risky = [eid for eid in extension_ids if eid not in SAFE_EXTENSION_IDS]
        risky_count = len(risky)

        if risky_count > 0:
            finding = self._make_finding(
                category='extensions',
                description=f'{risky_count} unrecognized Chrome extension(s) detected out of {total} total. Unknown extensions may access browsing data.',
                target='Chrome Extensions',
                severity='low' if risky_count <= 3 else 'medium',
                cve_id=None,
                approval_level='approval_recommended',
                suggested_action='Review and remove any unfamiliar Chrome extensions at chrome://extensions/',
            )
            findings.append(finding)

        return {'risky_count': risky_count, 'findings': findings}

    def _check_ports(self) -> dict:
        """Check for open listening ports that may indicate exposure."""
        findings = []
        suspicious_count = 0
        total_count = 0

        raw = powershell.run(
            'netstat -an | Select-String "LISTENING" | '
            'ForEach-Object { ($_ -split "\\s+")[3] } | '
            'ForEach-Object { if ($_ -match ":") { ($_ -split ":")[-1] } } | '
            'Sort-Object { [int]$_ } -Unique'
        )

        open_ports = set()
        for line in raw.splitlines():
            line = line.strip()
            if line.isdigit():
                port_num = int(line)
                if port_num > 0:  # Port 0 is not a real listening port
                    open_ports.add(port_num)

        total_count = len(open_ports)
        suspicious = open_ports - EXPECTED_PORTS
        # Filter out ephemeral ports (>49151 are typically dynamic/private)
        suspicious = {p for p in suspicious if p <= 49151}
        suspicious_count = len(suspicious)

        if suspicious_count > 0:
            ports_str = ', '.join(str(p) for p in sorted(suspicious)[:10])
            finding = self._make_finding(
                category='network',
                description=f'{suspicious_count} unexpected port(s) open and listening: {ports_str}',
                target='Network Ports',
                severity='medium' if suspicious_count <= 3 else 'high',
                cve_id=None,
                approval_level='approval_recommended',
                suggested_action=f'Investigate which programs are listening on ports: {ports_str}',
            )
            findings.append(finding)

        return {'total_count': total_count, 'suspicious_count': suspicious_count, 'findings': findings}

    def _check_credential_files(self) -> dict:
        """Scan for exposed credential files in common locations."""
        findings = []
        exposed_count = 0
        found_files = []

        for scan_dir in CREDENTIAL_SCAN_DIRS:
            if not scan_dir.exists():
                continue
            try:
                for item in scan_dir.rglob('*'):
                    if not item.is_file():
                        continue
                    name_lower = item.name.lower()
                    # Check against credential patterns
                    if (name_lower in ['id_rsa', 'id_ed25519', '.netrc', 'passwords.txt']
                            or name_lower.endswith('.pem')
                            or name_lower.endswith('.env')
                            or name_lower == 'credentials.json'):
                        found_files.append(str(item))
                        exposed_count += 1
            except PermissionError:
                pass

        if exposed_count > 0:
            files_str = ', '.join(Path(f).name for f in found_files[:5])
            finding = self._make_finding(
                category='credentials',
                description=f'{exposed_count} potentially exposed credential file(s) found: {files_str}',
                target='Credential Files',
                severity='high',
                cve_id=None,
                approval_level='explicit_approval',
                suggested_action='Move credential files to a secure vault or password manager. Never store plaintext credentials in user directories.',
            )
            findings.append(finding)

        return {'count': exposed_count, 'findings': findings}

    def _maybe_update_definitions(self, defender_enabled: bool) -> None:
        """
        Auto-execute: Update Defender definitions if enabled and dry_run is False.
        This is the ONLY auto-execute action for Gatekeeper.
        """
        if self.dry_run:
            self.logger.info("[DRY RUN] Would run: Update-MpSignature")
            return
        if not defender_enabled:
            self.logger.info("Skipping definition update — Defender is disabled")
            return

        self.logger.info("Auto-updating Defender definitions...")
        result = powershell.run('Update-MpSignature', timeout=120)
        if result is not None:
            self.log_action(
                'Update Defender Definitions',
                'Windows Defender',
                'success',
                'Defender signature definitions updated automatically'
            )
        else:
            self.log_action(
                'Update Defender Definitions',
                'Windows Defender',
                'failed',
                'Failed to update Defender signature definitions'
            )

    def _calculate_score(
        self,
        defender_enabled: bool,
        definitions_current: bool,
        firewall_enabled: bool,
        patches_ok: bool,
        extensions_ok: bool,
        ports_ok: bool,
    ) -> int:
        """
        Security score formula (0–100):
        Defender enabled: 25 pts
        Firewall enabled (all profiles): 25 pts
        Definitions current (<2 days): 15 pts
        No critical patches pending: 15 pts
        No risky extensions: 10 pts
        No unexpected open ports: 10 pts
        """
        score = 0
        if defender_enabled:
            score += 25
        if firewall_enabled:
            score += 25
        if definitions_current:
            score += 15
        if patches_ok:
            score += 15
        if extensions_ok:
            score += 10
        if ports_ok:
            score += 10
        return score

    def _make_finding(
        self,
        category: str,
        description: str,
        target: str,
        severity: str,
        cve_id,
        approval_level: str,
        suggested_action: str,
    ) -> dict:
        """Build a GatekeeperFinding dict matching the TypeScript interface."""
        return {
            'id': str(uuid.uuid4()),
            'category': category,
            'description': description,
            'target': target,
            'severity': severity,
            'cveId': cve_id,
            'approvalLevel': approval_level,
            'suggestedAction': suggested_action,
            'status': 'pending',
        }


if __name__ == '__main__':
    import json
    import sys
    logging.basicConfig(level=logging.INFO, format='%(levelname)s %(name)s: %(message)s')

    # Run with: python -m agents.gatekeeper --dry-run
    # or:       python agents/gatekeeper.py --dry-run
    dry_run = '--dry-run' in sys.argv or True  # Default to dry-run when run directly
    agent = GatekeeperAgent(dry_run=dry_run)
    result = agent.scan()
    print(json.dumps(result, indent=2))
