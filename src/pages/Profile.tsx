import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Star, Award, Settings, ChevronRight, History, CreditCard, Bell, HelpCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="min-h-screen pb-8">
        {/* Header with Profile Info */}
        <div className="bg-gradient-to-br from-primary via-accent to-primary p-6 pb-12">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <User className="w-10 h-10 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground">
                  Mamadou Diallo
                </h1>
                <p className="text-primary-foreground/80">+224 622 123 456</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">
              <Card className="p-3 text-center bg-card/80 backdrop-blur">
                <div className="text-2xl font-bold text-primary mb-1">12</div>
                <div className="text-xs text-muted-foreground">Trajets</div>
              </Card>
              <Card className="p-3 text-center bg-card/80 backdrop-blur">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-2xl font-bold text-accent">4.9</span>
                </div>
                <div className="text-xs text-muted-foreground">Note</div>
              </Card>
              <Card className="p-3 text-center bg-card/80 backdrop-blur">
                <div className="text-2xl font-bold text-secondary mb-1">
                  <Award className="w-8 h-8 mx-auto text-secondary" />
                </div>
                <div className="text-xs text-muted-foreground">Vérifié</div>
              </Card>
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 -mt-6">
          {/* Quick Actions */}
          <Card className="p-4 mb-6 animate-slide-up">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex flex-col h-auto py-4">
                <History className="w-5 h-5 mb-2" />
                <span className="text-sm">Historique</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-4">
                <CreditCard className="w-5 h-5 mb-2" />
                <span className="text-sm">Paiements</span>
              </Button>
            </div>
          </Card>

          {/* Badges Section */}
          <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-lg font-semibold mb-3">Mes badges</h2>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Badge className="px-4 py-2 bg-secondary text-secondary-foreground whitespace-nowrap">
                Passager vérifié
              </Badge>
              <Badge variant="outline" className="px-4 py-2 whitespace-nowrap">
                10 trajets
              </Badge>
              <Badge variant="outline" className="px-4 py-2 whitespace-nowrap">
                5★ Super passager
              </Badge>
            </div>
          </div>

          {/* Settings Menu */}
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-lg font-semibold mb-3">Paramètres</h2>
            
            <Card className="p-4 cursor-pointer hover:border-primary transition-all" onClick={() => navigate("/settings")}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                  <span>Modifier le profil</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>

            <Card className="p-4 cursor-pointer hover:border-primary transition-all" onClick={() => navigate("/settings")}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <span>Notifications</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>

            <Card className="p-4 cursor-pointer hover:border-primary transition-all" onClick={() => navigate("/settings")}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <span>Moyens de paiement</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>

            <Card className="p-4 cursor-pointer hover:border-primary transition-all" onClick={() => navigate("/settings")}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-muted-foreground" />
                  <span>Support</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>

            <Card className="p-4 cursor-pointer hover:border-destructive transition-all mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-destructive" />
                  <span className="text-destructive">Déconnexion</span>
                </div>
                <ChevronRight className="w-5 h-5 text-destructive" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
