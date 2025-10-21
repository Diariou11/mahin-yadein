import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Search, CreditCard, MapPin, Shield, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";

const tutorialSteps = [
  {
    icon: Search,
    title: "Recherchez votre trajet",
    description: "Entrez votre départ et arrivée. Notre IA trouve les meilleurs conducteurs pour vous.",
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
  {
    icon: Shield,
    title: "Conducteurs vérifiés",
    description: "Tous nos conducteurs sont vérifiés. Consultez leurs notes et avis avant de réserver.",
    color: "text-secondary",
    bgColor: "bg-secondary/20",
  },
  {
    icon: CreditCard,
    title: "Payez en toute sécurité",
    description: "Paiement sécurisé via Mobile Money. Remboursement automatique si annulation.",
    color: "text-accent",
    bgColor: "bg-accent/20",
  },
  {
    icon: MapPin,
    title: "Suivez votre trajet",
    description: "Suivez votre conducteur en temps réel et partagez votre trajet avec vos proches.",
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
];

export default function OnboardingTutorial() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/home");
    }
  };

  const handleSkip = () => {
    navigate("/home");
  };

  const step = tutorialSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen justify-between">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <img src={logo} alt="Mahin Yadein" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Comment ça marche ?</h1>
          <p className="text-muted-foreground">Étape 5 sur 5</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-muted rounded-full mb-8">
          <div className="h-full w-full bg-primary rounded-full transition-all duration-500" />
        </div>

        {/* Tutorial Content */}
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

          {/* Step Indicators */}
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

          {/* Success Message on Last Step */}
          {currentStep === tutorialSteps.length - 1 && (
            <Card className="p-4 bg-secondary/10 border-secondary/30 mb-8 animate-fade-in">
              <div className="flex items-center justify-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <p className="font-medium">Vous êtes prêt à voyager !</p>
              </div>
            </Card>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full"
            onClick={handleNext}
          >
            {currentStep === tutorialSteps.length - 1 ? "Commencer à voyager" : "Suivant"}
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
