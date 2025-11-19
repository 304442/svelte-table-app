// Core application types for the modern table application

export interface TableRow {
  id: string;
  cells: TableCell[];
  bgColor?: 'white' | 'slate';
}

export interface TableCell {
  id: string;
  value: string | number;
  editable: boolean;
}

export interface TableColumn {
  id: string;
  header: string;
  width?: string;
}

export interface TableViewData {
  rows: TableRow[];
  columns: TableColumn[];
  totalRows: number;
  totalColumns: number;
}

// Prayer times specific types
export interface PrayerTime {
  name: string;
  shortCode: string;
  time: string;
}

export interface PrayerTimes {
  fajr: PrayerTime;
  dhuhr: PrayerTime;
  asr: PrayerTime;
  maghrib: PrayerTime;
  isha: PrayerTime;
  qiyam: PrayerTime;
}

// Schedule view types
export interface ScheduleActivity {
  id: string;
  time: string;
  day: string;
  activity: string;
  weeklyTracker: boolean[];
  stats: {
    weekly: number;
    monthly: number;
    streak: number;
  };
}

export interface Goal {
  id: string;
  title: string;
  category: string;
  target: string;
  progress: string | number;
  completed: boolean;
}

export interface DailyEntry {
  id: string;
  date: string;
  activity: string;
  notes: string;
}

export interface Note {
  id: string;
  title: string;
  category: string;
  content: string;
  createdAt: string;
}

export interface ListItem {
  id: string;
  category: string;
  item: string;
  details: string;
  sets?: string;
  reps?: string;
  weight?: string;
  rest?: string;
  status: 'Active' | 'Completed' | 'Inactive';
  isSubCategory?: boolean;
}

// Application state types
export type ViewType = 'table' | 'schedule' | 'goals' | 'daily' | 'notes' | 'lists';

export interface AppState {
  currentView: ViewType;
  sidebarOpen: boolean;
  selectedWeek: number;
  selectedCity: string;
  prayerTimes: PrayerTimes;
  tableViewData: TableViewData;
  scheduleActivities: ScheduleActivity[];
  goals: Goal[];
  dailyEntries: DailyEntry[];
  notes: Note[];
  listItems: ListItem[];
}

// Component props types
export interface ButtonProps {
  onclick?: (event: MouseEvent) => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: string;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
}

export interface InputProps {
  value: string | number;
  oninput?: (value: string | number) => void;
  onkeydown?: (event: KeyboardEvent) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'time' | 'email';
  disabled?: boolean;
  class?: string;
}

export interface SelectProps {
  value: string;
  onselect?: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  disabled?: boolean;
  class?: string;
}