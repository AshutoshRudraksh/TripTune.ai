import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { TripRequest } from "@shared/schema";

interface LiveDataPreviewProps {
  request: TripRequest;
}

interface TravelDataPreview {
  flights: Array<{
    airline: string;
    route: string;
    price: string;
    duration: string;
  }>;
  hotels: Array<{
    name: string;
    rating: number;
    price: string;
    location: string;
  }>;
  weather: Array<{
    date: string;
    condition: string;
    temperature: string;
    humidity: string;
    icon: string;
    advisory?: string;
  }>;
}

export default function LiveDataPreview({ request }: LiveDataPreviewProps) {
  const { data: previewData, isLoading } = useQuery<TravelDataPreview>({
    queryKey: ["/api/travel-data/preview", request.destination, request.startDate, request.endDate, request.budget],
    enabled: !!request.destination && !!request.startDate && !!request.endDate,
  });

  if (!request.destination || isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Real-Time Travel Intelligence</h2>
            <p className="text-xl text-muted-foreground">Live data integration for the best travel decisions</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="rounded-2xl shadow-lg p-6 border border-border">
                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-24 mb-4" />
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Real-Time Travel Intelligence</h2>
          <p className="text-xl text-muted-foreground">Live data integration for the best travel decisions</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Flights Card */}
          <Card className="rounded-2xl shadow-lg p-6 border border-border hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-plane text-primary text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">Flight Options</h3>
                <p className="text-muted-foreground text-sm">Live pricing & schedules</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {previewData?.flights.map((flight, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium" data-testid={`text-flight-airline-${index}`}>{flight.airline}</div>
                    <div className="text-sm text-muted-foreground" data-testid={`text-flight-route-${index}`}>{flight.route}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary" data-testid={`text-flight-price-${index}`}>{flight.price}</div>
                    <div className="text-xs text-muted-foreground" data-testid={`text-flight-duration-${index}`}>{flight.duration}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-xs text-muted-foreground">
              <i className="fas fa-sync-alt mr-1"></i>
              Updated 2 minutes ago
            </div>
          </Card>
          
          {/* Hotels Card */}
          <Card className="rounded-2xl shadow-lg p-6 border border-border hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-hotel text-accent text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">Top Hotels</h3>
                <p className="text-muted-foreground text-sm">Best rated & located</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {previewData?.hotels.map((hotel, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium" data-testid={`text-hotel-name-${index}`}>{hotel.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <span data-testid={`text-hotel-rating-${index}`}>{hotel.rating}</span>
                      <div className="flex ml-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star text-xs ${
                              i < Math.floor(hotel.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-accent" data-testid={`text-hotel-price-${index}`}>{hotel.price}</div>
                    <div className="text-xs text-muted-foreground" data-testid={`text-hotel-location-${index}`}>{hotel.location}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-xs text-muted-foreground">
              <i className="fas fa-sync-alt mr-1"></i>
              Updated 5 minutes ago
            </div>
          </Card>
          
          {/* Weather Card */}
          <Card className="rounded-2xl shadow-lg p-6 border border-border hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-cloud-sun text-secondary text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">Weather Forecast</h3>
                <p className="text-muted-foreground text-sm">7-day outlook</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {previewData?.weather.map((weather, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center">
                    <i className={`fas fa-${weather.icon === 'sun' ? 'sun text-yellow-500' : weather.icon === 'cloud-rain' ? 'cloud-rain text-blue-500' : 'cloud-sun text-orange-500'} mr-3`}></i>
                    <div>
                      <div className="font-medium" data-testid={`text-weather-day-${index}`}>
                        {index === 0 ? 'Today' : 'Tomorrow'}
                      </div>
                      <div className="text-sm text-muted-foreground" data-testid={`text-weather-condition-${index}`}>{weather.condition}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold" data-testid={`text-weather-temp-${index}`}>{weather.temperature}</div>
                    <div className="text-xs text-muted-foreground" data-testid={`text-weather-humidity-${index}`}>{weather.humidity} humidity</div>
                  </div>
                </div>
              ))}
            </div>
            
            {previewData?.weather[0]?.advisory && (
              <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex items-center text-accent text-sm">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  <span data-testid="text-weather-advisory">{previewData.weather[0].advisory}</span>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
