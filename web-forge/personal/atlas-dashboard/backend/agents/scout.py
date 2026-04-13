"""
Scout Agent — Software Updates & Dependency Management
Checks versions for key software and flags outdated packages.

Audio tool policy: Reaper and VST updates are ALWAYS explicit_approval.
Auto-execute: None (version checking only).
"""
import os
import sys
import uuid
import json
import logging
import subprocess
import winreg
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agents.base_agent import BaseAgent
from core import powershell

logger = logging.getLogger(__name__)


def _run_cmd(cmd: list[str], timeout: int = 15) -> str:
    """Run a command and return stdout, or empty string on failure."""
    try:
        result = subprocess.run(
            cmd, capture_output=True, text=True, timeout=timeout,
            encoding='utf-8', errors='replace'
        )
        return result.stdout.strip()
    except Exception:
        return ''


def _parse_semver(version_str: str) -> str:
    """Extract clean version number from version command output."""
    if not version_str:
        return 'unknown'
    # Handle "v1.2.3" → "1.2.3", "Python 3.12.7" → "3.12.7"
    import re
    match = re.search(r'(\d+\.\d+[\.\d]*)', version_str)
    return match.group(1) if match else version_str.strip()


def _get_registry_version(key_path: str, value_name: str = 'DisplayVersion',
                           hive=winreg.HKEY_LOCAL_MACHINE) -> str:
    """Read a version string from the Windows Registry."""
    try:
        with winreg.OpenKey(hive, key_path) as key:
            value, _ = winreg.QueryValueEx(key, value_name)
            return str(value)
    except (FileNotFoundError, OSError, WindowsError):
        return 'unknown'


class ScoutAgent(BaseAgent):
    name = 'scout'
    display_name = 'Scout'

    def scan(self) -> dict:
        """Check software versions and return a ScoutPayload dict."""
        self.logger.info("Starting Scout scan...")
        findings = []

        # --- Core dev tools ---
        node = self._check_node()
        if node['finding']:
            findings.append(node['finding'])

        python_info = self._check_python()
        if python_info['finding']:
            findings.append(python_info['finding'])

        git_info = self._check_git()
        if git_info['finding']:
            findings.append(git_info['finding'])

        vscode = self._check_vscode()
        if vscode['finding']:
            findings.append(vscode['finding'])

        # --- Audio tools (always explicit_approval) ---
        reaper = self._check_reaper()
        if reaper['finding']:
            findings.append(reaper['finding'])

        # --- Chrome ---
        chrome = self._check_chrome()
        if chrome['finding']:
            findings.append(chrome['finding'])

        # --- npm outdated (active projects) ---
        npm_findings = self._check_npm_outdated()
        findings.extend(npm_findings['findings'])

        # --- pip outdated ---
        pip_findings = self._check_pip_outdated()
        findings.extend(pip_findings['findings'])

        # Count security-related findings
        security_patches = sum(1 for f in findings if f.get('isSecurityRelated', False))
        critical_updates = sum(1 for f in findings if f.get('severity') == 'high')

        metrics = {
            'totalUpdatesAvailable': len(findings),
            'criticalUpdates': critical_updates,
            'securityPatches': security_patches,
            'reaperVersion': reaper['version_info'],
            'nodeVersion': node['version_info'],
            'pythonVersion': python_info['version_info'],
            'vulnerablePackageCount': pip_findings['vulnerable_count'] + npm_findings['vulnerable_count'],
        }

        status = self.determine_status(findings)
        self.logger.info(
            "Scout scan complete. Status: %s, Updates: %d, Security patches: %d",
            status, len(findings), security_patches
        )
        self.log_action('scan', 'software versions', 'success',
                        f"{len(findings)} updates available, {security_patches} security patches")

        return {
            'status': status,
            'findings': findings,
            'metrics': metrics,
        }

    def _check_node(self) -> dict:
        """Check Node.js version."""
        current = _parse_semver(_run_cmd(['node', '--version']))
        # Latest LTS as of knowledge cutoff — Scout reports current vs available
        latest_lts = '22.0.0'  # Placeholder; real check would use registry or npm

        version_info = {
            'current': current,
            'latestLTS': latest_lts,
            'daysBehind': 0,
        }

        finding = None
        if current == 'unknown':
            finding = self._make_finding(
                category='runtime',
                software_name='Node.js',
                current_version='Not installed',
                latest_version=latest_lts,
                description='Node.js is not found in PATH.',
                severity='low',
                is_security=False,
                approval_level='approval_recommended',
                suggested_action='Install Node.js LTS from nodejs.org',
                project_path=None,
                release_notes_url=None,
            )
        elif current < latest_lts:
            # Simple string comparison — works for semver majors
            current_major = int(current.split('.')[0]) if current[0].isdigit() else 0
            latest_major = int(latest_lts.split('.')[0])
            if current_major < latest_major - 1:
                finding = self._make_finding(
                    category='runtime',
                    software_name='Node.js',
                    current_version=current,
                    latest_version=latest_lts,
                    description=f'Node.js {current} is outdated. LTS is {latest_lts}.',
                    severity='medium',
                    is_security=False,
                    approval_level='approval_recommended',
                    suggested_action=f'Update Node.js to LTS version {latest_lts}.',
                    project_path=None,
                    release_notes_url=None,
                )

        return {'finding': finding, 'version_info': version_info}

    def _check_python(self) -> dict:
        """Check Python version."""
        current = _parse_semver(_run_cmd(['python', '--version']))
        latest = '3.13.0'  # Latest stable as of knowledge cutoff

        version_info = {
            'current': current,
            'latest': latest,
            'daysBehind': 0,
        }

        finding = None
        if current not in ('unknown', '') and current < latest:
            # Only flag if it's a major version behind
            cur_parts = current.split('.')
            lat_parts = latest.split('.')
            if len(cur_parts) >= 2 and len(lat_parts) >= 2:
                if cur_parts[0] < lat_parts[0] or (cur_parts[0] == lat_parts[0] and cur_parts[1] < lat_parts[1]):
                    finding = self._make_finding(
                        category='runtime',
                        software_name='Python',
                        current_version=current,
                        latest_version=latest,
                        description=f'Python {current} is installed. Latest stable is {latest}.',
                        severity='low',
                        is_security=False,
                        approval_level='approval_recommended',
                        suggested_action=f'Update Python to {latest} for latest security fixes and features.',
                        project_path=None,
                        release_notes_url=None,
                    )

        return {'finding': finding, 'version_info': version_info}

    def _check_git(self) -> dict:
        """Check Git version."""
        current = _parse_semver(_run_cmd(['git', '--version']))
        finding = None
        # Git is generally fine if installed; only flag if very old
        return {'finding': finding, 'version': current}

    def _check_vscode(self) -> dict:
        """Check VS Code version."""
        current = _parse_semver(_run_cmd(['code', '--version']))
        finding = None
        # VS Code auto-updates; just report current
        return {'finding': finding, 'version': current}

    def _check_reaper(self) -> dict:
        """Check REAPER version from registry. ALWAYS explicit_approval."""
        current = 'unknown'

        # Try common registry paths for REAPER
        registry_paths = [
            r'SOFTWARE\REAPER',
            r'SOFTWARE\WOW6432Node\REAPER',
            r'SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\REAPER',
        ]
        for path in registry_paths:
            ver = _get_registry_version(path, 'DisplayVersion')
            if ver != 'unknown':
                current = ver
                break
            # Try alternate value name
            ver = _get_registry_version(path, 'Version')
            if ver != 'unknown':
                current = ver
                break

        # Check install directory as fallback
        if current == 'unknown':
            reaper_dirs = [
                r'C:\Program Files\REAPER (x64)',
                r'C:\Program Files\REAPER',
                r'C:\Program Files (x86)\REAPER',
            ]
            for d in reaper_dirs:
                from pathlib import Path
                exe = Path(d) / 'reaper.exe'
                if exe.exists():
                    current = 'installed'  # Can't easily get version from exe without pywin32
                    break

        latest = '7.0'  # Approximate; real system would check REAPER's version server
        version_info = {
            'current': current,
            'latest': latest,
            'daysBehind': 0,
        }

        finding = None
        # NOTE: Reaper updates always require explicit approval — audio tool policy
        # We only add a finding if we can confirm it's outdated
        # Since we can't reliably check latest online, we report version only

        return {'finding': finding, 'version_info': version_info}

    def _check_chrome(self) -> dict:
        """Check Chrome version from registry."""
        current = _get_registry_version(
            r'SOFTWARE\Google\Chrome\BLBeacon',
            'version',
            winreg.HKEY_CURRENT_USER
        )
        if current == 'unknown':
            current = _get_registry_version(
                r'SOFTWARE\WOW6432Node\Google\Update\Clients\{8A69D345-D564-463c-AFF1-A69D9E530F96}',
                'pv'
            )

        finding = None
        return {'finding': finding, 'version': current}

    def _check_npm_outdated(self) -> dict:
        """Check for outdated npm packages in active projects."""
        findings = []
        vulnerable_count = 0

        from pathlib import Path
        web_forge = Path(r'C:\Users\david\Documents\dead-pixel-design\web-forge')
        if not web_forge.exists():
            return {'findings': findings, 'vulnerable_count': 0}

        # Find package.json files (only top-level projects, not node_modules)
        package_jsons = []
        try:
            for pkg in web_forge.rglob('package.json'):
                # Skip node_modules
                if 'node_modules' in str(pkg):
                    continue
                package_jsons.append(pkg.parent)
        except (PermissionError, OSError):
            pass

        # Check up to 3 projects to keep scan fast
        for project_dir in package_jsons[:3]:
            try:
                raw = subprocess.run(
                    ['npm', 'outdated', '--json'],
                    capture_output=True, text=True, timeout=30,
                    cwd=str(project_dir), encoding='utf-8', errors='replace'
                )
                if raw.stdout.strip():
                    outdated = json.loads(raw.stdout)
                    for pkg_name, info in outdated.items():
                        current_ver = info.get('current', 'unknown')
                        latest_ver = info.get('latest', 'unknown')
                        # Flag as security-related if package name suggests it
                        is_security = any(kw in pkg_name.lower()
                                         for kw in ['auth', 'crypto', 'ssl', 'tls', 'jwt', 'bcrypt'])
                        if is_security:
                            vulnerable_count += 1

                        finding = self._make_finding(
                            category='npm_package',
                            software_name=pkg_name,
                            current_version=current_ver,
                            latest_version=latest_ver,
                            description=f'npm package {pkg_name} is outdated ({current_ver} → {latest_ver}) in {project_dir.name}.',
                            severity='high' if is_security else 'low',
                            is_security=is_security,
                            approval_level='approval_recommended',
                            suggested_action=f'Run: cd {project_dir.name} && npm update {pkg_name}',
                            project_path=str(project_dir),
                            release_notes_url=None,
                        )
                        findings.append(finding)
            except (subprocess.TimeoutExpired, json.JSONDecodeError, Exception):
                pass

        return {'findings': findings, 'vulnerable_count': vulnerable_count}

    def _check_pip_outdated(self) -> dict:
        """Check for outdated pip packages."""
        findings = []
        vulnerable_count = 0

        # Security-sensitive packages to always flag if outdated
        SECURITY_PACKAGES = {
            'cryptography', 'paramiko', 'requests', 'urllib3', 'certifi',
            'pyopenssl', 'pycryptodome', 'pyjwt', 'bcrypt', 'flask', 'django',
        }

        try:
            raw = subprocess.run(
                ['pip', 'list', '--outdated', '--format=json'],
                capture_output=True, text=True, timeout=30,
                encoding='utf-8', errors='replace'
            )
            if raw.stdout.strip():
                outdated = json.loads(raw.stdout)
                for pkg in outdated[:10]:  # Cap at 10 to avoid noise
                    pkg_name = pkg.get('name', '')
                    current_ver = pkg.get('version', 'unknown')
                    latest_ver = pkg.get('latest_version', 'unknown')
                    is_security = pkg_name.lower() in SECURITY_PACKAGES

                    if is_security:
                        vulnerable_count += 1

                    if is_security:  # Only report security-sensitive packages
                        finding = self._make_finding(
                            category='pip_package',
                            software_name=pkg_name,
                            current_version=current_ver,
                            latest_version=latest_ver,
                            description=f'Security-relevant pip package {pkg_name} is outdated ({current_ver} → {latest_ver}).',
                            severity='high',
                            is_security=True,
                            approval_level='approval_recommended',
                            suggested_action=f'Run: pip install --upgrade {pkg_name}',
                            project_path=None,
                            release_notes_url=None,
                        )
                        findings.append(finding)
        except (subprocess.TimeoutExpired, json.JSONDecodeError, Exception):
            pass

        return {'findings': findings, 'vulnerable_count': vulnerable_count}

    def _make_finding(
        self,
        category: str,
        software_name: str,
        current_version: str,
        latest_version: str,
        description: str,
        severity: str,
        is_security: bool,
        approval_level: str,
        suggested_action: str,
        project_path,
        release_notes_url,
    ) -> dict:
        """Build a ScoutFinding dict matching the TypeScript interface."""
        return {
            'id': str(uuid.uuid4()),
            'category': category,
            'description': description,
            'softwareName': software_name,
            'currentVersion': current_version,
            'latestVersion': latest_version,
            'releaseNotesUrl': release_notes_url,
            'isSecurityRelated': is_security,
            'severity': severity,
            'approvalLevel': approval_level,
            'suggestedAction': suggested_action,
            'projectPath': project_path,
            'status': 'pending',
        }


if __name__ == '__main__':
    import json
    logging.basicConfig(level=logging.INFO, format='%(levelname)s %(name)s: %(message)s')
    agent = ScoutAgent(dry_run=True)
    result = agent.scan()
    print(json.dumps(result, indent=2))
