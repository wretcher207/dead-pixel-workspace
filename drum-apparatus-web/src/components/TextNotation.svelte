<script lang="ts">
  import { configuratorStore } from '../lib/stores/configurator'
  import { parseNotation, stepsToNotation } from '../lib/midi-engine'

  let kick = $derived(
    $configuratorStore.pattern.kickNotation ?? stepsToNotation($configuratorStore.pattern.steps, $configuratorStore.timeSignature.steps).kick
  )
  let snare = $derived(
    $configuratorStore.pattern.snareNotation ?? stepsToNotation($configuratorStore.pattern.steps, $configuratorStore.timeSignature.steps).snare
  )

  function updateFromNotation(newKick: string, newSnare: string) {
    const steps = parseNotation(newKick, newSnare)
    configuratorStore.update(state => ({
      ...state,
      pattern: {
        ...state.pattern,
        steps,
        kickNotation: newKick,
        snareNotation: newSnare,
      },
    }))
  }
</script>

<div class="flex flex-col gap-2 p-3 bg-[var(--color-dp-sunken)]" style="box-shadow: inset 0 1px 3px rgba(0,0,0,0.1)">
  <label class="text-xs text-[var(--color-dp-text-muted)]">
    Kick: <span class="text-[var(--color-dp-text-dim)]">(K=hard k=soft -=rest)</span>
    <input
      type="text"
      value={kick}
      oninput={(e) => updateFromNotation((e.target as HTMLInputElement).value, snare)}
      class="block w-full mt-1 bg-[var(--color-dp-base)] text-[var(--color-dp-text)] font-mono text-sm px-2 py-1 focus:outline-none focus:bg-[var(--color-dp-floating)]"
    />
  </label>
  <label class="text-xs text-[var(--color-dp-text-muted)]">
    Snare: <span class="text-[var(--color-dp-text-dim)]">(S=hard s=soft g=ghost f=flam -=rest)</span>
    <input
      type="text"
      value={snare}
      oninput={(e) => updateFromNotation(kick, (e.target as HTMLInputElement).value)}
      class="block w-full mt-1 bg-[var(--color-dp-base)] text-[var(--color-dp-text)] font-mono text-sm px-2 py-1 focus:outline-none focus:bg-[var(--color-dp-floating)]"
    />
  </label>
</div>
