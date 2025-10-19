import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Navigation, Phone, MessageCircle, Share2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Tracking() {
  const navigate = useNavigate();

  return (
    <Layout showNav={false}>
      <div className="min-h-screen">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 p-6">
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-foreground bg-background/90 backdrop-blur px-4 py-2 rounded-full hover:bg-background transition-colors shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="h-[60vh] bg-muted relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <Navigation className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
              <p className="text-lg font-semibold mb-2">Carte interactive</p>
              <p className="text-sm text-muted-foreground">
                Position en temps réel du conducteur
              </p>
            </div>
          </div>
        </div>

        {/* Driver Info Card */}
        <div className="relative z-10 -mt-6 px-6 pb-8">
          <Card className="p-4 shadow-xl animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary">
                  AD
                </div>
                <div>
                  <div className="font-semibold">Amadou Diallo</div>
                  <div className="text-sm text-muted-foreground">Toyota Corolla • CK-1234-AB</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">12 min</div>
                <div className="text-xs text-muted-foreground">ETA</div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-secondary/10 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">En route vers vous</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Le conducteur a démarré son trajet
              </p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="flex flex-col h-auto py-3">
                <Phone className="w-5 h-5 mb-1" />
                <span className="text-xs">Appeler</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-3">
                <MessageCircle className="w-5 h-5 mb-1" />
                <span className="text-xs">Message</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-3">
                <Share2 className="w-5 h-5 mb-1" />
                <span className="text-xs">Partager</span>
              </Button>
            </div>
          </Card>

          {/* Trip Details */}
          <Card className="p-4 mt-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="font-semibold mb-3">Détails du trajet</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Point de rencontre</span>
                <span className="font-medium">Gare de Matam</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Heure de départ</span>
                <span className="font-medium">14:00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Arrivée prévue</span>
                <span className="font-medium">15:30</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
