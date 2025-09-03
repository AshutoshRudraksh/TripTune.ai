import { sql } from "drizzle-orm";
import { pgTable, text, varchar, json, timestamp, index, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const itineraries = pgTable("itineraries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  destination: text("destination").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  interests: json("interests").$type<string[]>().notNull(),
  budget: text("budget").notNull(),
  pace: text("pace").notNull(),
  days: json("days").$type<ItineraryDay[]>().notNull(),
  flightData: json("flight_data").$type<FlightOption[]>(),
  hotelData: json("hotel_data").$type<HotelOption[]>(),
  weatherData: json("weather_data").$type<WeatherForecast[]>(),
  totalCost: text("total_cost"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertItinerarySchema = createInsertSchema(itineraries).omit({
  id: true,
  createdAt: true,
});

export type InsertItinerary = z.infer<typeof insertItinerarySchema>;
export type Itinerary = typeof itineraries.$inferSelect;

// Additional schemas for nested data structures
export const tripRequestSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  budget: z.enum(["budget", "mid-range", "luxury"]),
  pace: z.enum(["relaxed", "moderate", "packed"]),
});

export type TripRequest = z.infer<typeof tripRequestSchema>;

export interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  weather: {
    condition: string;
    temperature: string;
    icon: string;
  };
  timeBlocks: TimeBlock[];
  totalCost: number;
  walkingDistance: string;
}

export interface TimeBlock {
  time: string;
  period: "morning" | "afternoon" | "evening";
  activity: {
    name: string;
    description: string;
    duration: string;
    cost: string;
    imageUrl?: string;
    location: {
      lat: number;
      lng: number;
      address: string;
    };
  };
}

export interface FlightOption {
  airline: string;
  route: string;
  price: string;
  duration: string;
  departure: string;
  arrival: string;
}

export interface HotelOption {
  name: string;
  rating: number;
  price: string;
  location: string;
  amenities: string[];
  imageUrl?: string;
}

export interface WeatherForecast {
  date: string;
  condition: string;
  temperature: string;
  humidity: string;
  icon: string;
  advisory?: string;
}

export const regenerateRequestSchema = z.object({
  itineraryId: z.string(),
  section: z.enum(["day", "timeBlock", "entire"]),
  dayNumber: z.number().optional(),
  timeBlockIndex: z.number().optional(),
  newPreferences: z.object({
    budget: z.enum(["budget", "mid-range", "luxury"]).optional(),
    style: z.string().optional(),
  }).optional(),
});

export type RegenerateRequest = z.infer<typeof regenerateRequestSchema>;
