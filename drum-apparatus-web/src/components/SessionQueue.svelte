<script lang="ts">
  import { sessionStore, addToSession, clearSession } from '../lib/stores/session'
  import SessionItemComponent from './SessionItem.svelte'
</script>

<div class="flex flex-col gap-2">
  <button
    onclick={addToSession}
    class="w-full py-2.5 text-sm font-bold font-['Space_Grotesk'] bg-[var(--color-dp-primary)] hover:opacity-90 active:translate-y-px text-[var(--color-dp-base)] transition-opacity"
  >
    + Add to Session
  </button>

  {#if $sessionStore.items.length === 0}
    <p class="text-xs text-[var(--color-dp-text-dim)] text-center py-4">No patterns in session. Configure a groove and add it.</p>
  {:else}
    <div class="flex flex-col gap-1">
      {#each $sessionStore.items as item, i (item.id)}
        <SessionItemComponent {item} index={i} total={$sessionStore.items.length} />
      {/each}
    </div>

    <button
      onclick={clearSession}
      class="text-xs text-[var(--color-dp-text-dim)] hover:text-[var(--color-dp-error)] transition-colors"
    >
      Clear All
    </button>
  {/if}
</div>
