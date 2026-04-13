"""
Read and write the settings.json config file.
Matches the SettingsState TypeScript interface.
"""
import json
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

CONFIG_DIR = Path(__file__).parent.parent / 'config'
SETTINGS_PATH = CONFIG_DIR / 'settings.json'

# Default settings — matches SettingsState TypeScript interface exactly
DEFAULT_SETTINGS = {
    'schedule': {
        'dailyScanEnabled': True,
        'dailyScanTime': '02:00',
        'weeklyScanEnabled': True,
        'weeklyScanDay': 'Sunday',
        'monthlyScanEnabled': True,
        'monthlyScanDay': '1',
    },
    'cleanup': {
        'tempFileAgeDays': 7,
        'recycleBinAgeDays': 30,
        'largeFileThresholdMB': 500,
        'staleFileThresholdDays': 90,
        'autoClearTemp': True,
        'autoClearRecycleBin': True,
        'autoClearBrowserCache': True,
    },
    'performance': {
        'chromeRamAlertGB': 4.0,
        'chromeTabAlertCount': 30,
        'bootTimeAlertSeconds': 120,
    },
    'security': {
        'autoUpdateDefenderDefs': True,
        'extensionAuditFrequency': 'weekly',
        'portScanFrequency': 'daily',
    },
    'organization': {
        'desktopAgeAlertDays': 7,
        'projectStaleDays': 60,
    },
    'updates': {
        'audioToolPolicy': 'explicit_approval',
        'devToolPolicy': 'approval_recommended',
        'browserUpdatePolicy': 'approval_recommended',
    },
    'notifications': {
        'showCriticalImmediately': True,
        'summaryAfterScan': True,
        'approvalQueueReminders': 'daily',
    },
    'protectedFolders': [
        r'C:\Users\david\Documents\dead-pixel-design',
        r'C:\Users\david\Documents\REAPER Projects',
        r'C:\Users\david\Documents\REAPER Media',
        r'C:\Users\david\AppData\Roaming\REAPER',
        r'C:\Program Files\REAPER',
    ],
}


def load() -> dict:
    """Load settings, falling back to defaults for any missing keys."""
    CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    if not SETTINGS_PATH.exists():
        save(DEFAULT_SETTINGS)
        return DEFAULT_SETTINGS.copy()
    try:
        with open(SETTINGS_PATH, 'r', encoding='utf-8') as f:
            stored = json.load(f)
        # Deep-merge with defaults so new settings are always present
        merged = _deep_merge(DEFAULT_SETTINGS, stored)
        return merged
    except Exception as e:
        logger.error("Failed to load settings: %s", e)
        return DEFAULT_SETTINGS.copy()


def save(settings: dict) -> None:
    """Save settings to disk."""
    CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    try:
        with open(SETTINGS_PATH, 'w', encoding='utf-8') as f:
            json.dump(settings, f, indent=2)
    except Exception as e:
        logger.error("Failed to save settings: %s", e)


def update(updates: dict) -> dict:
    """Merge updates into current settings and save. Returns the new settings."""
    current = load()
    merged = _deep_merge(current, updates)
    save(merged)
    return merged


def _deep_merge(base: dict, override: dict) -> dict:
    """Recursively merge override into base, returning a new dict."""
    result = base.copy()
    for key, value in override.items():
        if key in result and isinstance(result[key], dict) and isinstance(value, dict):
            result[key] = _deep_merge(result[key], value)
        else:
            result[key] = value
    return result
