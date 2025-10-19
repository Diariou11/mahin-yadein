import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    icon: "💰",
    title: "Rentabilisez vos trajets quotidiens",
    description: "Transformez vos déplacements en revenus réguliers",
  },
  {
    icon: "👥",
    title: "Trouvez des passagers fiables",
    description: "Notre IA sélectionne les meilleurs passagers pour vous",
  },
  {
    icon: "🔒",
    title: "Recevez vos paiements en toute sécurité",
    description: "Paiements garantis via Mobile Money",
  },
];

export default function OnboardingDriver() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/driver-dashboard");
    }
  };

  const handleSkip = () => {
    navigate("/driver-dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 animate-scale-in">
          <div className="text-8xl text-center mb-8">
            {slides[currentSlide].icon}
          </div>
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
