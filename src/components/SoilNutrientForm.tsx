import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Droplets, FlaskConical, Sparkles, Loader2, Atom, Beaker } from "lucide-react";

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
    { name: "nitrogen", label: "Nitrogen (N)", placeholder: "45", icon: Atom, unit: "kg/ha", color: "text-accent" },
    { name: "phosphorus", label: "Phosphorus (P)", placeholder: "30", icon: FlaskConical, unit: "kg/ha", color: "text-secondary" },
    { name: "potassium", label: "Potassium (K)", placeholder: "25", icon: Beaker, unit: "kg/ha", color: "text-primary" },
    { name: "ph", label: "pH Level", placeholder: "6.5", icon: Droplets, unit: "pH", color: "text-sky-blue" },
    { name: "moisture", label: "Moisture", placeholder: "35", icon: Droplets, unit: "%", color: "text-sky-blue" },
    { name: "organicCarbon", label: "Organic Carbon", placeholder: "1.2", icon: Leaf, unit: "%", color: "text-leaf-green" },
  ];

  return (
    <Card className="card-glass border-0 overflow-hidden animate-scale-in">
      <CardHeader className="pb-6 pt-8">
        <div className="flex items-center gap-4 mb-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-glow">
            <FlaskConical className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-3xl font-serif">Soil Analysis</CardTitle>
            <CardDescription className="text-base text-muted-foreground mt-1">
              Enter your soil nutrient values below
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.map((field, index) => {
              const Icon = field.icon;
              return (
                <div 
                  key={field.name} 
                  className="space-y-2.5 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Label htmlFor={field.name} className="text-sm font-semibold flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${field.color}`} />
                    {field.label}
                  </Label>
                  <div className="relative group">
                    <Input
                      type="number"
                      step="0.01"
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name as keyof SoilData]}
                      onChange={handleChange}
                      required
                      className="pr-16 h-14 text-base rounded-xl border-2 border-border/60 bg-background/80 focus:border-primary focus:bg-background transition-all duration-300"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium px-2 py-1 rounded-md bg-muted/50">
                      {field.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              variant="earth" 
              size="lg" 
              className="w-full h-14 text-lg rounded-xl shadow-golden"
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
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SoilNutrientForm;
