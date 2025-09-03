import { Card } from "@/components/ui/card";

export default function Examples() {
  const examples = [
    {
      title: "🏝️ 7 Days in Bali",
      description: "Cultural temples, rice terraces, and beach relaxation",
      budget: "$1,400",
      interests: ["🧘 Relaxation", "📸 Photography", "🍽️ Food"],
      highlights: ["Uluwatu Temple sunset", "Mount Batur sunrise", "Ubud cooking class"]
    },
    {
      title: "🗼 5 Days in Tokyo", 
      description: "Modern city exploration with traditional experiences",
      budget: "$2,100",
      interests: ["🏙️ Urban", "🍣 Food", "🛍️ Shopping"],
      highlights: ["Shibuya crossing", "Tsukiji fish market", "Robot Restaurant"]
    },
    {
      title: "🏔️ 4 Days in Switzerland",
      description: "Alpine adventures and scenic mountain railways",
      budget: "$2,800", 
      interests: ["⛰️ Adventure", "📸 Photography", "🌲 Nature"],
      highlights: ["Matterhorn viewing", "Jungfraujoch train", "Lake Geneva cruise"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-foreground">✈️ TravelAI</a>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</a>
              <a href="/examples" className="text-primary font-medium">Examples</a>
              <a href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
              <a href="/api/login" className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-all">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Examples Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">✨ Example Itineraries</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how our AI creates personalized travel plans based on real user preferences and live data
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examples.map((example, index) => (
              <Card key={index} className="rounded-2xl shadow-lg p-6 border border-border hover:shadow-xl transition-shadow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-card-foreground mb-2">{example.title}</h3>
                  <p className="text-muted-foreground text-sm">{example.description}</p>
                </div>

                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary mb-1">{example.budget}</div>
                  <div className="text-xs text-muted-foreground">Total estimated cost</div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-card-foreground mb-2">Interests:</div>
                  <div className="flex flex-wrap gap-2">
                    {example.interests.map((interest, i) => (
                      <span key={i} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-card-foreground mb-2">✨ Highlights:</div>
                  <ul className="space-y-1">
                    {example.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center">
                        <span className="text-accent mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  📋 View Full Itinerary
                </button>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}