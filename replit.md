# Overview

This is a modern travel itinerary planning application that uses AI to generate personalized travel recommendations. The app integrates real-time data from multiple sources (flights, hotels, weather) to create comprehensive travel plans. Users can input their preferences for destination, dates, interests, budget, and travel pace, then receive AI-generated day-by-day itineraries with activities, costs, and logistics.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite for build tooling
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming and customization
- **State Management**: React Hook Form for form handling, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Design System**: New York variant of Shadcn/ui with neutral base colors and custom travel-themed color palette

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for itinerary generation and management
- **Data Validation**: Zod schemas for request/response validation
- **Error Handling**: Centralized error middleware with structured error responses
- **Development**: Hot module replacement via Vite integration in development mode

## Data Storage Solutions
- **Primary Storage**: PostgreSQL database with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Schema Management**: Drizzle Kit for migrations and schema changes
- **Development Storage**: In-memory storage class for rapid prototyping
- **Data Types**: JSON columns for complex nested data (itinerary days, travel data)

## External Service Integrations
- **AI Provider**: OpenAI GPT for itinerary generation and content regeneration
- **Flight Data**: Mock implementation ready for Amadeus API integration
- **Hotel Data**: Mock implementation ready for Booking.com API integration  
- **Weather Data**: Mock implementation ready for OpenWeatherMap API integration
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple

## Key Architectural Decisions

### Monorepo Structure
- **Problem**: Sharing types and schemas between frontend and backend
- **Solution**: Shared directory with common TypeScript interfaces and Zod schemas
- **Benefits**: Type safety across full stack, reduced code duplication

### Real-time Data Integration
- **Problem**: Travel planning requires current pricing and availability
- **Solution**: Parallel API calls to multiple travel services before AI generation
- **Benefits**: More accurate recommendations, up-to-date pricing information

### AI-First Itinerary Generation
- **Problem**: Creating personalized, detailed travel plans at scale
- **Solution**: OpenAI integration with structured prompts and real travel data
- **Benefits**: Highly customized recommendations, natural language descriptions

### Component-Based UI Architecture
- **Problem**: Complex travel interface with many interactive elements
- **Solution**: Shadcn/ui component system with consistent design tokens
- **Benefits**: Rapid development, consistent user experience, accessible components

### Mock-First External APIs
- **Problem**: Development dependencies on third-party travel APIs
- **Solution**: Mock implementations with production-ready interfaces
- **Benefits**: Faster development cycles, predictable testing, easy API swapping

# External Dependencies

## Core Framework Dependencies
- **React & TypeScript**: Frontend framework with type safety
- **Express.js**: Backend web server framework
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first styling framework

## UI & Component Libraries
- **Radix UI**: Accessible primitive components for complex interactions
- **Shadcn/ui**: Pre-built component library with consistent design
- **Lucide React**: Icon library for interface elements
- **Class Variance Authority**: Type-safe component variants

## Data & State Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state and validation
- **Zod**: Runtime type validation and schema definition
- **Drizzle ORM**: Type-safe database operations

## Database & Storage
- **PostgreSQL**: Primary database (via Neon serverless)
- **Drizzle Kit**: Database migration and schema management
- **Connect PG Simple**: PostgreSQL session store

## External APIs (Production Ready)
- **OpenAI**: AI content generation and itinerary planning
- **Amadeus API**: Flight search and booking data (mock implementation)
- **Booking.com API**: Hotel search and pricing (mock implementation)  
- **OpenWeatherMap**: Weather forecasts and conditions (mock implementation)

## Development & Build Tools
- **TypeScript**: Static type checking across full stack
- **ESBuild**: Fast JavaScript bundling for production
- **PostCSS**: CSS processing with Autoprefixer
- **Replit Plugins**: Development environment integration