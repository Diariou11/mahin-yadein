import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  TrendingUp, 
  Users, 
  Star, 
  Calendar, 
  Sparkles,
  MapPin,
  Clock,
  ChevronRight,
  Navigation,
  MessageCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProfileImage } from "@/utils/avatarHelper";

export default function DriverDashboard() {
  const navigate = useNavigate();
  const passengerName = "Aissatou Bah";
  const passengerName2 = "Ibrahima Sow";

  return (
    <Layout isDriver={true}>
      <div className="min-h-screen pb-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary via-accent to-primary p-6 pb-12">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-primary-foreground mb-2">
              Espace Conducteur
            </h1>
            <p className="text-primary-foreground/80">Gérez vos trajets facilement</p>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 -mt-8">
          {/* Revenue Card */}
          <Card className="p-6 mb-6 shadow-lg animate-slide-up bg-gradient-to-br from-secondary/20 to-primary/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Revenus cette semaine</div>
                <div className="text-4xl font-bold text-primary">450 000 GNF</div>
              </div>
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-secondary">
              <TrendingUp className="w-4 h-4" />
              <span>+25% vs semaine dernière</span>
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card className="p-4 text-center animate-scale-in">
              <div className="text-2xl font-bold text-primary mb-1">8</div>
              <div className="text-xs text-muted-foreground">Trajets</div>
            </Card>
            <Card className="p-4 text-center animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="text-2xl font-bold text-accent">4.9</span>
              </div>
              <div className="text-xs text-muted-foreground">Note</div>
            </Card>
            <Card className="p-4 text-center animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-2xl font-bold text-secondary mb-1">85%</div>
              <div className="text-xs text-muted-foreground">Taux remplissage</div>
            </Card>
          </div>

          {/* CTA Publish */}
          <Button
            size="lg"
            className="w-full mb-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            onClick={() => navigate("/publish-ride")}
          >
            <Plus className="mr-2 w-5 h-5" />
            Publier un trajet
          </Button>

          {/* AI Suggestion */}
          <Card className="p-4 mb-6 bg-accent/10 border-accent/30 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-2">Suggestion IA</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Forte demande ce week-end pour Conakry → Labé. Publiez maintenant !
                </p>
                <Button size="sm" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Publier ce trajet
                </Button>
              </div>
            </div>
          </Card>

          {/* Prochain trajet */}
          <Card className="p-4 mb-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Prochain trajet</h2>
              <Badge className="bg-secondary text-secondary-foreground">Confirmé</Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Conakry → Kindia</p>
                  <p className="text-sm text-muted-foreground">135 km</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary" />
                <p className="text-sm">Aujourd'hui à 15:00</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg mb-3">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={getProfileImage(passengerName)} />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Aissatou Bah</p>
                  <p className="text-xs text-muted-foreground">2 places</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-secondary text-secondary" />
                <span className="text-sm font-medium">4.8</span>
              </div>
            </div>

            <Button className="w-full" onClick={() => navigate("/driver/trip-in-progress")}>
              <Navigation className="w-4 h-4 mr-2" />
              Démarrer le trajet
            </Button>
          </Card>

          {/* Demandes de réservation */}
          <Card className="p-4 mb-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Demandes en attente</h2>
              <Badge variant="outline">2 nouvelles</Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={getProfileImage(passengerName2)} />
                    <AvatarFallback>IS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Ibrahima Sow</p>
                    <p className="text-sm text-muted-foreground">1 place</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={() => navigate("/driver/manage-bookings")}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Voir toutes les demandes
            </Button>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button 
              variant="outline" 
              className="flex flex-col h-auto py-4"
              onClick={() => navigate("/driver/profile")}
            >
              <Users className="w-5 h-5 mb-2" />
              <span className="text-sm">Mon profil</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col h-auto py-4"
              onClick={() => navigate("/rides")}
            >
              <Calendar className="w-5 h-5 mb-2" />
              <span className="text-sm">Historique</span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
