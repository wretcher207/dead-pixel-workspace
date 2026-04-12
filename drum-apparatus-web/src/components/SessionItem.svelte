<script lang="ts">
  import type { SessionItem } from '../lib/types'
  import { removeFromSession, updateLabel, reorderSession } from '../lib/stores/session'
  import { configuratorStore } from '../lib/stores/configurator'

  interface Props {
    item: SessionItem
    index: number
    total: number
  }

  let { item, index, total }: Props = $props()
  let editing = $state(false)
  let labelInput = $state(item.label)

  function loadIntoConfigurator() {
    configuratorStore.set(structuredClone(item.config))
  }

  function commitLabel() {
    updateLabel(item.id, labelInput)
    editing = false
  }
</script>

<div class="flex items-center gap-2 p-2 bg-neutral-800/50 rounded border border-neutral-800 group">
  <div class="flex flex-col gap-0.5">
    <button
      onclick={() => reorderSession(item.id, Math.max(0, index - 1))}
      disabled={index === 0}
      class="text-[10px] text-neutral-600 hover:text-neutral-300 disabled:opacity-30 transition-colors"
    >▲</button>
    <button
      onclick={() => reorderSession(item.id, Math.min(total - 1, index + 1))}
      disabled={index === total - 1}
      class="text-[10px] text-neutral-600 hover:text-neutral-300 disabled:opacity-30 transition-colors"
    >▼</button>
  </div>

  <button onclick={loadIntoConfigurator} class="flex-1 text-left min-w-0">
    {#if editing}
      <input
        bind:value={labelInput}
        onblur={commitLabel}
        onkeydown={(e) => { if (e.key === 'Enter') commitLabel() }}
        class="w-full bg-neutral-800 text-neutral-100 text-sm px-1 py-0.5 rounded border border-neutral-600 focus:outline-none"
      />
    {:else}
      <span class="text-sm text-neutral-200 truncate block">{item.label}</span>
      <span class="text-[10px] text-neutral-600">
        {item.config.timeSignature.name} | {item.config.bpm} BPM
      </span>
    {/if}
  </button>

  <button
    onclick={() => { editing = true; labelInput = item.label }}
    class="text-xs text-neutral-600 hover:text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity"
    title="Rename"
  >✎</button>

  <button
    onclick={() => removeFromSession(item.id)}
    class="text-xs text-neutral-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
    title="Remove"
  >✕</button>
</div>
