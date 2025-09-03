import HeroSection from "@/components/hero-section";
import PlanningForm from "@/components/planning-form";
import LiveDataPreview from "@/components/live-data-preview";
import ItineraryDisplay from "@/components/itinerary-display";
import LoadingModal from "@/components/loading-modal";
import { useState } from "react";
import type { Itinerary, TripRequest } from "@shared/schema";

export default function Landing() {
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
      
      {/* Popular Destinations Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">🌍 Popular Destinations</h2>
            <p className="text-xl text-muted-foreground">Discover amazing places around the world</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-teal-300 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">🏝️</div>
                    <div className="font-bold">Tropical Paradise</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">🏝️ Tropical Paradise</h3>
                  <p className="text-sm opacity-90">Crystal clear waters & white beaches</p>
                </div>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <div className="w-full h-64 bg-gradient-to-br from-purple-400 to-pink-300 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">🏙️</div>
                    <div className="font-bold">Urban Adventure</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">🏙️ Urban Adventure</h3>
                  <p className="text-sm opacity-90">Modern cities & cultural experiences</p>
                </div>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <div className="w-full h-64 bg-gradient-to-br from-green-400 to-emerald-300 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">⛰️</div>
                    <div className="font-bold">Mountain Retreat</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">⛰️ Mountain Retreat</h3>
                  <p className="text-sm opacity-90">Peaceful nature & cozy cabins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
                ✈️ TravelAI
              </div>
              <p className="text-background/70 mb-4">
                Intelligent travel planning powered by AI 🤖 and real-time data 📊. Create unforgettable journeys tailored to your unique preferences ✨.
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
              <h6 className="font-semibold mb-4">🚀 Product</h6>
              <div className="space-y-2 text-background/70">
                <a href="#" className="block hover:text-primary transition-colors">How it works</a>
                <a href="#" className="block hover:text-primary transition-colors">Examples</a>
                <a href="#" className="block hover:text-primary transition-colors">Pricing</a>
                <a href="#" className="block hover:text-primary transition-colors">API</a>
              </div>
            </div>
            
            <div>
              <h6 className="font-semibold mb-4">💬 Support</h6>
              <div className="space-y-2 text-background/70">
                <a href="#" className="block hover:text-primary transition-colors">Help Center</a>
                <a href="#" className="block hover:text-primary transition-colors">Contact Us</a>
                <a href="#" className="block hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-primary transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-12 pt-8 text-center text-background/70">
            <p>&copy; 2024 TravelAI ✈️. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}