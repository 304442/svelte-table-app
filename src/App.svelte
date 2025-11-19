<script lang="ts">
  import './app.css';
  import { appStore } from '$lib/stores/app';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import TopNav from '$lib/components/layout/TopNav.svelte';
  import TableView from '$lib/components/views/TableView.svelte';
  import ScheduleView from '$lib/components/views/ScheduleView.svelte';
  import GoalsView from '$lib/components/views/GoalsView.svelte';
  import DailyView from '$lib/components/views/DailyView.svelte';
  import NotesView from '$lib/components/views/NotesView.svelte';
  import ListsView from '$lib/components/views/ListsView.svelte';

  // Reactive state using Svelte 5 runes - keep store state in runes
  let store = appStore;
  let state = $state(store.state);
  let tableStats = $derived({
    totalRows: state.tableViewData.rows.length,
    totalColumns: state.tableViewData.columns.length,
    totalCells: state.tableViewData.rows.length * state.tableViewData.columns.length
  });

  // Update function to trigger reactivity when store changes
  function updateState() {
    state = store.state;
  }

  function handleNavigation(view: typeof state.currentView) {
    store.setCurrentView(view);
    updateState();
  }

  function handleToggleSidebar() {
    store.toggleSidebar();
    updateState();
  }

  function handleWeekChange(week: number) {
    store.setSelectedWeek(week);
    updateState();
  }

  function handleCityChange(city: string) {
    store.setSelectedCity(city);
    updateState();
  }

  function handlePrayerTimeChange(prayer: keyof typeof state.prayerTimes, time: string) {
    store.updatePrayerTime(prayer, time);
    updateState();
  }

  function handleEdit() {
    console.log('Edit functionality - to be implemented');
  }

  function handleSync() {
    console.log('Sync functionality - to be implemented');
  }

  function handleLogout() {
    console.log('Logout functionality - to be implemented');
  }
</script>

<div class="relative shadow-lg overflow-hidden rounded-2xl border border-slate-300/60 bg-white/95 backdrop-blur-sm max-w-full overflow-x-hidden">
  <div class="flex" style="height: 800px; width: 100vw; max-width: 1400px;">
    <!-- Sidebar -->
    {#if state.sidebarOpen}
      <Sidebar
        currentView={state.currentView}
        onNavigate={handleNavigation}
      />
    {/if}

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col" style="min-width: 0;">
      <!-- Top Navigation -->
      <TopNav
        sidebarOpen={state.sidebarOpen}
        onToggleSidebar={handleToggleSidebar}
        selectedWeek={state.selectedWeek}
        onWeekChange={handleWeekChange}
        selectedCity={state.selectedCity}
        onCityChange={handleCityChange}
        prayerTimes={state.prayerTimes}
        onPrayerTimeChange={handlePrayerTimeChange}
        onEdit={handleEdit}
        onSync={handleSync}
        onLogout={handleLogout}
      />

      <!-- Dynamic View Content -->
      <main class="flex-1 overflow-auto bg-white">
        {#if state.currentView === 'table'}
          <TableView data={state.tableViewData} />
        {:else if state.currentView === 'schedule'}
          <ScheduleView activities={state.scheduleActivities} />
        {:else if state.currentView === 'goals'}
          <GoalsView />
        {:else if state.currentView === 'daily'}
          <DailyView />
        {:else if state.currentView === 'notes'}
          <NotesView />
        {:else if state.currentView === 'lists'}
          <ListsView />
        {/if}
      </main>
    </div>
  </div>
</div>

<!-- Debug Info (remove in production) -->
<div class="fixed bottom-4 right-4 bg-slate-900/80 text-white p-2 rounded text-xs">
  <div>Current View: {state.currentView}</div>
  <div>Rows: {tableStats.totalRows}</div>
  <div>Columns: {tableStats.totalColumns}</div>
  <div>Cells: {tableStats.totalCells}</div>
</div>