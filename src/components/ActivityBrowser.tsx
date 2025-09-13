import { ActivityCard } from "./ActivityCard";
import { CategoryFilter } from "./CategoryFilter";
import { SearchBar } from "./SearchBar";
import { useStore } from "@/store/useStore";
import { Calendar, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActivityBrowser() {
  const { getFilteredActivities, activities, setCurrentView, schedule } =
    useStore();
  const filteredActivities = getFilteredActivities();
  const selectedCount = activities.filter((a) => a.isSelected).length;
  const scheduledCount = schedule.saturday.length + schedule.sunday.length;

  return (
    <div className="min-h-screen pb-8 animate-fade-in">
      <div className="container-responsive py-6 sm:py-8">
        <div className="text-center mb-8 sm:mb-12 animate-slide-in">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-3">
            Discover Activities
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Find and select activities for your perfect weekend adventure
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
            {selectedCount > 0 && (
              <div className="flex items-center space-x-2 glass-effect bg-emerald-50/80 text-emerald-800 px-3 sm:px-4 py-2 rounded-xl shadow-sm animate-fade-in">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-sm sm:text-base">
                  {selectedCount} selected
                </span>
              </div>
            )}
            {scheduledCount > 0 && (
              <div className="flex items-center space-x-2 glass-effect bg-blue-50/80 text-blue-800 px-3 sm:px-4 py-2 rounded-xl shadow-sm animate-fade-in">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-sm sm:text-base">
                  {scheduledCount} scheduled
                </span>
              </div>
            )}
            {selectedCount > 0 && (
              <Button
                onClick={() => setCurrentView("schedule")}
                className="gradient-secondary hover:shadow-lg button-hover text-sm sm:text-base px-4 sm:px-6"
              >
                Plan Schedule
                <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          <SearchBar />
          <CategoryFilter />
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Browse Activities
            </h2>
            <span className="text-gray-500 text-xs sm:text-sm">
              {filteredActivities.length} activities found
            </span>
          </div>

          {filteredActivities.length === 0 ? (
            <div className="text-center py-12 sm:py-16 animate-fade-in">
              <div className="text-gray-400 text-base sm:text-lg mb-2">
                No activities match your search criteria
              </div>
              <p className="text-gray-500 text-sm sm:text-base">
                Try adjusting your filters or search terms
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  showScheduleActions={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
