import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Star, Award, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const TIER_INFO = {
  bronze: { name: "Bronze", min: 0, max: 50, color: "text-orange-600", next: "silver" },
  silver: { name: "Argent", min: 51, max: 150, color: "text-gray-400", next: "gold" },
  gold: { name: "Or", min: 151, max: 500, color: "text-yellow-500", next: "platinum" },
  platinum: { name: "Platine", min: 501, max: 9999, color: "text-blue-400", next: null },
};

export default function Loyalty() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [tier, setTier] = useState<keyof typeof TIER_INFO>("bronze");
  const [badges, setBadges] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchLoyaltyData();
      fetchBadges();
    }
  }, [user]);

  const fetchLoyaltyData = async () => {
    const { data, error } = await supabase
      .from("loyalty_points")
      .select("*")
      .eq("user_id", user?.id)
      .single();

    if (error && error.code !== "PGRST116") {
      toast.error("Erreur lors du chargement des points");
      return;
    }

    if (data) {
      setPoints(data.points);
      setTier(data.tier);
    } else {
      // Create initial loyalty record
      await supabase.from("loyalty_points").insert({
        user_id: user?.id,
        points: 0,
        tier: "bronze",
      });
    }
  };

  const fetchBadges = async () => {
    const { data } = await supabase
      .from("user_badges")
      .select(`
        *,
        badges (*)
      `)
      .eq("user_id", user?.id);

    setBadges(data || []);
  };

  const currentTier = TIER_INFO[tier];
  const nextTier = currentTier.next ? TIER_INFO[currentTier.next as keyof typeof TIER_INFO] : null;
  const progress = nextTier 
    ? ((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100
    : 100;

  return (
    <Layout showNav={false}>
      <div className="min-h-screen pb-8">
        <div className="bg-gradient-to-br from-primary via-accent to-primary p-6">
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-primary-foreground mb-4 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>
            <h1 className="text-2xl font-bold text-primary-foreground">Programme de fidélité</h1>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 mt-6 space-y-6">
          {/* Points Card */}
          <Card className="p-6 text-center">
            <Trophy className={`w-16 h-16 mx-auto mb-4 ${currentTier.color}`} />
            <h2 className="text-3xl font-bold mb-2">{points} points</h2>
            <Badge className={currentTier.color}>{currentTier.name}</Badge>
            
            {nextTier && (
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Prochain niveau: {nextTier.name}</span>
                  <span>{nextTier.min - points} points</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </Card>

          {/* Rewards */}
          <div>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Récompenses disponibles
            </h2>
            <div className="space-y-3">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Réduction de 10%</h3>
                    <p className="text-sm text-muted-foreground">Sur votre prochain trajet</p>
                  </div>
                  <Badge variant="secondary">50 pts</Badge>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Trajet gratuit</h3>
                    <p className="text-sm text-muted-foreground">Jusqu'à 20 000 GNF</p>
                  </div>
                  <Badge variant="secondary">200 pts</Badge>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Priorité réservation</h3>
                    <p className="text-sm text-muted-foreground">1 mois</p>
                  </div>
                  <Badge variant="secondary">150 pts</Badge>
                </div>
              </Card>
            </div>
          </div>

          {/* Badges */}
          <div>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Mes badges ({badges.length})
            </h2>
            {badges.length === 0 ? (
              <Card className="p-8 text-center">
                <Star className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Effectuez des trajets pour gagner des badges !</p>
              </Card>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {badges.map((userBadge) => (
                  <Card key={userBadge.id} className="p-4 text-center">
                    <div className="text-3xl mb-2">{userBadge.badges.icon || "🏆"}</div>
                    <p className="text-xs font-medium">{userBadge.badges.name}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* How to earn points */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Comment gagner des points ?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Effectuer un trajet : +10 points</li>
              <li>• Parrainer un ami : +50 points</li>
              <li>• Laisser un avis : +5 points</li>
              <li>• Trajet en covoiturage : +15 points</li>
            </ul>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
