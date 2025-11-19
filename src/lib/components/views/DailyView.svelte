<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import type { DailyEntry } from '$lib/types';
  import { appStore } from '$lib/stores/app';

  let dailyEntries = $state(appStore.state.dailyEntries);
  let showAddForm = $state(false);
  let newEntry = $state<Partial<DailyEntry>>({
    date: new Date().toISOString().split('T')[0],
    activity: '',
    notes: ''
  });

  function addEntry() {
    if (newEntry.activity.trim()) {
      appStore.addDailyEntry(newEntry);
      dailyEntries = appStore.state.dailyEntries; // Update reactive state
      newEntry = { date: new Date().toISOString().split('T')[0], activity: '', notes: '' };
      showAddForm = false;
    }
  }

  function updateEntry(entryId: string, updates: Partial<DailyEntry>) {
    appStore.updateDailyEntry(entryId, updates);
    dailyEntries = appStore.state.dailyEntries;
  }

  function deleteEntry(entryId: string) {
    appStore.deleteDailyEntry(entryId);
    dailyEntries = appStore.state.dailyEntries;
  }

  const todayEntries = $derived(dailyEntries.filter(e => e.date === new Date().toISOString().split('T')[0]));
  const totalEntries = $derived(dailyEntries.length);
</script>

<div class="flex flex-col h-full">
  <div class="bg-gradient-to-r from-slate-50 to-white border-t border-b border-slate-200 px-1 py-1 flex items-center justify-between shadow-sm flex-shrink-0">
    <div class="flex items-center space-x-2">
      <span class="text-xs font-semibold text-slate-900">Daily Log</span>
      <Button variant="ghost" size="sm" onclick={() => showAddForm = !showAddForm}>+ Add Entry</Button>
      <div class="flex items-center space-x-1">
        <Button variant="ghost" size="sm" class="text-xs">Today</Button>
        <Button variant="ghost" size="sm" class="text-xs">Search</Button>
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <span class="text-xs text-slate-900">{totalEntries} entries</span>
      <div class="w-px h-4 bg-slate-300"></div>
      <span class="text-xs text-slate-900">Today</span>
    </div>
  </div>

  <!-- Add Entry Form -->
  {#if showAddForm}
    <div class="bg-blue-50 border-b border-blue-200 p-2">
      <div class="grid grid-cols-3 gap-2 mb-2">
        <input
          type="date"
          bind:value={newEntry.date}
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <input
          type="text"
          placeholder="Activity"
          bind:value={newEntry.activity}
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <input
          type="text"
          placeholder="Notes"
          bind:value={newEntry.notes}
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
      <div class="flex space-x-2">
        <Button variant="primary" size="sm" onclick={addEntry}>Add Entry</Button>
        <Button variant="ghost" size="sm" onclick={() => showAddForm = false}>Cancel</Button>
      </div>
    </div>
  {/if}

  <div class="flex-1 overflow-auto bg-white">
    <div class="table-container">
      <table class="border-collapse table-auto" style="width: 100%;">
        <thead>
          <tr>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Date</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Activity</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Notes</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each dailyEntries.sort((a, b) => b.date.localeCompare(a.date)) as entry}
            <tr class="bg-white hover:bg-slate-50">
              <td class="text-left align-middle text-xs font-medium text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                {entry.date}
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <input
                  type="text"
                  bind:value={entry.activity}
                  onblur={() => updateEntry(entry.id, { activity: entry.activity })}
                  class="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none text-xs w-full"
                />
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <input
                  type="text"
                  bind:value={entry.notes}
                  onblur={() => updateEntry(entry.id, { notes: entry.notes })}
                  class="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none text-xs w-full"
                />
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <div class="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    class="px-1 py-0 text-red-600 hover:text-red-700"
                    onclick={() => deleteEntry(entry.id)}
                    title="Delete entry"
                  >
                    🗑️
                  </Button>
                </div>
              </td>
            </tr>
          {/each}
          {#if dailyEntries.length === 0}
            <tr>
              <td colspan="4" class="text-center align-middle text-xs text-slate-500 px-1 py-4">
                No daily entries yet. Click "+ Add Entry" to get started!
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>