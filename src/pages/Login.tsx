import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Smartphone, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = () => {
    if (!phone || phone.length < 9) {
      toast.error("Veuillez entrer un numéro valide");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("code");
      toast.success("Code envoyé par SMS !");
    }, 1500);
  };

  const handleVerifyCode = () => {
    if (!code || code.length !== 6) {
      toast.error("Veuillez entrer le code à 6 chiffres");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Connexion réussie !");
      navigate("/home");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button
          onClick={() => step === "code" ? setStep("phone") : navigate("/")}
          className="flex items-center gap-2 text-primary-foreground mb-6 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </button>

        <Card className="p-8 animate-scale-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {step === "phone" ? "Connexion" : "Vérification"}
            </h1>
            <p className="text-muted-foreground">
              {step === "phone"
                ? "Entrez votre numéro pour vous connecter"
                : `Code envoyé au ${phone}`}
            </p>
          </div>

          {step === "phone" ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <div className="relative mt-2">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+224 622 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                    maxLength={12}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Vous recevrez un code de vérification par SMS
                </p>
              </div>

              <Button
                onClick={handleSendCode}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? "Envoi..." : "Recevoir le code"}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Pas encore de compte ? </span>
                <Link to="/signup" className="text-primary font-medium hover:underline">
                  S'inscrire
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="code">Code de vérification</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="code"
                    type="text"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    className="pl-10 text-center text-2xl tracking-widest"
                    maxLength={6}
                  />
                </div>
              </div>

              <Button
                onClick={handleVerifyCode}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? "Vérification..." : "Vérifier le code"}
              </Button>

              <Button
                variant="ghost"
                onClick={handleSendCode}
                className="w-full"
                disabled={isLoading}
              >
                Renvoyer le code
              </Button>
            </div>
          )}
        </Card>

        <p className="text-center text-sm text-primary-foreground/80 mt-6">
          En continuant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité
        </p>
      </div>
    </div>
  );
}
