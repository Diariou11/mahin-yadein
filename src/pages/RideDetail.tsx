import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Star, Shield, Users, Phone, MessageCircle, Car } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function RideDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Layout showNav={false}>
      <div className="min-h-screen pb-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary via-accent to-primary p-6">
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-primary-foreground mb-4 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>
            <h1 className="text-2xl font-bold text-primary-foreground">
              Détails du trajet
            </h1>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 -mt-4">
          {/* Route Card */}
          <Card className="p-4 mb-6 animate-slide-up">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-semibold">Conakry</span>
              </div>
              <div className="h-8 border-l-2 border-dashed border-muted ml-2" />
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="font-semibold">Kindia</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Aujourd'hui • 14:00</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>3 places</span>
              </div>
            </div>
          </Card>

          {/* Driver Card */}
          <Card className="p-4 mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary text-xl">
                  AD
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">Amadou Diallo</span>
                    <Shield className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-semibold">4.8</span>
                    <span className="text-muted-foreground">(127 avis)</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">Conducteur vérifié</Badge>
                    <Badge variant="outline" className="text-xs">Familial</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Vehicle Card */}
          <Card className="p-4 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Car className="w-5 h-5 text-primary" />
              Véhicule
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Modèle</span>
                <span className="font-medium">Toyota Corolla 2018</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Couleur</span>
                <span className="font-medium">Gris</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Immatriculation</span>
                <span className="font-medium">CK-1234-AB</span>
              </div>
            </div>
          </Card>

          {/* Passengers Already Confirmed */}
          <Card className="p-4 mb-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h3 className="font-semibold mb-3">Passagers confirmés</h3>
            <div className="flex -space-x-2">
              {["FB", "IS"].map((initial, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-secondary/20 border-2 border-background flex items-center justify-center font-semibold text-secondary text-sm"
                >
                  {initial}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-sm text-muted-foreground">
                +1
              </div>
            </div>
          </Card>

          {/* Price */}
          <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Prix par personne</div>
                <div className="text-3xl font-bold text-primary">80 000 GNF</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-1">Économie estimée</div>
                <div className="text-lg font-semibold text-accent">-40%</div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <Button size="lg" className="w-full" onClick={() => navigate("/payment")}>
              Réserver avec Mobile Money
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="lg">
                <Phone className="mr-2 w-4 h-4" />
                Appeler
              </Button>
              <Button variant="outline" size="lg">
                <MessageCircle className="mr-2 w-4 h-4" />
                Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
