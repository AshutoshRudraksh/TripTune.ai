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
  { id: "photography", name: "Photography", icon: "fa-camera" },
  { id: "food", name: "Food & Drink", icon: "fa-utensils" },
  { id: "history", name: "History", icon: "fa-landmark" },
  { id: "adventure", name: "Adventure", icon: "fa-hiking" },
  { id: "shopping", name: "Shopping", icon: "fa-shopping-bag" },
  { id: "relaxation", name: "Relaxation", icon: "fa-spa" },
  { id: "nightlife", name: "Nightlife", icon: "fa-music" },
  { id: "nature", name: "Nature", icon: "fa-tree" },
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
          <h2 className="text-4xl font-bold text-foreground mb-4">Tell Us About Your Dream Trip</h2>
          <p className="text-xl text-muted-foreground">We'll use AI to create the perfect itinerary for you</p>
        </div>
        
        <Card className="rounded-2xl shadow-2xl p-8 border border-border">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Destination & Dates */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="block text-sm font-medium text-foreground mb-2">
                  <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                  Destination
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
                    <i className="fas fa-calendar text-primary mr-2"></i>
                    Start Date
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
                    End Date
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
                <i className="fas fa-heart text-primary mr-2"></i>
                What are you interested in?
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
                    <i className={`fas ${interest.icon} mr-2 text-primary`}></i>
                    {interest.name}
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
                  <i className="fas fa-dollar-sign text-primary mr-2"></i>
                  Budget Range
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
                  <i className="fas fa-clock text-primary mr-2"></i>
                  Travel Pace
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
                <i className="fas fa-wand-magic-sparkles mr-2"></i>
                {generateItineraryMutation.isPending ? "Generating..." : "Generate My Itinerary"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
