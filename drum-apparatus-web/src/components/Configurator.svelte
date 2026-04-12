<script lang="ts">
  import { configuratorStore } from '../lib/stores/configurator'
  import { TIME_SIGNATURES, SUBDIVISIONS } from '../lib/constants/time-signatures'
  import { POWER_HAND_OPTIONS } from '../lib/constants/power-hand'
  import MidiMapEditor from './MidiMapEditor.svelte'
  import type { VelocityMode, KitPiece } from '../lib/types'

  const LOOP_LENGTHS = [1, 2, 4, 8]
  const TOM_OPTIONS: KitPiece[] = ['TOM_1', 'TOM_2', 'TOM_3', 'TOM_4']
  const CRASH_OPTIONS: (KitPiece | 'NONE')[] = ['CRASH_L', 'CRASH_R', 'BIG_CRASH', 'CHINA_R', 'NONE']
  const FILL_LENGTHS = [2, 4, 8] as const
  const DIRECTIONS = ['descending', 'ascending', 'alternating'] as const
</script>

<div class="flex flex-col gap-4">
  <!-- MIDI Map -->
  <section>
    <h3 class="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">MIDI Map</h3>
    <MidiMapEditor />
  </section>

  <!-- Time & Length -->
  <section>
    <h3 class="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Time & Length</h3>
    <div class="flex flex-col gap-2">
      <select
        value={$configuratorStore.timeSignature.name}
        onchange={(e) => {
          const ts = TIME_SIGNATURES.find(t => t.name === (e.target as HTMLSelectElement).value)
          if (ts) configuratorStore.update(s => ({ ...s, timeSignature: ts }))
        }}
        class="bg-neutral-800 text-neutral-100 text-sm px-2 py-1.5 rounded border border-neutral-700"
      >
        {#each TIME_SIGNATURES as ts}
          <option value={ts.name}>{ts.name}</option>
        {/each}
      </select>

      <label class="flex items-center justify-between text-sm text-neutral-300">
        BPM
        <input
          type="number"
          min="60"
          max="300"
          value={$configuratorStore.bpm}
          oninput={(e) => configuratorStore.update(s => ({ ...s, bpm: parseInt((e.target as HTMLInputElement).value) || 120 }))}
          class="w-20 bg-neutral-800 text-neutral-100 text-sm text-center px-2 py-1 rounded border border-neutral-700"
        />
      </label>

      <div class="flex gap-1">
        {#each LOOP_LENGTHS as len}
          <button
            onclick={() => configuratorStore.update(s => ({ ...s, loopLength: len }))}
            class="flex-1 text-sm py-1 rounded border transition-colors {$configuratorStore.loopLength === len ? 'bg-neutral-700 border-neutral-500 text-neutral-100' : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:bg-neutral-700'}"
          >
            {len} bar{len > 1 ? 's' : ''}
          </button>
        {/each}
      </div>
    </div>
  </section>

  <!-- Power Hand -->
  <section>
    <h3 class="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Power Hand</h3>
    <div class="flex flex-col gap-2">
      <select
        value={$configuratorStore.powerHand.instrument}
        onchange={(e) => configuratorStore.update(s => ({ ...s, powerHand: { ...s.powerHand, instrument: (e.target as HTMLSelectElement).value as KitPiece } }))}
        class="bg-neutral-800 text-neutral-100 text-sm px-2 py-1.5 rounded border border-neutral-700"
      >
        {#each POWER_HAND_OPTIONS as opt}
          <option value={opt.piece}>{opt.name}</option>
        {/each}
      </select>

      <select
        value={$configuratorStore.powerHand.subdivision}
        onchange={(e) => configuratorStore.update(s => ({ ...s, powerHand: { ...s.powerHand, subdivision: (e.target as HTMLSelectElement).value } }))}
        class="bg-neutral-800 text-neutral-100 text-sm px-2 py-1.5 rounded border border-neutral-700"
      >
        {#each SUBDIVISIONS as sub}
          <option value={sub.name}>{sub.name}</option>
        {/each}
      </select>

      <label class="flex items-center justify-between text-sm text-neutral-300">
        Velocity: {$configuratorStore.powerHand.velocity}
        <input type="range" min="40" max="127"
          value={$configuratorStore.powerHand.velocity}
          oninput={(e) => configuratorStore.update(s => ({ ...s, powerHand: { ...s.powerHand, velocity: parseInt((e.target as HTMLInputElement).value) } }))}
          class="w-32" />
      </label>

      <label class="flex items-center justify-between text-sm text-neutral-300">
        Variance: {$configuratorStore.powerHand.varianceAmount}%
        <input type="range" min="0" max="100"
          value={$configuratorStore.powerHand.varianceAmount}
          oninput={(e) => configuratorStore.update(s => ({ ...s, powerHand: { ...s.powerHand, varianceAmount: parseInt((e.target as HTMLInputElement).value) } }))}
          class="w-32" />
      </label>
    </div>
  </section>

  <!-- Dynamics -->
  <section>
    <h3 class="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Dynamics</h3>
    <div class="flex flex-col gap-2">
      <label class="flex items-center justify-between text-sm text-neutral-300">
        Humanize: {$configuratorStore.dynamics.humanize}%
        <input type="range" min="0" max="100"
          value={$configuratorStore.dynamics.humanize}
          oninput={(e) => configuratorStore.update(s => ({ ...s, dynamics: { ...s.dynamics, humanize: parseInt((e.target as HTMLInputElement).value) } }))}
          class="w-32" />
      </label>

      <label class="flex items-center justify-between text-sm text-neutral-300">
        Push/Pull: {$configuratorStore.dynamics.pushPull}
        <input type="range" min="-100" max="100"
          value={$configuratorStore.dynamics.pushPull}
          oninput={(e) => configuratorStore.update(s => ({ ...s, dynamics: { ...s.dynamics, pushPull: parseInt((e.target as HTMLInputElement).value) } }))}
          class="w-32" />
      </label>

      <div class="flex gap-1">
        {#each (['Soft', 'Normal', 'Hard'] as const) as mode, i}
          <button
            onclick={() => configuratorStore.update(s => ({ ...s, dynamics: { ...s.dynamics, velocityMode: i as VelocityMode } }))}
            class="flex-1 text-sm py-1 rounded border transition-colors {$configuratorStore.dynamics.velocityMode === i ? 'bg-neutral-700 border-neutral-500 text-neutral-100' : 'bg-neutral-800 border-neutral-700 text-neutral-400'}"
          >
            {mode}
          </button>
        {/each}
      </div>

      <label class="flex items-center justify-between text-sm text-neutral-300">
        Left Foot: {$configuratorStore.dynamics.leftFootStrength}%
        <input type="range" min="0" max="100"
          value={$configuratorStore.dynamics.leftFootStrength}
          oninput={(e) => configuratorStore.update(s => ({ ...s, dynamics: { ...s.dynamics, leftFootStrength: parseInt((e.target as HTMLInputElement).value) } }))}
          class="w-32" />
      </label>
    </div>
  </section>

  <!-- Fill -->
  <section>
    <h3 class="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Fill</h3>
    <div class="flex flex-col gap-2">
      <label class="flex items-center gap-2 text-sm text-neutral-300">
        <input type="checkbox"
          checked={$configuratorStore.fill.enabled}
          onchange={(e) => configuratorStore.update(s => ({ ...s, fill: { ...s.fill, enabled: (e.target as HTMLInputElement).checked } }))}
        />
        Auto-fill on final bar
      </label>

      {#if $configuratorStore.fill.enabled}
        <label class="flex items-center justify-between text-sm text-neutral-300">
          Velocity: {$configuratorStore.fill.velocity}
          <input type="range" min="1" max="127"
            value={$configuratorStore.fill.velocity}
            oninput={(e) => configuratorStore.update(s => ({ ...s, fill: { ...s.fill, velocity: parseInt((e.target as HTMLInputElement).value) } }))}
            class="w-32" />
        </label>

        <div class="flex gap-2">
          {#each TOM_OPTIONS as tom}
            <label class="flex items-center gap-1 text-xs text-neutral-400">
              <input
                type="checkbox"
                checked={$configuratorStore.fill.toms.includes(tom)}
                onchange={() => {
                  const toms = $configuratorStore.fill.toms.includes(tom)
                    ? $configuratorStore.fill.toms.filter(t => t !== tom)
                    : [...$configuratorStore.fill.toms, tom]
                  configuratorStore.update(s => ({ ...s, fill: { ...s.fill, toms } }))
                }}
              />
              {tom.replace('TOM_', 'T')}
            </label>
          {/each}
        </div>

        <select
          value={$configuratorStore.fill.direction}
          onchange={(e) => configuratorStore.update(s => ({ ...s, fill: { ...s.fill, direction: (e.target as HTMLSelectElement).value as any } }))}
          class="bg-neutral-800 text-neutral-100 text-sm px-2 py-1.5 rounded border border-neutral-700"
        >
          {#each DIRECTIONS as dir}
            <option value={dir}>{dir.charAt(0).toUpperCase() + dir.slice(1)}</option>
          {/each}
        </select>

        <div class="flex gap-1">
          {#each FILL_LENGTHS as len}
            <button
              onclick={() => configuratorStore.update(s => ({ ...s, fill: { ...s.fill, length: len } }))}
              class="flex-1 text-sm py-1 rounded border transition-colors {$configuratorStore.fill.length === len ? 'bg-neutral-700 border-neutral-500 text-neutral-100' : 'bg-neutral-800 border-neutral-700 text-neutral-400'}"
            >
              {len} steps
            </button>
          {/each}
        </div>

        <select
          value={$configuratorStore.fill.crash ?? 'NONE'}
          onchange={(e) => {
            const v = (e.target as HTMLSelectElement).value
            configuratorStore.update(s => ({ ...s, fill: { ...s.fill, crash: v === 'NONE' ? null : v as KitPiece } }))
          }}
          class="bg-neutral-800 text-neutral-100 text-sm px-2 py-1.5 rounded border border-neutral-700"
        >
          {#each CRASH_OPTIONS as opt}
            <option value={opt}>{opt === 'NONE' ? 'No Crash' : opt.replace('_', ' ')}</option>
          {/each}
        </select>
      {/if}
    </div>
  </section>
</div>
