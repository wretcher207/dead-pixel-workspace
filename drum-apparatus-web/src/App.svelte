<script lang="ts">
  import Header from './components/Header.svelte'
  import GrooveLibrary from './components/GrooveLibrary.svelte'
  import GridEditor from './components/GridEditor.svelte'
  import Configurator from './components/Configurator.svelte'
  import SessionQueue from './components/SessionQueue.svelte'
  import ExportBar from './components/ExportBar.svelte'
</script>

<div class="dp-grain min-h-screen bg-[var(--color-dp-base)] text-[var(--color-dp-text)] flex flex-col" style="background: radial-gradient(ellipse at 20% 0%, rgba(255,107,0,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(90,65,54,0.06) 0%, transparent 50%), var(--color-dp-base);">
  <Header />
  <main class="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
    <div class="flex-[3] flex flex-col gap-4 min-w-0 overflow-y-auto">
      <div class="bg-[var(--color-dp-elevated)] p-4">
        <h2 class="text-sm font-bold font-['Space_Grotesk'] text-[var(--color-dp-text-muted)] uppercase tracking-[-0.02em] mb-3">Groove Library</h2>
        <GrooveLibrary />
      </div>
      <div class="bg-[var(--color-dp-sunken)] p-4 overflow-x-auto shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)]">
        <h2 class="text-sm font-bold font-['Space_Grotesk'] text-[var(--color-dp-text-muted)] uppercase tracking-[-0.02em] mb-3">Grid Editor</h2>
        <GridEditor />
      </div>
    </div>
    <div class="flex-[2] flex flex-col gap-4 min-w-0 overflow-y-auto">
      <div class="bg-[var(--color-dp-elevated)] p-4 overflow-y-auto">
        <h2 class="text-sm font-bold font-['Space_Grotesk'] text-[var(--color-dp-text-muted)] uppercase tracking-[-0.02em] mb-3">Configurator</h2>
        <Configurator />
      </div>
      <div class="bg-[var(--color-dp-elevated)] p-4">
        <h2 class="text-sm font-bold font-['Space_Grotesk'] text-[var(--color-dp-text-muted)] uppercase tracking-[-0.02em] mb-3">Session</h2>
        <SessionQueue />
      </div>
    </div>
  </main>
  <footer class="px-6 py-3 bg-[var(--color-dp-surface)] shadow-[0_-2px_8px_rgba(0,0,0,0.3)]">
    <ExportBar />
  </footer>
</div>
