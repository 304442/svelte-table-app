<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import type { ScheduleActivity } from '$lib/types';
  import { appStore } from '$lib/stores/app';

  interface Props {
    activities: ScheduleActivity[];
  }

  let { activities }: Props = $props();

  function handleAddActivity() {
    appStore.addScheduleActivity({
      activity: 'New Activity'
    });
  }
</script>

<div class="flex flex-col h-full">
  <!-- Sub-top navigation -->
  <div class="bg-gradient-to-r from-slate-50 to-white border-t border-b border-slate-200 px-1 py-1 flex items-center justify-between shadow-sm flex-shrink-0">
    <div class="flex items-center space-x-2 flex-1 min-w-0">
      <span class="text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden">Daily Schedule Planner</span>
      <Button variant="secondary" size="sm" onclick={handleAddActivity}>
        + Add Activity
      </Button>
      <div class="flex items-center space-x-1">
        <Button variant="ghost" size="sm" class="compact-button">Week</Button>
        <Button variant="ghost" size="sm" class="compact-button">Month</Button>
        <Button variant="ghost" size="sm" class="compact-button">Year</Button>
      </div>
    </div>
    <div class="flex items-center space-x-2 whitespace-nowrap overflow-hidden">
      <span class="text-xs text-slate-900">Full Week</span>
      <div class="w-px h-4 bg-slate-300"></div>
      <span class="text-xs text-slate-900">Daily Tracking</span>
    </div>
  </div>

  <!-- Schedule Table Container -->
  <div class="table-container flex-1">
    <table class="table-auto w-full border-collapse">
      <thead>
        <tr>
          <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Time</th>
          <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Day</th>
          <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">Activity</th>
          <th class="text-center align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">M</th>
          <th class="text-center align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">T</th>
          <th class="text-center align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">W</th>
          <th class="text-center align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">T</th>
          <th class="text-center align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">F</th>
          <th class="text-center align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">S</th>
          <th class="text-center align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">S</th>
          <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">📊</th>
          <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">🎯</th>
          <th class="text-left align-middle text-xs font-semibold text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none bg-gradient-to-b from-slate-100 to-slate-50 border-t border-b border-slate-300 sticky top-0 z-10 shadow-sm">🔥</th>
        </tr>
      </thead>
      <tbody>
        {#each activities as activity, index (activity.id)}
          <tr class={`${index % 2 === 0 ? 'bg-white hover:bg-slate-50' : 'bg-slate-50/30 hover:bg-slate-100'} transition-all duration-200`}>
            <td class="text-left align-middle text-xs font-medium text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">{activity.time}</td>
            <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">{activity.day}</td>
            <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">{activity.activity}</td>
            {#each activity.weeklyTracker as tracked, dayIndex (dayIndex)}
              <td class="text-center align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
                <input type="checkbox" checked={tracked} class="w-3 h-3" />
              </td>
            {/each}
            <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
              <span class="inline align-middle text-xs font-medium bg-slate-100 text-slate-900 rounded px-1 py-0">{activity.stats.weekly}</span>
            </td>
            <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
              <span class="inline align-middle text-xs font-medium bg-slate-100 text-slate-900 rounded px-1 py-0">{activity.stats.monthly}</span>
            </td>
            <td class="text-left align-middle text-xs text-slate-900 whitespace-nowrap overflow-hidden px-1 py-1 leading-none border-t border-b border-slate-200">
              <span class="inline align-middle text-xs font-medium bg-slate-100 text-slate-900 rounded px-1 py-0">{activity.stats.streak}</span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>