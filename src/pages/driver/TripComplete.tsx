import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Star, TrendingUp, Users, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getProfileImage } from "@/utils/avatarHelper";

export default function TripComplete() {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  const passengers = [
    {
      id: "1",
      name: "Aissatou Bah",
      avatar: getProfileImage("Aissatou Bah"),
    },
    {
      id: "2",
      name: "Ibrahima Sow",
      avatar: getProfileImage("Ibrahima Sow"),
    }
  ];

  const handleRating = (passengerId: string, rating: number) => {
    setRatings({ ...ratings, [passengerId]: rating });
  };

  const handleComplete = () => {
    const allRated = passengers.every(p => ratings[p.id]);
    if (!allRated) {
      toast.error("Veuillez évaluer tous les passagers");
      return;
    }
    toast.success("Merci pour votre évaluation !");
    navigate("/driver-dashboard");
  };

  return (
    <Layout showNav={false} isDriver={true}>
      <div className="min-h-screen pb-8">
        {/* Header de succès */}
        <div className="bg-gradient-to-br from-secondary via-secondary/90 to-primary p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-secondary-foreground/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-secondary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-secondary-foreground mb-2">
            Trajet terminé !
          </h1>
          <p className="text-secondary-foreground/80">
            Félicitations pour ce trajet réussi
          </p>
        </div>

        <div className="px-6 -mt-6">
          {/* Récapitulatif des gains */}
          <Card className="p-6 mb-6 shadow-lg">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-2">Vos revenus</p>
              <p className="text-4xl font-bold text-primary mb-1">75,000 GNF</p>
              <Badge className="bg-secondary text-secondary-foreground">
                +12% que prévu
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold mb-1">135</p>
                <p className="text-xs text-muted-foreground">km parcourus</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <p className="text-2xl font-bold mb-1">1h45</p>
                <p className="text-xs text-muted-foreground">durée</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <p className="text-2xl font-bold mb-1">32</p>
                <p className="text-xs text-muted-foreground">kg CO₂ évités</p>
              </div>
            </div>
          </Card>

          {/* Détails du trajet */}
          <Card className="p-4 mb-6">
            <h3 className="font-semibold mb-3">Détails du trajet</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Itinéraire</span>
                <span className="font-medium">Conakry → Kindia</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date & heure</span>
                <span className="font-medium">15 Nov 2025, 08:00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Passagers</span>
                <span className="font-medium">3 places occupées</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Prix par place</span>
                <span className="font-medium">25,000 GNF</span>
              </div>
            </div>
          </Card>

          {/* Évaluation des passagers */}
          <Card className="p-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Évaluez vos passagers</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Votre avis aide à maintenir une communauté de qualité
            </p>

            <div className="space-y-4">
              {passengers.map((passenger) => (
                <div key={passenger.id} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={passenger.avatar} />
                      <AvatarFallback>{passenger.name[0]}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">{passenger.name}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Ponctualité</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(passenger.id, star)}
                          className="transition-all"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              ratings[passenger.id] >= star
                                ? "fill-secondary text-secondary"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full"
              onClick={handleComplete}
            >
              Terminer et retourner au tableau de bord
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={() => navigate("/publish-ride")}
            >
              Publier un nouveau trajet
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
