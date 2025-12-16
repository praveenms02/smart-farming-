import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Droplets, FlaskConical, Sparkles, Loader2 } from "lucide-react";

interface SoilData {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  ph: string;
  moisture: string;
  organicCarbon: string;
}

interface SoilNutrientFormProps {
  onSubmit: (data: SoilData) => Promise<void>;
  isLoading: boolean;
}

const SoilNutrientForm = ({ onSubmit, isLoading }: SoilNutrientFormProps) => {
  const [formData, setFormData] = useState<SoilData>({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    moisture: "",
    organicCarbon: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const inputFields = [
    { name: "nitrogen", label: "Nitrogen (N)", placeholder: "e.g., 45 kg/ha", icon: Leaf, unit: "kg/ha" },
    { name: "phosphorus", label: "Phosphorus (P)", placeholder: "e.g., 30 kg/ha", icon: FlaskConical, unit: "kg/ha" },
    { name: "potassium", label: "Potassium (K)", placeholder: "e.g., 25 kg/ha", icon: Sparkles, unit: "kg/ha" },
    { name: "ph", label: "pH Level", placeholder: "e.g., 6.5", icon: Droplets, unit: "pH" },
    { name: "moisture", label: "Moisture", placeholder: "e.g., 35%", icon: Droplets, unit: "%" },
    { name: "organicCarbon", label: "Organic Carbon", placeholder: "e.g., 1.2%", icon: Leaf, unit: "%" },
  ];

  return (
    <Card className="card-earth border-0 overflow-hidden">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <FlaskConical className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-serif">Soil Analysis</CardTitle>
        </div>
        <CardDescription className="text-base text-muted-foreground">
          Enter your soil nutrient values to receive AI-powered crop recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {inputFields.map((field, index) => {
              const Icon = field.icon;
              return (
                <div 
                  key={field.name} 
                  className="space-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Label htmlFor={field.name} className="text-sm font-medium flex items-center gap-2">
                    <Icon className="w-4 h-4 text-accent" />
                    {field.label}
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.01"
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name as keyof SoilData]}
                      onChange={handleChange}
                      required
                      className="pr-14"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium">
                      {field.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <Button 
            type="submit" 
            variant="earth" 
            size="lg" 
            className="w-full mt-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Soil Data...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Get AI Recommendation
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SoilNutrientForm;
