import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, User, Smartphone, Mail, Camera } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");
  const [step, setStep] = useState<"role" | "info" | "phone" | "code">(typeParam ? "info" : "role");
  const [role, setRole] = useState<"passenger" | "driver">(
    typeParam === "driver" ? "driver" : "passenger"
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    code: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (step === "role") {
      setStep("info");
    } else if (step === "info") {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        toast.error("Veuillez remplir tous les champs");
        return;
      }
      setStep("phone");
    } else if (step === "phone") {
      if (!formData.phone || formData.phone.length < 9) {
        toast.error("Veuillez entrer un numéro valide");
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep("code");
        toast.success("Code envoyé par SMS !");
      }, 1500);
    } else if (step === "code") {
      if (!formData.code || formData.code.length !== 6) {
        toast.error("Veuillez entrer le code à 6 chiffres");
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Store user role in localStorage
        localStorage.setItem("userRole", role);
        localStorage.setItem("userPhone", formData.phone);
        toast.success("Compte créé avec succès !");
        if (role === "passenger") {
          navigate("/onboarding/complete-profile");
        } else {
          navigate("/onboarding/driver/complete-profile");
        }
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step === "code") setStep("phone");
    else if (step === "phone") setStep("info");
    else if (step === "info") setStep("role");
    else navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-primary-foreground mb-6 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </button>

        <Card className="p-8 animate-scale-in">
          {/* Progress Indicator */}
          <div className="flex gap-2 mb-8">
            {["role", "info", "phone", "code"].map((s, i) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full transition-all ${
                  ["role", "info", "phone", "code"].indexOf(step) >= i
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Role Selection */}
          {step === "role" && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">Bienvenue !</h1>
                <p className="text-muted-foreground">Comment souhaitez-vous utiliser l'app ?</p>
              </div>

              <RadioGroup value={role} onValueChange={(v) => setRole(v as "passenger" | "driver")}>
                <div
                  className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    role === "passenger" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => setRole("passenger")}
                >
                  <RadioGroupItem value="passenger" id="passenger" />
                  <Label htmlFor="passenger" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Passager</div>
                    <div className="text-sm text-muted-foreground">
                      Je recherche des trajets
                    </div>
                  </Label>
                </div>

                <div
                  className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    role === "driver" ? "border-accent bg-accent/5" : "border-border"
                  }`}
                  onClick={() => setRole("driver")}
                >
                  <RadioGroupItem value="driver" id="driver" />
                  <Label htmlFor="driver" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Conducteur</div>
                    <div className="text-sm text-muted-foreground">
                      Je propose des trajets
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              <Button onClick={handleNext} className="w-full" size="lg">
                Continuer
              </Button>
            </div>
          )}

          {/* Personal Info */}
          {step === "info" && (
            <div className="space-y-6">
              <div className="text-center">
                <Badge
                  variant={role === "passenger" ? "default" : "secondary"}
                  className="mb-4"
                >
                  {role === "passenger" ? "Passager" : "Conducteur"}
                </Badge>
                <h1 className="text-2xl font-bold mb-2">Vos informations</h1>
                <p className="text-muted-foreground">Pour créer votre profil</p>
              </div>

              <div className="flex justify-center">
                <button className="relative group">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <User className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder="Mamadou"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder="Diallo"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="mamadou@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleNext} className="w-full" size="lg">
                Continuer
              </Button>
            </div>
          )}

          {/* Phone Verification */}
          {step === "phone" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Votre numéro</h1>
                <p className="text-muted-foreground">
                  Pour sécuriser votre compte
                </p>
              </div>

              <div>
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <div className="relative mt-2">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+224 622 123 456"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="pl-10"
                    maxLength={12}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Vous recevrez un code de vérification par SMS
                </p>
              </div>

              <Button
                onClick={handleNext}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? "Envoi..." : "Recevoir le code"}
              </Button>
            </div>
          )}

          {/* Code Verification */}
          {step === "code" && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">Vérification</h1>
                <p className="text-muted-foreground">
                  Code envoyé au {formData.phone}
                </p>
              </div>

              <div>
                <Label htmlFor="code">Code de vérification</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="000000"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      code: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  className="text-center text-2xl tracking-widest mt-2"
                  maxLength={6}
                />
              </div>

              <Button
                onClick={handleNext}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? "Vérification..." : "Créer mon compte"}
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    toast.success("Code renvoyé !");
                  }, 1500);
                }}
                className="w-full"
                disabled={isLoading}
              >
                Renvoyer le code
              </Button>
            </div>
          )}

          <div className="text-center text-sm mt-6">
            <span className="text-muted-foreground">Déjà un compte ? </span>
            <Link to="/login" className="text-primary font-medium hover:underline">
              Se connecter
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
