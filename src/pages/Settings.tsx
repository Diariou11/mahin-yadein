import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { ArrowLeft, User, Bell, CreditCard, Shield, HelpCircle, Globe, FileText, Phone, History, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function Settings() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Déconnexion réussie");
      navigate("/");
    } catch (error) {
      toast.error("Erreur lors de la déconnexion");
    }
  };

  const settingsSections = [
    {
      title: "Compte",
      items: [
        { icon: User, label: "Modifier mon profil", onClick: () => toast.info("Fonctionnalité en cours de développement") },
        { icon: Globe, label: "Langue", onClick: () => toast.info("Fonctionnalité en cours de développement") },
      ]
    },
    {
      title: "Préférences de voyage",
      items: [
        { icon: FileText, label: "Préférences", onClick: () => toast.info("Fonctionnalité en cours de développement") },
      ]
    },
    {
      title: "Paiements",
      items: [
        { icon: CreditCard, label: "Moyens de paiement", onClick: () => toast.info("Fonctionnalité en cours de développement") },
        { icon: History, label: "Historique des paiements", onClick: () => toast.info("Fonctionnalité en cours de développement") },
      ]
    },
    {
      title: "Notifications",
      items: [
        { icon: Bell, label: "Gérer les notifications", onClick: () => toast.info("Fonctionnalité en cours de développement") },
      ]
    },
    {
      title: "Sécurité & Confidentialité",
      items: [
        { icon: Shield, label: "Sécurité", onClick: () => navigate("/emergency-contacts") },
        { icon: Shield, label: "Confidentialité", onClick: () => toast.info("Fonctionnalité en cours de développement") },
        { icon: FileText, label: "Documents", onClick: () => toast.info("Fonctionnalité en cours de développement") },
      ]
    },
    {
      title: "Aide & Support",
      items: [
        { icon: HelpCircle, label: "FAQ", onClick: () => toast.info("Fonctionnalité en cours de développement") },
        { icon: Phone, label: "Contacter le support", onClick: () => toast.info("Appelez le +224 XXX XXX XXX") },
      ]
    },
  ];

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
            <h1 className="text-2xl font-bold text-primary-foreground">Paramètres</h1>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 mt-6 space-y-6">
          {settingsSections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3">{section.title}</h2>
              <Card className="divide-y">
                {section.items.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    onClick={item.onClick}
                    className="w-full flex items-center gap-3 p-4 hover:bg-accent/50 transition-colors text-left"
                  >
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="flex-1">{item.label}</span>
                  </button>
                ))}
              </Card>
            </div>
          ))}

          <Card>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 p-4 hover:bg-destructive/10 transition-colors text-destructive"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
