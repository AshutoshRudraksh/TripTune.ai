import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { tripRequestSchema, type TripRequest, type Itinerary } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";

interface PlanningFormProps {
  onGenerationStart: (request: TripRequest) => void;
  onItineraryGenerated: (itinerary: Itinerary) => void;
}

const interests = [
  { id: "photography", name: "Photography", icon: "📸" },
  { id: "food", name: "Food & Drink", icon: "🍽️" },
  { id: "history", name: "History", icon: "🏛️" },
  { id: "adventure", name: "Adventure", icon: "🏔️" },
  { id: "shopping", name: "Shopping", icon: "🛍️" },
  { id: "relaxation", name: "Relaxation", icon: "🧘" },
  { id: "nightlife", name: "Nightlife", icon: "🎵" },
  { id: "nature", name: "Nature", icon: "🌲" },
];

export default function PlanningForm({ onGenerationStart, onItineraryGenerated }: PlanningFormProps) {
  const { toast } = useToast();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  const form = useForm<TripRequest>({
    resolver: zodResolver(tripRequestSchema),
    defaultValues: {
      destination: "",
      startDate: "",
      endDate: "",
      interests: [],
      budget: "mid-range",
      pace: "moderate",
    },
  });

  const generateItineraryMutation = useMutation({
    mutationFn: async (data: TripRequest) => {
      const response = await apiRequest("POST", "/api/itinerary/generate", data);
      return response.json() as Promise<Itinerary>;
    },
    onSuccess: (itinerary) => {
      onItineraryGenerated(itinerary);
      toast({
        title: "Itinerary Generated!",
        description: "Your personalized travel plan is ready.",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate itinerary. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: TripRequest) => {
    const requestWithInterests = { ...data, interests: selectedInterests };
    onGenerationStart(requestWithInterests);
    generateItineraryMutation.mutate(requestWithInterests);
  };

  const handleTryDemo = () => {
    const demoRequest: TripRequest = {
      destination: "Bali, Indonesia",
      startDate: "2024-03-15",
      endDate: "2024-03-20",
      interests: ["photography", "food", "relaxation", "nature"],
      budget: "mid-range",
      pace: "moderate"
    };
    
    // Fill the form with demo data
    form.setValue("destination", demoRequest.destination);
    form.setValue("startDate", demoRequest.startDate);
    form.setValue("endDate", demoRequest.endDate);
    form.setValue("budget", demoRequest.budget);
    form.setValue("pace", demoRequest.pace);
    setSelectedInterests(demoRequest.interests);
    
    // Create a demo itinerary directly without API call
    const demoItinerary: Itinerary = {
      id: "demo-bali-trip",
      title: "5 Days in Bali, Indonesia",
      destination: "Bali, Indonesia",
      startDate: "2024-03-15",
      endDate: "2024-03-20",
      interests: ["photography", "food", "relaxation", "nature"],
      budget: "mid-range",
      pace: "moderate",
      totalCost: "$1,250",
      createdAt: new Date(),
      days: [
        {
          day: 1,
          date: "2024-03-15",
          title: "Arrival & Ubud Exploration",
          weather: { condition: "Sunny", temperature: "84°F", icon: "☀️" },
          timeBlocks: [
            {
              time: "9:00 AM",
              period: "morning",
              activity: {
                name: "Sacred Monkey Forest Sanctuary",
                description: "Explore the mystical forest sanctuary with playful monkeys and ancient temples",
                duration: "2 hours",
                cost: "$15",
                location: { lat: -8.5211, lng: 115.2581, address: "Monkey Forest Rd, Ubud" }
              }
            },
            {
              time: "2:00 PM", 
              period: "afternoon",
              activity: {
                name: "Tegallalang Rice Terraces",
                description: "Photography session at the stunning terraced rice fields with panoramic views",
                duration: "3 hours",
                cost: "$25",
                location: { lat: -8.4393, lng: 115.2796, address: "Tegallalang, Gianyar" }
              }
            },
            {
              time: "7:00 PM",
              period: "evening", 
              activity: {
                name: "Balinese Cooking Class",
                description: "Learn traditional Balinese cuisine with local spices and authentic techniques",
                duration: "3 hours",
                cost: "$65",
                location: { lat: -8.5069, lng: 115.2624, address: "Jl. Monkey Forest Rd, Ubud" }
              }
            }
          ],
          totalCost: 105,
          walkingDistance: "2.1 miles"
        },
        {
          day: 2,
          date: "2024-03-16", 
          title: "Temple Hopping & Cultural Immersion",
          weather: { condition: "Partly Cloudy", temperature: "82°F", icon: "⛅" },
          timeBlocks: [
            {
              time: "8:00 AM",
              period: "morning",
              activity: {
                name: "Tanah Lot Temple",
                description: "Visit the iconic sea temple perched on a rock formation during golden hour",
                duration: "2.5 hours", 
                cost: "$20",
                location: { lat: -8.6211, lng: 115.0864, address: "Tanah Lot, Tabanan" }
              }
            },
            {
              time: "1:30 PM",
              period: "afternoon",
              activity: {
                name: "Balinese Silver Workshop",
                description: "Watch skilled artisans create intricate silver jewelry and try your hand at crafting",
                duration: "2 hours",
                cost: "$40", 
                location: { lat: -8.5391, lng: 115.2664, address: "Celuk Village, Gianyar" }
              }
            },
            {
              time: "6:30 PM",
              period: "evening",
              activity: {
                name: "Traditional Kecak Fire Dance",
                description: "Experience the mesmerizing trance dance performance with fire and chanting",
                duration: "2 hours",
                cost: "$30",
                location: { lat: -8.5156, lng: 115.2623, address: "Ubud Palace, Ubud" }
              }
            }
          ],
          totalCost: 90,
          walkingDistance: "1.8 miles"
        }
      ],
      flightData: [
        {
          airline: "Garuda Indonesia",
          route: "LAX → DPS",
          price: "$650",
          duration: "18h 45m",
          departure: "2024-03-14",
          arrival: "2024-03-15"
        }
      ],
      hotelData: [
        {
          name: "Hanging Gardens of Bali",
          rating: 4.8,
          price: "$280/night",
          location: "Ubud",
          amenities: ["Infinity Pool", "Spa", "Restaurant", "WiFi"]
        }
      ],
      weatherData: [
        {
          date: "2024-03-15",
          condition: "Sunny",
          temperature: "84°F", 
          humidity: "65%",
          icon: "☀️"
        }
      ]
    };
    
    onGenerationStart(demoRequest);
    onItineraryGenerated(demoItinerary);
  };

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  return (
    <section id="planning-form" className="py-20 bg-background relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Tell Us About Your Dream Trip 🌟</h2>
          <p className="text-xl text-muted-foreground">We'll use AI to create the perfect itinerary for you ✨</p>
          
          <div className="mt-6">
            <Button
              onClick={handleTryDemo}
              variant="outline"
              className="bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 hover:border-accent/50 transition-all"
              disabled={generateItineraryMutation.isPending}
              data-testid="button-try-demo"
            >
              🎯 Try Demo: 5 Days in Bali
            </Button>
          </div>
        </div>
        
        <Card className="rounded-2xl shadow-2xl p-8 border border-border">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Destination & Dates */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="block text-sm font-medium text-foreground mb-2">
                  📍 Destination
                </Label>
                <Input
                  {...form.register("destination")}
                  placeholder="Where do you want to go?"
                  className="w-full"
                  data-testid="input-destination"
                />
                {form.formState.errors.destination && (
                  <p className="text-destructive text-sm mt-1">{form.formState.errors.destination.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="block text-sm font-medium text-foreground mb-2">
                    📅 Start Date
                  </Label>
                  <Input
                    {...form.register("startDate")}
                    type="date"
                    className="w-full"
                    data-testid="input-start-date"
                  />
                  {form.formState.errors.startDate && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.startDate.message}</p>
                  )}
                </div>
                <div>
                  <Label className="block text-sm font-medium text-foreground mb-2">
                    📅 End Date
                  </Label>
                  <Input
                    {...form.register("endDate")}
                    type="date"
                    className="w-full"
                    data-testid="input-end-date"
                  />
                  {form.formState.errors.endDate && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.endDate.message}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Interests */}
            <div>
              <Label className="block text-sm font-medium text-foreground mb-4">
                💝 What are you interested in?
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {interests.map((interest) => (
                  <Button
                    key={interest.id}
                    type="button"
                    variant="outline"
                    className={`flex items-center justify-center px-4 py-3 hover:border-primary hover:bg-primary/5 transition-all ${
                      selectedInterests.includes(interest.id) 
                        ? 'border-primary bg-primary/10' 
                        : ''
                    }`}
                    onClick={() => toggleInterest(interest.id)}
                    data-testid={`button-interest-${interest.id}`}
                  >
                    {interest.icon} {interest.name}
                  </Button>
                ))}
              </div>
              {selectedInterests.length === 0 && form.formState.isSubmitted && (
                <p className="text-destructive text-sm mt-1">Select at least one interest</p>
              )}
            </div>
            
            {/* Budget & Pace */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="block text-sm font-medium text-foreground mb-4">
                  💰 Budget Range
                </Label>
                <RadioGroup
                  defaultValue="mid-range"
                  onValueChange={(value) => form.setValue("budget", value as any)}
                  data-testid="radio-budget"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="budget" id="budget" />
                    <Label htmlFor="budget">Budget ($50-100/day)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mid-range" id="mid-range" />
                    <Label htmlFor="mid-range">Mid-range ($100-250/day)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="luxury" id="luxury" />
                    <Label htmlFor="luxury">Luxury ($250+/day)</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label className="block text-sm font-medium text-foreground mb-4">
                  ⏰ Travel Pace
                </Label>
                <RadioGroup
                  defaultValue="moderate"
                  onValueChange={(value) => form.setValue("pace", value as any)}
                  data-testid="radio-pace"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="relaxed" id="relaxed" />
                    <Label htmlFor="relaxed">Relaxed (2-3 activities/day)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate">Moderate (4-5 activities/day)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="packed" id="packed" />
                    <Label htmlFor="packed">Packed (6+ activities/day)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                className="bg-primary text-primary-foreground px-12 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg"
                disabled={generateItineraryMutation.isPending}
                data-testid="button-generate-itinerary"
              >
                🪄 {generateItineraryMutation.isPending ? "Generating..." : "Generate My Itinerary"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
