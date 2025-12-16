import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, TrendingUp, AlertCircle, CheckCircle2, Sprout, Sparkles } from "lucide-react";

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

const healthConfig = {
  excellent: { 
    color: "bg-accent/15 text-accent border-accent/30",
    icon: CheckCircle2,
    gradient: "from-accent/20 to-accent/5"
  },
  good: { 
    color: "bg-primary/15 text-primary border-primary/30",
    icon: CheckCircle2,
    gradient: "from-primary/20 to-primary/5"
  },
  moderate: { 
    color: "bg-secondary/20 text-secondary-foreground border-secondary/40",
    icon: AlertCircle,
    gradient: "from-secondary/30 to-secondary/10"
  },
  poor: { 
    color: "bg-destructive/15 text-destructive border-destructive/30",
    icon: AlertCircle,
    gradient: "from-destructive/20 to-destructive/5"
  },
};

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  const config = healthConfig[recommendation.soilHealth];
  const HealthIcon = config.icon;

  return (
    <Card className="card-glass border-0 overflow-hidden animate-slide-up">
      <CardHeader className="pb-4 pt-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-accent to-primary shadow-glow">
              <Sparkles className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-3xl font-serif">AI Recommendation</CardTitle>
              <CardDescription className="text-base mt-1">Based on your soil analysis</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={`${config.color} px-4 py-2 font-semibold text-sm rounded-xl`}>
            <HealthIcon className="w-4 h-4 mr-2" />
            {recommendation.soilHealth.charAt(0).toUpperCase() + recommendation.soilHealth.slice(1)} Soil
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 px-6 pb-8">
        {/* Recommended Crop */}
        <div className={`p-6 rounded-2xl bg-gradient-to-br ${config.gradient} border border-border/30`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-2">Recommended Crop</p>
              <h3 className="text-4xl font-serif font-bold text-foreground">{recommendation.crop}</h3>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground font-medium mb-2">Confidence</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-accent" />
                <span className="text-4xl font-bold text-accent">{recommendation.confidence}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrient Status */}
        <div>
          <h4 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
            <Sprout className="w-4 h-4" />
            Nutrient Status
          </h4>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(recommendation.nutrients).map(([key, value], index) => {
              const colors = ["bg-accent/10 border-accent/20", "bg-secondary/15 border-secondary/30", "bg-primary/10 border-primary/20"];
              const textColors = ["text-accent", "text-secondary-foreground", "text-primary"];
              return (
                <div 
                  key={key} 
                  className={`p-4 rounded-xl ${colors[index]} border text-center animate-scale-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <p className="text-xs text-muted-foreground font-semibold capitalize mb-1 uppercase tracking-wide">{key}</p>
                  <p className={`text-lg font-bold ${textColors[index]}`}>{value}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Growing Tips */}
        <div>
          <h4 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
            <Leaf className="w-4 h-4" />
            Growing Tips
          </h4>
          <ul className="space-y-3">
            {recommendation.tips.map((tip, index) => (
              <li 
                key={index} 
                className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border/30 animate-fade-in-up"
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                <div className="p-1.5 rounded-lg bg-accent/15 mt-0.5">
                  <Leaf className="w-4 h-4 text-accent" />
                </div>
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
