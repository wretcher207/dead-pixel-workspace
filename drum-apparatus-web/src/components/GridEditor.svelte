<script lang="ts">
  import { configuratorStore } from '../lib/stores/configurator'
  import { KIT_GROUPS } from '../lib/constants/kit-pieces'
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
        pattern: { ...state.pattern, steps: currentSteps },
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
        pattern: { ...state.pattern, steps: currentSteps },
      }
    })
  }
</script>

<div class="flex flex-col gap-1">
  <!-- Beat markers -->
  <div class="flex items-center gap-1">
    <span class="w-28 flex-shrink-0"></span>
    <div class="flex gap-px">
      {#each Array(steps) as _, i}
        <div class="w-6 text-center text-[10px] {i % 4 === 0 ? 'text-neutral-400 font-bold' : 'text-neutral-700'}">
          {i % 4 === 0 ? (i / 4 + 1) : '.'}
        </div>
      {/each}
    </div>
  </div>

  <!-- Kit groups -->
  {#each KIT_GROUPS as group}
    <button
      onclick={() => toggleGroup(group.group)}
      class="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider py-0.5 hover:text-neutral-300 transition-colors"
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

  <!-- Text notation toggle -->
  <button
    onclick={() => showTextNotation = !showTextNotation}
    class="text-xs text-neutral-500 hover:text-neutral-300 mt-2 transition-colors"
  >
    {showTextNotation ? '▼' : '▶'} Text Notation
  </button>

  {#if showTextNotation}
    <TextNotation />
  {/if}
</div>
