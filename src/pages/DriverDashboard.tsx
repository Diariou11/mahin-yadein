import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp, Users, Star, Calendar, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DriverDashboard() {
  const navigate = useNavigate();

  return (
    <Layout>
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
            className="w-full mb-6 animate-pulse-glow"
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

          {/* Upcoming Rides */}
          <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-lg font-semibold mb-3">Trajets à venir</h2>
            <Card className="p-4 cursor-pointer hover:border-primary transition-all">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-semibold">Conakry → Kindia</div>
                  <div className="text-sm text-muted-foreground">Demain • 14:00</div>
                </div>
                <Badge className="bg-secondary text-secondary-foreground">3/4 places</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <div className="flex -space-x-2">
                  {["MD", "FB", "IS"].map((initial, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-semibold text-primary"
                    >
                      {initial}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">Passagers confirmés</span>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Button variant="outline" className="flex flex-col h-auto py-4">
              <Calendar className="w-5 h-5 mb-2" />
              <span className="text-sm">Historique</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-4">
              <TrendingUp className="w-5 h-5 mb-2" />
              <span className="text-sm">Statistiques</span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
