import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SoilNutrientForm from "@/components/SoilNutrientForm";
import RecommendationCard from "@/components/RecommendationCard";
import HeroSection from "@/components/HeroSection";
import { Leaf } from "lucide-react";

interface SoilData {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  ph: string;
  moisture: string;
  organicCarbon: string;
}

interface Recommendation {
  crop: string;
  confidence: number;
  tips: string[];
  soilHealth: "excellent" | "good" | "moderate" | "poor";
  nutrients: {
    nitrogen: string;
    phosphorus: string;
    potassium: string;
  };
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = async (data: SoilData) => {
    setIsLoading(true);
    setRecommendation(null);

    try {
      // Replace this URL with your actual backend API endpoint
      const API_ENDPOINT = "/api/analyze-soil";
      
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nitrogen: parseFloat(data.nitrogen),
          phosphorus: parseFloat(data.phosphorus),
          potassium: parseFloat(data.potassium),
          ph: parseFloat(data.ph),
          moisture: parseFloat(data.moisture),
          organicCarbon: parseFloat(data.organicCarbon),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze soil data");
      }

      const result = await response.json();
      setRecommendation(result);
      
      toast({
        title: "Analysis Complete",
        description: "Your soil has been analyzed successfully!",
      });
    } catch (error) {
      console.error("API Error:", error);
      
      // Mock response for demo purposes when API is not available
      const mockRecommendation: Recommendation = generateMockRecommendation(data);
      setRecommendation(mockRecommendation);
      
      toast({
        title: "Demo Mode",
        description: "Showing sample recommendation. Connect your backend API for real results.",
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-earth-cream/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg font-serif font-semibold text-foreground">AgroSense</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-12 md:py-16">
        <HeroSection />

        <div className="max-w-2xl mx-auto space-y-8">
          <SoilNutrientForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          
          {recommendation && (
            <RecommendationCard recommendation={recommendation} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 AgroSense. Powered by AI for smarter farming.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Mock recommendation generator for demo
function generateMockRecommendation(data: SoilData): Recommendation {
  const nitrogen = parseFloat(data.nitrogen);
  const phosphorus = parseFloat(data.phosphorus);
  const potassium = parseFloat(data.potassium);
  const ph = parseFloat(data.ph);

  // Simple logic to determine crop
  let crop = "Wheat";
  let confidence = 85;
  
  if (nitrogen > 40 && phosphorus > 25) {
    crop = "Rice";
    confidence = 92;
  } else if (ph > 6 && ph < 7.5 && potassium > 30) {
    crop = "Corn";
    confidence = 88;
  } else if (ph < 6) {
    crop = "Potato";
    confidence = 79;
  }

  // Determine soil health
  let soilHealth: "excellent" | "good" | "moderate" | "poor" = "good";
  const avgNutrients = (nitrogen + phosphorus + potassium) / 3;
  
  if (avgNutrients > 35 && ph >= 6 && ph <= 7.5) {
    soilHealth = "excellent";
  } else if (avgNutrients > 25) {
    soilHealth = "good";
  } else if (avgNutrients > 15) {
    soilHealth = "moderate";
  } else {
    soilHealth = "poor";
  }

  return {
    crop,
    confidence,
    soilHealth,
    nutrients: {
      nitrogen: nitrogen > 35 ? "Optimal" : nitrogen > 20 ? "Adequate" : "Low",
      phosphorus: phosphorus > 30 ? "Optimal" : phosphorus > 15 ? "Adequate" : "Low",
      potassium: potassium > 25 ? "Optimal" : potassium > 12 ? "Adequate" : "Low",
    },
    tips: [
      `Maintain pH levels between 6.0-7.0 for optimal ${crop.toLowerCase()} growth`,
      `Apply nitrogen fertilizer in split doses during vegetative growth`,
      `Monitor moisture levels regularly, especially during flowering stage`,
      `Consider crop rotation to maintain long-term soil health`,
    ],
  };
}

export default Index;
