"""
Archivist Agent — File Organization & Structure Analysis
Detects misplaced files, desktop clutter, orphaned assets, and git project health.

Never auto-executes. ALL proposals go to the approval queue.
"""
import os
import sys
import uuid
import time
import logging
from pathlib import Path
from collections import defaultdict

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agents.base_agent import BaseAgent
from core import powershell

logger = logging.getLogger(__name__)

USER_DIR = Path(r'C:\Users\david')

# File type categories for misplacement detection
AUDIO_EXTENSIONS = {'.wav', '.aif', '.aiff', '.flac', '.mp3', '.ogg', '.mid', '.midi', '.rpp', '.rpp-bak'}
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.psd', '.ai', '.tiff'}
VIDEO_EXTENSIONS = {'.mp4', '.mov', '.avi', '.mkv', '.wmv', '.webm'}
CODE_EXTENSIONS = {'.py', '.js', '.ts', '.jsx', '.tsx', '.html', '.css', '.json', '.yml', '.yaml', '.sh', '.lua'}
DOC_EXTENSIONS = {'.docx', '.xlsx', '.pptx', '.pdf', '.doc', '.txt', '.md'}

DESKTOP_AGE_ALERT_DAYS = 7
PROJECT_STALE_DAYS = 60


class ArchivistAgent(BaseAgent):
    name = 'archivist'
    display_name = 'Archivist'

    def scan(self) -> dict:
        """Scan file organization and return an ArchivistPayload dict."""
        self.logger.info("Starting Archivist scan...")
        findings = []

        # --- Desktop file age ---
        desktop = self._scan_desktop()
        findings.extend(desktop['findings'])

        # --- Misplaced files ---
        misplaced = self._find_misplaced_files()
        findings.extend(misplaced['findings'])

        # --- Git project health ---
        projects = self._scan_git_projects()
        findings.extend(projects['findings'])

        # --- File type distribution (informational) ---
        distribution = self._get_file_distribution()

        # Calculate organizational score (0-100)
        score = self._calculate_score(
            misplaced_count=misplaced['count'],
            desktop_old_count=desktop['old_count'],
            stale_projects=projects['stale_count'],
        )

        metrics = {
            'organizationalScore': score,
            'organizationalScoreTrend': 'flat',
            'misplacedFileCount': misplaced['count'],
            'desktopFileCount': desktop['file_count'],
            'desktopOldestFileDays': desktop['oldest_days'],
            'migrationQueueCount': misplaced['count'],
            'structureCompliancePercent': max(0, score),
        }

        status = self.determine_status(findings)
        self.logger.info(
            "Archivist scan complete. Status: %s, Score: %d/100, Findings: %d",
            status, score, len(findings)
        )
        self.log_action('scan', 'file organization', 'success',
                        f"Organizational score: {score}/100, {misplaced['count']} misplaced files")

        return {
            'status': status,
            'findings': findings,
            'metrics': metrics,
        }

    def _scan_desktop(self) -> dict:
        """Scan Desktop for old files and clutter."""
        findings = []
        desktop_dir = USER_DIR / 'Desktop'
        file_count = 0
        old_count = 0
        oldest_days = 0
        now = time.time()

        if not desktop_dir.exists():
            return {'findings': findings, 'file_count': 0, 'old_count': 0, 'oldest_days': 0}

        old_files = []
        try:
            for item in desktop_dir.iterdir():
                if item.is_file():
                    try:
                        file_count += 1
                        age_days = (now - item.stat().st_mtime) / 86400
                        oldest_days = max(oldest_days, int(age_days))
                        if age_days > DESKTOP_AGE_ALERT_DAYS:
                            old_count += 1
                            old_files.append((item.name, int(age_days)))
                    except (OSError, PermissionError):
                        pass
        except (PermissionError, OSError):
            pass

        if old_count > 0:
            files_str = ', '.join(f"{n} ({d}d)" for n, d in old_files[:5])
            finding = self._make_finding(
                category='desktop_clutter',
                description=f'{old_count} Desktop file(s) older than {DESKTOP_AGE_ALERT_DAYS} days: {files_str}',
                source_path=str(desktop_dir),
                suggested_path=None,
                file_count=old_count,
                file_types=['.lnk', '.txt', '.pdf'],
                size_bytes=0,
                severity='low' if old_count <= 5 else 'medium',
                approval_level='approval_recommended',
                suggested_action='Move old Desktop files to appropriate folders or delete them.',
            )
            findings.append(finding)
            self.queue_for_approval(
                action='Organize Desktop files',
                target=str(desktop_dir),
                risk='low',
                benefit=f'Moves {old_count} old files off the Desktop to appropriate locations.',
                approval_level='approval_recommended',
                description=f'{old_count} files on Desktop are older than {DESKTOP_AGE_ALERT_DAYS} days. These should be organized.',
                reversible=True,
                category='organization',
            )

        return {
            'findings': findings,
            'file_count': file_count,
            'old_count': old_count,
            'oldest_days': oldest_days,
        }

    def _find_misplaced_files(self) -> dict:
        """Find files that are in the wrong location (audio in Downloads, etc.)."""
        findings = []
        misplaced_count = 0

        # Check Downloads for audio/video files that should be in Music/Videos
        downloads_dir = USER_DIR / 'Downloads'
        misplaced_audio = []
        misplaced_video = []

        if downloads_dir.exists():
            try:
                for item in downloads_dir.iterdir():
                    if not item.is_file():
                        continue
                    ext = item.suffix.lower()
                    if ext in AUDIO_EXTENSIONS:
                        misplaced_audio.append(item)
                    elif ext in VIDEO_EXTENSIONS:
                        misplaced_video.append(item)
            except (PermissionError, OSError):
                pass

        if misplaced_audio:
            misplaced_count += len(misplaced_audio)
            finding = self._make_finding(
                category='misplaced_files',
                description=f'{len(misplaced_audio)} audio file(s) found in Downloads folder. These belong in Music or a project folder.',
                source_path=str(downloads_dir),
                suggested_path=str(USER_DIR / 'Music'),
                file_count=len(misplaced_audio),
                file_types=list({f.suffix.lower() for f in misplaced_audio}),
                size_bytes=sum(f.stat().st_size for f in misplaced_audio if f.exists()),
                severity='low',
                approval_level='approval_recommended',
                suggested_action='Move audio files from Downloads to Music or your audio project folder.',
            )
            findings.append(finding)
            self.queue_for_approval(
                action='Move audio files to Music folder',
                target=str(downloads_dir),
                risk='low',
                benefit=f'Organizes {len(misplaced_audio)} audio files from Downloads into Music folder.',
                approval_level='approval_recommended',
                description=f'{len(misplaced_audio)} audio files found in Downloads. Move to Music or a project folder.',
                reversible=True,
                category='organization',
            )

        if misplaced_video:
            misplaced_count += len(misplaced_video)
            finding = self._make_finding(
                category='misplaced_files',
                description=f'{len(misplaced_video)} video file(s) found in Downloads. These belong in Videos.',
                source_path=str(downloads_dir),
                suggested_path=str(USER_DIR / 'Videos'),
                file_count=len(misplaced_video),
                file_types=list({f.suffix.lower() for f in misplaced_video}),
                size_bytes=sum(f.stat().st_size for f in misplaced_video if f.exists()),
                severity='low',
                approval_level='approval_recommended',
                suggested_action='Move video files from Downloads to the Videos folder.',
            )
            findings.append(finding)

        # Check Desktop for code files that belong in projects
        desktop_dir = USER_DIR / 'Desktop'
        desktop_code = []
        if desktop_dir.exists():
            try:
                for item in desktop_dir.iterdir():
                    if item.is_file() and item.suffix.lower() in CODE_EXTENSIONS:
                        desktop_code.append(item)
            except (PermissionError, OSError):
                pass

        if desktop_code:
            misplaced_count += len(desktop_code)
            finding = self._make_finding(
                category='misplaced_files',
                description=f'{len(desktop_code)} code file(s) on Desktop. Code files belong in project folders, not the Desktop.',
                source_path=str(desktop_dir),
                suggested_path=str(Path(r'C:\Users\david\Documents\dead-pixel-design')),
                file_count=len(desktop_code),
                file_types=list({f.suffix.lower() for f in desktop_code}),
                size_bytes=sum(f.stat().st_size for f in desktop_code if f.exists()),
                severity='low',
                approval_level='approval_recommended',
                suggested_action='Move code files from Desktop to the appropriate project folder.',
            )
            findings.append(finding)

        return {'findings': findings, 'count': misplaced_count}

    def _scan_git_projects(self) -> dict:
        """Find git projects and check if they're active or stale."""
        findings = []
        stale_count = 0
        now = time.time()

        # Look for git projects in the web-forge workspace
        search_roots = [
            Path(r'C:\Users\david\Documents\dead-pixel-design\web-forge'),
        ]

        stale_projects = []
        active_projects = []

        for root in search_roots:
            if not root.exists():
                continue
            try:
                for git_dir in root.rglob('.git'):
                    if not git_dir.is_dir():
                        continue
                    project_dir = git_dir.parent
                    # Skip nested .git (submodules)
                    if git_dir.parent.parent != root and git_dir.parent.parent.parent != root:
                        continue

                    commit_msg = git_dir / 'COMMIT_EDITMSG'
                    if commit_msg.exists():
                        try:
                            age_days = (now - commit_msg.stat().st_mtime) / 86400
                            if age_days > PROJECT_STALE_DAYS:
                                stale_projects.append((project_dir, int(age_days)))
                                stale_count += 1
                            else:
                                active_projects.append((project_dir, int(age_days)))
                        except (OSError, PermissionError):
                            pass
            except (PermissionError, OSError):
                pass

        if stale_projects:
            projects_str = ', '.join(p.name for p, _ in stale_projects[:5])
            finding = self._make_finding(
                category='stale_projects',
                description=f'{stale_count} git project(s) with no commits in {PROJECT_STALE_DAYS}+ days: {projects_str}',
                source_path=str(search_roots[0]) if search_roots else '',
                suggested_path=None,
                file_count=stale_count,
                file_types=['.git'],
                size_bytes=0,
                severity='low',
                approval_level='approval_recommended',
                suggested_action='Archive or remove stale projects that are no longer active.',
            )
            findings.append(finding)

        return {'findings': findings, 'stale_count': stale_count}

    def _get_file_distribution(self) -> dict:
        """Get a rough count of file types across common user directories."""
        distribution = defaultdict(int)
        scan_dirs = [
            USER_DIR / 'Downloads',
            USER_DIR / 'Desktop',
        ]
        for scan_dir in scan_dirs:
            if not scan_dir.exists():
                continue
            try:
                for item in scan_dir.iterdir():
                    if item.is_file():
                        ext = item.suffix.lower()
                        if ext in AUDIO_EXTENSIONS:
                            distribution['audio'] += 1
                        elif ext in IMAGE_EXTENSIONS:
                            distribution['images'] += 1
                        elif ext in VIDEO_EXTENSIONS:
                            distribution['video'] += 1
                        elif ext in CODE_EXTENSIONS:
                            distribution['code'] += 1
                        elif ext in DOC_EXTENSIONS:
                            distribution['documents'] += 1
                        else:
                            distribution['other'] += 1
            except (PermissionError, OSError):
                pass
        return dict(distribution)

    def _calculate_score(self, misplaced_count: int, desktop_old_count: int, stale_projects: int) -> int:
        """
        Organizational score (0-100):
        - Start at 100
        - Deduct for misplaced files (-5 per file, max -40)
        - Deduct for old desktop files (-3 per file, max -20)
        - Deduct for stale projects (-5 per project, max -20)
        """
        score = 100
        score -= min(40, misplaced_count * 5)
        score -= min(20, desktop_old_count * 3)
        score -= min(20, stale_projects * 5)
        return max(0, score)

    def _make_finding(
        self,
        category: str,
        description: str,
        source_path: str,
        suggested_path,
        file_count: int,
        file_types: list,
        size_bytes: int,
        severity: str,
        approval_level: str,
        suggested_action: str,
    ) -> dict:
        """Build an ArchivistFinding dict matching the TypeScript interface."""
        return {
            'id': str(uuid.uuid4()),
            'category': category,
            'description': description,
            'sourcePath': source_path,
            'suggestedPath': suggested_path,
            'fileCount': file_count,
            'fileTypes': file_types,
            'sizeBytes': size_bytes,
            'severity': severity,
            'approvalLevel': approval_level,
            'suggestedAction': suggested_action,
            'status': 'pending',
        }


if __name__ == '__main__':
    import json
    logging.basicConfig(level=logging.INFO, format='%(levelname)s %(name)s: %(message)s')
    agent = ArchivistAgent(dry_run=True)
    result = agent.scan()
    print(json.dumps(result, indent=2))
