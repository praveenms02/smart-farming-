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
  cropImage: string;
  cropDescription: string;
  confidence: number;
  tips: string[];
  soilHealth: "excellent" | "good" | "moderate" | "poor";
  nutrients: {
    nitrogen: string;
    phosphorus: string;
    potassium: string;
  };
  companionCrop: {
    name: string;
    image: string;
    description: string;
  };
  companionAdvantage: string;
  organicFertilizers: string[];
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
  let cropImage = "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop";
  let cropDescription = "Wheat is a cereal grain and one of the most important food crops globally. It thrives in temperate climates with well-drained soil and moderate rainfall.";
  let confidence = 85;
  let companionCrop = {
    name: "Clover",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop",
    description: "A nitrogen-fixing legume that improves soil health."
  };
  let companionAdvantage = "Clover fixes nitrogen in the soil, reducing the need for synthetic fertilizers and improving wheat yield by up to 15%.";
  let organicFertilizers = ["Compost", "Bone Meal", "Fish Emulsion"];
  
  if (nitrogen > 40 && phosphorus > 25) {
    crop = "Rice";
    cropImage = "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop";
    cropDescription = "Rice is a staple food for more than half of the world's population. It grows best in warm, wet conditions with clay-rich soil that retains water.";
    confidence = 92;
    companionCrop = {
      name: "Azolla",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=150&fit=crop",
      description: "A floating fern that fixes atmospheric nitrogen."
    };
    companionAdvantage = "Azolla provides natural nitrogen fixation, reduces water evaporation, and suppresses weed growth in paddy fields.";
    organicFertilizers = ["Green Manure", "Vermicompost", "Neem Cake"];
  } else if (ph > 6 && ph < 7.5 && potassium > 30) {
    crop = "Corn";
    cropImage = "https://images.unsplash.com/photo-1601593768799-76d8bbf56b69?w=400&h=300&fit=crop";
    cropDescription = "Corn (maize) is a versatile cereal grain used for food, feed, and biofuel. It requires warm temperatures, full sun, and well-drained fertile soil.";
    confidence = 88;
    companionCrop = {
      name: "Beans",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=200&h=150&fit=crop",
      description: "A climbing legume that adds nitrogen to the soil."
    };
    companionAdvantage = "Beans climb corn stalks for support while fixing nitrogen, a classic 'Three Sisters' companion planting technique.";
    organicFertilizers = ["Aged Manure", "Kelp Meal", "Blood Meal"];
  } else if (ph < 6) {
    crop = "Potato";
    cropImage = "https://images.unsplash.com/photo-1518977676601-b53f82ber8d?w=400&h=300&fit=crop";
    cropDescription = "Potatoes are starchy tuber vegetables that prefer cool climates and slightly acidic, loose, well-drained soil rich in organic matter.";
    confidence = 79;
    companionCrop = {
      name: "Horseradish",
      image: "https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=200&h=150&fit=crop",
      description: "A pungent root that deters pests naturally."
    };
    companionAdvantage = "Horseradish repels potato beetles and other pests, while its deep roots help break up compacted soil.";
    organicFertilizers = ["Wood Ash", "Composted Leaves", "Rock Phosphate"];
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
    cropImage,
    cropDescription,
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
    companionCrop,
    companionAdvantage,
    organicFertilizers,
  };
}

export default Analyze;
