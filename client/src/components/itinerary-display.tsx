import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Itinerary, RegenerateRequest } from "@shared/schema";

interface ItineraryDisplayProps {
  itinerary: Itinerary;
  onItineraryUpdate: (itinerary: Itinerary) => void;
}

export default function ItineraryDisplay({ itinerary, onItineraryUpdate }: ItineraryDisplayProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const regenerateMutation = useMutation({
    mutationFn: async (request: RegenerateRequest) => {
      const response = await apiRequest("POST", "/api/itinerary/regenerate", request);
      return response.json() as Promise<Itinerary>;
    },
    onSuccess: (updatedItinerary) => {
      onItineraryUpdate(updatedItinerary);
      toast({
        title: "Section Regenerated!",
        description: "Your itinerary has been updated with new suggestions.",
      });
    },
    onError: (error) => {
      toast({
        title: "Regeneration Failed",
        description: error.message || "Failed to regenerate section. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleRegenerateDay = (dayNumber: number) => {
    regenerateMutation.mutate({
      itineraryId: itinerary.id,
      section: "day",
      dayNumber,
    });
  };

  const handleRegenerateTimeBlock = (dayNumber: number, timeBlockIndex: number) => {
    regenerateMutation.mutate({
      itineraryId: itinerary.id,
      section: "timeBlock",
      dayNumber,
      timeBlockIndex,
    });
  };

  const handleSaveItinerary = () => {
    toast({
      title: "Itinerary Saved!",
      description: "Your itinerary has been saved to your account.",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Export Started",
      description: "Your PDF will be ready for download shortly.",
    });
  };

  const handleShareItinerary = () => {
    if (navigator.share) {
      navigator.share({
        title: itinerary.title,
        text: `Check out my ${itinerary.title} itinerary created with TravelAI!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Itinerary link copied to clipboard.",
      });
    }
  };

  const getTimeIcon = (period: string) => {
    switch (period) {
      case 'morning': return 'fa-sun text-yellow-500';
      case 'afternoon': return 'fa-sun text-orange-500'; 
      case 'evening': return 'fa-moon text-purple-500';
      default: return 'fa-clock text-gray-500';
    }
  };

  const getBorderColor = (period: string) => {
    switch (period) {
      case 'morning': return 'border-yellow-500';
      case 'afternoon': return 'border-orange-500';
      case 'evening': return 'border-purple-500';
      default: return 'border-gray-500';
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">🗺️ Your Personalized Itinerary</h2>
          <p className="text-xl text-muted-foreground">AI-generated plan based on your preferences and live data ✨</p>
        </div>
        
        {/* Itinerary Header */}
        <Card className="rounded-2xl shadow-lg p-6 mb-8 border border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h3 className="text-2xl font-bold text-card-foreground mb-2" data-testid="text-itinerary-title">
                {itinerary.title}
              </h3>
              <p className="text-muted-foreground" data-testid="text-itinerary-details">
                {itinerary.startDate} - {itinerary.endDate} • {itinerary.interests.join(' & ')} Focus
              </p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <Button
                onClick={handleSaveItinerary}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="button-save-itinerary"
              >
                💾 Save
              </Button>
              <Button
                onClick={handleExportPDF}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                data-testid="button-export-pdf"
              >
                📄 Export
              </Button>
              <Button
                onClick={handleShareItinerary}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                data-testid="button-share-itinerary"
              >
                🔗 Share
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Daily Itinerary */}
        {itinerary.days.map((day, dayIndex) => (
          <Card key={day.day} className="rounded-2xl shadow-lg p-6 mb-6 border border-border">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mr-4">
                  <span data-testid={`text-day-number-${dayIndex}`}>{day.day}</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-card-foreground" data-testid={`text-day-title-${dayIndex}`}>
                    {day.title}
                  </h4>
                  <p className="text-muted-foreground" data-testid={`text-day-weather-${dayIndex}`}>
                    {day.date} • {day.weather.condition}, {day.weather.temperature}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRegenerateDay(day.day)}
                disabled={regenerateMutation.isPending}
                className="text-muted-foreground hover:text-primary"
                data-testid={`button-regenerate-day-${dayIndex}`}
              >
                <i className="fas fa-redo text-lg"></i>
              </Button>
            </div>
            
            {/* Time Blocks */}
            {day.timeBlocks.map((timeBlock, blockIndex) => (
              <div key={blockIndex} className={`border-l-4 ${getBorderColor(timeBlock.period)} pl-6 mb-6 last:mb-0`}>
                <div className="flex items-center mb-3">
                  <i className={`fas ${getTimeIcon(timeBlock.period)} mr-2`}></i>
                  <h5 className="font-semibold text-lg text-card-foreground">
                    {timeBlock.period.charAt(0).toUpperCase() + timeBlock.period.slice(1)} ({timeBlock.time})
                  </h5>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRegenerateTimeBlock(day.day, blockIndex)}
                    disabled={regenerateMutation.isPending}
                    className="ml-auto text-xs text-muted-foreground hover:text-primary"
                    data-testid={`button-regenerate-timeblock-${dayIndex}-${blockIndex}`}
                  >
                    <i className="fas fa-redo mr-1"></i>Regenerate
                  </Button>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <h6 className="font-medium mb-2" data-testid={`text-activity-name-${dayIndex}-${blockIndex}`}>
                    {timeBlock.activity.name}
                  </h6>
                  <p className="text-sm text-muted-foreground mb-3" data-testid={`text-activity-description-${dayIndex}-${blockIndex}`}>
                    {timeBlock.activity.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded" data-testid={`text-activity-duration-${dayIndex}-${blockIndex}`}>
                      {timeBlock.activity.duration}
                    </span>
                    <span className="text-muted-foreground" data-testid={`text-activity-cost-${dayIndex}-${blockIndex}`}>
                      {timeBlock.activity.cost}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Daily Summary */}
            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Daily Budget Used:</span>
                <span className="font-semibold text-primary" data-testid={`text-daily-cost-${dayIndex}`}>
                  ${day.totalCost}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-muted-foreground">Walking Distance:</span>
                <span className="font-semibold text-card-foreground" data-testid={`text-walking-distance-${dayIndex}`}>
                  {day.walkingDistance}
                </span>
              </div>
            </div>
          </Card>
        ))}
        
        {/* Trip Summary */}
        <Card className="rounded-2xl shadow-lg p-6 border border-border">
          <h4 className="text-xl font-semibold text-card-foreground mb-4">📊 Trip Summary</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="text-total-cost">
                {itinerary.totalCost}
              </div>
              <div className="text-sm text-muted-foreground">Total Estimated Cost</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2" data-testid="text-total-activities">
                {itinerary.days.reduce((sum, day) => sum + day.timeBlocks.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Activities Planned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2" data-testid="text-total-walking">
                {itinerary.days.reduce((sum, day) => {
                  const distance = parseFloat(day.walkingDistance.replace(/[^\d.]/g, ''));
                  return sum + (isNaN(distance) ? 0 : distance);
                }, 0).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Miles Walking</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h5 className="font-medium mb-2 text-card-foreground">
              💡 AI Travel Tips
            </h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Pack layers - temperatures may vary throughout the day</li>
              <li>• Book popular restaurant reservations in advance</li>
              <li>• Check weather updates before outdoor activities</li>
              <li>• Download offline maps for navigation</li>
            </ul>
          </div>
        </Card>
      </div>
    </section>
  );
}
