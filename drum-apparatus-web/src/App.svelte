<script lang="ts">
  import Header from './components/Header.svelte'
  import GrooveLibrary from './components/GrooveLibrary.svelte'
  import GridEditor from './components/GridEditor.svelte'
  import Configurator from './components/Configurator.svelte'
</script>

<div class="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
  <Header />
  <main class="flex-1 flex gap-4 p-4 overflow-hidden">
    <div class="flex-[3] flex flex-col gap-4 min-w-0 overflow-y-auto">
      <div class="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
        <h2 class="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">Groove Library</h2>
        <GrooveLibrary />
      </div>
      <div class="bg-neutral-900 rounded-lg p-4 border border-neutral-800 overflow-x-auto">
        <h2 class="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">Grid Editor</h2>
        <GridEditor />
      </div>
    </div>
    <div class="flex-[2] flex flex-col gap-4 min-w-0 overflow-y-auto">
      <div class="bg-neutral-900 rounded-lg p-4 border border-neutral-800 overflow-y-auto">
        <h2 class="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">Configurator</h2>
        <Configurator />
      </div>
      <div class="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
        <h2 class="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">Session</h2>
        <p class="text-neutral-500">Coming next...</p>
      </div>
    </div>
  </main>
  <footer class="px-6 py-3 border-t border-neutral-800 bg-neutral-950">
    <p class="text-neutral-500">Export Bar (coming next)</p>
  </footer>
</div>
