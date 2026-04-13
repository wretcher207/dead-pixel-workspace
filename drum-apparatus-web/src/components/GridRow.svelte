<script lang="ts">
  import type { KitPiece, StepEvent } from '../lib/types'
  import { KIT_PIECE_LABELS } from '../lib/constants/kit-pieces'
  import GridCell from './GridCell.svelte'

  interface Props {
    piece: KitPiece
    steps: number
    events: StepEvent[]
    onToggleStep: (step: number) => void
    onCycleVelocity: (step: number) => void
  }

  let { piece, steps, events, onToggleStep, onCycleVelocity }: Props = $props()

  function getEventAtStep(step: number): StepEvent | undefined {
    return events.find(e => e.step === step && e.piece === piece)
  }
</script>

<div class="flex items-center gap-1">
  <span class="w-28 text-xs text-[var(--color-dp-text-muted)] font-['Inter'] truncate flex-shrink-0">
    {KIT_PIECE_LABELS[piece]}
  </span>
  <div class="flex gap-px">
    {#each Array(steps) as _, i}
      {@const event = getEventAtStep(i)}
      <GridCell
        active={!!event}
        velocity={event?.velocity ?? 0}
        onToggle={() => onToggleStep(i)}
        onVelocityCycle={() => onCycleVelocity(i)}
        isBeat={i % 4 === 0}
      />
    {/each}
  </div>
</div>
