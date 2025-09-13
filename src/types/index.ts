export type ActivityCategory = 'outdoor' | 'indoor' | 'food' | 'social' | 'wellness' | 'creative';
export type WeekendTheme = 'balanced' | 'adventurous' | 'lazy' | 'social' | 'wellness' | 'creative';
export type ActivityMood = 'energetic' | 'relaxed' | 'social' | 'focused' | 'adventurous';

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: ActivityCategory;
  duration: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  cost: 'free' | 'low' | 'medium' | 'high';
  tags: string[];
  isSelected: boolean;
  mood?: ActivityMood;
  timeSlot?: string; // e.g., "morning", "afternoon", "evening"
}

export interface WeekendSchedule {
  saturday: Activity[];
  sunday: Activity[];
}

export interface ScheduledActivity extends Activity {
  scheduledTime?: string;
  notes?: string;
}

export interface AppState {
  activities: Activity[];
  schedule: {
    saturday: ScheduledActivity[];
    sunday: ScheduledActivity[];
  };
  selectedCategory: ActivityCategory | 'all';
  searchQuery: string;
  currentTheme: WeekendTheme;
  currentView: 'browse' | 'schedule';
  
  // Actions
  toggleActivitySelection: (activityId: string) => void;
  setSelectedCategory: (category: ActivityCategory | 'all') => void;
  setSearchQuery: (query: string) => void;
  addActivityToSchedule: (activityId: string, day: 'saturday' | 'sunday') => void;
  removeActivityFromSchedule: (activityId: string, day: 'saturday' | 'sunday') => void;
  reorderScheduleActivities: (day: 'saturday' | 'sunday', startIndex: number, endIndex: number) => void;
  updateScheduledActivity: (activityId: string, day: 'saturday' | 'sunday', updates: Partial<ScheduledActivity>) => void;
  setCurrentTheme: (theme: WeekendTheme) => void;
  setCurrentView: (view: 'browse' | 'schedule') => void;
  applyThemeToSchedule: () => void;
  exportSchedule: () => string;
  clearSchedule: () => void;
  getFilteredActivities: () => Activity[];
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}