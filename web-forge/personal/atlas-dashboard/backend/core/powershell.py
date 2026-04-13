"""
Run PowerShell commands from Python and parse the output.
All system information on Windows comes through here.
"""
import subprocess
import json
import logging

logger = logging.getLogger(__name__)


def run(command: str, timeout: int = 30) -> str:
    """
    Run a PowerShell command and return its stdout as a string.
    Returns empty string if the command fails.
    """
    try:
        result = subprocess.run(
            ['powershell', '-NonInteractive', '-NoProfile', '-Command', command],
            capture_output=True,
            text=True,
            timeout=timeout,
            encoding='utf-8',
            errors='replace'
        )
        if result.returncode != 0 and result.stderr:
            logger.debug("PowerShell stderr for command %r: %s", command[:80], result.stderr.strip())
        return result.stdout.strip()
    except subprocess.TimeoutExpired:
        logger.warning("PowerShell command timed out: %s", command[:80])
        return ''
    except Exception as e:
        logger.error("PowerShell command failed: %s — %s", command[:80], e)
        return ''


def run_json(command: str, timeout: int = 30) -> list | dict | None:
    """
    Run a PowerShell command that outputs JSON (via ConvertTo-Json).
    Returns parsed Python object, or None on failure.
    """
    output = run(command, timeout=timeout)
    if not output:
        return None
    try:
        return json.loads(output)
    except json.JSONDecodeError:
        logger.debug("Failed to parse JSON from PowerShell output: %s", output[:200])
        return None


def run_lines(command: str, timeout: int = 30) -> list[str]:
    """
    Run a PowerShell command and return output as a list of non-empty lines.
    """
    output = run(command, timeout=timeout)
    return [line for line in output.splitlines() if line.strip()]
