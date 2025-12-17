import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SoilNutrientForm from "@/components/SoilNutrientForm";
import RecommendationCard from "@/components/RecommendationCard";
import { Leaf, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SoilData {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  ph: string;
  moisture: string;
  city: string;
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

const Analyze = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFormSubmit = async (data: SoilData) => {
    setIsLoading(true);
    setRecommendation(null);

    try {
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
          city: data.city,
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
    <div className="min-h-screen bg-background">
      <section className="relative py-12 md:py-20 bg-gradient-to-b from-background via-earth-cream/30 to-background">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <div className="relative z-10 text-center mb-10 px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Enter Soil Details
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Provide your soil nutrient measurements for an accurate AI analysis
          </p>
        </div>

        {/* Form and Results */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-10">
            <SoilNutrientForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            
            {recommendation && (
              <RecommendationCard recommendation={recommendation} />
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-background">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <span className="text-lg font-serif font-semibold text-foreground">AgroSense</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2024 AgroSense. Powered by AI for smarter farming.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function generateMockRecommendation(data: SoilData): Recommendation {
  const nitrogen = parseFloat(data.nitrogen);
  const phosphorus = parseFloat(data.phosphorus);
  const potassium = parseFloat(data.potassium);
  const ph = parseFloat(data.ph);

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

export default Analyze;
