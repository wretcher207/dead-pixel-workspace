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
  class="w-6 h-6 transition-opacity duration-150 {active ? 'bg-[var(--color-dp-primary)] active:translate-y-px' : isBeat ? 'bg-[var(--color-dp-surface)] hover:bg-[var(--color-dp-elevated)]' : 'bg-[var(--color-dp-sunken)] hover:bg-[var(--color-dp-surface)]'}"
  style="{active ? `opacity: ${opacity}` : ''}{active ? '' : '; box-shadow: inset 0 1px 3px rgba(0,0,0,0.3)'}"
  title={active ? `Velocity: ${velocity}` : 'Click to activate, Shift+click for velocity'}
>
</button>
