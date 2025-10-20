export const StatsSection = () => {
  const stats = [
    { value: "10 000+", label: "Trajets partagés" },
    { value: "40%", label: "D'économies" },
    { value: "95%", label: "Satisfaction" },
    { value: "2.5T", label: "CO₂ évité" },
  ];

  return (
    <section className="py-16 bg-card/50 backdrop-blur">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="animate-scale-in group cursor-default"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
