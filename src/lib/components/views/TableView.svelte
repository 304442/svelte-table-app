<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import type { TableViewData, TableRow, TableCell } from '$lib/types';
  import { appStore } from '$lib/stores/app';

  interface Props {
    data: TableViewData;
  }

  let { data }: Props = $props();

  function handleAddRow() {
    appStore.addTableRow();
  }

  function handleCellEdit(rowId: string, cellId: string, event: Event) {
    const target = event.target as HTMLElement;
    const currentValue = target.textContent?.trim() || '';

    // Create input for editing
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentValue;
    input.className = 'w-full px-1 py-1 text-xs text-slate-900 border border-primary/20 rounded focus:outline-none focus:ring-1 focus:ring-primary/20';

    // Replace cell content with input
    target.innerHTML = '';
    target.appendChild(input);
    input.focus();
    input.select();

    // Handle save on blur or enter
    function saveEdit() {
      const newValue = input.value.trim();
      appStore.updateTableCell(rowId, cellId, newValue || currentValue);

      // Restore cell content
      target.textContent = newValue || currentValue;
    }

    input.addEventListener('blur', saveEdit, { once: true });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        input.blur();
      } else if (e.key === 'Escape') {
        target.textContent = currentValue;
      }
    });
  }
</script>

<div class="flex flex-col h-full">
  <!-- Sub-top navigation -->
  <div class="bg-gradient-to-r from-slate-50 via-white to-white border-t border-b border-slate-300/60 px-1 py-1 leading-none flex items-center justify-between shadow-sm flex-shrink-0">
    <div class="flex items-center space-x-2">
      <span class="text-xs font-semibold text-slate-900">Data Management</span>
      <Button variant="secondary" size="sm" onclick={handleAddRow}>
        + Add Row
      </Button>
      <div class="flex items-center space-x-1">
        <Button variant="ghost" size="sm" class="compact-button">View</Button>
        <Button variant="ghost" size="sm" class="compact-button">Filter</Button>
        <Button variant="ghost" size="sm" class="compact-button">Sort</Button>
        <Button variant="ghost" size="sm" class="compact-button">Export</Button>
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <span class="text-xs text-slate-900">{data.totalRows} rows</span>
      <div class="w-px h-3 bg-slate-300/60"></div>
      <span class="text-xs text-slate-900">{data.totalColumns} columns</span>
    </div>
  </div>

  <!-- Table Container -->
  <div class="table-container flex-1">
    <table class="table-auto w-full border-collapse">
      <thead>
        <tr>
          {#each data.columns as column}
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">
              {column.header}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each data.rows as row (row.id)}
          <tr
            class={`${row.bgColor === 'slate' ? 'bg-slate-50/30 hover:bg-slate-100' : 'bg-white hover:bg-slate-50'} transition-all duration-200`}
          >
            {#each row.cells as cell (cell.id)}
              <td
                class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200 cursor-text hover:bg-slate-50/50"
                ondblclick={(e) => handleCellEdit(row.id, cell.id, e)}
                title="Double-click to edit"
              >
                {cell.value}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>