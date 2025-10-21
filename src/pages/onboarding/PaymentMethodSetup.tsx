import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, CreditCard, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/logo.svg";

export default function PaymentMethodSetup() {
  const navigate = useNavigate();
  const [operator, setOperator] = useState("orange");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast.error("Veuillez entrer votre numéro de téléphone");
      return;
    }
    toast.success("Méthode de paiement ajoutée");
    navigate("/onboarding/travel-preferences");
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <img src={logo} alt="Mahin Yadein" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Méthode de paiement</h1>
          <p className="text-muted-foreground">Étape 3 sur 5</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-muted rounded-full mb-8">
          <div className="h-full w-3/5 bg-primary rounded-full transition-all duration-500" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Security Info */}
          <Card className="p-4 bg-secondary/10 border-secondary/30 animate-slide-up">
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">Paiements sécurisés</p>
                <p className="text-muted-foreground">
                  Ajoutez votre méthode de paiement préférée pour réserver rapidement vos trajets
                </p>
              </div>
            </div>
          </Card>

          {/* Operator Selection */}
          <Card className="p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-primary" />
              Opérateur Mobile Money
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
                        <p className="text-xs text-muted-foreground">Le plus populaire en Guinée</p>
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
                        <p className="text-xs text-muted-foreground">Paiements instantanés</p>
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
                        <p className="font-medium">PayCard</p>
                        <p className="text-xs text-muted-foreground">Carte bancaire</p>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </Card>

          {/* Phone Number */}
          <Card className="p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Numéro de téléphone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+224 622 123 456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Ce numéro sera utilisé pour tous vos paiements
                </p>
              </div>
            </div>
          </Card>

          {/* Benefits */}
          <Card className="p-6 bg-accent/10 border-accent/30 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h3 className="font-semibold mb-3">Avantages</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Paiements instantanés et sécurisés</li>
              <li>✓ Pas de frais cachés</li>
              <li>✓ Remboursement automatique en cas d'annulation</li>
              <li>✓ Historique de toutes vos transactions</li>
            </ul>
          </Card>

          <div className="flex gap-3 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => navigate("/onboarding/travel-preferences")}
              type="button"
            >
              Passer
            </Button>
            <Button
              type="submit"
              size="lg"
              className="flex-1"
            >
              Continuer
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
