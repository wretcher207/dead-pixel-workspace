<script lang="ts">
  import { configuratorStore } from '../lib/stores/configurator'
  import { MIDI_MAP_PRESETS } from '../lib/constants/midi-maps'
  import { KIT_GROUPS, KIT_PIECE_LABELS } from '../lib/constants/kit-pieces'
  import type { KitPiece } from '../lib/types'

  let expanded = $state(false)

  function selectPreset(idx: number) {
    const preset = MIDI_MAP_PRESETS[idx]
    configuratorStore.update(state => ({
      ...state,
      midiMap: { presetName: preset.name, map: { ...preset.map } },
    }))
  }

  function updateNote(piece: KitPiece, value: number) {
    configuratorStore.update(state => ({
      ...state,
      midiMap: {
        ...state.midiMap,
        map: { ...state.midiMap.map, [piece]: Math.max(0, Math.min(127, value)) },
      },
    }))
  }
</script>

<div class="flex flex-col gap-2">
  <select
    value={$configuratorStore.midiMap.presetName}
    onchange={(e) => {
      const idx = MIDI_MAP_PRESETS.findIndex(p => p.name === (e.target as HTMLSelectElement).value)
      if (idx >= 0) selectPreset(idx)
    }}
    class="bg-[var(--color-dp-sunken)] text-[var(--color-dp-text)] text-sm px-2 py-1.5 focus:bg-[var(--color-dp-floating)] focus:outline-none"
  >
    {#each MIDI_MAP_PRESETS as preset}
      <option value={preset.name}>{preset.name}</option>
    {/each}
  </select>

  <button
    onclick={() => expanded = !expanded}
    class="text-xs text-[var(--color-dp-text-muted)] hover:text-[var(--color-dp-text)] transition-colors text-left"
  >
    {expanded ? '▼' : '▶'} Edit Map
  </button>

  {#if expanded}
    <div class="grid grid-cols-2 gap-x-4 gap-y-1">
      {#each KIT_GROUPS as group}
        {#each group.pieces as piece}
          <label class="flex items-center justify-between text-xs text-[var(--color-dp-text-dim)]">
            <span class="truncate">{KIT_PIECE_LABELS[piece]}</span>
            <input
              type="number"
              min="0"
              max="127"
              value={$configuratorStore.midiMap.map[piece]}
              oninput={(e) => updateNote(piece, parseInt((e.target as HTMLInputElement).value) || 0)}
              class="w-14 bg-[var(--color-dp-sunken)] text-[var(--color-dp-text)] text-sm text-center px-1 py-0.5 focus:bg-[var(--color-dp-floating)] focus:outline-none"
            />
          </label>
        {/each}
      {/each}
    </div>
  {/if}
</div>
