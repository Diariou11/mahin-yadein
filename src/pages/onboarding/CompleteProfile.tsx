import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowRight, Camera, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/logo.svg";

export default function CompleteProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.dateOfBirth) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    toast.success("Profil complété !");
    navigate("/onboarding/verify-identity");
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <img src={logo} alt="Mahin Yadein" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Complétez votre profil</h1>
          <p className="text-muted-foreground">Étape 1 sur 5</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-muted rounded-full mb-8">
          <div className="h-full w-1/5 bg-primary rounded-full transition-all duration-500" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <Card className="p-6 text-center animate-slide-up">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <Camera className="w-8 h-8 text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Ajouter une photo de profil</p>
          </Card>

          {/* Personal Information */}
          <Card className="p-6 space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                placeholder="Mamadou"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Nom de famille *</Label>
              <Input
                id="lastName"
                placeholder="Diallo"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date de naissance *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Genre</Label>
              <select
                id="gender"
                className="w-full px-3 py-2 rounded-md border border-input bg-background"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="">Sélectionner</option>
                <option value="male">Homme</option>
                <option value="female">Femme</option>
                <option value="other">Autre</option>
              </select>
            </div>
          </Card>

          {/* Info Card */}
          <Card className="p-4 bg-accent/10 border-accent/30 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Ces informations permettent aux conducteurs de mieux vous identifier lors du trajet.
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
