# Quran Reader Application

## Overview

This is a comprehensive Arabic Quran reading application built as a full-stack web application. The system provides an immersive Islamic experience with features including Quran text display, audio recitation, prayer times, Tajweed rules, and user bookmarks. The application is designed with a beautiful Islamic-themed UI featuring Arabic fonts and right-to-left text support.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom Islamic color scheme
- **Typography**: Arabic fonts (Amiri, Cairo) for authentic text display
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: connect-pg-simple for PostgreSQL-backed sessions
- **API Design**: RESTful endpoints for user preferences and bookmarks
- **Development**: Hot module replacement with Vite integration

### Database Design
The application uses PostgreSQL with three main tables:
- **users**: User authentication and account management
- **user_preferences**: Personalized settings (location, reciter, notifications, prayer times)
- **bookmarks**: User's saved verses and notes

## Key Components

### Quran Reading System
- **Surah Navigation**: Complete index of all 114 chapters
- **Verse Display**: Arabic text with proper typography and spacing
- **Audio Player**: Multi-reciter support with playback controls
- **Bookmarking**: Save verses with personal notes
- **Responsive Design**: Optimized for desktop and mobile reading

### Prayer Times Integration
- **Location Services**: Automatic location detection
- **API Integration**: Aladhan API for accurate prayer time calculations
- **Real-time Updates**: Live countdown to next prayer
- **Notifications**: Browser notifications for prayer reminders

### Tajweed Education
- **Rule Categories**: Comprehensive Tajweed rules with examples
- **Interactive Learning**: Detailed explanations and Arabic examples
- **Visual Presentation**: Color-coded examples for better understanding

### User Experience
- **Islamic Design**: Green and gold color scheme with Islamic patterns
- **RTL Support**: Right-to-left text direction for Arabic content
- **Accessibility**: ARIA labels and keyboard navigation support
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## Data Flow

1. **Client Requests**: Browser requests are handled by Express.js server
2. **API Routing**: RESTful endpoints process user data and preferences
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **External APIs**: Integration with Quran API and prayer times services
5. **State Management**: TanStack Query caches and synchronizes client state
6. **Real-time Updates**: Prayer times update automatically based on location

## External Dependencies

### Core APIs
- **Al-Quran Cloud API**: Provides Quran text and metadata
- **Aladhan API**: Prayer times calculation service
- **Islamic.Network**: Audio recitation files

### Development Tools
- **Neon Database**: PostgreSQL hosting with serverless architecture
- **Replit**: Development environment with built-in PostgreSQL
- **Drizzle Kit**: Database migrations and schema management

### UI Components
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Pre-built component library
- **Lucide Icons**: Modern icon set
- **Font Awesome**: Islamic and prayer-related icons

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds optimized static assets
- **Backend**: esbuild bundles server code for Node.js runtime
- **Database**: Drizzle pushes schema changes to PostgreSQL

### Environment Configuration
- **Development**: Local development with Vite HMR
- **Production**: Autoscale deployment on Replit infrastructure
- **Database**: Environment-based DATABASE_URL configuration

### Performance Optimizations
- **Code Splitting**: Vite automatically splits bundles
- **Asset Optimization**: Images and fonts are optimized
- **API Caching**: TanStack Query provides intelligent caching
- **Static Generation**: Pre-built pages for better performance

## Recent Changes

### June 24, 2025 - Major Updates
✓ Fixed audio playback issues across all components
✓ Updated prayer times calculation for Egypt/Sudan region
✓ Corrected remaining time calculations for prayers
✓ Added page-based Quran display (Mushaf-style)
✓ Implemented view mode selector (page vs traditional)
✓ Enhanced Arabic text display and typography
✓ Fixed CSS import order issues
✓ Added root index.html landing page with Islamic design

## User Preferences

```
Preferred communication style: Simple, everyday language.
```