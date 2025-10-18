import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import onboarding1 from "@/assets/onboarding-1.png";
import onboarding2 from "@/assets/onboarding-2.png";
import onboarding3 from "@/assets/onboarding-3.png";

const slides = [
  {
    image: onboarding1,
    title: "Cherchez un trajet en quelques secondes",
    description: "Notre IA vous aide à trouver le trajet parfait",
  },
  {
    image: onboarding2,
    title: "Réservez et payez en toute sécurité",
    description: "Paiement Mobile Money sécurisé et instantané",
  },
  {
    image: onboarding3,
    title: "Voyagez ensemble, en confiance",
    description: "Partagez le trajet avec des personnes vérifiées",
  },
];

export default function OnboardingPassenger() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/home");
    }
  };

  const handleSkip = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 animate-scale-in">
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-64 h-64 mx-auto object-contain mb-8"
          />
          <h1 className="text-3xl font-bold text-center mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg text-muted-foreground text-center">
            {slides[currentSlide].description}
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full"
            onClick={handleNext}
          >
            {currentSlide === slides.length - 1 ? "Commencer" : "Suivant"}
            <ArrowRight className="ml-2" />
          </Button>
          {currentSlide < slides.length - 1 && (
            <Button
              size="lg"
              variant="ghost"
              className="w-full"
              onClick={handleSkip}
            >
              Passer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
