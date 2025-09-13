import { WeekendSchedule } from './WeekendSchedule';
import { ThemeSelector } from './ThemeSelector';
import { ScheduleActions } from './ScheduleActions';
import { useStore } from '@/store/useStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar, 
  Palette, 
  BarChart3,
  Clock,
  Target
} from 'lucide-react';

export function ScheduleView() {
  const { schedule, currentTheme } = useStore();
  
  const totalActivities = schedule.saturday.length + schedule.sunday.length;
  const totalDuration = [...schedule.saturday, ...schedule.sunday]
    .reduce((sum, activity) => sum + activity.duration, 0);
  
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;

  const stats = [
    {
      label: 'Total Activities',
      value: totalActivities,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Total Time',
      value: `${hours}h ${minutes}m`,
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Current Theme',
      value: currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1),
      icon: Palette,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="container-responsive py-6 sm:py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="glass-effect card-hover animate-slide-in">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 sm:p-3 rounded-xl ${stat.bgColor} ${stat.color} shadow-sm`}>
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</p>
                      <p className="text-lg sm:text-xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="schedule" className="space-y-6 sm:space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto glass-effect shadow-lg">
            <TabsTrigger value="schedule" className="flex items-center space-x-2 button-hover">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="themes" className="flex items-center space-x-2 button-hover">
              <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Themes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-6 sm:space-y-8 animate-fade-in">
            <WeekendSchedule />
            <div className="flex justify-center">
              <ScheduleActions />
            </div>
          </TabsContent>

          <TabsContent value="themes" className="animate-fade-in">
            <ThemeSelector />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}