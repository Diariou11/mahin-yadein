import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, Wallet, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/logo.svg";

export default function DriverPaymentSetup() {
  const navigate = useNavigate();
  const [operator, setOperator] = useState("orange");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast.error("Veuillez entrer votre numéro");
      return;
    }
    toast.success("Compte de paiement configuré");
    navigate("/onboarding/driver/tutorial");
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <img src={logo} alt="Mahin Yadein" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Recevoir vos paiements</h1>
          <p className="text-muted-foreground">Étape 4 sur 5</p>
        </div>

        <div className="w-full h-2 bg-muted rounded-full mb-8">
          <div className="h-full w-4/5 bg-primary rounded-full transition-all duration-500" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-secondary/20 to-primary/20 animate-slide-up">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Revenus estimés</h3>
                <div className="text-3xl font-bold text-primary mb-2">350k - 800k GNF</div>
                <p className="text-sm text-muted-foreground">
                  Par mois selon votre activité
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              Compte Mobile Money
            </h3>
            <RadioGroup value={operator} onValueChange={setOperator}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="orange" id="orange" />
                  <Label htmlFor="orange" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">🟠</div>
                      <div>
                        <p className="font-medium">Orange Money</p>
                        <p className="text-xs text-muted-foreground">Retraits instantanés</p>
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="mtn" id="mtn" />
                  <Label htmlFor="mtn" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">🟡</div>
                      <div>
                        <p className="font-medium">MTN Mobile Money</p>
                        <p className="text-xs text-muted-foreground">Transferts rapides</p>
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="paycard" id="paycard" />
                  <Label htmlFor="paycard" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">💳</div>
                      <div>
                        <p className="font-medium">Compte bancaire</p>
                        <p className="text-xs text-muted-foreground">Virements hebdomadaires</p>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </Card>

          <Card className="p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Numéro de compte *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+224 622 123 456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  C'est sur ce compte que vous recevrez vos paiements
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-accent/10 border-accent/30 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h3 className="font-semibold mb-3">Avantages</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Paiements automatiques après chaque trajet</li>
              <li>✓ Pas de frais de retrait</li>
              <li>✓ Historique détaillé de tous vos gains</li>
              <li>✓ Protection contre les impayés</li>
            </ul>
          </Card>

          <Button
            type="submit"
            size="lg"
            className="w-full animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            Continuer
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
