import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { signIn, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      toast.error(error.message || "Erreur de connexion");
      setIsLoading(false);
    } else {
      toast.success("Connexion réussie !");
      // Navigation handled by useEffect
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-primary-foreground mb-6 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </button>

        <Card className="p-8 animate-scale-in">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Connexion</h1>
            <p className="text-muted-foreground">
              Connectez-vous à votre compte
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Pas encore de compte ? </span>
              <Link to="/signup" className="text-primary font-medium hover:underline">
                S'inscrire
              </Link>
            </div>
          </form>
        </Card>

        <p className="text-center text-sm text-primary-foreground/80 mt-6">
          En continuant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité
        </p>
      </div>
    </div>
  );
}
