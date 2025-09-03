import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  const plans = [
    {
      name: "Explorer",
      price: "Free",
      description: "Perfect for trying out our AI travel planner",
      features: [
        "📋 1 itinerary per month",
        "🌍 Basic destinations", 
        "📱 Mobile app access",
        "📧 Email support"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Traveler", 
      price: "$9.99",
      period: "/month",
      description: "Ideal for frequent travelers and vacation planners",
      features: [
        "📋 10 itineraries per month",
        "🌟 Premium destinations",
        "🔄 Unlimited regenerations", 
        "📄 PDF exports",
        "💬 Priority support",
        "🗓️ Calendar integration"
      ],
      cta: "Start 7-Day Trial",
      popular: true
    },
    {
      name: "Globetrotter",
      price: "$29.99", 
      period: "/month",
      description: "For travel agencies and power users",
      features: [
        "📋 Unlimited itineraries",
        "✈️ Multi-city trips",
        "👥 Group planning tools",
        "🔔 Price alerts",
        "📊 Analytics dashboard",
        "🎧 Phone support",
        "🏢 Team collaboration"
      ],
      cta: "Contact Sales",
      popular: false
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
              <a href="/examples" className="text-muted-foreground hover:text-primary transition-colors">Examples</a>
              <a href="/pricing" className="text-primary font-medium">Pricing</a>
              <a href="/api/login" className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-all">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Pricing Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">💎 Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the perfect plan for your travel needs. Start free and upgrade as you explore more
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`rounded-2xl shadow-lg p-8 border relative hover:shadow-xl transition-shadow ${
                  plan.popular ? 'border-primary shadow-primary/20' : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-card-foreground mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <span className="text-accent mr-3">✓</span>
                        <span className="text-card-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground text-sm">
              🔒 All plans include secure payment processing and 30-day money-back guarantee
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}