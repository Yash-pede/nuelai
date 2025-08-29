# SupplySight Dashboard

A modern inventory management dashboard built with **Next.js**, **GraphQL**, and **Redux Toolkit**.

## 🚀 Tech Stack

- **Next.js**  - React framework
- **Apollo Client** - GraphQL client
- **Redux Toolkit** - State management
- **TailwindCSS + shadcn/ui** - Styling & components
- **Recharts** - Data visualization
- **TypeScript** - Type safety


## ✨ Features

### Dashboard Overview
- **KPI Cards**: Total Stock, Total Demand, Fill Rate with trend indicators
- **Interactive Chart**: Stock vs Demand visualization
- **Date Range Picker**: 7d, 14d, 30d, or custom range

### Product Management
- **Advanced Filters**: Search by name/SKU, filter by warehouse & status
- **Status Indicators**: 🟢 Healthy, 🟡 Low, 🔴 Critical
- **Product Details Drawer**: Update demand & transfer stock
- **Pagination**: Optimized for large datasets

### UI/UX Enhancements
- Dark mode support
- Responsive design
- Loading states & error handling
- Confirmation modals for destructive actions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn/bun

### Installation

1. **Start the GraphQL mock server:**
   ```bash
   cd graphql-mock-server
   npm install
   npm start
   ```
   Server runs at `http://localhost:4000/graphql`

2. **Start the frontend:**
   ```bash
   cd frontend
   bun install
   bun run dev
   ```
   App runs at `http://localhost:3000`

## 📊 Key Metrics

- **Fill Rate**: `(Σ min(stock, demand) / Σ demand) × 100%`
- **Status Logic**:
  - Healthy: stock > demand
  - Low: stock = demand  
  - Critical: stock < demand

## 🔮 Future Enhancements

### If I had more time, I would implement:

#### Performance & Data Optimization
- **Enhanced KPI visualizations** - Add infographic trend indicators comparing current vs previous month with percentage changes and arrow indicators
- **Smart pagination** - Fetch data according to current page instead of loading all products at once
- **Centralized state management** - Move date range selection logic to Redux for better state consistency across components

#### User Experience Improvements
- **Product management** - Add ability to delete products with confirmation modals
- **Better loading states** - Implement skeleton loaders and more efficient error handling with retry mechanisms
- **Advanced filtering** - Add sorting, bulk operations, and saved filter presets

#### Additional Features Could add in Future
- Authentication & role-based access control
- Real-time updates via GraphQL subscriptions
- CSV/Excel export functionality
- Mobile-responsive design improvements
- Advanced analytics & demand forecasting

## 🧪 Development


### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

---

Built with ❤️ for NuelAi