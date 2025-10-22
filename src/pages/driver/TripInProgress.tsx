import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navigation, Users, Phone, MessageCircle, MapPin, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function TripInProgress() {
  const navigate = useNavigate();
  const [tripStarted, setTripStarted] = useState(false);
  const [duration] = useState("1h 45min");
  const [distance] = useState("135 km");

  const passengers = [
    {
      name: "Aissatou Bah",
      avatar: "/placeholder.svg",
      phone: "+224 622 123 456",
      seats: 2,
      pickupPoint: "Rond-point Cosa"
    },
    {
      name: "Ibrahima Sow",
      avatar: "/placeholder.svg",
      phone: "+224 622 789 012",
      seats: 1,
      pickupPoint: "Gare Madina"
    }
  ];

  const handleStartTrip = () => {
    setTripStarted(true);
    toast.success("Trajet démarré !");
  };

  const handleEndTrip = () => {
    toast.success("Trajet terminé !");
    navigate("/driver/trip-complete");
  };

  return (
    <Layout showNav={false}>
      <div className="min-h-screen pb-8">
        {/* Carte GPS (simulation) */}
        <div className="relative h-[50vh] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-lg font-semibold mb-2">Navigation GPS</p>
              <p className="text-sm text-muted-foreground">Conakry → Kindia</p>
              <div className="flex items-center gap-4 mt-4 justify-center">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-secondary" />
                  <span className="font-medium">{duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="font-medium">{distance}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Badge de statut */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <Badge className={tripStarted ? "bg-secondary text-secondary-foreground" : "bg-accent text-accent-foreground"}>
              {tripStarted ? "Trajet en cours" : "En attente de départ"}
            </Badge>
          </div>
        </div>

        <div className="px-6 -mt-6">
          {/* Infos du trajet */}
          <Card className="p-4 mb-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-bold">Conakry → Kindia</h2>
                <p className="text-sm text-muted-foreground">Aujourd'hui • 08:00</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">75,000 GNF</p>
                <p className="text-sm text-muted-foreground">Revenus estimés</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">{passengers.length} passagers • 3 places occupées</span>
            </div>
          </Card>

          {/* Alerte pickup */}
          {!tripStarted && (
            <Card className="p-4 mb-4 bg-accent/10 border-accent/30">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Points de ramassage</p>
                  <p className="text-sm text-muted-foreground">
                    N'oubliez pas de récupérer vos passagers aux points convenus
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Liste des passagers */}
          <div className="mb-4">
            <h3 className="font-semibold mb-3">Passagers à bord</h3>
            <div className="space-y-3">
              {passengers.map((passenger, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={passenger.avatar} />
                      <AvatarFallback>{passenger.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{passenger.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {passenger.pickupPoint}
                      </div>
                    </div>
                    <Badge variant="outline">{passenger.seats} place{passenger.seats > 1 ? "s" : ""}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Appeler
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Bouton d'action principal */}
          {!tripStarted ? (
            <Button
              size="lg"
              className="w-full"
              onClick={handleStartTrip}
            >
              <Navigation className="w-5 h-5 mr-2" />
              Démarrer le trajet
            </Button>
          ) : (
            <Button
              size="lg"
              className="w-full bg-secondary hover:bg-secondary/90"
              onClick={handleEndTrip}
            >
              Terminer le trajet
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}
