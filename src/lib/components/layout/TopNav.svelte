<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import type { PrayerTimes } from '$lib/types';

  interface Props {
    sidebarOpen: boolean;
    onToggleSidebar: () => void;
    selectedWeek: number;
    onWeekChange: (week: number) => void;
    selectedCity: string;
    onCityChange: (city: string) => void;
    prayerTimes: PrayerTimes;
    onPrayerTimeChange: (prayer: keyof PrayerTimes, time: string) => void;
    onEdit?: () => void;
    onSync?: () => void;
    onLogout?: () => void;
  }

  let {
    sidebarOpen,
    onToggleSidebar,
    selectedWeek,
    onWeekChange,
    selectedCity,
    onCityChange,
    prayerTimes,
    onPrayerTimeChange,
    onEdit = () => console.log('Edit clicked'),
    onSync = () => console.log('Sync clicked'),
    onLogout = () => console.log('Logout clicked')
  }: Props = $props();

  const weekOptions = Array.from({ length: 52 }, (_, i) => ({
    value: String(i + 1),
    label: `Week ${i + 1}`
  }));

  const cityOptions = [
    { value: 'new-york', label: 'New York' },
    { value: 'los-angeles', label: 'Los Angeles' },
    { value: 'chicago', label: 'Chicago' },
    { value: 'houston', label: 'Houston' }
  ];
</script>

<header class="bg-gradient-to-r from-white via-slate-50/30 to-white border-t border-b border-slate-300/60 px-1 py-1 leading-none flex items-center justify-between flex-shrink-0">
  <div class="flex items-center space-x-2 overflow-x-auto" style="min-width: 0;">
    <Button
      variant="primary"
      size="sm"
      onclick={onToggleSidebar}
      class="px-0 py-0 w-6 h-6 flex items-center justify-center"
      title="Toggle Sidebar"
    >
      ☰
    </Button>

    <Select
      value={String(selectedWeek)}
      onselect={(value) => onWeekChange(parseInt(value))}
      options={weekOptions}
      placeholder="Select Week"
      class="flex-shrink-0"
    />

    <Select
      value={selectedCity}
      onselect={onCityChange}
      options={cityOptions}
      placeholder="Select City"
      class="flex-shrink-0"
    />

    <div class="border border-blue-300/60 rounded px-0 py-0 bg-blue-50/50 flex items-center space-x-2 flex-shrink-0">
      <span class="text-xs font-medium text-slate-900 whitespace-nowrap overflow-hidden">Prayer Times</span>
      <div class="flex items-center space-x-1 overflow-x-auto">
        {#each Object.entries(prayerTimes) as [key, prayer]}
          <div class="flex items-center space-x-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              class="px-1 py-0 compact-button"
            >
              {prayer.shortCode}
            </Button>
            <input
              type="time"
              value={prayer.time}
              oninput={(e) => onPrayerTimeChange(key as keyof PrayerTimes, e.target.value)}
              class="compact-input w-14"
            />
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Right side action buttons -->
  <div class="flex items-center space-x-2 flex-shrink-0">
    <Button
      variant="ghost"
      size="sm"
      onclick={onEdit}
      class="text-xs font-normal text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-1 py-1 rounded transition-all duration-200 whitespace-nowrap overflow-hidden"
    >
      Edit
    </Button>
    <Button
      variant="ghost"
      size="sm"
      onclick={onSync}
      class="text-xs font-normal text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-1 py-1 rounded transition-all duration-200 whitespace-nowrap overflow-hidden"
    >
      Sync
    </Button>
    <Button
      variant="ghost"
      size="sm"
      onclick={onLogout}
      class="text-xs font-normal text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-1 py-1 rounded transition-all duration-200 whitespace-nowrap overflow-hidden"
    >
      Logout
    </Button>
  </div>
</header>