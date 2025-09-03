import HeroSection from "@/components/hero-section";
import PlanningForm from "@/components/planning-form";
import LiveDataPreview from "@/components/live-data-preview";
import ItineraryDisplay from "@/components/itinerary-display";
import LoadingModal from "@/components/loading-modal";
import { useState } from "react";
import type { Itinerary, TripRequest } from "@shared/schema";

export default function Home() {
  const [currentItinerary, setCurrentItinerary] = useState<Itinerary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<TripRequest | null>(null);

  const handleItineraryGenerated = (itinerary: Itinerary) => {
    setCurrentItinerary(itinerary);
    setIsGenerating(false);
  };

  const handleGenerationStart = (request: TripRequest) => {
    setCurrentRequest(request);
    setIsGenerating(true);
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <PlanningForm 
        onGenerationStart={handleGenerationStart}
        onItineraryGenerated={handleItineraryGenerated}
      />
      
      {currentRequest && (
        <LiveDataPreview request={currentRequest} />
      )}
      
      {currentItinerary && (
        <ItineraryDisplay 
          itinerary={currentItinerary}
          onItineraryUpdate={setCurrentItinerary}
        />
      )}
      
      <LoadingModal 
        isOpen={isGenerating} 
        onClose={() => setIsGenerating(false)} 
      />
      
      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold mb-4">
                <i className="fas fa-paper-plane mr-2 text-primary"></i>
                TravelAI
              </div>
              <p className="text-background/70 mb-4">
                Intelligent travel planning powered by AI and real-time data. Create unforgettable journeys tailored to your unique preferences.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-background/70 hover:text-primary transition-colors">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-background/70 hover:text-primary transition-colors">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-background/70 hover:text-primary transition-colors">
                  <i className="fab fa-facebook text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h6 className="font-semibold mb-4">Product</h6>
              <div className="space-y-2 text-background/70">
                <a href="#" className="block hover:text-primary transition-colors">How it works</a>
                <a href="#" className="block hover:text-primary transition-colors">Examples</a>
                <a href="#" className="block hover:text-primary transition-colors">Pricing</a>
                <a href="#" className="block hover:text-primary transition-colors">API</a>
              </div>
            </div>
            
            <div>
              <h6 className="font-semibold mb-4">Support</h6>
              <div className="space-y-2 text-background/70">
                <a href="#" className="block hover:text-primary transition-colors">Help Center</a>
                <a href="#" className="block hover:text-primary transition-colors">Contact Us</a>
                <a href="#" className="block hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-primary transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-12 pt-8 text-center text-background/70">
            <p>&copy; 2024 TravelAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
