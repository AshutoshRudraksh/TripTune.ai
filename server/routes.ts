import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  tripRequestSchema, 
  regenerateRequestSchema,
  type TripRequest,
  type RegenerateRequest 
} from "@shared/schema";
import { generateItinerary, regenerateSection } from "./services/openai";
import { searchFlights, searchHotels, getWeatherForecast } from "./services/travel-apis";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  
  // Generate travel itinerary
  app.post("/api/itinerary/generate", async (req, res) => {
    try {
      const request = tripRequestSchema.parse(req.body) as TripRequest;
      
      // Fetch live travel data
      const [flightData, hotelData, weatherData] = await Promise.all([
        searchFlights("LAX", request.destination, request.startDate, request.endDate),
        searchHotels(request.destination, request.startDate, request.endDate, request.budget),
        getWeatherForecast(request.destination, request.startDate, request.endDate)
      ]);
      
      // Generate AI itinerary
      const days = await generateItinerary(request, flightData, hotelData, weatherData);
      
      // Calculate total cost
      const totalCost = days.reduce((sum, day) => sum + day.totalCost, 0);
      
      // Save itinerary
      const itinerary = await storage.createItinerary({
        title: `${Math.ceil((new Date(request.endDate).getTime() - new Date(request.startDate).getTime()) / (1000 * 60 * 60 * 24))} Days in ${request.destination}`,
        destination: request.destination,
        startDate: request.startDate,
        endDate: request.endDate,
        interests: request.interests,
        budget: request.budget,
        pace: request.pace,
        days,
        flightData,
        hotelData,
        weatherData,
        totalCost: `$${totalCost.toFixed(0)}`
      });
      
      res.json(itinerary);
    } catch (error) {
      console.error("Itinerary generation failed:", error);
      res.status(500).json({ 
        message: "Failed to generate itinerary", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });
  
  // Get live travel data preview
  app.post("/api/travel-data/preview", async (req, res) => {
    try {
      const { destination, startDate, endDate, budget } = req.body;
      
      const [flightData, hotelData, weatherData] = await Promise.all([
        searchFlights("LAX", destination, startDate, endDate),
        searchHotels(destination, startDate, endDate, budget),
        getWeatherForecast(destination, startDate, endDate)
      ]);
      
      res.json({
        flights: flightData.slice(0, 2), // Top 2 flights
        hotels: hotelData.slice(0, 2),   // Top 2 hotels
        weather: weatherData.slice(0, 2) // Next 2 days
      });
    } catch (error) {
      console.error("Travel data preview failed:", error);
      res.status(500).json({ 
        message: "Failed to fetch travel data", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });
  
  // Regenerate itinerary section
  app.post("/api/itinerary/regenerate", async (req, res) => {
    try {
      const request = regenerateRequestSchema.parse(req.body) as RegenerateRequest;
      
      const itinerary = await storage.getItinerary(request.itineraryId);
      if (!itinerary) {
        return res.status(404).json({ message: "Itinerary not found" });
      }
      
      const originalRequest: TripRequest = {
        destination: itinerary.destination,
        startDate: itinerary.startDate,
        endDate: itinerary.endDate,
        interests: itinerary.interests,
        budget: itinerary.budget as any,
        pace: itinerary.pace as any
      };
      
      const newDays = await regenerateSection(
        itinerary.days,
        originalRequest,
        request.section,
        request.dayNumber,
        request.timeBlockIndex,
        request.newPreferences
      );
      
      const updatedItinerary = await storage.updateItinerary(request.itineraryId, {
        days: newDays
      });
      
      res.json(updatedItinerary);
    } catch (error) {
      console.error("Itinerary regeneration failed:", error);
      res.status(500).json({ 
        message: "Failed to regenerate itinerary section", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });
  
  // Get itinerary by ID
  app.get("/api/itinerary/:id", async (req, res) => {
    try {
      const itinerary = await storage.getItinerary(req.params.id);
      if (!itinerary) {
        return res.status(404).json({ message: "Itinerary not found" });
      }
      res.json(itinerary);
    } catch (error) {
      console.error("Failed to fetch itinerary:", error);
      res.status(500).json({ 
        message: "Failed to fetch itinerary", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });
  
  // Export itinerary as PDF
  app.get("/api/itinerary/:id/export", async (req, res) => {
    try {
      const itinerary = await storage.getItinerary(req.params.id);
      if (!itinerary) {
        return res.status(404).json({ message: "Itinerary not found" });
      }
      
      // In production, this would generate a PDF using a library like Puppeteer
      // For now, return the data for client-side PDF generation
      res.json({
        message: "PDF export data",
        itinerary
      });
    } catch (error) {
      console.error("Failed to export itinerary:", error);
      res.status(500).json({ 
        message: "Failed to export itinerary", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
