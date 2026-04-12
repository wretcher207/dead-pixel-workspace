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

<div class="flex flex-col gap-2 p-2 bg-neutral-800/50 rounded border border-neutral-800">
  <label class="text-xs text-neutral-500">
    Kick: <span class="text-neutral-600">(K=hard k=soft -=rest)</span>
    <input
      type="text"
      value={kick}
      oninput={(e) => updateFromNotation((e.target as HTMLInputElement).value, snare)}
      class="block w-full mt-1 bg-neutral-800 text-neutral-100 font-mono text-sm px-2 py-1 rounded border border-neutral-700 focus:outline-none focus:border-neutral-500"
    />
  </label>
  <label class="text-xs text-neutral-500">
    Snare: <span class="text-neutral-600">(S=hard s=soft g=ghost f=flam -=rest)</span>
    <input
      type="text"
      value={snare}
      oninput={(e) => updateFromNotation(kick, (e.target as HTMLInputElement).value)}
      class="block w-full mt-1 bg-neutral-800 text-neutral-100 font-mono text-sm px-2 py-1 rounded border border-neutral-700 focus:outline-none focus:border-neutral-500"
    />
  </label>
</div>
