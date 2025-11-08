import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Car } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");
  const [role, setRole] = useState<"passenger" | "driver">(
    typeParam === "driver" ? "driver" : "passenger"
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = () => {
    setIsLoading(true);
    
    // Simulation d'inscription
    localStorage.setItem("demo_user_type", role);
    localStorage.setItem("demo_authenticated", "true");
    
    toast.success("Compte créé avec succès !");
    
    setTimeout(() => {
      setIsLoading(false);
      if (role === "passenger") {
        navigate("/home");
      } else {
        navigate("/driver-dashboard");
      }
    }, 500);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-primary-foreground mb-6 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </button>

        <Card className="p-8 animate-scale-in">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Démo - Inscription</h1>
            <p className="text-muted-foreground">
              Choisissez votre profil pour la démonstration
            </p>
          </div>

          <div className="space-y-6">
            <RadioGroup value={role} onValueChange={(v) => setRole(v as "passenger" | "driver")}>
              <div
                className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  role === "passenger" ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => setRole("passenger")}
              >
                <RadioGroupItem value="passenger" id="passenger" />
                <Label htmlFor="passenger" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5" />
                    <div>
                      <div className="font-semibold">Passager</div>
                      <div className="text-sm text-muted-foreground">
                        Rechercher et réserver des trajets
                      </div>
                    </div>
                  </div>
                </Label>
              </div>

              <div
                className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  role === "driver" ? "border-accent bg-accent/5" : "border-border"
                }`}
                onClick={() => setRole("driver")}
              >
                <RadioGroupItem value="driver" id="driver" />
                <Label htmlFor="driver" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5" />
                    <div>
                      <div className="font-semibold">Conducteur</div>
                      <div className="text-sm text-muted-foreground">
                        Proposer des trajets et gérer mes réservations
                      </div>
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>

            <Button
              onClick={handleSignup}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Création..." : "Créer un compte démo"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Déjà un compte ? </span>
              <Link to="/login" className="text-primary font-medium hover:underline">
                Se connecter
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
