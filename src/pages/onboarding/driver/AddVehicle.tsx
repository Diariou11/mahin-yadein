import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowRight, Car, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/logo.svg";

export default function AddVehicle() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    licensePlate: "",
    seats: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.make || !formData.model || !formData.licensePlate) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    toast.success("Véhicule ajouté !");
    navigate("/onboarding/driver/verify-documents");
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <img src={logo} alt="Mahin Yadein" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Votre véhicule</h1>
          <p className="text-muted-foreground">Étape 2 sur 5</p>
        </div>

        <div className="w-full h-2 bg-muted rounded-full mb-8">
          <div className="h-full w-2/5 bg-primary rounded-full transition-all duration-500" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6 animate-slide-up">
            <h3 className="font-semibold mb-4">Photos du véhicule</h3>
            <div className="grid grid-cols-2 gap-3">
              {["Avant", "Arrière", "Intérieur", "Côté"].map((label, i) => (
                <div key={i} className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer flex flex-col items-center justify-center">
                  <Camera className="w-6 h-6 text-muted-foreground mb-2" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="space-y-2">
              <Label htmlFor="make">Marque *</Label>
              <Input
                id="make"
                placeholder="Toyota"
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Modèle *</Label>
              <Input
                id="model"
                placeholder="Corolla"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="year">Année</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="2018"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Couleur</Label>
                <Input
                  id="color"
                  placeholder="Gris"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="licensePlate">Plaque d'immatriculation *</Label>
              <Input
                id="licensePlate"
                placeholder="CK-1234-AB"
                value={formData.licensePlate}
                onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seats">Nombre de places disponibles</Label>
              <Input
                id="seats"
                type="number"
                placeholder="4"
                min="1"
                max="8"
                value={formData.seats}
                onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
              />
            </div>
          </Card>

          <Card className="p-4 bg-accent/10 border-accent/30 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-start gap-3">
              <Car className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Les véhicules avec photos obtiennent 3x plus de réservations
              </p>
            </div>
          </Card>

          <Button
            type="submit"
            size="lg"
            className="w-full animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            Continuer
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
