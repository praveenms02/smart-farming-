import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, TrendingUp, AlertCircle, CheckCircle2, Sprout } from "lucide-react";

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

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const healthColors = {
  excellent: "bg-leaf-green/20 text-leaf-green border-leaf-green/30",
  good: "bg-accent/20 text-accent border-accent/30",
  moderate: "bg-sun-gold/20 text-sun-gold border-sun-gold/30",
  poor: "bg-destructive/20 text-destructive border-destructive/30",
};

const healthIcons = {
  excellent: CheckCircle2,
  good: CheckCircle2,
  moderate: AlertCircle,
  poor: AlertCircle,
};

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  const HealthIcon = healthIcons[recommendation.soilHealth];

  return (
    <Card className="card-earth border-0 overflow-hidden animate-slide-up">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent/15">
              <Sprout className="w-6 h-6 text-accent" />
            </div>
            <div>
              <CardTitle className="text-2xl font-serif">AI Recommendation</CardTitle>
              <CardDescription className="text-sm">Based on your soil analysis</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={`${healthColors[recommendation.soilHealth]} px-3 py-1 font-medium`}>
            <HealthIcon className="w-3.5 h-3.5 mr-1.5" />
            {recommendation.soilHealth.charAt(0).toUpperCase() + recommendation.soilHealth.slice(1)} Soil
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recommended Crop */}
        <div className="p-5 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Recommended Crop</p>
              <h3 className="text-3xl font-serif font-semibold text-primary">{recommendation.crop}</h3>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Confidence</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="text-2xl font-bold text-accent">{recommendation.confidence}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrient Status */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Nutrient Status</h4>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(recommendation.nutrients).map(([key, value]) => (
              <div key={key} className="p-3 rounded-lg bg-secondary/50 text-center">
                <p className="text-xs text-muted-foreground capitalize mb-1">{key}</p>
                <p className="text-sm font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Growing Tips */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Growing Tips</h4>
          <ul className="space-y-2.5">
            {recommendation.tips.map((tip, index) => (
              <li 
                key={index} 
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <Leaf className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
