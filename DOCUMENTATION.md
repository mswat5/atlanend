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

## Creative Features & Integrations

- **Category Filtering**: Users can filter activities by category using the `CategoryFilter` component, enhancing discoverability.
- **Theme Selector**: The `ThemeSelector` component allows users to switch between light and dark modes, improving accessibility and personalization.
- **Weekend Schedule**: The `WeekendSchedule` and `ScheduleActions` components provide a streamlined way to view and manage weekend plans.
- **UI Primitives**: The project includes a rich set of UI primitives (accordion, toast, dialog, etc.), enabling rapid development of new features and consistent UX.
- **Potential Integrations**: The structure allows for easy integration with external APIs or services (e.g., calendar sync, notifications) in the future.
