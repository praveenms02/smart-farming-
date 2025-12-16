import { Leaf, Sprout, Sun } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative text-center mb-12">
      {/* Floating icons */}
      <div className="absolute top-0 left-1/4 animate-float opacity-20">
        <Leaf className="w-8 h-8 text-accent" style={{ animationDelay: "0s" }} />
      </div>
      <div className="absolute top-10 right-1/4 animate-float opacity-20" style={{ animationDelay: "1s" }}>
        <Sun className="w-6 h-6 text-sun-gold" />
      </div>
      <div className="absolute -top-4 right-1/3 animate-float opacity-20" style={{ animationDelay: "0.5s" }}>
        <Sprout className="w-7 h-7 text-primary" />
      </div>

      {/* Main content */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
        <Sprout className="w-4 h-4" />
        <span>AI-Powered Agriculture</span>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4 leading-tight">
        Smart Farming
        <span className="block text-primary">Soil Analysis</span>
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Harness the power of AI to analyze your soil composition and receive 
        personalized crop recommendations for optimal yield
      </p>
    </div>
  );
};

export default HeroSection;
