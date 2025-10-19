import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Wallet, TrendingDown, Leaf, CheckCircle2, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import heroImage from "@/assets/hero-covoiturage.jpg";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Top Header with Language and Theme */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Covoiturage Guinée
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center animate-fade-in">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-float">
            Ne voyagez plus seul,<br />voyagez mieux
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            La plateforme citoyenne de covoiturage en Guinée
          </p>
          
          {/* Choice Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
            {/* Driver Option */}
            <Link to="/signup?type=driver" className="group">
              <div className="relative bg-gradient-to-br from-accent/20 via-accent/10 to-background border-2 border-accent/30 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20 hover:border-accent animate-fade-in overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Users className="w-8 h-8 md:w-10 md:h-10 text-accent" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors duration-300">
                    Je suis propriétaire<br />d'un véhicule
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-6">
                    Gagnez de l'argent en partageant vos trajets
                  </p>
                  <div className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all duration-300">
                    Commencer <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Passenger Option */}
            <Link to="/signup?type=passenger" className="group">
              <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background border-2 border-primary/30 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary animate-fade-in overflow-hidden" style={{ animationDelay: "0.1s" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Users className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    Je suis à la recherche<br />d'un véhicule
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-6">
                    Voyagez moins cher et plus écologique
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all duration-300">
                    Commencer <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup?type=passenger">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 animate-pulse-glow">
                Devenir Passager <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link to="/signup?type=driver">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 animate-pulse-glow">
                Devenir Conducteur <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
