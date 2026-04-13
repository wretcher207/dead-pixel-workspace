<script lang="ts">
  import { configuratorStore } from '../lib/stores/configurator'
  import { addCustomGroove } from '../lib/stores/library'
  import { KIT_GROUPS } from '../lib/constants/kit-pieces'
  import { stepsToNotation } from '../lib/midi-engine'
  import type { KitPiece } from '../lib/types'
  import GridRow from './GridRow.svelte'
  import TextNotation from './TextNotation.svelte'

  let expandedGroups = $state<Set<string>>(new Set(['KICKS', 'SNARES', 'HI_HATS']))
  let showTextNotation = $state(false)

  let steps = $derived($configuratorStore.timeSignature.steps)
  let events = $derived($configuratorStore.pattern.steps)

  function toggleGroup(group: string) {
    expandedGroups = expandedGroups.has(group)
      ? new Set([...expandedGroups].filter(g => g !== group))
      : new Set([...expandedGroups, group])
  }

  function toggleStep(piece: KitPiece, step: number) {
    configuratorStore.update(state => {
      const currentSteps = [...state.pattern.steps]
      const existingIdx = currentSteps.findIndex(e => e.step === step && e.piece === piece)

      if (existingIdx >= 0) {
        currentSteps.splice(existingIdx, 1)
      } else {
        currentSteps.push({ step, piece, velocity: 127, articulation: 'hard' })
      }

      return {
        ...state,
        pattern: { ...state.pattern, steps: currentSteps, kickNotation: undefined, snareNotation: undefined },
      }
    })
  }

  function cycleVelocity(piece: KitPiece, step: number) {
    const velocities = [127, 110, 80, 45]
    configuratorStore.update(state => {
      const currentSteps = [...state.pattern.steps]
      const existing = currentSteps.find(e => e.step === step && e.piece === piece)

      if (existing) {
        const currentIdx = velocities.indexOf(existing.velocity)
        const nextIdx = (currentIdx + 1) % velocities.length
        existing.velocity = velocities[nextIdx]
      } else {
        currentSteps.push({ step, piece, velocity: 127, articulation: 'hard' })
      }

      return {
        ...state,
        pattern: { ...state.pattern, steps: currentSteps, kickNotation: undefined, snareNotation: undefined },
      }
    })
  }

  function saveAsCustom() {
    const name = prompt('Name this custom groove:')
    if (!name) return
    const state = $configuratorStore
    const { kick, snare } = stepsToNotation(state.pattern.steps, state.timeSignature.steps)
    addCustomGroove({ name, kick, snare })
  }
</script>

<div class="flex flex-col gap-1">
  <!-- Beat markers -->
  <div class="flex items-center gap-1">
    <span class="w-28 flex-shrink-0"></span>
    <div class="flex gap-px">
      {#each Array(steps) as _, i}
        <div class="w-6 text-center text-[10px] {i % 4 === 0 ? 'text-[var(--color-dp-text-muted)] font-bold' : 'text-[var(--color-dp-text-dim)]'}">
          {i % 4 === 0 ? (i / 4 + 1) : '.'}
        </div>
      {/each}
    </div>
  </div>

  <!-- Kit groups -->
  {#each KIT_GROUPS as group}
    <button
      onclick={() => toggleGroup(group.group)}
      class="flex items-center gap-2 text-xs font-bold text-[var(--color-dp-text-muted)] font-['Space_Grotesk'] uppercase tracking-[-0.02em] py-0.5 hover:opacity-80 transition-opacity duration-200"
    >
      <span class="text-[10px]">{expandedGroups.has(group.group) ? '▼' : '▶'}</span>
      {group.label}
    </button>

    {#if expandedGroups.has(group.group)}
      {#each group.pieces as piece}
        <GridRow
          {piece}
          {steps}
          {events}
          onToggleStep={(step) => toggleStep(piece, step)}
          onCycleVelocity={(step) => cycleVelocity(piece, step)}
        />
      {/each}
    {/if}
  {/each}

  <!-- Toolbar -->
  <div class="flex items-center gap-3 mt-2">
    <button
      onclick={() => showTextNotation = !showTextNotation}
      class="text-xs text-[var(--color-dp-text-muted)] hover:opacity-80 transition-opacity duration-200"
    >
      {showTextNotation ? '▼' : '▶'} Text Notation
    </button>

    <button
      onclick={saveAsCustom}
      class="text-xs px-2 py-1 bg-[var(--color-dp-elevated)] text-[var(--color-dp-text-muted)] hover:bg-[var(--color-dp-primary)] hover:text-[var(--color-dp-base)] transition-[background-color,color] duration-200"
    >
      Save as Custom
    </button>
  </div>

  {#if showTextNotation}
    <TextNotation />
  {/if}
</div>
