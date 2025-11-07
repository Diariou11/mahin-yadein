import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, MapPin, Calendar, Clock, Sparkles, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const { userType } = useAuth();

  useEffect(() => {
    // Redirect to appropriate dashboard based on user type
    if (userType === 'driver') {
      navigate('/driver-dashboard');
    }
  }, [userType, navigate]);

  return (
    <Layout showBackButton={true}>
      <div className="min-h-screen pb-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary via-accent to-primary p-6 pb-12">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-primary-foreground mb-2">
              Bonjour, Mamadou 👋
            </h1>
            <p className="text-primary-foreground/80">Où allez-vous aujourd'hui ?</p>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 -mt-8">
          {/* Search Card */}
          <Card className="p-4 mb-6 shadow-lg animate-slide-up">
            <div className="space-y-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <Input
                  placeholder="Départ (ex: Conakry)"
                  className="pl-10"
                  onClick={() => navigate("/search")}
                  readOnly
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                <Input
                  placeholder="Arrivée (ex: Kindia)"
                  className="pl-10"
                  onClick={() => navigate("/search")}
                  readOnly
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="pl-9"
                    onClick={() => navigate("/search")}
                    readOnly
                  />
                </div>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="time"
                    className="pl-9"
                    onClick={() => navigate("/search")}
                    readOnly
                  />
                </div>
              </div>
              <Button className="w-full" onClick={() => navigate("/search")}>
                <Search className="mr-2 w-4 h-4" />
                Rechercher un trajet
              </Button>
            </div>
          </Card>

          {/* IA Suggestions */}
          <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Suggestions IA</h2>
            </div>
            <Card className="p-4 border-primary/30 bg-card/50 backdrop-blur cursor-pointer hover:border-primary transition-all hover:scale-105" onClick={() => navigate("/search")}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Conakry → Kindia</div>
                  <div className="text-sm text-muted-foreground">Vendredi 19h • Trajet habituel</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">80 000 GNF</div>
                  <div className="text-xs text-muted-foreground">3 places</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Mes trajets réservés */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-lg font-semibold mb-3">Mes trajets réservés</h2>
            <Card className="p-4 cursor-pointer hover:border-primary transition-all hover:scale-105" onClick={() => navigate("/rides")}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Conakry → Mamou</div>
                  <div className="text-sm text-muted-foreground">Samedi 15 juin • 14h00</div>
                  <div className="text-xs text-muted-foreground mt-1">Conducteur: Amadou Diallo • 4.8★</div>
                </div>
                <div className="text-right">
                  <div className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
                    Confirmé
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
