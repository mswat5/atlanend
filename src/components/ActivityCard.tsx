import { Activity } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import { 
  Mountain, 
  Home, 
  UtensilsCrossed, 
  Users, 
  Heart, 
  Palette,
  Clock,
  DollarSign,
  Star,
  Plus,
  Check,
  Calendar
} from 'lucide-react';

const categoryIcons = {
  outdoor: Mountain,
  indoor: Home,
  food: UtensilsCrossed,
  social: Users,
  wellness: Heart,
  creative: Palette,
};

const categoryColors = {
  outdoor: 'from-green-400 to-emerald-600',
  indoor: 'from-blue-400 to-indigo-600',
  food: 'from-orange-400 to-red-500',
  social: 'from-purple-400 to-pink-600',
  wellness: 'from-teal-400 to-cyan-600',
  creative: 'from-yellow-400 to-orange-500',
};

const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
};

const costIcons = {
  free: '💰',
  low: '💰💰',
  medium: '💰💰💰',
  high: '💰💰💰💰',
};

interface ActivityCardProps {
  activity: Activity;
  showScheduleActions?: boolean;
}

export function ActivityCard({ activity, showScheduleActions = false }: ActivityCardProps) {
  const { toggleActivitySelection, addActivityToSchedule, schedule } = useStore();
  const CategoryIcon = categoryIcons[activity.category];
  
  const isInSaturday = schedule.saturday.some(a => a.id === activity.id);
  const isInSunday = schedule.sunday.some(a => a.id === activity.id);
  const isScheduled = isInSaturday || isInSunday;
  
  return (
    <Card className="group card-hover border-0 overflow-hidden glass-effect shadow-sm animate-fade-in">
      <div className={`h-2 bg-gradient-to-r ${categoryColors[activity.category]}`} />
      
      <CardHeader className="pb-3 p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-r ${categoryColors[activity.category]} text-white shadow-md button-hover`}>
              <CategoryIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">
                {activity.title}
              </CardTitle>
              <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500 mt-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{activity.duration} min</span>
              </div>
            </div>
          </div>
          <Button
            variant={activity.isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => toggleActivitySelection(activity.id)}
            className={`min-w-[70px] sm:min-w-[80px] button-hover text-xs sm:text-sm ${
              isScheduled 
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200' 
                : activity.isSelected 
                  ? 'gradient-primary text-white shadow-md' 
                  : 'hover:bg-gray-50'
            }`}
          >
            {isScheduled ? (
              <>
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="hidden sm:inline">Scheduled</span>
                <span className="sm:hidden">Done</span>
              </>
            ) : activity.isSelected ? (
              <>
                <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="hidden sm:inline">Added</span>
                <span className="sm:hidden">✓</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="hidden sm:inline">Add</span>
                <span className="sm:hidden">+</span>
              </>
            )}
          </Button>
        </div>
        
        {showScheduleActions && activity.isSelected && !isScheduled && (
          <div className="flex space-x-2 mt-3 animate-fade-in">
            <Button
              variant="outline"
              size="sm"
              onClick={() => addActivityToSchedule(activity.id, 'saturday')}
              className="flex-1 text-xs button-hover hover:bg-blue-50"
            >
              + Saturday
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addActivityToSchedule(activity.id, 'sunday')}
              className="flex-1 text-xs button-hover hover:bg-purple-50"
            >
              + Sunday
            </Button>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
        <CardDescription className="text-gray-600 leading-relaxed text-sm sm:text-base">
          {activity.description}
        </CardDescription>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className={`${difficultyColors[activity.difficulty]} text-xs`}>
              <Star className="w-3 h-3 mr-1 fill-current" />
              {activity.difficulty}
            </Badge>
            <div className="flex items-center text-xs sm:text-sm text-gray-500">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span>{activity.cost}</span>
            </div>
          </div>
          <span className="text-base sm:text-lg">{costIcons[activity.cost]}</span>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {activity.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5 hover:bg-gray-50 transition-colors">
              {tag}
            </Badge>
          ))}
          {activity.tags.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-0.5 bg-gray-100 hover:bg-gray-200 transition-colors">
              +{activity.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}