import { createContext, useContext, useState, ReactNode } from "react";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    "hero.title": "Ne voyagez plus seul,\nvoyagez mieux",
    "hero.subtitle": "La plateforme citoyenne de covoiturage en Guinée",
    "hero.cta": "Commencer",
    "nav.home": "Accueil",
    "nav.search": "Rechercher",
    "nav.rides": "Trajets",
    "nav.messages": "Messages",
    "nav.profile": "Profil",
    "theme.light": "Clair",
    "theme.dark": "Sombre",
    "language": "Langue",
  },
  en: {
    "hero.title": "Don't travel alone anymore,\ntravel better",
    "hero.subtitle": "The citizen carpooling platform in Guinea",
    "hero.cta": "Get Started",
    "nav.home": "Home",
    "nav.search": "Search",
    "nav.rides": "Rides",
    "nav.messages": "Messages",
    "nav.profile": "Profile",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "language": "Language",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("language");
    return (stored as Language) || "fr";
  });

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
