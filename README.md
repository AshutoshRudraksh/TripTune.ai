# Travel Itinerary Planning App

A modern AI-powered travel planning application that generates personalized travel recommendations with real-time data integration.

## Overview

This application helps users create comprehensive travel plans by combining AI-generated recommendations with real-time data from multiple sources including flights, hotels, and weather information. Users input their preferences for destinations, dates, interests, budget, and travel pace to receive detailed day-by-day itineraries with activities, costs, and logistics.

## Features

- **AI-Powered Recommendations**: Personalized itinerary generation using OpenAI GPT
- **Real-time Data Integration**: Current pricing and availability from travel services  
- **Comprehensive Planning**: Day-by-day itineraries with activities, costs, and logistics
- **User Preferences**: Customizable destination, dates, interests, budget, and travel pace
- **Modern UI**: Built with React, TypeScript, and Shadcn/ui components

## Tech Stack

### Frontend
- **Framework**: React with TypeScript
- **Build Tool**: Vite with hot module replacement
- **UI Components**: Shadcn/ui (New York variant) built on Radix UI
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: 
  - React Hook Form for forms
  - TanStack Query for server state
- **Routing**: Wouter (lightweight client-side routing)
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints
- **Validation**: Zod schemas for request/response validation
- **Error Handling**: Centralized middleware with structured responses

### Database & Storage
- **Primary Database**: PostgreSQL (Neon serverless)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple
- **Development**: In-memory storage for rapid prototyping
- **Data Types**: JSON columns for complex nested data

### External Services
- **AI Provider**: OpenAI GPT for content generation
- **Flight Data**: Mock implementation (Amadeus API ready)
- **Hotel Data**: Mock implementation (Booking.com API ready)  
- **Weather Data**: Mock implementation (OpenWeatherMap API ready)

## Architecture Decisions

### Monorepo Structure
- **Problem**: Sharing types and schemas between frontend and backend
- **Solution**: Shared directory with common TypeScript interfaces and Zod schemas
- **Benefits**: Full-stack type safety and reduced code duplication

### Real-time Data Integration
- **Problem**: Travel planning requires current pricing and availability
- **Solution**: Parallel API calls to multiple travel services before AI generation
- **Benefits**: Accurate recommendations with up-to-date information

### AI-First Generation
- **Problem**: Creating personalized, detailed travel plans at scale
- **Solution**: OpenAI integration with structured prompts and real travel data
- **Benefits**: Highly customized recommendations with natural language descriptions

### Component-Based UI
- **Problem**: Complex travel interface with many interactive elements
- **Solution**: Shadcn/ui component system with consistent design tokens
- **Benefits**: Rapid development, consistent UX, and accessible components

### Mock-First External APIs
- **Problem**: Development dependencies on third-party travel APIs
- **Solution**: Mock implementations with production-ready interfaces
- **Benefits**: Faster development, predictable testing, easy API swapping

## Dependencies

### Core Framework
```json
{
  "react": "Frontend framework",
  "typescript": "Type safety",
  "express": "Backend server",
  "vite": "Build tool and dev server",
  "tailwindcss": "Utility-first styling"
}
```

### UI & Components
```json
{
  "@radix-ui/*": "Accessible primitive components",
  "shadcn/ui": "Pre-built component library",
  "lucide-react": "Icon library",
  "class-variance-authority": "Type-safe component variants"
}
```

### Data Management
```json
{
  "@tanstack/react-query": "Server state management",
  "react-hook-form": "Form state and validation", 
  "zod": "Runtime type validation",
  "drizzle-orm": "Type-safe database operations"
}
```

### Database & Storage
```json
{
  "postgresql": "Primary database via Neon serverless",
  "drizzle-kit": "Database migrations",
  "connect-pg-simple": "PostgreSQL session store"
}
```

### External APIs (Production Ready)
```json
{
  "openai": "AI content generation",
  "amadeus-api": "Flight data (mock implementation)",
  "booking-api": "Hotel data (mock implementation)", 
  "openweathermap": "Weather data (mock implementation)"
}
```

### Development Tools
```json
{
  "typescript": "Static type checking",
  "esbuild": "Fast JavaScript bundling",
  "postcss": "CSS processing with Autoprefixer",
  "replit-plugins": "Development environment integration"
}
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd travel-itinerary-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your OpenAI API key and database credentials
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
├── src/
│   ├── client/          # React frontend
│   ├── server/          # Express backend  
│   └── shared/          # Shared types and schemas
├── docs/                # Documentation
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
