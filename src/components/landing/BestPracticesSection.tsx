import { CheckCircle2 } from "lucide-react";

export const BestPracticesSection = () => {
  const passengerTips = [
    "Réservez tôt pour plus de choix",
    "Soyez ponctuel au point de rencontre",
    "Respectez les règles du conducteur",
    "Laissez un avis après le trajet",
  ];

  const driverTips = [
    "Publiez vos trajets à l'avance",
    "Respectez les horaires annoncés",
    "Communiquez clairement avec les passagers",
    "Maintenez votre véhicule propre",
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Bonnes pratiques
        </h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-primary mb-6">Passagers</h3>
            {passengerTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 animate-slide-up group" style={{ animationDelay: `${i * 0.1}s` }}>
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-foreground">{tip}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-accent mb-6">Conducteurs</h3>
            {driverTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 animate-slide-up group" style={{ animationDelay: `${i * 0.1}s` }}>
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
