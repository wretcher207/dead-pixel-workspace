<script lang="ts">
  interface Props {
    active: boolean
    velocity: number
    onToggle: () => void
    onVelocityCycle: () => void
    isBeat: boolean
  }

  let { active, velocity, onToggle, onVelocityCycle, isBeat }: Props = $props()

  function handleClick(e: MouseEvent) {
    if (e.shiftKey) {
      onVelocityCycle()
    } else {
      onToggle()
    }
  }

  let opacity = $derived(active ? Math.max(0.3, velocity / 127) : 1)
</script>

<button
  onclick={handleClick}
  class="w-6 h-6 rounded-sm border transition-colors {isBeat ? 'border-neutral-600' : 'border-neutral-800'} {active ? 'bg-amber-500' : 'bg-[#1a1a1a] hover:bg-neutral-800'}"
  style={active ? `opacity: ${opacity}` : ''}
  title={active ? `Velocity: ${velocity}` : 'Click to activate, Shift+click for velocity'}
>
</button>
