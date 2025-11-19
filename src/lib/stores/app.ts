import type { AppState, ViewType, TableViewData, PrayerTimes, ScheduleActivity, Goal, DailyEntry, Note, ListItem } from '$lib/types';

// Svelte 5 compatible store - regular class with methods
export class AppStore {
  private _state: AppState;

  constructor() {
    this._state = {
      currentView: 'table',
      sidebarOpen: true,
      selectedWeek: 1,
      selectedCity: 'New York',
      prayerTimes: this.getDefaultPrayerTimes(),
      tableViewData: this.generateInitialTableData(),
      scheduleActivities: this.generateInitialScheduleData(),
      goals: this.generateInitialGoalsData(),
      dailyEntries: this.generateInitialDailyData(),
      notes: this.generateInitialNotesData(),
      listItems: this.generateInitialListsData()
    };
  }

  // Getters
  get state(): AppState {
    return this._state;
  }

  get currentView(): ViewType {
    return this._state.currentView;
  }

  get sidebarOpen(): boolean {
    return this._state.sidebarOpen;
  }

  get tableStats() {
    return {
      totalRows: this._state.tableViewData.rows.length,
      totalColumns: this._state.tableViewData.columns.length,
      totalCells: this._state.tableViewData.rows.length * this._state.tableViewData.columns.length
    };
  }

  // Actions
  setCurrentView(view: ViewType): void {
    this._state.currentView = view;
  }

  toggleSidebar(): void {
    this._state.sidebarOpen = !this._state.sidebarOpen;
  }

  setSelectedWeek(week: number): void {
    this._state.selectedWeek = week;
  }

  setSelectedCity(city: string): void {
    this._state.selectedCity = city;
  }

  updatePrayerTime(prayer: keyof PrayerTimes, time: string): void {
    this._state.prayerTimes[prayer].time = time;
  }

  addTableRow(): void {
    const newRow = {
      id: `row-${Date.now()}`,
      cells: this._state.tableViewData.columns.map((col, index) => ({
        id: `cell-${Date.now()}-${index}`,
        value: this._state.tableViewData.rows.length * 25 + index + 1,
        editable: true
      })),
      bgColor: this._state.tableViewData.rows.length % 2 === 0 ? 'white' : 'slate'
    };

    this._state.tableViewData.rows.push(newRow);
  }

  updateTableCell(rowId: string, cellId: string, value: string | number): void {
    const row = this._state.tableViewData.rows.find(r => r.id === rowId);
    if (row) {
      const cell = row.cells.find(c => c.id === cellId);
      if (cell) {
        cell.value = value;
      }
    }
  }

  addScheduleActivity(activity: Partial<ScheduleActivity>): void {
    const newActivity: ScheduleActivity = {
      id: `activity-${Date.now()}`,
      time: '',
      day: '',
      activity: activity.activity || 'New Activity',
      weeklyTracker: [false, false, false, false, false, false, false],
      stats: {
        weekly: 0,
        monthly: 0,
        streak: 0
      },
      ...activity
    };

    this._state.scheduleActivities.push(newActivity);
  }

  // Helper methods
  private getDefaultPrayerTimes(): PrayerTimes {
    return {
      fajr: { name: 'Fajr', shortCode: 'F', time: '05:00' },
      dhuhr: { name: 'Dhuhr', shortCode: 'D', time: '12:00' },
      asr: { name: 'Asr', shortCode: 'A', time: '15:00' },
      maghrib: { name: 'Maghrib', shortCode: 'M', time: '18:00' },
      isha: { name: 'Isha', shortCode: 'I', time: '20:00' },
      qiyam: { name: 'Qiyam', shortCode: 'Q', time: '23:00' }
    };
  }

  private generateInitialTableData(): TableViewData {
    const columns = Array.from({ length: 25 }, (_, i) => ({
      id: `col-${i}`,
      header: `Field ${i + 1}`,
      width: 'auto'
    }));

    const rows = Array.from({ length: 37 }, (_, i) => ({
      id: `row-${i}`,
      cells: Array.from({ length: 25 }, (_, j) => ({
        id: `cell-${i}-${j}`,
        value: i * 25 + j + 1,
        editable: true
      })),
      bgColor: i % 2 === 0 ? 'white' : 'slate'
    }));

    return { rows, columns, totalRows: 37, totalColumns: 25 };
  }

  private generateInitialScheduleData(): ScheduleActivity[] {
    return [
      {
        id: 'activity-1',
        time: 'QIYAM',
        day: 'DAILY',
        activity: 'Wake Up Early (For Qiyam)',
        weeklyTracker: [false, false, false, false, false, false, false],
        stats: { weekly: 0, monthly: 0, streak: 0 }
      },
      {
        id: 'activity-2',
        time: 'DAILY',
        day: 'DAILY',
        activity: 'Pray Qiyam/Tahajjud',
        weeklyTracker: [false, false, false, false, false, false, false],
        stats: { weekly: 0, monthly: 0, streak: 0 }
      },
      {
        id: 'activity-3',
        time: '7AM - 9AM',
        day: 'MON/THU',
        activity: 'Commute (Morning)',
        weeklyTracker: [false, false, false, false, false, false, false],
        stats: { weekly: 0, monthly: 0, streak: 0 }
      }
    ];
  }

  // Goals CRUD operations
  addGoal(goal: Partial<Goal>): void {
    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      title: goal.title || 'New Goal',
      category: goal.category || 'General',
      target: goal.target || '',
      progress: goal.progress || 0,
      completed: false,
      ...goal
    };
    this._state.goals.push(newGoal);
  }

  updateGoal(goalId: string, updates: Partial<Goal>): void {
    const goal = this._state.goals.find(g => g.id === goalId);
    if (goal) {
      Object.assign(goal, updates);
    }
  }

  deleteGoal(goalId: string): void {
    this._state.goals = this._state.goals.filter(g => g.id !== goalId);
  }

  // Daily entries CRUD operations
  addDailyEntry(entry: Partial<DailyEntry>): void {
    const newEntry: DailyEntry = {
      id: `daily-${Date.now()}`,
      date: entry.date || new Date().toISOString().split('T')[0],
      activity: entry.activity || '',
      notes: entry.notes || '',
      ...entry
    };
    this._state.dailyEntries.push(newEntry);
  }

  updateDailyEntry(entryId: string, updates: Partial<DailyEntry>): void {
    const entry = this._state.dailyEntries.find(e => e.id === entryId);
    if (entry) {
      Object.assign(entry, updates);
    }
  }

  deleteDailyEntry(entryId: string): void {
    this._state.dailyEntries = this._state.dailyEntries.filter(e => e.id !== entryId);
  }

  // Notes CRUD operations
  addNote(note: Partial<Note>): void {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: note.title || 'New Note',
      category: note.category || 'General',
      content: note.content || '',
      createdAt: note.createdAt || new Date().toISOString(),
      ...note
    };
    this._state.notes.push(newNote);
  }

  updateNote(noteId: string, updates: Partial<Note>): void {
    const note = this._state.notes.find(n => n.id === noteId);
    if (note) {
      Object.assign(note, updates);
    }
  }

  deleteNote(noteId: string): void {
    this._state.notes = this._state.notes.filter(n => n.id !== noteId);
  }

  // List items CRUD operations
  addListItem(item: Partial<ListItem>): void {
    const newItem: ListItem = {
      id: `list-${Date.now()}`,
      category: item.category || 'General',
      item: item.item || 'New Item',
      details: item.details || '',
      sets: item.sets,
      reps: item.reps,
      weight: item.weight,
      rest: item.rest,
      status: item.status || 'Active',
      isSubCategory: item.isSubCategory || false,
      ...item
    };
    this._state.listItems.push(newItem);
  }

  updateListItem(itemId: string, updates: Partial<ListItem>): void {
    const item = this._state.listItems.find(i => i.id === itemId);
    if (item) {
      Object.assign(item, updates);
    }
  }

  deleteListItem(itemId: string): void {
    this._state.listItems = this._state.listItems.filter(i => i.id !== itemId);
  }

  // Initial data generation methods
  private generateInitialGoalsData(): Goal[] {
    return [
      {
        id: 'goal-1',
        title: 'Complete Project',
        category: 'Work',
        target: 'Dec 31',
        progress: 75,
        completed: false
      },
      {
        id: 'goal-2',
        title: 'Learn New Skill',
        category: 'Personal',
        target: 'Nov 30',
        progress: 50,
        completed: false
      }
    ];
  }

  private generateInitialDailyData(): DailyEntry[] {
    return [
      {
        id: 'daily-1',
        date: '2024-01-15',
        activity: 'Team Meeting',
        notes: 'Discussed Q1 goals'
      },
      {
        id: 'daily-2',
        date: '2024-01-15',
        activity: 'Code Review',
        notes: 'Reviewed pull requests'
      }
    ];
  }

  private generateInitialNotesData(): Note[] {
    return [
      {
        id: 'note-1',
        title: 'Project Ideas',
        category: 'Work',
        content: 'Mobile app for task management',
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 'note-2',
        title: 'Shopping List',
        category: 'Personal',
        content: 'Milk, Eggs, Bread, Vegetables',
        createdAt: '2024-01-14T15:30:00Z'
      }
    ];
  }

  private generateInitialListsData(): ListItem[] {
    return [
      {
        id: 'list-1',
        category: '🏋️ WORKOUT',
        item: '⚖️ •🎯 •👔 •🦴 •💪 •🦵',
        details: 'Tuesday/Wednesday/Friday Weight Training',
        status: 'Active',
        isSubCategory: false
      },
      {
        id: 'list-2',
        category: '└─ Weight Training',
        item: 'TUESDAY - Upper/Legs',
        details: 'Incline DB Press, Barbell Squats, DB Row, Leg Curls, SS: Incline DB Curls & Tricep Extensions',
        sets: '3-4',
        reps: '8-12',
        weight: 'Progressive',
        rest: '60-90s',
        status: 'Active',
        isSubCategory: true
      },
      {
        id: 'list-3',
        category: '📚 WORK',
        item: 'Project Documentation',
        details: 'Complete API documentation',
        status: 'Active',
        isSubCategory: false
      }
    ];
  }
}

// Create singleton instance
export const appStore = new AppStore();