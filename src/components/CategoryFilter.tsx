import { ActivityCategory } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/store/useStore";
import {
  Mountain,
  Home,
  UtensilsCrossed,
  Users,
  Heart,
  Palette,
  Grid3X3,
} from "lucide-react";

const categories: {
  key: ActivityCategory | "all";
  label: string;
  icon: any;
  color: string;
}[] = [
  { key: "all", label: "All Activities", icon: Grid3X3, color: "bg-gray-500" },
  { key: "outdoor", label: "Outdoor", icon: Mountain, color: "bg-green-500" },
  { key: "indoor", label: "Indoor", icon: Home, color: "bg-blue-500" },
  {
    key: "food",
    label: "Food & Dining",
    icon: UtensilsCrossed,
    color: "bg-orange-500",
  },
  { key: "social", label: "Social", icon: Users, color: "bg-purple-500" },
  { key: "wellness", label: "Wellness", icon: Heart, color: "bg-teal-500" },
  { key: "creative", label: "Creative", icon: Palette, color: "bg-yellow-500" },
];

export function CategoryFilter() {
  const { selectedCategory, setSelectedCategory, getFilteredActivities } =
    useStore();
  const filteredActivities = getFilteredActivities();

  return (
    <div className="space-y-4 animate-slide-in">
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.key;
          const categoryCount =
            category.key === "all"
              ? filteredActivities.length
              : filteredActivities.filter((a) => a.category === category.key)
                  .length;

          return (
            <Badge
              key={category.key}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer button-hover px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm  shadow-sm ${
                isSelected
                  ? `bg-black text-white shadow-lg`
                  : "hover:bg-white/70 border-white/30"
              }`}
              onClick={() => setSelectedCategory(category.key)}
            >
              <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              {category.label}
              {categoryCount > 0 && (
                <span className="ml-1 sm:ml-2 bg-white/20 text-xs px-1.5 sm:px-2 py-0.5 rounded-full animate-pulse-subtle">
                  {categoryCount}
                </span>
              )}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
