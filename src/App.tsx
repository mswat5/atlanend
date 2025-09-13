import { ActivityBrowser } from '@/components/ActivityBrowser';
import { ScheduleView } from '@/components/ScheduleView';
import { Navigation } from '@/components/Navigation';
import { Toaster } from '@/components/ui/toaster';
import { useStore } from '@/store/useStore';

function App() {
  const { currentView } = useStore();

  return (
    <div className="min-h-screen">
      <Navigation />
      {currentView === 'browse' ? <ActivityBrowser /> : <ScheduleView />}
      <Toaster />
    </div>
  );
}

export default App;