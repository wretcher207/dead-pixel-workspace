<script lang="ts">
  import { sessionStore, addToSession, clearSession } from '../lib/stores/session'
  import SessionItemComponent from './SessionItem.svelte'
</script>

<div class="flex flex-col gap-2">
  <button
    onclick={addToSession}
    class="w-full py-2 text-sm font-bold bg-amber-600 hover:bg-amber-500 text-neutral-950 rounded transition-colors"
  >
    + Add to Session
  </button>

  {#if $sessionStore.items.length === 0}
    <p class="text-xs text-neutral-600 text-center py-4">No patterns in session. Configure a groove and add it.</p>
  {:else}
    <div class="flex flex-col gap-1">
      {#each $sessionStore.items as item, i (item.id)}
        <SessionItemComponent {item} index={i} total={$sessionStore.items.length} />
      {/each}
    </div>

    <button
      onclick={clearSession}
      class="text-xs text-neutral-600 hover:text-red-400 transition-colors"
    >
      Clear All
    </button>
  {/if}
</div>
