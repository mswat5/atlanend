import { create } from "zustand";
import {
  AppState,
  Activity,
  ActivityCategory,
  WeekendTheme,
  ScheduledActivity,
} from "@/types";
import { sampleActivities } from "@/data/activities";

const STORAGE_KEY = "atlanend-data";

export const useStore = create<AppState>((set, get) => ({
  activities: sampleActivities,
  schedule: {
    saturday: [],
    sunday: [],
  },
  selectedCategory: "all",
  searchQuery: "",
  currentTheme: "balanced",
  currentView: "browse",

  toggleActivitySelection: (activityId: string) => {
    set((state) => ({
      activities: state.activities.map((activity) =>
        activity.id === activityId
          ? { ...activity, isSelected: !activity.isSelected }
          : activity
      ),
    }));
  },

  setSelectedCategory: (category: ActivityCategory | "all") => {
    set({ selectedCategory: category });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  addActivityToSchedule: (activityId: string, day: "saturday" | "sunday") => {
    const activity = get().activities.find((a) => a.id === activityId);
    if (activity) {
      const scheduledActivity: ScheduledActivity = {
        ...activity,
        scheduledTime: "",
        notes: "",
      };
      set((state) => ({
        schedule: {
          ...state.schedule,
          [day]: [...state.schedule[day], scheduledActivity],
        },
      }));
      get().saveToLocalStorage();
    }
  },

  removeActivityFromSchedule: (
    activityId: string,
    day: "saturday" | "sunday"
  ) => {
    set((state) => ({
      schedule: {
        ...state.schedule,
        [day]: state.schedule[day].filter(
          (activity) => activity.id !== activityId
        ),
      },
    }));
    get().saveToLocalStorage();
  },

  reorderScheduleActivities: (
    day: "saturday" | "sunday",
    startIndex: number,
    endIndex: number
  ) => {
    set((state) => {
      const dayActivities = [...state.schedule[day]];
      const [reorderedItem] = dayActivities.splice(startIndex, 1);
      dayActivities.splice(endIndex, 0, reorderedItem);

      return {
        schedule: {
          ...state.schedule,
          [day]: dayActivities,
        },
      };
    });
    get().saveToLocalStorage();
  },

  updateScheduledActivity: (
    activityId: string,
    day: "saturday" | "sunday",
    updates: Partial<ScheduledActivity>
  ) => {
    set((state) => ({
      schedule: {
        ...state.schedule,
        [day]: state.schedule[day].map((activity) =>
          activity.id === activityId ? { ...activity, ...updates } : activity
        ),
      },
    }));
    get().saveToLocalStorage();
  },

  setCurrentTheme: (theme: WeekendTheme) => {
    set({ currentTheme: theme });
    get().saveToLocalStorage();
  },

  setCurrentView: (view: "browse" | "schedule") => {
    set({ currentView: view });
  },

  applyThemeToSchedule: () => {
    const { currentTheme, activities } = get();
    let recommendedActivities: Activity[] = [];

    switch (currentTheme) {
      case "adventurous":
        recommendedActivities = activities
          .filter(
            (a) =>
              a.category === "outdoor" ||
              a.difficulty === "hard" ||
              a.tags.includes("adventure")
          )
          .slice(0, 6);
        break;
      case "lazy":
        recommendedActivities = activities
          .filter(
            (a) =>
              a.category === "indoor" ||
              a.difficulty === "easy" ||
              a.tags.includes("relaxation")
          )
          .slice(0, 4);
        break;
      case "social":
        recommendedActivities = activities
          .filter(
            (a) =>
              a.category === "social" ||
              a.tags.includes("social") ||
              a.tags.includes("friends")
          )
          .slice(0, 5);
        break;
      case "wellness":
        recommendedActivities = activities
          .filter(
            (a) =>
              a.category === "wellness" ||
              a.tags.includes("mindfulness") ||
              a.tags.includes("exercise")
          )
          .slice(0, 5);
        break;
      case "creative":
        recommendedActivities = activities
          .filter(
            (a) =>
              a.category === "creative" ||
              a.tags.includes("art") ||
              a.tags.includes("creative")
          )
          .slice(0, 5);
        break;
      default: // balanced
        const categories = [
          "outdoor",
          "indoor",
          "food",
          "social",
          "wellness",
          "creative",
        ];
        recommendedActivities = categories.flatMap((cat) =>
          activities.filter((a) => a.category === cat).slice(0, 1)
        );
    }

    // Clear current schedule and add recommended activities
    const saturdayActivities = recommendedActivities.slice(
      0,
      Math.ceil(recommendedActivities.length / 2)
    );
    const sundayActivities = recommendedActivities.slice(
      Math.ceil(recommendedActivities.length / 2)
    );

    set({
      schedule: {
        saturday: saturdayActivities.map((activity) => ({
          ...activity,
          scheduledTime: "",
          notes: "",
        })),
        sunday: sundayActivities.map((activity) => ({
          ...activity,
          scheduledTime: "",
          notes: "",
        })),
      },
    });
    get().saveToLocalStorage();
  },

  exportSchedule: () => {
    const { schedule, currentTheme } = get();
    const exportData = {
      theme: currentTheme,
      schedule,
      exportDate: new Date().toISOString(),
    };
    return JSON.stringify(exportData, null, 2);
  },

  clearSchedule: () => {
    set({
      schedule: {
        saturday: [],
        sunday: [],
      },
    });
    get().saveToLocalStorage();
  },

  getFilteredActivities: () => {
    const { activities, selectedCategory, searchQuery } = get();

    return activities.filter((activity) => {
      const matchesCategory =
        selectedCategory === "all" || activity.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        activity.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  },

  saveToLocalStorage: () => {
    const { schedule, currentTheme, activities } = get();
    const dataToSave = {
      schedule,
      currentTheme,
      selectedActivities: activities
        .filter((a) => a.isSelected)
        .map((a) => a.id),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  },

  loadFromLocalStorage: () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const { schedule, currentTheme, selectedActivities } =
          JSON.parse(savedData);
        set((state) => ({
          schedule: schedule || { saturday: [], sunday: [] },
          currentTheme: currentTheme || "balanced",
          activities: state.activities.map((activity) => ({
            ...activity,
            isSelected: selectedActivities?.includes(activity.id) || false,
          })),
        }));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
    }
  },
}));

// Load data on store initialization
useStore.getState().loadFromLocalStorage();
