import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-farm.jpg";

const LandingHero = () => {
  const navigate = useNavigate();

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

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary-foreground text-xs md:text-sm font-medium mb-6 md:mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-secondary" />
          <span>AI-Powered Smart Agriculture</span>
        </div>

        {/* Main Headline */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-foreground mb-4 md:mb-6 leading-tight animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          Transform Your
          <span className="block mt-2">
            <span className="text-secondary">Farming</span> with AI
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-base md:text-lg lg:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed animate-fade-in-up px-2"
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
            onClick={() => navigate("/analyze")}
            size="lg"
            className="btn-hero h-12 md:h-14 px-8 md:px-10 text-base md:text-lg font-semibold rounded-2xl text-foreground group transition-all duration-300 hover:scale-105 active:scale-[0.98] animate-pulse-glow"
          >
            <span className="relative z-10 flex items-center gap-2 md:gap-3">
              Get Started
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </div>

        {/* Stats */}
        <div 
          className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto animate-fade-in-up"
          style={{ animationDelay: "1s" }}
        >
          {[
            { value: "95%", label: "Accuracy" },
            { value: "50+", label: "Crop Types" },
            { value: "10K+", label: "Farmers" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-secondary mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-primary-foreground/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-1.5 md:p-2">
          <div className="w-1 h-2 md:w-1.5 md:h-3 rounded-full bg-primary-foreground/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
