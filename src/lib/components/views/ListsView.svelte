<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import type { ListItem } from '$lib/types';
  import { appStore } from '$lib/stores/app';

  let listItems = $state(appStore.state.listItems);
  let showAddForm = $state(false);
  let newItem = $state<Partial<ListItem>>({
    category: 'General',
    item: '',
    details: '',
    sets: '',
    reps: '',
    weight: '',
    rest: '',
    status: 'Active',
    isSubCategory: false
  });

  function addItem() {
    if (newItem.item.trim()) {
      appStore.addListItem(newItem);
      listItems = appStore.state.listItems; // Update reactive state
      newItem = {
        category: 'General',
        item: '',
        details: '',
        sets: '',
        reps: '',
        weight: '',
        rest: '',
        status: 'Active',
        isSubCategory: false
      };
      showAddForm = false;
    }
  }

  function updateItem(itemId: string, updates: Partial<ListItem>) {
    appStore.updateListItem(itemId, updates);
    listItems = appStore.state.listItems;
  }

  function deleteItem(itemId: string) {
    appStore.deleteListItem(itemId);
    listItems = appStore.state.listItems;
  }

  function toggleStatus(itemId: string) {
    const item = listItems.find(i => i.id === itemId);
    if (item) {
      const newStatus = item.status === 'Active' ? 'Completed' : item.status === 'Completed' ? 'Inactive' : 'Active';
      appStore.updateListItem(itemId, { status: newStatus });
      listItems = appStore.state.listItems;
    }
  }

  const totalItems = $derived(listItems.length);
  const categories = $derived([...new Set(listItems.map(i => i.category))]);
  const activeItems = $derived(listItems.filter(i => i.status === 'Active'));
</script>

<div class="flex flex-col h-full">
  <div class="bg-gradient-to-r from-slate-50 to-white border-t border-b border-slate-200 px-1 py-1 flex items-center justify-between shadow-sm flex-shrink-0">
    <div class="flex items-center space-x-2">
      <span class="text-xs font-semibold text-slate-900">Complete Personal Lists</span>
      <Button variant="ghost" size="sm" onclick={() => showAddForm = !showAddForm}>+ Add List</Button>
      <div class="flex items-center space-x-1">
        <Button variant="ghost" size="sm" class="text-xs">Archive</Button>
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <span class="text-xs text-slate-900">{totalItems} items</span>
      <div class="w-px h-3 bg-slate-300/60"></div>
      <span class="text-xs text-slate-900">{categories.length} categories</span>
    </div>
  </div>

  <!-- Add Item Form -->
  {#if showAddForm}
    <div class="bg-blue-50 border-b border-blue-200 p-2">
      <div class="grid grid-cols-4 gap-2 mb-2">
        <input
          type="text"
          placeholder="Category"
          bind:value={newItem.category}
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <input
          type="text"
          placeholder="Item"
          bind:value={newItem.item}
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <input
          type="text"
          placeholder="Details"
          bind:value={newItem.details}
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <select
          bind:value={newItem.status}
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div class="grid grid-cols-4 gap-2 mb-2">
        <input
          type="text"
          placeholder="Sets"
          bind:value={newItem.sets}
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <input
          type="text"
          placeholder="Reps"
          bind:value={newItem.reps}
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <input
          type="text"
          placeholder="Weight"
          bind:value={newItem.weight}
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <input
          type="text"
          placeholder="Rest"
          bind:value={newItem.rest}
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
      <div class="flex space-x-2">
        <Button variant="primary" size="sm" onclick={addItem}>Add Item</Button>
        <Button variant="ghost" size="sm" onclick={() => showAddForm = false}>Cancel</Button>
      </div>
    </div>
  {/if}

  <div class="flex-1 overflow-auto bg-white">
    <div class="table-container">
      <table class="border-collapse table-auto" style="width: 100%;">
        <thead>
          <tr>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Category</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Item</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Details</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Sets</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Reps</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Weight</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Rest</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Status</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each listItems as item}
            <tr class="{item.isSubCategory ? 'bg-slate-50' : 'bg-white'} hover:bg-slate-50">
              <td class="text-left align-middle text-xs {item.isSubCategory ? '' : 'font-semibold'} text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                {item.category}
              </td>
              <td class="text-left align-middle text-xs {item.isSubCategory ? 'font-medium' : ''} text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <input
                  type="text"
                  bind:value={item.item}
                  onblur={() => updateItem(item.id, { item: item.item })}
                  class="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none text-xs w-full"
                />
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <input
                  type="text"
                  bind:value={item.details}
                  onblur={() => updateItem(item.id, { details: item.details })}
                  class="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none text-xs w-full"
                />
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <input
                  type="text"
                  bind:value={item.sets}
                  onblur={() => updateItem(item.id, { sets: item.sets })}
                  class="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none text-xs w-full"
                />
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <input
                  type="text"
                  bind:value={item.reps}
                  onblur={() => updateItem(item.id, { reps: item.reps })}
                  class="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none text-xs w-full"
                />
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <input
                  type="text"
                  bind:value={item.weight}
                  onblur={() => updateItem(item.id, { weight: item.weight })}
                  class="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none text-xs w-full"
                />
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <input
                  type="text"
                  bind:value={item.rest}
                  onblur={() => updateItem(item.id, { rest: item.rest })}
                  class="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none text-xs w-full"
                />
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <span class="inline align-middle text-xs font-medium bg-slate-100 text-slate-900 ring-0 ring-slate-300/20">
                  {item.status}
                </span>
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <div class="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    class="px-1 py-0"
                    onclick={() => toggleStatus(item.id)}
                    title="Toggle status"
                  >
                    {item.status === 'Active' ? '⭕' : item.status === 'Completed' ? '✅' : '❌'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    class="px-1 py-0 text-red-600 hover:text-red-700"
                    onclick={() => deleteItem(item.id)}
                    title="Delete item"
                  >
                    🗑️
                  </Button>
                </div>
              </td>
            </tr>
          {/each}
          {#if listItems.length === 0}
            <tr>
              <td colspan="9" class="text-center align-middle text-xs text-slate-500 px-1 py-4">
                No list items yet. Click "+ Add List" to get started!
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>