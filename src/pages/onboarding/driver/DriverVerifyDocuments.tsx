import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Camera, CheckCircle2, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/logo.svg";

export default function DriverVerifyDocuments() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState({
    license: false,
    registration: false,
    insurance: false,
    identity: false,
  });

  const handleContinue = () => {
    const allUploaded = Object.values(documents).every(Boolean);
    if (!allUploaded) {
      toast.error("Veuillez télécharger tous les documents");
      return;
    }
    toast.success("Documents soumis pour vérification");
    navigate("/onboarding/driver/payment-setup");
  };

  const handleUpload = (docType: keyof typeof documents) => {
    setDocuments({ ...documents, [docType]: true });
    toast.success("Document téléchargé");
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <img src={logo} alt="Mahin Yadein" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Documents requis</h1>
          <p className="text-muted-foreground">Étape 3 sur 5</p>
        </div>

        <div className="w-full h-2 bg-muted rounded-full mb-8">
          <div className="h-full w-3/5 bg-primary rounded-full transition-all duration-500" />
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-secondary/10 border-secondary/30 animate-slide-up">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-secondary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Vérification conducteur</h3>
                <p className="text-sm text-muted-foreground">
                  Ces documents sont nécessaires pour garantir la sécurité de tous les utilisateurs
                </p>
              </div>
            </div>
          </Card>

          {/* License */}
          <Card className="p-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${documents.license ? "bg-secondary/20" : "bg-muted"} flex items-center justify-center`}>
                  {documents.license ? (
                    <CheckCircle2 className="w-6 h-6 text-secondary" />
                  ) : (
                    <FileText className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-medium">Permis de conduire</p>
                  <p className="text-xs text-muted-foreground">Recto-verso</p>
                </div>
              </div>
              {!documents.license ? (
                <Button size="sm" variant="outline" onClick={() => handleUpload("license")}>
                  <Camera className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              ) : (
                <CheckCircle2 className="w-5 h-5 text-secondary" />
              )}
            </div>
          </Card>

          {/* Registration */}
          <Card className="p-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${documents.registration ? "bg-secondary/20" : "bg-muted"} flex items-center justify-center`}>
                  {documents.registration ? (
                    <CheckCircle2 className="w-6 h-6 text-secondary" />
                  ) : (
                    <FileText className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-medium">Carte grise</p>
                  <p className="text-xs text-muted-foreground">Document du véhicule</p>
                </div>
              </div>
              {!documents.registration ? (
                <Button size="sm" variant="outline" onClick={() => handleUpload("registration")}>
                  <Camera className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              ) : (
                <CheckCircle2 className="w-5 h-5 text-secondary" />
              )}
            </div>
          </Card>

          {/* Insurance */}
          <Card className="p-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${documents.insurance ? "bg-secondary/20" : "bg-muted"} flex items-center justify-center`}>
                  {documents.insurance ? (
                    <CheckCircle2 className="w-6 h-6 text-secondary" />
                  ) : (
                    <FileText className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-medium">Assurance</p>
                  <p className="text-xs text-muted-foreground">En cours de validité</p>
                </div>
              </div>
              {!documents.insurance ? (
                <Button size="sm" variant="outline" onClick={() => handleUpload("insurance")}>
                  <Camera className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              ) : (
                <CheckCircle2 className="w-5 h-5 text-secondary" />
              )}
            </div>
          </Card>

          {/* Identity */}
          <Card className="p-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${documents.identity ? "bg-secondary/20" : "bg-muted"} flex items-center justify-center`}>
                  {documents.identity ? (
                    <CheckCircle2 className="w-6 h-6 text-secondary" />
                  ) : (
                    <FileText className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-medium">Pièce d'identité</p>
                  <p className="text-xs text-muted-foreground">CNI ou Passeport</p>
                </div>
              </div>
              {!documents.identity ? (
                <Button size="sm" variant="outline" onClick={() => handleUpload("identity")}>
                  <Camera className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              ) : (
                <CheckCircle2 className="w-5 h-5 text-secondary" />
              )}
            </div>
          </Card>

          <Card className="p-4 bg-accent/10 border-accent/30 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <p className="text-sm text-muted-foreground text-center">
              Vos documents seront vérifiés sous 24-48h. Vous recevrez une notification.
            </p>
          </Card>

          <Button
            size="lg"
            className="w-full animate-slide-up"
            style={{ animationDelay: "0.6s" }}
            onClick={handleContinue}
          >
            Continuer
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
