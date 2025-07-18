# AntBros Photography Studio

## Overview

AntBros is a modern photography studio application built with a full-stack TypeScript architecture. The application serves as a professional portfolio and booking platform for a creative photography studio specializing in technology, innovation, and collaborative storytelling.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Neon serverless driver (fully configured)
- **ORM**: Drizzle ORM for type-safe database operations
- **Storage**: DatabaseStorage class implementing IStorage interface
- **Validation**: Zod for runtime type checking and validation
- **Session Management**: Express sessions with PostgreSQL store

### Development Environment
- **Development Server**: Vite dev server with HMR
- **Build Process**: Vite for frontend, esbuild for backend bundling
- **Type Checking**: TypeScript compiler with strict mode
- **Development Tools**: Replit-specific plugins for enhanced development experience

## Key Components

### Database Schema
The application uses three main database tables:
- **users**: User authentication and management
- **contacts**: Contact form submissions with timestamp tracking
- **bookings**: Service booking requests with comprehensive customer information

### API Endpoints
- `POST /api/contact` - Contact form submission
- `POST /api/booking` - Service booking submission
- `GET /api/contacts` - Retrieve all contact submissions (admin)
- `GET /api/bookings` - Retrieve all booking requests (admin)

### Frontend Pages and Components
- **Home Page**: Single-page application with multiple sections
- **Navigation**: Smooth scrolling navigation with mobile responsiveness
- **Hero Section**: Landing area with call-to-action buttons
- **Portfolio**: Image gallery showcasing studio work
- **About Section**: Company information and statistics
- **Services**: Service offerings with pricing
- **Booking Form**: Multi-field booking request form
- **Contact Form**: Customer inquiry form
- **Footer**: Site navigation and company information

## Data Flow

1. **User Interaction**: Users interact with forms (contact/booking) or browse portfolio
2. **Form Submission**: Forms validate data using Zod schemas and submit via TanStack Query
3. **API Processing**: Express routes validate and process requests
4. **Data Storage**: Validated data is stored in PostgreSQL via Drizzle ORM
5. **Response Handling**: Success/error responses trigger UI feedback via toast notifications

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **react-hook-form**: Form state management
- **zod**: Runtime type validation
- **wouter**: Lightweight routing

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Static type checking
- **tailwindcss**: Utility-first CSS framework
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle handles schema migrations and connections

### Environment Configuration
- **Development**: Uses Vite dev server with Express API
- **Production**: Serves static files through Express with API routes
- **Database**: Configured via `DATABASE_URL` environment variable

### Vercel Deployment
- **Configuration**: `vercel.json` configured for Node.js serverless functions
- **Build**: Automated build process with `vercel-build` script
- **Environment**: Database credentials configured in Vercel dashboard
- **Repository**: Ready for GitHub integration with Vercel

### Scripts
- `npm run dev`: Development server with hot reloading
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server
- `npm run db:push`: Database schema synchronization
- `npm run vercel-build`: Vercel-specific build command

## Changelog

Changelog:
- July 05, 2025. Initial setup
- July 05, 2025. Added comprehensive admin panel with content management, image upload functionality, and booking management system
- July 11, 2025. Migrated from memory storage to PostgreSQL database with full DatabaseStorage implementation
- July 11, 2025. Connected admin panel to live database with full CRUD operations for portfolio items, added Vercel deployment configuration

## User Preferences

Preferred communication style: Simple, everyday language.