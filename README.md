# Generic Analytics Dashboard

A single-page analytics dashboard built with React, TypeScript, and Recharts, displaying multiple chart types with mock data.

## 🚀 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts
- **State Management**: React hooks (useState, useCallback, useEffect)
- **UI Components**: shadcn/ui

## 📦 Setup Instructions

1. Install dependencies:
```bash
npm install
# or
bun install
```

2. Start the development server:
```bash
npm run dev
# or
bun dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🎯 Features

- **Dashboard Layout**:  made some changes to design to show my creativity 
- **4+ Chart Types**: 
  - Bar charts (Query Executions, Firewall API Calls)
  - Horizontal bar chart (Queries by Source)
  - Area/Line charts (Response Time metrics)
  - Stat cards (Users, Unique Logins)
- **Page-Level Controls**:
  - Time range filter (7/30/90 days)
  - Global refresh button
- **Individual Chart Refresh**: Each chart has its own refresh button
- **Loading & Error States**: Visual feedback for async operations
- **Mock Data**: Simulated API with realistic delays

## 🏗️ Architecture

```
src/
├── components/
│   └── dashboard/           # Dashboard-specific components
│       ├── Sidebar.tsx
│       ├── DashboardHeader.tsx
│       ├── ChartCard.tsx    # Reusable card wrapper
│       └── [Chart components]
├── hooks/
│   └── useDashboardData.ts  # Data fetching & state management
├── services/
│   └── mockData.ts          # Mock API functions
├── types/
│   └── dashboard.ts         # TypeScript interfaces
└── pages/
    └── Index.tsx            # Main dashboard page
```

## 🔑 Key Decisions

1. **Component Structure**: Separated chart logic into individual components for reusability and maintainability
2. **Custom Hook**: Created `useDashboardData` to centralize all data fetching logic and state management
3. **Design System**: Used CSS variables for theming, making it easy to customize colors
4. **Mock Data**: Implemented realistic mock API with random data generation and simulated delays

## 🔄 Trade-offs

- Used Recharts instead of Highcharts for faster setup (both are capable libraries)
- Mock data generates random values each refresh for demo purposes
- Focused on core functionality over extensive error handling

## ⏰ Time Spent

Approximately 4-5 hours

## 🚀 Future Improvements

- Add unit tests for components and hooks
- Implement data caching with React Query
- Add responsive design for mobile
- Add keyboard navigation for accessibility

