import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, CreditCard, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export default function Payment() {
  const navigate = useNavigate();
  const [operator, setOperator] = useState("orange");
  const [phone, setPhone] = useState("");

  const handlePayment = () => {
    if (!phone) {
      toast.error("Veuillez entrer votre numéro de téléphone");
      return;
    }
    toast.success("Paiement confirmé ! Vous allez recevoir un SMS.");
    setTimeout(() => {
      navigate("/confirmation");
    }, 1500);
  };

  return (
    <Layout showNav={false}>
      <div className="min-h-screen pb-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary via-accent to-primary p-6">
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-primary-foreground mb-4 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>
            <h1 className="text-2xl font-bold text-primary-foreground">
              Paiement Mobile Money
            </h1>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 mt-6">
          {/* Trip Summary */}
          <Card className="p-4 mb-6 animate-slide-up">
            <h3 className="font-semibold mb-3">Récapitulatif</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trajet</span>
                <span className="font-medium">Conakry → Kindia</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">Aujourd'hui • 14:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Conducteur</span>
                <span className="font-medium">Amadou Diallo</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">80 000 GNF</span>
              </div>
            </div>
          </Card>

          {/* Payment Method */}
          <Card className="p-4 mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-primary" />
              Opérateur Mobile Money
            </h3>
            <RadioGroup value={operator} onValueChange={setOperator}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="orange" id="orange" />
                  <Label htmlFor="orange" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">🟠</div>
                      <span className="font-medium">Orange Money</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="mtn" id="mtn" />
                  <Label htmlFor="mtn" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">🟡</div>
                      <span className="font-medium">MTN Mobile Money</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="cellcom" id="cellcom" />
                  <Label htmlFor="cellcom" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">🔵</div>
                      <span className="font-medium">Cellcom</span>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </Card>

          {/* Phone Number */}
          <Card className="p-4 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Label htmlFor="phone" className="mb-2 block">
              Numéro de téléphone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+224 622 123 456"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Vous recevrez un code de confirmation par SMS
            </p>
          </Card>

          {/* Security Notice */}
          <Card className="p-4 mb-6 bg-secondary/10 border-secondary/30 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">Paiement sécurisé</p>
                <p className="text-muted-foreground">
                  Vos données de paiement sont protégées et cryptées
                </p>
              </div>
            </div>
          </Card>

          {/* Confirm Button */}
          <Button
            size="lg"
            className="w-full animate-slide-up"
            style={{ animationDelay: "0.4s" }}
            onClick={handlePayment}
          >
            Confirmer le paiement • 80 000 GNF
          </Button>
        </div>
      </div>
    </Layout>
  );
}
