# Project Documentation

## Major Design Decisions & Trade-offs

- **Tech Stack**: The project uses React with TypeScript, Vite for fast development, and Tailwind CSS for utility-first styling. This combination ensures rapid prototyping, type safety, and a modern UI.
- **Component Structure**: Components are organized by feature (`src/components/`) and further split into UI primitives (`src/components/ui/`). This modular approach improves reusability and maintainability.
- **State Management**: State is managed locally within components where possible, with a global store (`src/store/useStore.ts`) for shared state. This avoids unnecessary complexity from heavier solutions like Redux, trading off some advanced features for simplicity and performance.
- **Data Handling**: Static data is kept in `src/data/activities.ts`, which simplifies initial development and testing. For scalability, this could be replaced with API integration in the future.

## Component Design, State Management, & UI Polish

- **Component Design**: Components are designed to be small, focused, and reusable. UI primitives (buttons, dialogs, etc.) are abstracted in the `ui/` folder, while feature components (ActivityBrowser, ScheduleView) handle business logic and composition.
- **State Management**: The global store uses a lightweight custom hook, allowing components to subscribe to relevant state slices. This minimizes unnecessary re-renders and keeps the codebase clean.
- **UI Polish**: Tailwind CSS is used for consistent spacing, colors, and responsive design. Interactive elements (accordions, dialogs, tooltips) are implemented for a modern, accessible user experience. Attention was given to transitions, hover states, and mobile responsiveness.

## 📋 Complete Feature List

### 🎯 Core Features

#### Activity Management
- **Activity Database**: 21 pre-loaded activities across 6 categories
- **Activity Selection**: Toggle activities for weekend planning
- **Activity Details**: Duration, difficulty, cost, and tags for each activity
- **Visual Indicators**: Clear status showing selected/scheduled activities

#### Browsing & Discovery
- **Category Filtering**: Filter by Outdoor, Indoor, Food, Social, Wellness, Creative
- **Search Functionality**: Search by title, description, or tags
- **Smart Filtering**: Real-time filtering with activity counts
- **Activity Cards**: Rich cards with icons, descriptions, and metadata

#### Weekend Scheduling
- **Dual-Day Planning**: Separate Saturday and Sunday schedules
- **Drag & Drop Reordering**: Intuitive activity reordering within days
- **Time Slot Organization**: Morning, Afternoon, Evening, Night categorization
- **Activity Editing**: Add notes and specific times to scheduled activities
- **Duration Tracking**: Automatic calculation of total time per day

### 🚀 Enhanced Features

#### Theme System
- **6 Unique Themes**: Balanced, Adventurous, Lazy, Social, Wellness, Creative
- **Smart Recommendations**: AI-like activity selection based on theme
- **Auto-Population**: Instant schedule generation from themes
- **Theme Persistence**: Remember selected theme across sessions

#### Data Management
- **Export Functionality**: Download schedules as JSON files
- **Share Feature**: Generate shareable text for social media
- **localStorage Persistence**: Automatic saving and loading
- **Schedule Clearing**: One-click schedule reset

#### User Experience
- **Responsive Navigation**: Seamless switching between Browse and Schedule views
- **Statistics Dashboard**: Activity count, total time, current theme display
- **Toast Notifications**: User feedback for all actions
- **Loading States**: Smooth transitions and animations

### 🎨 Design Features

#### Visual Design
- **Glass Morphism**: Modern translucent effects with backdrop blur
- **Gradient System**: Consistent color gradients throughout the app
- **Category Colors**: Unique color schemes for each activity category
- **Professional Typography**: Gradient text effects and proper hierarchy

#### Animations & Interactions
- **Smooth Animations**: Fade-in, slide-in, and pulse animations
- **Hover Effects**: Interactive feedback on all clickable elements
- **Micro-Interactions**: Button animations and visual state changes
- **Drag Feedback**: Visual feedback during drag operations

#### Responsive Design
- **Mobile-First**: Optimized for mobile devices first
- **Adaptive Layouts**: Flexible grid systems for all screen sizes
- **Touch-Friendly**: Larger touch targets on mobile devices
- **Cross-Platform**: Consistent experience across all devices

## 🔧 Technical Features

### State Management
- **Zustand Store**: Lightweight, efficient state management
- **Persistent State**: Automatic localStorage integration
- **Action-Based Updates**: Clean, predictable state mutations
- **Computed Values**: Efficient derived state calculations

### Performance
- **Optimized Rendering**: Minimal re-renders with proper state management
- **Lazy Loading**: Components load on demand
- **Bundle Splitting**: Automatic code splitting with Vite
- **Efficient Animations**: Hardware-accelerated CSS animations

### Accessibility
- **Keyboard Navigation**: Full keyboard support for drag & drop
- **Focus Management**: Proper focus states and navigation
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Color Contrast**: WCAG compliant color combinations

## 📱 User Journey Features

### First-Time User Experience
1. **Welcome Interface**: Clear navigation and feature discovery
2. **Activity Exploration**: Easy browsing with visual category filters
3. **Quick Start**: Theme-based schedule generation
4. **Guided Actions**: Clear call-to-action buttons and feedback

### Power User Features
1. **Advanced Filtering**: Combine search and category filters
2. **Custom Scheduling**: Manual activity placement and timing
3. **Schedule Optimization**: Drag & drop for perfect timing
4. **Export & Share**: Professional schedule sharing capabilities

### Mobile Experience
1. **Touch Gestures**: Swipe and tap interactions
2. **Responsive Cards**: Optimized card layouts for small screens
3. **Mobile Navigation**: Thumb-friendly navigation design
4. **Offline Capability**: localStorage ensures offline functionality

## 🎭 Theme System Details

### Balanced Theme
- **Philosophy**: Well-rounded weekend experience
- **Selection Logic**: One activity from each category
- **Target User**: First-time users, variety seekers
- **Typical Schedule**: Mix of indoor/outdoor, active/relaxing activities

### Adventurous Theme
- **Philosophy**: Exciting, challenging experiences
- **Selection Logic**: Outdoor activities, hard difficulty, adventure tags
- **Target User**: Active individuals, thrill seekers
- **Typical Schedule**: Hiking, cycling, outdoor challenges

### Lazy & Cozy Theme
- **Philosophy**: Rest, relaxation, and comfort
- **Selection Logic**: Indoor activities, easy difficulty, relaxation tags
- **Target User**: Those needing rest and recovery
- **Typical Schedule**: Movies, reading, home spa, gentle activities

### Social Theme
- **Philosophy**: Connection and community
- **Selection Logic**: Social category, friend-focused activities
- **Target User**: Social butterflies, group activity lovers
- **Typical Schedule**: Friend gatherings, group activities, social dining

### Wellness Theme
- **Philosophy**: Mind and body health
- **Selection Logic**: Wellness category, mindfulness, exercise tags
- **Target User**: Health-conscious individuals
- **Typical Schedule**: Yoga, meditation, nature walks, healthy cooking

### Creative Theme
- **Philosophy**: Artistic expression and creativity
- **Selection Logic**: Creative category, art and creative tags
- **Target User**: Artists, makers, creative minds
- **Typical Schedule**: Art workshops, DIY projects, creative writing

## 🔄 Data Flow Features

### Activity Selection Flow
1. **Browse Activities** → Filter/Search → Select Activities
2. **View Selected** → Quick Add to Days → Schedule View
3. **Schedule Management** → Drag & Drop → Edit Details

### Theme Application Flow
1. **Choose Theme** → Preview Description → Apply Theme
2. **Auto-Population** → Review Schedule → Customize Further
3. **Save & Share** → Export Options → Social Sharing

### Persistence Flow
1. **User Actions** → State Updates → Auto-Save to localStorage
2. **Page Reload** → Load from localStorage → Restore State
3. **Cross-Session** → Maintain Selections → Continue Planning

## 📊 Analytics & Insights Features

### Usage Statistics
- **Activity Popularity**: Track most selected activities
- **Theme Preferences**: Monitor theme usage patterns
- **Session Duration**: Time spent planning weekends
- **Feature Usage**: Most used features and workflows

### User Insights
- **Planning Patterns**: Common activity combinations
- **Time Preferences**: Popular time slot selections
- **Category Preferences**: Most popular activity categories
- **Schedule Complexity**: Average activities per weekend

## 🔮 Future Feature Possibilities

### Enhanced Personalization
- **User Profiles**: Save preferences and history
- **Smart Recommendations**: ML-based activity suggestions
- **Custom Categories**: User-defined activity categories
- **Habit Tracking**: Weekend activity completion tracking

### Social Features
- **Shared Schedules**: Collaborate on weekend plans
- **Community Activities**: Discover popular local activities
- **Friend Integration**: Plan activities with friends
- **Activity Reviews**: Rate and review completed activities

### Advanced Planning
- **Multi-Weekend Planning**: Plan multiple weekends ahead
- **Weather Integration**: Weather-based activity suggestions
- **Location Services**: Location-based activity filtering
- **Calendar Integration**: Sync with external calendars

### Gamification
- **Achievement System**: Unlock badges for different activities
- **Challenge Mode**: Weekend activity challenges
- **Progress Tracking**: Track weekend planning streaks
- **Social Sharing**: Share achievements and completed weekends
