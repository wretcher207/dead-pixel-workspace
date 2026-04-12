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
    class="px-4 py-2 text-sm font-bold bg-amber-600 hover:bg-amber-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-neutral-950 rounded transition-colors"
  >
    {exporting ? 'Exporting...' : `Export All (.zip) — ${$sessionStore.items.length} pattern${$sessionStore.items.length !== 1 ? 's' : ''}`}
  </button>

  <span class="text-xs text-neutral-600">
    or click a session item to export individually
  </span>
</div>
