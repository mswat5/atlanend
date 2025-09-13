import { WeekendTheme } from '@/types';
import { useStore } from '@/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mountain, 
  Coffee, 
  Users, 
  Heart, 
  Palette, 
  Scale,
  Sparkles,
  Zap
} from 'lucide-react';

const themes: {
  key: WeekendTheme;
  label: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
}[] = [
  {
    key: 'balanced',
    label: 'Balanced',
    description: 'Perfect mix of activities for a well-rounded weekend',
    icon: Scale,
    color: 'bg-gray-500',
    gradient: 'from-gray-400 to-gray-600',
  },
  {
    key: 'adventurous',
    label: 'Adventurous',
    description: 'Outdoor activities and exciting challenges',
    icon: Mountain,
    color: 'bg-green-500',
    gradient: 'from-green-400 to-emerald-600',
  },
  {
    key: 'lazy',
    label: 'Lazy & Cozy',
    description: 'Relaxing indoor activities and self-care',
    icon: Coffee,
    color: 'bg-amber-500',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    key: 'social',
    label: 'Social',
    description: 'Activities focused on friends and community',
    icon: Users,
    color: 'bg-purple-500',
    gradient: 'from-purple-400 to-pink-600',
  },
  {
    key: 'wellness',
    label: 'Wellness',
    description: 'Mind and body focused activities',
    icon: Heart,
    color: 'bg-teal-500',
    gradient: 'from-teal-400 to-cyan-600',
  },
  {
    key: 'creative',
    label: 'Creative',
    description: 'Artistic and imaginative pursuits',
    icon: Palette,
    color: 'bg-yellow-500',
    gradient: 'from-yellow-400 to-orange-500',
  },
];

export function ThemeSelector() {
  const { currentTheme, setCurrentTheme, applyThemeToSchedule, schedule } = useStore();
  
  const hasScheduledActivities = schedule.saturday.length > 0 || schedule.sunday.length > 0;

  const handleThemeSelect = (theme: WeekendTheme) => {
    setCurrentTheme(theme);
  };

  const handleApplyTheme = () => {
    applyThemeToSchedule();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Weekend Vibe</h2>
        <p className="text-gray-600">Select a theme to get personalized activity recommendations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => {
          const Icon = theme.icon;
          const isSelected = currentTheme === theme.key;
          
          return (
            <Card
              key={theme.key}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
              onClick={() => handleThemeSelect(theme.key)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${theme.gradient} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {isSelected && (
                    <Badge variant="default" className="bg-blue-500">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Selected
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{theme.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{theme.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Button
          onClick={handleApplyTheme}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3"
        >
          <Zap className="w-5 h-5 mr-2" />
          Apply {themes.find(t => t.key === currentTheme)?.label} Theme
        </Button>
        {hasScheduledActivities && (
          <p className="text-sm text-amber-600 mt-2">
            ⚠️ This will replace your current schedule
          </p>
        )}
      </div>
    </div>
  );
}