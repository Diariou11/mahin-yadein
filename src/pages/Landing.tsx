import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { BestPracticesSection } from "@/components/landing/BestPracticesSection";
import { CTASection } from "@/components/landing/CTASection";
import logo from "@/assets/logo.svg";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Top Header with Language and Theme */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border shadow-sm safe-top">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <img 
              src={logo} 
              alt="Mahin Yadein" 
              className="h-12 sm:h-14 cursor-pointer animate-float hover:scale-105 transition-transform" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <HeroSection />
      <StatsSection />
      <FeaturesSection type="passenger" />
      <FeaturesSection type="driver" />
      <BestPracticesSection />
      <CTASection />
    </div>
  );
}
