import OpenAI from "openai";
import type { TripRequest, ItineraryDay, FlightOption, HotelOption, WeatherForecast } from "@shared/schema";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export async function generateItinerary(
  request: TripRequest,
  flightData: FlightOption[],
  hotelData: HotelOption[],
  weatherData: WeatherForecast[]
): Promise<ItineraryDay[]> {
  try {
    const prompt = `Generate a detailed travel itinerary based on the following information:

Destination: ${request.destination}
Dates: ${request.startDate} to ${request.endDate}
Interests: ${request.interests.join(", ")}
Budget: ${request.budget}
Pace: ${request.pace}

Available flight options: ${JSON.stringify(flightData)}
Available hotels: ${JSON.stringify(hotelData)}
Weather forecast: ${JSON.stringify(weatherData)}

Create a day-by-day itinerary with the following structure for each day:
- Morning, afternoon, and evening activities
- Each activity should include: name, description, duration, estimated cost, and coordinates
- Consider the weather forecast when planning activities
- Match activities to the user's interests
- Stay within the specified budget range
- Adjust activity density based on the pace preference
- Cluster activities geographically to minimize travel time

Return the response as a JSON array of days matching this TypeScript interface:
interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  weather: { condition: string; temperature: string; icon: string; };
  timeBlocks: Array<{
    time: string;
    period: "morning" | "afternoon" | "evening";
    activity: {
      name: string;
      description: string;
      duration: string;
      cost: string;
      location: { lat: number; lng: number; address: string; };
    };
  }>;
  totalCost: number;
  walkingDistance: string;
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an expert travel planner. Generate detailed, personalized itineraries in JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.days || [];
  } catch (error) {
    console.error("OpenAI itinerary generation failed:", error);
    throw new Error("Failed to generate itinerary: " + (error as Error).message);
  }
}

export async function regenerateSection(
  originalDays: ItineraryDay[],
  request: TripRequest,
  sectionType: "day" | "timeBlock" | "entire",
  dayNumber?: number,
  timeBlockIndex?: number,
  newPreferences?: { budget?: string; style?: string }
): Promise<ItineraryDay[]> {
  try {
    let prompt = "";
    
    if (sectionType === "day" && dayNumber) {
      prompt = `Regenerate day ${dayNumber} of this travel itinerary with new activities. Keep the same structure but provide different options.
      
Original itinerary: ${JSON.stringify(originalDays)}
Trip details: ${JSON.stringify(request)}
${newPreferences ? `New preferences: ${JSON.stringify(newPreferences)}` : ""}

Return the complete updated itinerary as a JSON array of days.`;
    } else if (sectionType === "timeBlock" && dayNumber && timeBlockIndex !== undefined) {
      prompt = `Regenerate the ${originalDays[dayNumber - 1]?.timeBlocks[timeBlockIndex]?.period} time block for day ${dayNumber}.
      
Original itinerary: ${JSON.stringify(originalDays)}
Trip details: ${JSON.stringify(request)}

Return the complete updated itinerary as a JSON array of days.`;
    } else {
      prompt = `Regenerate the entire travel itinerary with a different style or approach.
      
Original request: ${JSON.stringify(request)}
${newPreferences ? `New preferences: ${JSON.stringify(newPreferences)}` : ""}

Return a completely new itinerary as a JSON array of days.`;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an expert travel planner. Regenerate travel itineraries in JSON format based on requests."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.days || originalDays;
  } catch (error) {
    console.error("OpenAI regeneration failed:", error);
    throw new Error("Failed to regenerate section: " + (error as Error).message);
  }
}
