import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Share2, MapPin, Clock, User, Car, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();

  const handleShare = () => {
    const text = `J'ai réservé mon trajet Conakry → Kindia pour aujourd'hui à 14:00 via Covoiturage Guinée !`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert("Lien copié !");
    }
  };

  return (
    <Layout showNav={false}>
      <div className="min-h-screen pb-8 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Success Icon */}
          <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mb-6 animate-scale-in">
            <CheckCircle2 className="w-12 h-12 text-secondary" />
          </div>

          <h1 className="text-3xl font-bold text-center mb-3 animate-fade-in">
            Réservation confirmée !
          </h1>
          <p className="text-muted-foreground text-center mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Vous allez recevoir un SMS de confirmation
          </p>

          {/* Receipt */}
          <Card className="w-full max-w-md p-6 mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="font-semibold mb-4">Votre reçu</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Trajet</div>
                  <div className="font-medium">Conakry → Kindia</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Date et heure</div>
                  <div className="font-medium">Aujourd'hui • 14:00</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Conducteur</div>
                  <div className="font-medium">Amadou Diallo • 4.8★</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Car className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Véhicule</div>
                  <div className="font-medium">Toyota Corolla • CK-1234-AB</div>
                </div>
              </div>
              <div className="pt-3 border-t border-border flex justify-between items-center">
                <span className="font-semibold">Prix payé</span>
                <span className="text-2xl font-bold text-primary">80 000 GNF</span>
              </div>
            </div>
          </Card>

          {/* AI Suggestion */}
          <Card className="w-full max-w-md p-4 mb-6 bg-accent/10 border-accent/30 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-2">Suggestion IA</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Pensez à réserver votre trajet retour pour dimanche ?
                </p>
                <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Réserver le retour
                </Button>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="w-full max-w-md space-y-3 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" variant="outline" className="w-full" onClick={handleShare}>
              <Share2 className="mr-2 w-4 h-4" />
              Partager mon reçu
            </Button>
            <Button size="lg" className="w-full" onClick={() => navigate("/tracking")}>
              Suivre mon trajet
            </Button>
            <Button size="lg" variant="ghost" className="w-full" onClick={() => navigate("/home")}>
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
