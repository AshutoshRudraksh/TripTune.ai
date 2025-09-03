import { type Itinerary, type InsertItinerary } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getItinerary(id: string): Promise<Itinerary | undefined>;
  createItinerary(itinerary: InsertItinerary): Promise<Itinerary>;
  updateItinerary(id: string, updates: Partial<Itinerary>): Promise<Itinerary | undefined>;
  getAllItineraries(): Promise<Itinerary[]>;
}

export class MemStorage implements IStorage {
  private itineraries: Map<string, Itinerary>;

  constructor() {
    this.itineraries = new Map();
  }

  async getItinerary(id: string): Promise<Itinerary | undefined> {
    return this.itineraries.get(id);
  }

  async createItinerary(insertItinerary: InsertItinerary): Promise<Itinerary> {
    const id = randomUUID();
    const itinerary: Itinerary = { 
      ...insertItinerary, 
      id,
      createdAt: new Date()
    };
    this.itineraries.set(id, itinerary);
    return itinerary;
  }

  async updateItinerary(id: string, updates: Partial<Itinerary>): Promise<Itinerary | undefined> {
    const existing = this.itineraries.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.itineraries.set(id, updated);
    return updated;
  }

  async getAllItineraries(): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values());
  }
}

export const storage = new MemStorage();
