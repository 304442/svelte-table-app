<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import type { Goal } from '$lib/types';
  import { appStore } from '$lib/stores/app';

  let goals = $state(appStore.state.goals);
  let showAddForm = $state(false);
  let newGoal = $state<Partial<Goal>>({
    title: '',
    category: 'General',
    target: '',
    progress: 0
  });

  function addGoal() {
    if (newGoal.title.trim()) {
      appStore.addGoal(newGoal);
      goals = appStore.state.goals; // Update reactive state
      newGoal = { title: '', category: 'General', target: '', progress: 0 };
      showAddForm = false;
    }
  }

  function updateGoalProgress(goalId: string, progress: number) {
    appStore.updateGoal(goalId, { progress });
    goals = appStore.state.goals;
  }

  function toggleGoalComplete(goalId: string) {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      appStore.updateGoal(goalId, {
        completed: !goal.completed,
        progress: !goal.completed ? 100 : goal.progress
      });
      goals = appStore.state.goals;
    }
  }

  function deleteGoal(goalId: string) {
    appStore.deleteGoal(goalId);
    goals = appStore.state.goals;
  }

  const activeGoals = $derived(goals.filter(g => !g.completed));
  const completedGoals = $derived(goals.filter(g => g.completed));
</script>

<div class="flex flex-col h-full">
  <div class="bg-gradient-to-r from-slate-50 to-white border-t border-b border-slate-200 px-1 py-1 flex items-center justify-between shadow-sm flex-shrink-0">
    <div class="flex items-center space-x-2">
      <span class="text-xs font-semibold text-slate-900">Goals Tracker</span>
      <Button variant="ghost" size="sm" onclick={() => showAddForm = !showAddForm}>+ Add Goal</Button>
      <div class="flex items-center space-x-1">
        <Button variant="ghost" size="sm" class="text-xs">Progress</Button>
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <span class="text-xs text-slate-900">{activeGoals.length} active</span>
      <div class="w-px h-4 bg-slate-300"></div>
      <span class="text-xs text-slate-900">{completedGoals.length} completed</span>
    </div>
  </div>

  <!-- Add Goal Form -->
  {#if showAddForm}
    <div class="bg-blue-50 border-b border-blue-200 p-2">
      <div class="grid grid-cols-4 gap-2 mb-2">
        <input
          type="text"
          placeholder="Goal title"
          bind:value={newGoal.title}
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <input
          type="text"
          placeholder="Category"
          bind:value={newGoal.category}
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <input
          type="text"
          placeholder="Target date/goal"
          bind:value={newGoal.target}
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <input
          type="number"
          placeholder="Progress %"
          bind:value={newGoal.progress}
          min="0"
          max="100"
          class="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
      <div class="flex space-x-2">
        <Button variant="primary" size="sm" onclick={addGoal}>Add Goal</Button>
        <Button variant="ghost" size="sm" onclick={() => showAddForm = false}>Cancel</Button>
      </div>
    </div>
  {/if}

  <div class="flex-1 overflow-auto bg-white">
    <div class="table-container">
      <table class="border-collapse table-auto" style="width: 100%;">
        <thead>
          <tr>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Goal</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Category</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Target</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Progress</th>
            <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each goals as goal}
            <tr class="{goal.completed ? 'bg-green-50' : 'bg-white'} hover:bg-slate-50">
              <td class="text-left align-middle text-xs font-medium text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                {goal.title}
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                {goal.category}
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                {goal.target}
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <div class="flex items-center space-x-2">
                  <div class="flex-1 bg-slate-200 rounded-full h-4 min-w-20">
                    <div
                      class="bg-blue-500 h-4 rounded-full transition-all duration-300"
                      style="width: {goal.progress}%"
                    ></div>
                  </div>
                  <span class="text-xs font-medium">{goal.progress}%</span>
                </div>
              </td>
              <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <div class="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    class="px-1 py-0"
                    onclick={() => toggleGoalComplete(goal.id)}
                    title={goal.completed ? "Mark as incomplete" : "Mark as complete"}
                  >
                    {goal.completed ? '✅' : '⭕'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    class="px-1 py-0 text-red-600 hover:text-red-700"
                    onclick={() => deleteGoal(goal.id)}
                    title="Delete goal"
                  >
                    🗑️
                  </Button>
                </div>
              </td>
            </tr>
          {/each}
          {#if goals.length === 0}
            <tr>
              <td colspan="5" class="text-center align-middle text-xs text-slate-500 px-1 py-4">
                No goals yet. Click "+ Add Goal" to get started!
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>