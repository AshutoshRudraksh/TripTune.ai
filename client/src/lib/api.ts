import { apiRequest } from "./queryClient";
import type { TripRequest, Itinerary, RegenerateRequest } from "@shared/schema";

export const api = {
  generateItinerary: async (request: TripRequest): Promise<Itinerary> => {
    const response = await apiRequest("POST", "/api/itinerary/generate", request);
    return response.json();
  },

  getItinerary: async (id: string): Promise<Itinerary> => {
    const response = await apiRequest("GET", `/api/itinerary/${id}`);
    return response.json();
  },

  regenerateSection: async (request: RegenerateRequest): Promise<Itinerary> => {
    const response = await apiRequest("POST", "/api/itinerary/regenerate", request);
    return response.json();
  },

  getTravelDataPreview: async (destination: string, startDate: string, endDate: string, budget: string) => {
    const response = await apiRequest("POST", "/api/travel-data/preview", {
      destination,
      startDate,
      endDate,
      budget
    });
    return response.json();
  },

  exportItinerary: async (id: string) => {
    const response = await apiRequest("GET", `/api/itinerary/${id}/export`);
    return response.json();
  }
};
