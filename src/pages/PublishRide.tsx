import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin, Calendar, Clock, Users, DollarSign, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export default function PublishRide() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("3");
  const [price, setPrice] = useState("80000");

  const handlePublish = () => {
    if (!from || !to || !date || !time) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    toast.success("Trajet publié avec succès !");
    setTimeout(() => {
      navigate("/driver-dashboard");
    }, 1500);
  };

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
              Publier un trajet
            </h1>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 mt-6">
          {/* Form */}
          <Card className="p-4 mb-6 animate-slide-up">
            <div className="space-y-4">
              <div>
                <Label htmlFor="from" className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Départ
                </Label>
                <Input
                  id="from"
                  placeholder="Ex: Conakry"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="to" className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  Arrivée
                </Label>
                <Input
                  id="to"
                  placeholder="Ex: Kindia"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="date" className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    Heure
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="seats" className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  Nombre de places
                </Label>
                <Input
                  id="seats"
                  type="number"
                  min="1"
                  max="7"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="price" className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  Prix par personne (GNF)
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="80000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* AI Price Suggestion */}
          <Card className="p-4 mb-6 bg-accent/10 border-accent/30 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-2">Prix recommandé par l'IA</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Basé sur la distance et la demande actuelle, nous recommandons <span className="font-semibold text-accent">80 000 GNF</span> par personne.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setPrice("80000")}
                >
                  Utiliser ce prix
                </Button>
              </div>
            </div>
          </Card>

          {/* Revenue Estimate */}
          <Card className="p-4 mb-6 bg-secondary/10 border-secondary/30 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Gain estimé</div>
              <div className="text-3xl font-bold text-secondary">
                {(parseInt(price || "0") * parseInt(seats || "0")).toLocaleString()} GNF
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Si toutes les places sont réservées
              </div>
            </div>
          </Card>

          {/* Publish Button */}
          <Button
            size="lg"
            className="w-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            onClick={handlePublish}
          >
            Publier le trajet
          </Button>
        </div>
      </div>
    </Layout>
  );
}
