import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search } from "lucide-react";

export function Navigation() {
  const { currentView, setCurrentView, schedule, activities } = useStore();

  const selectedCount = activities.filter((a) => a.isSelected).length;
  const scheduledCount = schedule.saturday.length + schedule.sunday.length;

  const navItems = [
    {
      key: "browse" as const,
      label: "Browse Activities",
      icon: Search,
      badge: selectedCount > 0 ? selectedCount : null,
    },
    {
      key: "schedule" as const,
      label: "Weekend Schedule",
      icon: Calendar,
      badge: scheduledCount > 0 ? scheduledCount : null,
    },
  ];

  return (
    <nav className="glass-effect border-b border-white/20 shadow-lg sticky top-0 z-50 animate-fade-in w-[95%] md:w-[95%] lg:w-[85%] mx-auto">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center space-x-3 animate-slide-in">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Atlanend
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              Plan your perfect weekend
            </p>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.key;

              return (
                <Button
                  key={item.key}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => setCurrentView(item.key)}
                  className={`relative flex items-center space-x-2 button-hover ${
                    isActive
                      ? "gradient-secondary text-white shadow-lg"
                      : "hover:bg-white/50"
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className={`ml-1 sm:ml-2 text-xs animate-pulse-subtle ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
