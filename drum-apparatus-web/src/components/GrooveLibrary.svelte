<script lang="ts">
  import { libraryStore } from '../lib/stores/library'
  import { loadGroove } from '../lib/stores/configurator'
  import type { Groove } from '../lib/types'

  let searchQuery = $state('')
  let expandedCategories = $state<Set<string>>(new Set())

  function toggleCategory(cat: string) {
    expandedCategories = expandedCategories.has(cat)
      ? new Set([...expandedCategories].filter(c => c !== cat))
      : new Set([...expandedCategories, cat])
  }

  function selectGroove(groove: Groove) {
    loadGroove(
      groove.kickNotation ?? '',
      groove.snareNotation ?? '',
      groove.name,
      groove.category,
    )
  }

  function randomize() {
    const allGrooves: Groove[] = [
      ...$libraryStore.presets.flatMap(c => c.grooves),
      ...$libraryStore.custom,
    ]
    if (allGrooves.length === 0) return
    const random = allGrooves[Math.floor(Math.random() * allGrooves.length)]
    selectGroove(random)
  }

  let filteredPresets = $derived(
    $libraryStore.presets.map(cat => ({
      ...cat,
      grooves: searchQuery
        ? cat.grooves.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : cat.grooves,
    })).filter(cat => cat.grooves.length > 0)
  )
</script>

<div class="flex flex-col gap-2">
  <div class="flex gap-2">
    <input
      type="text"
      bind:value={searchQuery}
      placeholder="Search grooves..."
      class="flex-1 bg-[var(--color-dp-sunken)] text-[var(--color-dp-text)] text-sm px-3 py-1.5 placeholder-[var(--color-dp-text-dim)] focus:outline-none focus:bg-[var(--color-dp-floating)] transition-[background-color] duration-200"
    />
    <button
      onclick={randomize}
      class="px-3 py-1.5 text-sm bg-[var(--color-dp-elevated)] text-[var(--color-dp-text)] hover:opacity-80 transition-opacity duration-200"
    >
      Randomize
    </button>
  </div>

  <div class="flex flex-col gap-1 max-h-64 overflow-y-auto">
    {#each filteredPresets as cat}
      <button
        onclick={() => toggleCategory(cat.category)}
        class="flex items-center gap-2 text-xs font-bold text-[var(--color-dp-text-muted)] font-['Space_Grotesk'] uppercase tracking-[-0.02em] py-1 hover:opacity-80 transition-opacity duration-200"
      >
        <span class="text-[10px]">{expandedCategories.has(cat.category) ? '▼' : '▶'}</span>
        {cat.category}
        <span class="text-[var(--color-dp-text-dim)]">({cat.grooves.length})</span>
      </button>
      {#if expandedCategories.has(cat.category)}
        {#each cat.grooves as groove}
          <button
            onclick={() => selectGroove(groove)}
            class="text-left text-sm px-4 py-1 text-[var(--color-dp-text)] hover:bg-[var(--color-dp-surface)] transition-[background-color] duration-200"
          >
            {groove.name}
          </button>
        {/each}
      {/if}
    {/each}

    {#if $libraryStore.custom.length > 0}
      <button
        onclick={() => toggleCategory('CUSTOM')}
        class="flex items-center gap-2 text-xs font-bold text-[var(--color-dp-text-muted)] font-['Space_Grotesk'] uppercase tracking-[-0.02em] py-1 hover:opacity-80 transition-opacity duration-200"
      >
        <span class="text-[10px]">{expandedCategories.has('CUSTOM') ? '▼' : '▶'}</span>
        CUSTOM
        <span class="text-[var(--color-dp-text-dim)]">({$libraryStore.custom.length})</span>
      </button>
      {#if expandedCategories.has('CUSTOM')}
        {#each $libraryStore.custom as groove}
          <button
            onclick={() => selectGroove(groove)}
            class="text-left text-sm px-4 py-1 text-[var(--color-dp-text)] hover:bg-[var(--color-dp-surface)] transition-[background-color] duration-200"
          >
            {groove.name}
          </button>
        {/each}
      {/if}
    {/if}
  </div>
</div>
