# Home Page Components

This directory contains all the modular components for the homepage, following React best practices and clean architecture principles.

## Component Structure

### 📁 Components Overview

| Component | Description | Props | Data Source |
|-----------|-------------|-------|-------------|
| `PromotionalStrip` | Top banner with promotional messages | None | Static |
| `HeroBanner` | Main hero section with featured products | None | Static |
| `BestSellersGrid` | Grid of best-selling products | None | `BEST_SELLERS` |
| `CustomerFavorites` | Customer favorite products grid | None | `CUSTOMER_FAVORITES` |
| `PromotionalBanner` | Mid-page promotional banner | None | Static |
| `CategoriesSection` | Product categories showcase | None | `CATEGORIES` |
| `DealsSection` | Special deals and offers | None | `DEALS` |
| `TestimonialsSection` | Customer testimonials | None | Dynamic (Swiper) |
| `TrustBadges` | Trust indicators (shipping, returns, etc.) | None | `TRUST_BADGES` |
| `NewsletterSection` | Email subscription form | None | Interactive |

### 🎨 Design System

**Theme Colors:**
- Primary: `#233f1c` (Dark Green)
- Secondary: `#ffd469` (Yellow)
- Background variations using opacity

**Typography:**
- Headings: Bold, large sizes with theme colors
- Body text: Gray variations for hierarchy

### 📊 Data Management

**Constants:** `/src/constants/home-data.ts`
- Centralized data for all components
- Type-safe with TypeScript interfaces

**Types:** `/src/types/home.ts`
- Interface definitions for all data structures
- Ensures type safety across components

### 🔧 Best Practices Implemented

1. **Separation of Concerns**
   - Each section is a separate component
   - Data separated from presentation logic
   - Types defined separately

2. **Reusability**
   - Components are self-contained
   - Props-based customization where needed
   - Consistent styling patterns

3. **Performance**
   - Dynamic imports for heavy components (Swiper)
   - Optimized images with proper sizing
   - Lazy loading where applicable

4. **Accessibility**
   - Semantic HTML structure
   - Proper alt texts for images
   - Keyboard navigation support

5. **Maintainability**
   - Clear component naming
   - Consistent file structure
   - Centralized data management

### 🚀 Usage

```tsx
import {
  PromotionalStrip,
  HeroBanner,
  BestSellersGrid,
  // ... other components
} from '@/components/home';

export default function HomePage() {
  return (
    <div>
      <PromotionalStrip />
      <HeroBanner />
      <BestSellersGrid />
      {/* ... other components */}
    </div>
  );
}
```

### 🔄 Future Enhancements

- Add loading states for dynamic content
- Implement error boundaries
- Add animation libraries (Framer Motion)
- Create responsive image components
- Add A/B testing capabilities

### 📱 Responsive Design

All components are fully responsive with:
- Mobile-first approach
- Tailwind CSS breakpoints
- Flexible grid systems
- Touch-friendly interactions
