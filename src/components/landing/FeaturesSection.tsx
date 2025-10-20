import { Clock, Wallet, Users, Star, CheckCircle2, LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface FeaturesSectionProps {
  type: "passenger" | "driver";
}

export const FeaturesSection = ({ type }: FeaturesSectionProps) => {
  const passengerFeatures: Feature[] = [
    { icon: Clock, title: "Recherche rapide", desc: "Trouvez un trajet en quelques secondes" },
    { icon: Wallet, title: "Paiement Mobile Money", desc: "Orange, MTN, PayCard acceptés" },
    { icon: Users, title: "Suivi temps réel", desc: "Suivez votre conducteur en direct" },
    { icon: Star, title: "Avis vérifiés", desc: "Voyagez en toute confiance" },
  ];

  const driverFeatures: Feature[] = [
    { icon: Clock, title: "Publication en 30s", desc: "Créez un trajet rapidement" },
    { icon: Users, title: "Suggestions IA", desc: "Trouvez les meilleurs passagers" },
    { icon: Wallet, title: "Revenus garantis", desc: "Paiements sécurisés" },
    { icon: CheckCircle2, title: "Badges fiabilité", desc: "Devenez conducteur vérifié" },
  ];

  const features = type === "passenger" ? passengerFeatures : driverFeatures;
  const color = type === "passenger" ? "primary" : "accent";
  const title = type === "passenger" ? "Passagers" : "Conducteurs";

  return (
    <section className={type === "driver" ? "py-20 bg-card/30" : "py-20"}>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Pour les <span className={`text-${color}`}>{title}</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className={`bg-card p-6 rounded-2xl border border-border hover:border-${color} transition-all duration-300 hover:scale-105 animate-fade-in group cursor-default`} 
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <feature.icon className={`w-12 h-12 text-${color} mb-4 group-hover:scale-110 transition-transform duration-300`} />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
