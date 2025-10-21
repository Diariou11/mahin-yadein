import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Plus, Users, TrendingUp, Star, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";

const tutorialSteps = [
  {
    icon: Plus,
    title: "Publiez vos trajets",
    description: "Créez vos trajets en quelques secondes. Notre IA vous aide à fixer le meilleur prix.",
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
  {
    icon: Users,
    title: "Acceptez les passagers",
    description: "Choisissez qui monte dans votre véhicule. Consultez les profils et notes avant d'accepter.",
    color: "text-secondary",
    bgColor: "bg-secondary/20",
  },
  {
    icon: TrendingUp,
    title: "Gagnez de l'argent",
    description: "Recevez vos paiements instantanément après chaque trajet. Pas de frais cachés.",
    color: "text-accent",
    bgColor: "bg-accent/20",
  },
  {
    icon: Star,
    title: "Construisez votre réputation",
    description: "Les bons conducteurs gagnent plus. Maintenez une note élevée pour plus de réservations.",
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
];

export default function DriverTutorial() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/driver-dashboard");
    }
  };

  const handleSkip = () => {
    navigate("/driver-dashboard");
  };

  const step = tutorialSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen justify-between">
        <div className="text-center mb-8 animate-fade-in">
          <img src={logo} alt="Mahin Yadein" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Guide conducteur</h1>
          <p className="text-muted-foreground">Étape 5 sur 5</p>
        </div>

        <div className="w-full h-2 bg-muted rounded-full mb-8">
          <div className="h-full w-full bg-primary rounded-full transition-all duration-500" />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <Card className="p-8 text-center mb-8 animate-scale-in" key={currentStep}>
            <div className={`w-24 h-24 rounded-full ${step.bgColor} mx-auto mb-6 flex items-center justify-center`}>
              <Icon className={`w-12 h-12 ${step.color}`} />
            </div>
            <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {step.description}
            </p>
          </Card>

          <div className="flex justify-center gap-2 mb-8">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "w-8 bg-primary"
                    : index < currentStep
                    ? "w-2 bg-secondary"
                    : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>

          {currentStep === tutorialSteps.length - 1 && (
            <Card className="p-4 bg-secondary/10 border-secondary/30 mb-8 animate-fade-in">
              <div className="flex items-center justify-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <p className="font-medium">Vous êtes prêt à conduire !</p>
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full"
            onClick={handleNext}
          >
            {currentStep === tutorialSteps.length - 1 ? "Aller au tableau de bord" : "Suivant"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          {currentStep < tutorialSteps.length - 1 && (
            <Button
              size="lg"
              variant="ghost"
              className="w-full"
              onClick={handleSkip}
            >
              Passer le tutoriel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
