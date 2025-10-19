import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

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

        <div className="max-w-lg mx-auto px-6 mt-6">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Page en construction</p>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
