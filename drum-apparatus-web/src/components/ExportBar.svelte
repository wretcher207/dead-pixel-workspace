<script lang="ts">
  import { sessionStore } from '../lib/stores/session'
  import { exportSession } from '../lib/midi-engine'

  let exporting = $state(false)

  async function downloadZip() {
    if ($sessionStore.items.length === 0) return
    exporting = true
    try {
      const blob = await exportSession($sessionStore.items)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'drum-apparatus-session.zip'
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      exporting = false
    }
  }
</script>

<div class="flex items-center gap-3">
  <button
    onclick={downloadZip}
    disabled={$sessionStore.items.length === 0 || exporting}
    class="px-4 py-2 text-sm font-bold font-['Space_Grotesk'] bg-[var(--color-dp-primary)] hover:opacity-90 active:translate-y-px disabled:bg-[var(--color-dp-elevated)] disabled:text-[var(--color-dp-text-dim)] text-[var(--color-dp-base)] transition-opacity"
  >
    {exporting ? 'Exporting...' : `Export All (.zip) — ${$sessionStore.items.length} pattern${$sessionStore.items.length !== 1 ? 's' : ''}`}
  </button>

  <span class="text-xs text-[var(--color-dp-text-dim)]">
    or click a session item to export individually
  </span>
</div>
