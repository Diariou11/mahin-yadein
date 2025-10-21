import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight, Music, Volume2, Cigarette, Users, PawPrint, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/logo.svg";

export default function TravelPreferences() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    music: false,
    conversation: false,
    noSmoking: false,
    familyFriendly: false,
    petFriendly: false,
  });

  const handleContinue = () => {
    toast.success("Préférences enregistrées");
    navigate("/onboarding/tutorial");
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <img src={logo} alt="Mahin Yadein" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Vos préférences de voyage</h1>
          <p className="text-muted-foreground">Étape 4 sur 5</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-muted rounded-full mb-8">
          <div className="h-full w-4/5 bg-primary rounded-full transition-all duration-500" />
        </div>

        <div className="space-y-6">
          {/* AI Info */}
          <Card className="p-4 bg-accent/10 border-accent/30 animate-slide-up">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">IA Personnalisée</p>
                <p className="text-muted-foreground">
                  Notre IA utilisera ces préférences pour vous recommander les meilleurs trajets
                </p>
              </div>
            </div>
          </Card>

          {/* Preferences */}
          <Card className="p-6 space-y-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="font-semibold mb-4">Sélectionnez vos préférences</h3>

            <div className="space-y-4">
              {/* Music */}
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <Checkbox
                  id="music"
                  checked={preferences.music}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, music: checked as boolean })
                  }
                />
                <Label htmlFor="music" className="flex-1 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Music className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Musique pendant le trajet</p>
                      <p className="text-xs text-muted-foreground">
                        J'apprécie voyager avec de la musique
                      </p>
                    </div>
                  </div>
                </Label>
              </div>

              {/* Conversation */}
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <Checkbox
                  id="conversation"
                  checked={preferences.conversation}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, conversation: checked as boolean })
                  }
                />
                <Label htmlFor="conversation" className="flex-1 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Volume2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Ouvert aux conversations</p>
                      <p className="text-xs text-muted-foreground">
                        J'aime discuter avec les autres passagers
                      </p>
                    </div>
                  </div>
                </Label>
              </div>

              {/* No Smoking */}
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <Checkbox
                  id="noSmoking"
                  checked={preferences.noSmoking}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, noSmoking: checked as boolean })
                  }
                />
                <Label htmlFor="noSmoking" className="flex-1 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Cigarette className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Véhicule non-fumeur</p>
                      <p className="text-xs text-muted-foreground">
                        Je préfère les trajets sans fumée
                      </p>
                    </div>
                  </div>
                </Label>
              </div>

              {/* Family Friendly */}
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <Checkbox
                  id="familyFriendly"
                  checked={preferences.familyFriendly}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, familyFriendly: checked as boolean })
                  }
                />
                <Label htmlFor="familyFriendly" className="flex-1 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Trajets familiaux</p>
                      <p className="text-xs text-muted-foreground">
                        Adapté aux familles avec enfants
                      </p>
                    </div>
                  </div>
                </Label>
              </div>

              {/* Pet Friendly */}
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <Checkbox
                  id="petFriendly"
                  checked={preferences.petFriendly}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, petFriendly: checked as boolean })
                  }
                />
                <Label htmlFor="petFriendly" className="flex-1 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <PawPrint className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Animaux acceptés</p>
                      <p className="text-xs text-muted-foreground">
                        J'accepte les petits animaux
                      </p>
                    </div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          {/* Note */}
          <Card className="p-4 bg-secondary/10 border-secondary/30 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <p className="text-sm text-muted-foreground text-center">
              Vous pourrez modifier ces préférences à tout moment dans vos paramètres
            </p>
          </Card>

          <div className="flex gap-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => navigate("/onboarding/tutorial")}
            >
              Passer
            </Button>
            <Button
              size="lg"
              className="flex-1"
              onClick={handleContinue}
            >
              Continuer
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
