import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Wallet, TrendingDown, Leaf, CheckCircle2, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-covoiturage.jpg";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-float">
            Ne voyagez plus seul,<br />voyagez mieux
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            La plateforme citoyenne de covoiturage en Guinée
          </p>
          <Link to="/onboarding-passenger">
            <Button size="lg" className="text-lg px-8 py-6 animate-pulse-glow">
              Commencer <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50 backdrop-blur">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-scale-in">
              <div className="text-4xl font-bold text-primary mb-2">10 000+</div>
              <div className="text-muted-foreground">Trajets partagés</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl font-bold text-primary mb-2">40%</div>
              <div className="text-muted-foreground">D'économies</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Satisfaction</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-4xl font-bold text-primary mb-2">2.5T</div>
              <div className="text-muted-foreground">CO₂ évité</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Pour les <span className="text-primary">Passagers</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: "Recherche rapide", desc: "Trouvez un trajet en quelques secondes" },
              { icon: Wallet, title: "Paiement Mobile Money", desc: "Orange, MTN, Cellcom acceptés" },
              { icon: Users, title: "Suivi temps réel", desc: "Suivez votre conducteur en direct" },
              { icon: Star, title: "Avis vérifiés", desc: "Voyagez en toute confiance" },
            ].map((feature, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl border border-border hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Driver Features */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Pour les <span className="text-accent">Conducteurs</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: "Publication en 30s", desc: "Créez un trajet rapidement" },
              { icon: Users, title: "Suggestions IA", desc: "Trouvez les meilleurs passagers" },
              { icon: Wallet, title: "Revenus garantis", desc: "Paiements sécurisés" },
              { icon: CheckCircle2, title: "Badges fiabilité", desc: "Devenez conducteur vérifié" },
            ].map((feature, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl border border-border hover:border-accent transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <feature.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Bonnes pratiques
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary mb-6">Passagers</h3>
              {[
                "Réservez tôt pour plus de choix",
                "Soyez ponctuel au point de rencontre",
                "Respectez les règles du conducteur",
                "Laissez un avis après le trajet",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">{tip}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-accent mb-6">Conducteurs</h3>
              {[
                "Publiez vos trajets à l'avance",
                "Respectez les horaires annoncés",
                "Communiquez clairement avec les passagers",
                "Maintenez votre véhicule propre",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <p className="text-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-accent to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
            Prêt à voyager mieux ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Rejoignez la communauté du covoiturage en Guinée
          </p>
          <Link to="/onboarding-passenger">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 animate-pulse-glow">
              Télécharger l'app <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
