import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-farm.jpg";

interface LandingHeroProps {
  onGetStarted: () => void;
}

const LandingHero = ({ onGetStarted }: LandingHeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Beautiful farmland at sunrise"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-[15%] animate-float opacity-60" style={{ animationDelay: "0s" }}>
        <div className="p-3 rounded-full bg-accent/20 backdrop-blur-sm">
          <Leaf className="w-6 h-6 text-accent" />
        </div>
      </div>
      <div className="absolute top-32 right-[20%] animate-float opacity-60" style={{ animationDelay: "1.5s" }}>
        <div className="p-3 rounded-full bg-secondary/20 backdrop-blur-sm">
          <Sparkles className="w-6 h-6 text-secondary" />
        </div>
      </div>
      <div className="absolute bottom-40 left-[25%] animate-float opacity-50" style={{ animationDelay: "0.8s" }}>
        <div className="p-2 rounded-full bg-primary/20 backdrop-blur-sm">
          <Leaf className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div 
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary-foreground text-sm font-medium mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Sparkles className="w-4 h-4 text-secondary" />
          <span>AI-Powered Smart Agriculture</span>
        </div>

        {/* Main Headline */}
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-foreground mb-6 leading-tight animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          Transform Your
          <span className="block mt-2">
            <span className="text-secondary">Farming</span> with AI
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          Analyze your soil composition instantly and receive personalized crop 
          recommendations powered by cutting-edge artificial intelligence
        </p>

        {/* CTA Button */}
        <div 
          className="animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <Button
            onClick={onGetStarted}
            size="lg"
            className="btn-hero h-14 px-10 text-lg font-semibold rounded-2xl text-foreground group transition-all duration-300 hover:scale-105 active:scale-[0.98] animate-pulse-glow"
          >
            <span className="relative z-10 flex items-center gap-3">
              Get Started
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </div>

        {/* Stats */}
        <div 
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in-up"
          style={{ animationDelay: "1s" }}
        >
          {[
            { value: "95%", label: "Accuracy" },
            { value: "50+", label: "Crop Types" },
            { value: "10K+", label: "Farmers" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-primary-foreground/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary-foreground/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
