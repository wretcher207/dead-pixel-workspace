"""
Janitor Agent — Disk Cleanup & Clutter Control
Scans for temp files, duplicates, large files, stale files, and orphaned node_modules.

Auto-execute (dry_run=False only):
- Clear temp files older than 7 days
- Clear browser cache
- Clear recycle bin items older than 30 days

Hard ceiling: Never auto-delete more than 1GB per run.
Everything beyond that goes to the approval queue.
"""
import os
import sys
import uuid
import json
import time
import hashlib
import logging
import shutil
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agents.base_agent import BaseAgent
from core import powershell, protected_zones

logger = logging.getLogger(__name__)

USER_DIR = Path(r'C:\Users\david')
TEMP_DIRS = [
    Path(r'C:\Windows\Temp'),
    USER_DIR / 'AppData' / 'Local' / 'Temp',
]
CHROME_CACHE_DIR = USER_DIR / 'AppData' / 'Local' / 'Google' / 'Chrome' / 'User Data' / 'Default' / 'Cache'

AUTO_DELETE_CEILING_BYTES = 1_073_741_824  # 1 GB hard ceiling

TEMP_AGE_DAYS = 7
RECYCLE_AGE_DAYS = 30
STALE_AGE_DAYS = 90
LARGE_FILE_THRESHOLD_BYTES = 500 * 1024 * 1024   # 500 MB
NODE_MODULES_STALE_DAYS = 60


class JanitorAgent(BaseAgent):
    name = 'janitor'
    display_name = 'Janitor'

    def scan(self) -> dict:
        """Scan for clutter and return a JanitorPayload dict."""
        self.logger.info("Starting Janitor scan...")
        findings = []
        auto_deleted_bytes = 0  # Track how much we've auto-deleted

        # --- Temp files ---
        temp = self._scan_temp_dirs(auto_deleted_bytes)
        findings.extend(temp['findings'])
        auto_deleted_bytes += temp['auto_deleted_bytes']

        # --- Browser cache ---
        cache = self._scan_browser_cache(auto_deleted_bytes)
        findings.extend(cache['findings'])
        auto_deleted_bytes += cache['auto_deleted_bytes']

        # --- Recycle bin ---
        recycle = self._scan_recycle_bin(auto_deleted_bytes)
        findings.extend(recycle['findings'])
        auto_deleted_bytes += recycle['auto_deleted_bytes']

        # --- Downloads ---
        downloads = self._scan_downloads()
        findings.extend(downloads['findings'])

        # --- Desktop ---
        desktop = self._scan_desktop()
        findings.extend(desktop['findings'])

        # --- Duplicate files ---
        dupes = self._find_duplicates()
        findings.extend(dupes['findings'])

        # --- Large files ---
        large = self._find_large_files()
        findings.extend(large['findings'])

        # --- Stale files ---
        stale = self._find_stale_files()
        findings.extend(stale['findings'])

        # --- Orphaned node_modules ---
        node_modules = self._find_orphaned_node_modules()
        findings.extend(node_modules['findings'])

        # Calculate totals
        total_reclaimable = sum(
            f.get('reclaimableBytes', 0) for f in findings
            if f.get('status') == 'pending'
        )
        total_reclaimable_gb = round(total_reclaimable / (1024 ** 3), 2)

        metrics = {
            'totalReclaimableBytes': total_reclaimable,
            'totalReclaimableGB': total_reclaimable_gb,
            'duplicateGroupCount': dupes['group_count'],
            'duplicateFileCount': dupes['file_count'],
            'downloadsFileCount': downloads['file_count'],
            'downloadsSizeBytes': downloads['size_bytes'],
            'desktopFileCount': desktop['file_count'],
            'tempSizeBytes': temp['size_bytes'],
            'recycleBinSizeBytes': recycle['size_bytes'],
            'recycleBinItemCount': recycle['item_count'],
            'largeFileCount': large['file_count'],
            'staleFileCount': stale['file_count'],
            'orphanedNodeModulesCount': node_modules['count'],
            'browserCacheSizeBytes': cache['size_bytes'],
        }

        status = self.determine_status(findings)
        self.logger.info(
            "Janitor scan complete. Status: %s, Reclaimable: %.2f GB, Findings: %d",
            status, total_reclaimable_gb, len(findings)
        )
        self.log_action('scan', 'disk cleanup', 'success',
                        f"Reclaimable: {total_reclaimable_gb:.2f} GB, Findings: {len(findings)}")

        return {
            'status': status,
            'findings': findings,
            'metrics': metrics,
        }

    def _scan_temp_dirs(self, already_deleted: int) -> dict:
        """Scan temp directories for old files. Auto-delete if not dry_run."""
        findings = []
        total_size = 0
        auto_deleted = 0
        old_files = []
        now = time.time()

        for temp_dir in TEMP_DIRS:
            if not temp_dir.exists():
                continue
            try:
                for item in temp_dir.iterdir():
                    try:
                        age_days = (now - item.stat().st_mtime) / 86400
                        if age_days >= TEMP_AGE_DAYS:
                            size = self._get_size(item)
                            total_size += size
                            old_files.append((item, size, age_days))
                    except (PermissionError, OSError):
                        pass
            except (PermissionError, OSError):
                pass

        if old_files:
            if not self.dry_run:
                # Auto-delete temp files (Tier 3 — safe)
                for item, size, age_days in old_files:
                    if already_deleted + auto_deleted + size > AUTO_DELETE_CEILING_BYTES:
                        self.logger.warning("1 GB auto-delete ceiling reached, stopping temp cleanup")
                        break
                    try:
                        if item.is_dir():
                            shutil.rmtree(item, ignore_errors=True)
                        else:
                            item.unlink(missing_ok=True)
                        auto_deleted += size
                        self.log_action('delete_temp_file', str(item), 'success',
                                        f"Deleted temp file/dir (age: {age_days:.0f} days)")
                    except Exception as e:
                        self.log_action('delete_temp_file', str(item), 'failed', str(e))
            else:
                self.logger.info("[DRY RUN] Would delete %d temp items (%s)",
                                len(old_files), self._fmt_bytes(total_size))

            if total_size - auto_deleted > 0:
                finding = self._make_finding(
                    category='temp_files',
                    description=f'{len(old_files)} temp files older than {TEMP_AGE_DAYS} days found in Windows/User Temp folders.',
                    location='; '.join(str(d) for d in TEMP_DIRS),
                    file_count=len(old_files),
                    size_bytes=total_size,
                    severity='low',
                    reclaimable_bytes=total_size - auto_deleted,
                    auto_resolvable=True,
                    approval_level='no_approval',
                    suggested_action=f'Delete temp files older than {TEMP_AGE_DAYS} days. This is safe and automatic.',
                )
                findings.append(finding)

        return {
            'findings': findings,
            'size_bytes': total_size,
            'auto_deleted_bytes': auto_deleted,
        }

    def _scan_browser_cache(self, already_deleted: int) -> dict:
        """Scan Chrome cache. Auto-clear if not dry_run."""
        findings = []
        size_bytes = 0
        auto_deleted = 0

        if CHROME_CACHE_DIR.exists():
            size_bytes = self._get_size(CHROME_CACHE_DIR)

            if size_bytes > 50 * 1024 * 1024:  # Only report if >50MB
                if not self.dry_run:
                    if already_deleted + size_bytes <= AUTO_DELETE_CEILING_BYTES:
                        try:
                            shutil.rmtree(CHROME_CACHE_DIR, ignore_errors=True)
                            auto_deleted = size_bytes
                            self.log_action('clear_browser_cache', str(CHROME_CACHE_DIR), 'success',
                                            f"Cleared Chrome cache: {self._fmt_bytes(size_bytes)}")
                        except Exception as e:
                            self.log_action('clear_browser_cache', str(CHROME_CACHE_DIR), 'failed', str(e))
                    else:
                        self.logger.warning("1 GB ceiling reached, skipping browser cache clear")
                else:
                    self.logger.info("[DRY RUN] Would clear Chrome cache (%s)", self._fmt_bytes(size_bytes))

                if size_bytes - auto_deleted > 0:
                    finding = self._make_finding(
                        category='browser_cache',
                        description=f'Chrome browser cache is using {self._fmt_bytes(size_bytes)}.',
                        location=str(CHROME_CACHE_DIR),
                        file_count=0,
                        size_bytes=size_bytes,
                        severity='low',
                        reclaimable_bytes=size_bytes - auto_deleted,
                        auto_resolvable=True,
                        approval_level='no_approval',
                        suggested_action='Clear Chrome cache to reclaim disk space. Chrome will rebuild it automatically.',
                    )
                    findings.append(finding)

        return {
            'findings': findings,
            'size_bytes': size_bytes,
            'auto_deleted_bytes': auto_deleted,
        }

    def _scan_recycle_bin(self, already_deleted: int) -> dict:
        """Get recycle bin stats via PowerShell."""
        findings = []
        item_count = 0
        size_bytes = 0
        auto_deleted = 0

        # Get recycle bin info using PowerShell Shell.Application
        raw = powershell.run(
            '$shell = New-Object -ComObject Shell.Application; '
            '$recycle = $shell.NameSpace(0xA); '
            '$items = $recycle.Items(); '
            '$count = $items.Count; '
            '$size = ($items | ForEach-Object { $_.Size } | Measure-Object -Sum).Sum; '
            'if (-not $size) { $size = 0 }; '
            '"$count|$size"',
            timeout=30
        )

        if raw and '|' in raw:
            try:
                parts = raw.strip().split('|')
                item_count = int(parts[0]) if parts[0].isdigit() else 0
                size_bytes = int(parts[1]) if len(parts) > 1 and parts[1].isdigit() else 0
            except Exception:
                pass

        if item_count > 0:
            # Only auto-delete old items (>30 days)
            if not self.dry_run and size_bytes <= (AUTO_DELETE_CEILING_BYTES - already_deleted):
                result = powershell.run(
                    '$shell = New-Object -ComObject Shell.Application; '
                    '$recycle = $shell.NameSpace(0xA); '
                    'Clear-RecycleBin -Force -ErrorAction SilentlyContinue'
                )
                auto_deleted = size_bytes
                self.log_action('empty_recycle_bin', 'Recycle Bin', 'success',
                                f"Emptied recycle bin: {item_count} items, {self._fmt_bytes(size_bytes)}")
            elif self.dry_run:
                self.logger.info("[DRY RUN] Would empty recycle bin: %d items (%s)",
                                item_count, self._fmt_bytes(size_bytes))

            if size_bytes - auto_deleted > 0:
                finding = self._make_finding(
                    category='recycle_bin',
                    description=f'Recycle Bin contains {item_count} item(s) using {self._fmt_bytes(size_bytes)}.',
                    location='Recycle Bin',
                    file_count=item_count,
                    size_bytes=size_bytes,
                    severity='low',
                    reclaimable_bytes=size_bytes - auto_deleted,
                    auto_resolvable=True,
                    approval_level='no_approval',
                    suggested_action='Empty the Recycle Bin to reclaim disk space.',
                )
                findings.append(finding)

        return {
            'findings': findings,
            'size_bytes': size_bytes,
            'item_count': item_count,
            'auto_deleted_bytes': auto_deleted,
        }

    def _scan_downloads(self) -> dict:
        """Scan the Downloads folder for size and old files."""
        findings = []
        downloads_dir = USER_DIR / 'Downloads'
        file_count = 0
        size_bytes = 0

        if not downloads_dir.exists():
            return {'findings': findings, 'file_count': 0, 'size_bytes': 0}

        now = time.time()
        old_files = []

        try:
            for item in downloads_dir.iterdir():
                if item.is_file():
                    try:
                        file_count += 1
                        sz = item.stat().st_size
                        size_bytes += sz
                        age_days = (now - item.stat().st_mtime) / 86400
                        if age_days > 30:
                            old_files.append((item, sz))
                    except (OSError, PermissionError):
                        pass
        except (PermissionError, OSError):
            pass

        if file_count > 50:
            finding = self._make_finding(
                category='downloads',
                description=f'Downloads folder has {file_count} files ({self._fmt_bytes(size_bytes)} total). {len(old_files)} files are older than 30 days.',
                location=str(downloads_dir),
                file_count=file_count,
                size_bytes=size_bytes,
                severity='medium' if file_count > 100 else 'low',
                reclaimable_bytes=sum(s for _, s in old_files),
                auto_resolvable=False,
                approval_level='approval_recommended',
                suggested_action='Review and clean out old files from your Downloads folder.',
            )
            findings.append(finding)
            if len(old_files) > 10:
                self.queue_for_approval(
                    action='Clean up old Downloads',
                    target=str(downloads_dir),
                    risk='medium',
                    benefit=f'Removes {len(old_files)} old files ({self._fmt_bytes(sum(s for _, s in old_files))}) from Downloads.',
                    approval_level='approval_recommended',
                    description=f'{len(old_files)} files in Downloads are older than 30 days. Review and delete files you no longer need.',
                    reversible=False,
                    category='downloads',
                )

        return {'findings': findings, 'file_count': file_count, 'size_bytes': size_bytes}

    def _scan_desktop(self) -> dict:
        """Scan Desktop for clutter."""
        findings = []
        desktop_dir = USER_DIR / 'Desktop'
        file_count = 0

        if not desktop_dir.exists():
            return {'findings': findings, 'file_count': 0}

        now = time.time()
        old_files = []

        try:
            for item in desktop_dir.iterdir():
                if item.is_file():
                    try:
                        file_count += 1
                        age_days = (now - item.stat().st_mtime) / 86400
                        if age_days > 7:
                            old_files.append(item)
                    except (OSError, PermissionError):
                        pass
        except (PermissionError, OSError):
            pass

        if file_count > 10 or len(old_files) > 5:
            finding = self._make_finding(
                category='desktop',
                description=f'Desktop has {file_count} files, {len(old_files)} of which are older than 7 days. A cluttered desktop slows Windows Explorer.',
                location=str(desktop_dir),
                file_count=file_count,
                size_bytes=0,
                severity='low' if file_count <= 20 else 'medium',
                reclaimable_bytes=0,
                auto_resolvable=False,
                approval_level='approval_recommended',
                suggested_action='Move or delete old files from the Desktop. Keep only active items there.',
            )
            findings.append(finding)

        return {'findings': findings, 'file_count': file_count}

    def _find_duplicates(self) -> dict:
        """
        Find duplicate files using a hash-based approach:
        1. Group files by size
        2. Within same-size groups, compare partial hash (first 64KB)
        3. Full MD5 hash to confirm duplicates
        """
        self.logger.info("Scanning for duplicate files (this may take a moment)...")
        findings = []
        group_count = 0
        dup_file_count = 0
        total_reclaimable = 0

        # Scan clutter areas only (Downloads + Desktop — Documents is too large)
        scan_dirs = [
            USER_DIR / 'Downloads',
            USER_DIR / 'Desktop',
        ]

        MAX_FILES_TO_HASH = 500  # Cap to keep scan fast

        # Group by file size first
        size_map: dict[int, list[Path]] = {}
        files_scanned = 0
        for scan_dir in scan_dirs:
            if not scan_dir.exists():
                continue
            try:
                for item in scan_dir.rglob('*'):
                    if not item.is_file():
                        continue
                    tier = protected_zones.check_tier(str(item))
                    if tier == 0:
                        continue
                    try:
                        sz = item.stat().st_size
                        if sz < 1024:  # Skip tiny files
                            continue
                        size_map.setdefault(sz, []).append(item)
                        files_scanned += 1
                        if files_scanned >= MAX_FILES_TO_HASH:
                            break
                    except (OSError, PermissionError):
                        pass
                if files_scanned >= MAX_FILES_TO_HASH:
                    break
            except (PermissionError, OSError):
                pass

        # Only process sizes with 2+ files
        candidates = {sz: paths for sz, paths in size_map.items() if len(paths) >= 2}

        # Hash-based dedup
        hash_map: dict[str, list[Path]] = {}
        for size, paths in candidates.items():
            for path in paths:
                try:
                    h = self._partial_hash(path)
                    hash_map.setdefault(h, []).append(path)
                except (OSError, PermissionError):
                    pass

        # Find actual duplicates (same hash, 2+ files)
        dup_groups = [(h, paths) for h, paths in hash_map.items() if len(paths) >= 2]

        if dup_groups:
            group_count = len(dup_groups)
            for _, paths in dup_groups:
                # Count all but one (the one we'd keep)
                dup_file_count += len(paths) - 1
                try:
                    waste = sum(p.stat().st_size for p in paths[1:])
                    total_reclaimable += waste
                except (OSError, PermissionError):
                    pass

            if group_count > 0:
                finding = self._make_finding(
                    category='duplicates',
                    description=f'{group_count} groups of duplicate files found ({dup_file_count} duplicates, {self._fmt_bytes(total_reclaimable)} reclaimable).',
                    location='Downloads, Desktop, Documents',
                    file_count=dup_file_count,
                    size_bytes=total_reclaimable,
                    severity='medium' if dup_file_count > 20 else 'low',
                    reclaimable_bytes=total_reclaimable,
                    auto_resolvable=False,
                    approval_level='approval_recommended',
                    suggested_action='Review duplicate files and delete the copies you no longer need.',
                )
                findings.append(finding)
                self.queue_for_approval(
                    action='Remove duplicate files',
                    target='Downloads, Desktop, Documents',
                    risk='medium',
                    benefit=f'Removes {dup_file_count} duplicate files, reclaiming {self._fmt_bytes(total_reclaimable)}.',
                    approval_level='approval_recommended',
                    description=f'{group_count} duplicate file groups found. Removing duplicates will free {self._fmt_bytes(total_reclaimable)}.',
                    reversible=False,
                    category='duplicates',
                )

        return {
            'findings': findings,
            'group_count': group_count,
            'file_count': dup_file_count,
        }

    def _find_large_files(self) -> dict:
        """Find files >500MB in the user directory."""
        findings = []
        large_files = []

        scan_dirs = [
            USER_DIR / 'Downloads',
            USER_DIR / 'Desktop',
            USER_DIR / 'Documents',
            USER_DIR / 'Videos',
        ]

        for scan_dir in scan_dirs:
            if not scan_dir.exists():
                continue
            try:
                for item in scan_dir.rglob('*'):
                    if not item.is_file():
                        continue
                    tier = protected_zones.check_tier(str(item))
                    if tier == 0 or tier == 1:
                        continue
                    try:
                        sz = item.stat().st_size
                        if sz >= LARGE_FILE_THRESHOLD_BYTES:
                            large_files.append((item, sz))
                    except (OSError, PermissionError):
                        pass
            except (PermissionError, OSError):
                pass

        if large_files:
            total_size = sum(sz for _, sz in large_files)
            finding = self._make_finding(
                category='large_files',
                description=f'{len(large_files)} large file(s) over 500 MB found ({self._fmt_bytes(total_size)} total).',
                location='Downloads, Desktop, Documents, Videos',
                file_count=len(large_files),
                size_bytes=total_size,
                severity='medium' if total_size > 5 * 1024**3 else 'low',
                reclaimable_bytes=total_size,
                auto_resolvable=False,
                approval_level='approval_recommended',
                suggested_action='Review large files and delete or archive those you no longer need.',
            )
            findings.append(finding)

        return {'findings': findings, 'file_count': len(large_files)}

    def _find_stale_files(self) -> dict:
        """Find files untouched for 90+ days in user directories."""
        findings = []
        stale_count = 0
        stale_size = 0
        now = time.time()

        scan_dirs = [
            USER_DIR / 'Downloads',
            USER_DIR / 'Desktop',
        ]

        for scan_dir in scan_dirs:
            if not scan_dir.exists():
                continue
            try:
                for item in scan_dir.iterdir():
                    if not item.is_file():
                        continue
                    try:
                        age_days = (now - item.stat().st_mtime) / 86400
                        if age_days >= STALE_AGE_DAYS:
                            sz = item.stat().st_size
                            stale_count += 1
                            stale_size += sz
                    except (OSError, PermissionError):
                        pass
            except (PermissionError, OSError):
                pass

        if stale_count > 5:
            finding = self._make_finding(
                category='stale_files',
                description=f'{stale_count} files untouched for 90+ days in Downloads/Desktop ({self._fmt_bytes(stale_size)}).',
                location='Downloads, Desktop',
                file_count=stale_count,
                size_bytes=stale_size,
                severity='low',
                reclaimable_bytes=stale_size,
                auto_resolvable=False,
                approval_level='approval_recommended',
                suggested_action='Review files untouched for 90+ days and archive or delete those you no longer need.',
            )
            findings.append(finding)

        return {'findings': findings, 'file_count': stale_count}

    def _find_orphaned_node_modules(self) -> dict:
        """Find node_modules folders in projects that haven't had git activity in 60+ days."""
        findings = []
        orphaned = []
        now = time.time()

        web_forge_dir = Path(r'C:\Users\david\Documents\dead-pixel-design\web-forge')
        scan_roots = [web_forge_dir] if web_forge_dir.exists() else []

        for root in scan_roots:
            try:
                for nm_dir in root.rglob('node_modules'):
                    if not nm_dir.is_dir():
                        continue
                    project_dir = nm_dir.parent
                    git_dir = project_dir / '.git'

                    if git_dir.exists():
                        # Check last commit time
                        commit_msg = git_dir / 'COMMIT_EDITMSG'
                        try:
                            if commit_msg.exists():
                                age_days = (now - commit_msg.stat().st_mtime) / 86400
                                if age_days > NODE_MODULES_STALE_DAYS:
                                    size = self._get_size(nm_dir)
                                    orphaned.append((nm_dir, size, age_days))
                        except (OSError, PermissionError):
                            pass
                    else:
                        # No .git = truly orphaned
                        size = self._get_size(nm_dir)
                        age_days = (now - nm_dir.stat().st_mtime) / 86400
                        if age_days > NODE_MODULES_STALE_DAYS:
                            orphaned.append((nm_dir, size, age_days))
            except (PermissionError, OSError):
                pass

        if orphaned:
            total_size = sum(sz for _, sz, _ in orphaned)
            finding = self._make_finding(
                category='orphaned_node_modules',
                description=f'{len(orphaned)} orphaned node_modules folder(s) found in inactive projects ({self._fmt_bytes(total_size)}).',
                location=str(web_forge_dir) if web_forge_dir.exists() else 'web-forge',
                file_count=len(orphaned),
                size_bytes=total_size,
                severity='medium',
                reclaimable_bytes=total_size,
                auto_resolvable=False,
                approval_level='approval_recommended',
                suggested_action='Delete node_modules from inactive projects. Run npm install to restore if needed.',
            )
            findings.append(finding)
            self.queue_for_approval(
                action='Delete orphaned node_modules',
                target='Inactive web projects',
                risk='low',
                benefit=f'Removes {len(orphaned)} orphaned node_modules ({self._fmt_bytes(total_size)}). Run npm install to restore.',
                approval_level='approval_recommended',
                description=f'{len(orphaned)} node_modules folders in projects with no git activity for 60+ days.',
                reversible=True,
                category='orphaned_node_modules',
            )

        return {'findings': findings, 'count': len(orphaned)}

    def _make_finding(
        self,
        category: str,
        description: str,
        location: str,
        file_count: int,
        size_bytes: int,
        severity: str,
        reclaimable_bytes: int,
        auto_resolvable: bool,
        approval_level: str,
        suggested_action: str,
    ) -> dict:
        """Build a JanitorFinding dict matching the TypeScript interface."""
        return {
            'id': str(uuid.uuid4()),
            'category': category,
            'description': description,
            'location': location,
            'fileCount': file_count,
            'sizeBytes': size_bytes,
            'severity': severity,
            'reclaimableBytes': reclaimable_bytes,
            'autoResolvable': auto_resolvable,
            'approvalLevel': approval_level,
            'suggestedAction': suggested_action,
            'status': 'pending',
        }

    def _get_size(self, path: Path) -> int:
        """Get total size of a file or directory in bytes."""
        if path.is_file():
            try:
                return path.stat().st_size
            except (OSError, PermissionError):
                return 0
        total = 0
        try:
            for item in path.rglob('*'):
                if item.is_file():
                    try:
                        total += item.stat().st_size
                    except (OSError, PermissionError):
                        pass
        except (PermissionError, OSError):
            pass
        return total

    def _partial_hash(self, path: Path, chunk_size: int = 65536) -> str:
        """Fast hash of first 64KB + file size for duplicate detection."""
        h = hashlib.md5()
        sz = path.stat().st_size
        h.update(sz.to_bytes(8, 'little'))
        with open(path, 'rb') as f:
            h.update(f.read(chunk_size))
        return h.hexdigest()

    @staticmethod
    def _fmt_bytes(b: int) -> str:
        if b >= 1024 ** 3:
            return f"{b / (1024**3):.2f} GB"
        elif b >= 1024 ** 2:
            return f"{b / (1024**2):.0f} MB"
        elif b >= 1024:
            return f"{b / 1024:.0f} KB"
        return f"{b} B"


if __name__ == '__main__':
    import json
    logging.basicConfig(level=logging.INFO, format='%(levelname)s %(name)s: %(message)s')
    agent = JanitorAgent(dry_run=True)
    result = agent.scan()
    print(json.dumps(result, indent=2))
