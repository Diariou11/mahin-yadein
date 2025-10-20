import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import heroImage from "@/assets/hero-covoiturage.jpg";

export const HeroSection = () => {
  return (
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
        <p className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance">
          La plateforme citoyenne de covoiturage en Guinée
        </p>
        
        {/* Choice Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
          {/* Driver Option */}
          <Link to="/signup?type=driver" className="group">
            <div className="relative bg-gradient-to-br from-accent/20 via-accent/10 to-background border-2 border-accent/30 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20 hover:border-accent animate-fade-in overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-accent/20">
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
            <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background border-2 border-primary/30 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary animate-fade-in overflow-hidden backdrop-blur-sm" style={{ animationDelay: "0.1s" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/20">
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
  );
};
