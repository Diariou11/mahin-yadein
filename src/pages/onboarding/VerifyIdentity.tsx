import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Camera, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/logo.svg";

export default function VerifyIdentity() {
  const navigate = useNavigate();
  const [documentUploaded, setDocumentUploaded] = useState(false);

  const handleContinue = () => {
    if (!documentUploaded) {
      toast.error("Veuillez télécharger votre pièce d'identité");
      return;
    }
    toast.success("Document soumis pour vérification");
    navigate("/onboarding/payment-method");
  };

  const handleUpload = () => {
    // Simulate upload
    setDocumentUploaded(true);
    toast.success("Document téléchargé avec succès");
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <img src={logo} alt="Mahin Yadein" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Vérification d'identité</h1>
          <p className="text-muted-foreground">Étape 2 sur 5</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-muted rounded-full mb-8">
          <div className="h-full w-2/5 bg-primary rounded-full transition-all duration-500" />
        </div>

        <div className="space-y-6">
          {/* Security Info */}
          <Card className="p-6 bg-secondary/10 border-secondary/30 animate-slide-up">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-secondary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Pourquoi vérifier votre identité ?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Sécurité accrue pour tous les utilisateurs</li>
                  <li>• Confiance entre conducteurs et passagers</li>
                  <li>• Protection contre les fraudes</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Document Types */}
          <Card className="p-6 space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="font-semibold mb-3">Documents acceptés</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Carte nationale d'identité</p>
                    <p className="text-xs text-muted-foreground">Format numérique ou photo claire</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
              <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Passeport</p>
                    <p className="text-xs text-muted-foreground">Pages avec photo et informations</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
              <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Permis de conduire</p>
                    <p className="text-xs text-muted-foreground">Photo claire recto-verso</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </Card>

          {/* Upload Card */}
          <Card className="p-8 text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {!documentUploaded ? (
              <>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform" onClick={handleUpload}>
                  <Camera className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Télécharger votre document</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Prenez une photo claire de votre pièce d'identité
                </p>
                <Button variant="outline" onClick={handleUpload}>
                  Choisir un fichier
                </Button>
              </>
            ) : (
              <>
                <div className="w-20 h-20 rounded-full bg-secondary/20 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2 text-secondary">Document téléchargé</h3>
                <p className="text-sm text-muted-foreground">
                  Votre document sera vérifié sous 24h
                </p>
              </>
            )}
          </Card>

          {/* Info */}
          <Card className="p-4 bg-accent/10 border-accent/30 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <p className="text-sm text-muted-foreground text-center">
              Vos documents sont cryptés et stockés en toute sécurité. Ils ne seront jamais partagés avec des tiers.
            </p>
          </Card>

          <div className="flex gap-3 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => navigate("/onboarding/payment-method")}
            >
              Passer
            </Button>
            <Button
              size="lg"
              className="flex-1"
              onClick={handleContinue}
            >
              Continuer
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
