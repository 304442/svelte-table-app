<script lang="ts">
  import type { ViewType } from '$lib/types';
  import Button from '$lib/components/ui/Button.svelte';

  interface Props {
    currentView: ViewType;
    onNavigate: (view: ViewType) => void;
  }

  let { currentView, onNavigate }: Props = $props();

  const navigationItems: Array<{ view: ViewType; label: string; icon: string }> = [
    { view: 'table', label: 'TABLE', icon: '📊' },
    { view: 'schedule', label: 'SCHEDULE', icon: '📅' },
    { view: 'goals', label: 'GOALS', icon: '🎯' },
    { view: 'daily', label: 'DAILY LOG', icon: '📝' },
    { view: 'notes', label: 'NOTES', icon: '🗒️' },
    { view: 'lists', label: 'LISTS', icon: '📋' }
  ];

  function handleNavigation(view: ViewType) {
    onNavigate(view);
  }
</script>

<aside class="w-48 bg-gradient-to-b from-slate-50 via-white to-white border-r border-slate-300/60 flex flex-col transition-all duration-200 ease-in-out">
  <div class="p-2 flex-1 overflow-y-auto">
    <h2 class="text-xs font-semibold text-slate-900 mb-3 uppercase tracking-wide">Collections</h2>
    <div class="space-y-1">
      {#each navigationItems as item}
        <Button
          variant={currentView === item.view ? 'primary' : 'secondary'}
          size="md"
          onclick={() => handleNavigation(item.view)}
          class="w-full justify-start transform transition-all duration-200 hover:scale-110 border border-slate-300"
        >
          <span class="mr-2">{item.icon}</span>
          {item.label}
        </Button>
      {/each}
    </div>
  </div>
</aside>