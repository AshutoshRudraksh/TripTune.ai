export default function HeroSection() {
  return (
    <header className="relative overflow-hidden">
      <div className="travel-gradient min-h-screen flex items-center justify-center relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full floating-animation"></div>
          <div className="absolute bottom-40 right-20 w-32 h-32 bg-white/10 rounded-full floating-animation" style={{animationDelay: '-2s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/15 rounded-full floating-animation" style={{animationDelay: '-4s'}}></div>
        </div>
        
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-white font-bold text-2xl">
              ✈️ TravelAI
            </div>
            <div className="hidden md:flex space-x-6 text-white">
              <a href="#" className="hover:text-secondary transition-colors">How it works</a>
              <a href="#" className="hover:text-secondary transition-colors">Examples</a>
              <a href="#" className="hover:text-secondary transition-colors">Pricing</a>
              <button 
                className="bg-white text-primary px-6 py-2 rounded-full font-medium hover:bg-secondary hover:text-secondary-foreground transition-all"
                data-testid="button-signin"
              >
                Sign In
              </button>
            </div>
          </div>
        </nav>
        
        {/* Hero Content */}
        <div className="text-center text-white px-6 max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Perfect Trip 🌍,
            <span className="text-secondary"> Planned by AI ✨</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Get personalized, real-time travel itineraries that blend your preferences with live flight ✈️, hotel 🏨, and weather 🌤️ data.
          </p>
          <button 
            className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-secondary hover:text-secondary-foreground transition-all transform hover:scale-105 shadow-2xl"
            data-testid="button-start-planning"
            onClick={() => {
              const planningSection = document.getElementById('planning-form');
              planningSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            🎯 Start Planning Now
          </button>
        </div>
      </div>
    </header>
  );
}
