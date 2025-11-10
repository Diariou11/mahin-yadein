import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
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
          <Link to="/login">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
              Devenir Passager <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
              Devenir Conducteur <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
