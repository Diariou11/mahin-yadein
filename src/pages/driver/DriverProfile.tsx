import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Star, Award, TrendingUp, MapPin, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProfileImage } from "@/utils/avatarHelper";

export default function DriverProfile() {
  const navigate = useNavigate();
  const driverName = "Mamadou Diallo";
  const profileImage = getProfileImage(driverName);

  return (
    <Layout isDriver={true}>
      <div className="min-h-screen pb-8">
        {/* Header avec photo de couverture */}
        <div className="bg-gradient-to-br from-primary via-primary/90 to-secondary h-48 relative">
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-background">
                <AvatarImage src={profileImage} />
                <AvatarFallback className="text-3xl bg-secondary text-secondary-foreground">MD</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full h-10 w-10"
                variant="secondary"
              >
                <Camera className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="px-6 pt-20">
          {/* Nom et bio */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Mamadou Diallo</h1>
            <p className="text-muted-foreground mb-4">
              Conducteur depuis 2 ans • Conakry
            </p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Conducteur fiable et ponctuel. J'aime partager mes trajets et rencontrer de nouvelles personnes.
            </p>
          </div>

          {/* Badges de confiance */}
          <Card className="p-4 mb-6">
            <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Badges de confiance</h2>
            <div className="flex flex-wrap gap-2">
              <Badge className="px-3 py-1.5 bg-secondary text-secondary-foreground">
                <Award className="w-4 h-4 mr-1" />
                Conducteur vérifié
              </Badge>
              <Badge className="px-3 py-1.5 bg-accent text-accent-foreground">
                <Star className="w-4 h-4 mr-1" />
                Super conducteur
              </Badge>
              <Badge className="px-3 py-1.5 bg-primary text-primary-foreground">
                <TrendingUp className="w-4 h-4 mr-1" />
                100 trajets
              </Badge>
              <Badge variant="outline" className="px-3 py-1.5">
                <Users className="w-4 h-4 mr-1" />
                Ponctuel
              </Badge>
            </div>
          </Card>

          {/* Statistiques principales */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-1">124</div>
              <div className="text-xs text-muted-foreground">Trajets effectués</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-secondary mb-1">4.9</div>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Star className="w-3 h-3 fill-secondary" />
                Évaluation
              </div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-accent mb-1">2.4k</div>
              <div className="text-xs text-muted-foreground">km partagés</div>
            </Card>
          </div>

          {/* Statistiques détaillées */}
          <Card className="p-4 mb-6">
            <h2 className="text-sm font-semibold mb-4 text-muted-foreground">Statistiques</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Kilomètres partagés</p>
                    <p className="text-sm text-muted-foreground">Total depuis l'inscription</p>
                  </div>
                </div>
                <div className="text-xl font-bold">2,456 km</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Passagers transportés</p>
                    <p className="text-sm text-muted-foreground">Nombre total</p>
                  </div>
                </div>
                <div className="text-xl font-bold">342</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">CO₂ économisé</p>
                    <p className="text-sm text-muted-foreground">Impact environnemental</p>
                  </div>
                </div>
                <div className="text-xl font-bold">456 kg</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Membre depuis</p>
                    <p className="text-sm text-muted-foreground">Date d'inscription</p>
                  </div>
                </div>
                <div className="text-xl font-bold">2 ans</div>
              </div>
            </div>
          </Card>

          {/* Véhicules */}
          <Card className="p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-muted-foreground">Mes véhicules</h2>
              <Button size="sm" variant="outline">Ajouter</Button>
            </div>
            <Card className="p-3 bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center">
                  🚗
                </div>
                <div className="flex-1">
                  <p className="font-medium">Toyota Corolla</p>
                  <p className="text-sm text-muted-foreground">Blanche • GN-1234-AB</p>
                </div>
                <Badge variant="outline">4 places</Badge>
              </div>
            </Card>
          </Card>

          <Button
            size="lg"
            className="w-full"
            onClick={() => navigate("/settings")}
          >
            Modifier mon profil
          </Button>
        </div>
      </div>
    </Layout>
  );
}
