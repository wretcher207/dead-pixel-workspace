<script lang="ts">
  import type { SessionItem } from '../lib/types'
  import { removeFromSession, updateLabel, reorderSession } from '../lib/stores/session'
  import { configuratorStore } from '../lib/stores/configurator'
  import { exportSingle } from '../lib/midi-engine'

  interface Props {
    item: SessionItem
    index: number
    total: number
  }

  let { item, index, total }: Props = $props()
  let editing = $state(false)
  let labelInput = $state('')

  function loadIntoConfigurator() {
    configuratorStore.set(structuredClone(item.config))
  }

  function commitLabel() {
    updateLabel(item.id, labelInput)
    editing = false
  }

  function downloadMidi() {
    const blob = exportSingle(item)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${item.label.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase()}.mid`
    a.click()
    URL.revokeObjectURL(url)
  }
</script>

<div class="flex items-center gap-2 p-2 bg-[var(--color-dp-surface)] group">
  <div class="flex flex-col gap-0.5">
    <button
      onclick={() => reorderSession(item.id, Math.max(0, index - 1))}
      disabled={index === 0}
      class="text-[10px] text-[var(--color-dp-text-dim)] hover:text-[var(--color-dp-text)] disabled:opacity-30 transition-colors"
    >▲</button>
    <button
      onclick={() => reorderSession(item.id, Math.min(total - 1, index + 1))}
      disabled={index === total - 1}
      class="text-[10px] text-[var(--color-dp-text-dim)] hover:text-[var(--color-dp-text)] disabled:opacity-30 transition-colors"
    >▼</button>
  </div>

  <button onclick={loadIntoConfigurator} class="flex-1 text-left min-w-0">
    {#if editing}
      <input
        bind:value={labelInput}
        onblur={commitLabel}
        onkeydown={(e) => { if (e.key === 'Enter') commitLabel() }}
        class="w-full bg-[var(--color-dp-sunken)] text-[var(--color-dp-text)] text-sm px-1 py-0.5 focus:bg-[var(--color-dp-floating)] focus:outline-none"
      />
    {:else}
      <span class="text-sm text-[var(--color-dp-text)] truncate block">{item.label}</span>
      <span class="text-[10px] text-[var(--color-dp-text-dim)]">
        {item.config.timeSignature.name} | {item.config.bpm} BPM
      </span>
    {/if}
  </button>

  <button
    onclick={downloadMidi}
    class="text-xs text-[var(--color-dp-text-dim)] hover:text-[var(--color-dp-primary)] opacity-0 group-hover:opacity-100 transition-opacity"
    title="Download .mid"
  >⬇</button>

  <button
    onclick={() => { editing = true; labelInput = item.label }}
    class="text-xs text-[var(--color-dp-text-dim)] hover:text-[var(--color-dp-text)] opacity-0 group-hover:opacity-100 transition-opacity"
    title="Rename"
  >✎</button>

  <button
    onclick={() => removeFromSession(item.id)}
    class="text-xs text-[var(--color-dp-text-dim)] hover:text-[var(--color-dp-error)] opacity-0 group-hover:opacity-100 transition-opacity"
    title="Remove"
  >✕</button>
</div>
