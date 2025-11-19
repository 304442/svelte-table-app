<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import type { Note } from '$lib/types';
  import { appStore } from '$lib/stores/app';

  let notes = $state(appStore.state.notes);
  let showAddForm = $state(false);
  let newNote = $state<Partial<Note>>({
    title: '',
    category: 'General',
    content: ''
  });

  function addNote() {
    if (newNote.title.trim()) {
      appStore.addNote(newNote);
      notes = appStore.state.notes; // Update reactive state
      newNote = { title: '', category: 'General', content: '' };
      showAddForm = false;
    }
  }

  function updateNote(noteId: string, updates: Partial<Note>) {
    appStore.updateNote(noteId, updates);
    notes = appStore.state.notes;
  }

  function deleteNote(noteId: string) {
    appStore.deleteNote(noteId);
    notes = appStore.state.notes;
  }

  const totalNotes = $derived(notes.length);
  const categories = $derived([...new Set(notes.map(n => n.category))]);
</script>

<div class="flex flex-col h-full">
  <div class="bg-gradient-to-r from-slate-50 to-white border-t border-b border-slate-200 px-1 py-1 flex items-center justify-between shadow-sm flex-shrink-0">
    <div class="flex items-center space-x-2">
      <span class="text-xs font-semibold text-slate-900">Notes</span>
      <Button variant="ghost" size="sm" onclick={() => showAddForm = !showAddForm}>+ Add Note</Button>
      <div class="flex items-center space-x-1">
        <Button variant="ghost" size="sm" class="text-xs">Categories</Button>
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <span class="text-xs text-slate-900">{totalNotes} notes</span>
      <div class="w-px h-4 bg-slate-300"></div>
      <span class="text-xs text-slate-900">{categories.length} categories</span>
    </div>
  </div>

  <!-- Add Note Form -->
  {#if showAddForm}
    <div class="bg-blue-50 border-b border-blue-200 p-2">
      <div class="grid grid-cols-3 gap-2 mb-2">
        <input
          type="text"
          placeholder="Note title"
          bind:value={newNote.title}
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <input
          type="text"
          placeholder="Category"
          bind:value={newNote.category}
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <input
          type="text"
          placeholder="Content"
          bind:value={newNote.content}
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
      <div class="flex space-x-2">
        <Button variant="primary" size="sm" onclick={addNote}>Add Note</Button>
        <Button variant="ghost" size="sm" onclick={() => showAddForm = false}>Cancel</Button>
      </div>
    </div>
  {/if}

  <div class="flex-1 overflow-auto bg-white">
    <div class="table-container">
      <table class="border-collapse table-auto" style="width: 100%;">
        <thead>
          <tr>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Title</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Category</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Content</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Created</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) as note}
            <tr class="bg-white hover:bg-slate-50">
              <td class="text-left align-middle text-xs font-medium text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <input
                  type="text"
                  bind:value={note.title}
                  onblur={() => updateNote(note.id, { title: note.title })}
                  class="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none text-xs font-medium w-full"
                />
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <input
                  type="text"
                  bind:value={note.category}
                  onblur={() => updateNote(note.id, { category: note.category })}
                  class="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none text-xs w-full"
                />
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <input
                  type="text"
                  bind:value={note.content}
                  onblur={() => updateNote(note.id, { content: note.content })}
                  class="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none text-xs w-full"
                />
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                {new Date(note.createdAt).toLocaleDateString()}
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <div class="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    class="px-1 py-0 text-red-600 hover:text-red-700"
                    onclick={() => deleteNote(note.id)}
                    title="Delete note"
                  >
                    🗑️
                  </Button>
                </div>
              </td>
            </tr>
          {/each}
          {#if notes.length === 0}
            <tr>
              <td colspan="5" class="text-center align-middle text-xs text-slate-500 px-1 py-4">
                No notes yet. Click "+ Add Note" to get started!
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>