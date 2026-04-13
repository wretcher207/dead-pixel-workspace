"""
Protected zones — determines how sensitive a file path is before any action.

Tier 1 (Critical): Reaper projects, VST folders, active git projects — explicit approval required
Tier 2 (Sensitive): Documents, archived projects, audio exports — approval recommended
Tier 3 (Standard): Temp dirs, browser cache, recycle bin — auto-cleanup allowed
Tier 0 (Never touch): .git dirs, .env files, files <24h, open files, >1GB, credentials

Returns the tier number. Higher = more protected. 0 = absolute never-touch.
"""
import os
import time
import json
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

# Paths that are always off-limits, no matter what tier logic says
NEVER_TOUCH_PATTERNS = [
    '.git',
    '.env',
    'id_rsa',
    'id_ed25519',
    'passwords.txt',
    'credentials.json',
    '.claude',
]

# Tier 1: Critical paths — any action requires explicit_approval
TIER1_PATTERNS = [
    r'C:\Users\david\Documents\dead-pixel-design',  # Active web projects
    r'C:\Users\david\AppData\Roaming\REAPER',        # Reaper config
    r'C:\Program Files\REAPER',
    r'C:\Program Files (x86)\VstPlugins',
    r'C:\Program Files\VstPlugins',
    r'C:\Program Files\Steinberg',
    r'C:\Program Files (x86)\Steinberg',
    r'C:\Users\david\Documents\REAPER Media',
    r'C:\Users\david\Documents\REAPER Projects',
    r'C:\Users\david\AppData\Local\Programs',        # Installed programs
    r'C:\Windows',
    r'C:\Program Files',
    r'C:\Program Files (x86)',
]

# Extensions that always make a file Tier 1 minimum
TIER1_EXTENSIONS = {'.rpp', '.rpp-bak', '.dll', '.vst', '.vst3', '.exe', '.msi', '.sys'}

# Tier 2: Sensitive paths — approval_recommended
TIER2_PATTERNS = [
    r'C:\Users\david\Documents',
    r'C:\Users\david\Music',
    r'C:\Users\david\Pictures',
    r'C:\Users\david\Videos',
    r'C:\Users\david\OneDrive',
]

TIER2_EXTENSIONS = {
    '.wav', '.aif', '.aiff', '.flac', '.mp3', '.ogg', '.mid', '.midi',
    '.psd', '.ai', '.indd', '.pdf',
    '.docx', '.xlsx', '.pptx', '.doc', '.xls',
    '.py', '.js', '.ts', '.jsx', '.tsx', '.html', '.css',
    '.zip', '.rar', '.7z',
}

# Tier 3: Standard auto-cleanup paths
TIER3_PATTERNS = [
    r'C:\Windows\Temp',
    r'C:\Users\david\AppData\Local\Temp',
    r'C:\Users\david\AppData\Local\Google\Chrome\User Data\Default\Cache',
    r'C:\Users\david\AppData\Local\Microsoft\Windows\INetCache',
    r'C:\$Recycle.Bin',
    r'C:\Windows\SoftwareDistribution\Download',
]


def _normalize(path: str) -> str:
    return os.path.normcase(os.path.normpath(path))


def is_never_touch(path: str) -> bool:
    """Returns True if this path should NEVER be touched under any circumstances."""
    norm = _normalize(path)
    path_lower = norm.lower()

    for pattern in NEVER_TOUCH_PATTERNS:
        if pattern.lower() in path_lower:
            return True

    # Files modified in the last 24 hours
    try:
        mtime = os.path.getmtime(path)
        age_hours = (time.time() - mtime) / 3600
        if age_hours < 24:
            return True
    except (OSError, PermissionError):
        return True  # Can't stat = don't touch

    # Files larger than 1GB
    try:
        size = os.path.getsize(path)
        if size > 1_073_741_824:
            return True
    except (OSError, PermissionError):
        pass

    return False


def check_tier(path: str) -> int:
    """
    Returns the protection tier for a given path.
    0 = never touch, 1 = critical, 2 = sensitive, 3 = standard (auto-cleanup ok)

    Lower numbers = more protected.
    """
    if not path:
        return 1

    norm = _normalize(path)
    ext = Path(path).suffix.lower()

    # Never-touch check (but skip the mtime/size checks for directories being classified)
    path_lower = norm.lower()
    for pattern in NEVER_TOUCH_PATTERNS:
        if pattern.lower() in path_lower:
            return 0

    # Tier 1 by extension
    if ext in TIER1_EXTENSIONS:
        return 1

    # Tier 1 by path prefix
    for pattern in TIER1_PATTERNS:
        if path_lower.startswith(_normalize(pattern).lower()):
            return 1

    # Active git project detection: has .git subdir and recent commits
    parent = Path(path)
    for candidate in [parent, parent.parent, parent.parent.parent]:
        git_dir = candidate / '.git'
        if git_dir.exists():
            # Check last commit time
            head_file = git_dir / 'COMMIT_EDITMSG'
            if head_file.exists():
                try:
                    age_days = (time.time() - head_file.stat().st_mtime) / 86400
                    if age_days < 30:
                        return 1  # Active project
                    elif age_days < 60:
                        return 2  # Archived project
                except (OSError, PermissionError):
                    pass
            return 2  # Has .git but can't check age

    # Tier 2 by extension
    if ext in TIER2_EXTENSIONS:
        return 2

    # Tier 2 by path prefix
    for pattern in TIER2_PATTERNS:
        if path_lower.startswith(_normalize(pattern).lower()):
            return 2

    # Tier 3 by path prefix
    for pattern in TIER3_PATTERNS:
        if path_lower.startswith(_normalize(pattern).lower()):
            return 3

    # Default: treat unknown paths as Tier 2 (safe)
    return 2


def approval_level_for_tier(tier: int) -> str:
    """Maps protection tier to the ApprovalLevel TypeScript enum value."""
    if tier == 0 or tier == 1:
        return 'explicit_approval'
    elif tier == 2:
        return 'approval_recommended'
    else:
        return 'no_approval'
