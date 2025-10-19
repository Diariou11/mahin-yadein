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
    
    // Landing page
    "landing.stats.rides": "Trajets partagés",
    "landing.stats.savings": "D'économies",
    "landing.stats.satisfaction": "Satisfaction",
    "landing.stats.co2": "CO₂ évité",
    "landing.passenger.title": "Pour les Passagers",
    "landing.driver.title": "Pour les Conducteurs",
    "landing.practices": "Bonnes pratiques",
    "landing.ready": "Prêt à voyager mieux ?",
    "landing.join": "Rejoignez la communauté du covoiturage en Guinée",
    
    // Home
    "home.greeting": "Bonjour",
    "home.where": "Où allez-vous aujourd'hui ?",
    "home.departure": "Départ",
    "home.arrival": "Arrivée",
    "home.search": "Rechercher un trajet",
    "home.suggestions": "Suggestions IA",
    "home.booked": "Mes trajets réservés",
    "home.confirmed": "Confirmé",
    
    // Search
    "search.results": "Résultats de recherche",
    "search.filters.price": "Prix",
    "search.filters.reliability": "Fiabilité",
    "search.filters.time": "Heure",
    "search.filters.family": "Familial",
    "search.verified": "Conducteur vérifié",
    "search.seats": "places",
    "search.perPerson": "par personne",
    "search.map": "Voir sur la carte",
    
    // Payment
    "payment.title": "Paiement Mobile Money",
    "payment.summary": "Récapitulatif",
    "payment.ride": "Trajet",
    "payment.date": "Date",
    "payment.driver": "Conducteur",
    "payment.total": "Total",
    "payment.operator": "Opérateur Mobile Money",
    "payment.phone": "Numéro de téléphone",
    "payment.confirm": "Confirmer le paiement",
    "payment.secure": "Paiement sécurisé",
    "payment.protected": "Vos données de paiement sont protégées et cryptées",
    
    // Common
    "common.back": "Retour",
    "common.next": "Suivant",
    "common.continue": "Continuer",
    "common.cancel": "Annuler",
    "common.save": "Enregistrer",
    "common.today": "Aujourd'hui",
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
    
    // Landing page
    "landing.stats.rides": "Shared rides",
    "landing.stats.savings": "In savings",
    "landing.stats.satisfaction": "Satisfaction",
    "landing.stats.co2": "CO₂ avoided",
    "landing.passenger.title": "For Passengers",
    "landing.driver.title": "For Drivers",
    "landing.practices": "Best practices",
    "landing.ready": "Ready to travel better?",
    "landing.join": "Join the carpooling community in Guinea",
    
    // Home
    "home.greeting": "Hello",
    "home.where": "Where are you going today?",
    "home.departure": "Departure",
    "home.arrival": "Arrival",
    "home.search": "Search for a ride",
    "home.suggestions": "AI Suggestions",
    "home.booked": "My booked rides",
    "home.confirmed": "Confirmed",
    
    // Search
    "search.results": "Search results",
    "search.filters.price": "Price",
    "search.filters.reliability": "Reliability",
    "search.filters.time": "Time",
    "search.filters.family": "Family",
    "search.verified": "Verified driver",
    "search.seats": "seats",
    "search.perPerson": "per person",
    "search.map": "View on map",
    
    // Payment
    "payment.title": "Mobile Money Payment",
    "payment.summary": "Summary",
    "payment.ride": "Ride",
    "payment.date": "Date",
    "payment.driver": "Driver",
    "payment.total": "Total",
    "payment.operator": "Mobile Money Operator",
    "payment.phone": "Phone number",
    "payment.confirm": "Confirm payment",
    "payment.secure": "Secure payment",
    "payment.protected": "Your payment data is protected and encrypted",
    
    // Common
    "common.back": "Back",
    "common.next": "Next",
    "common.continue": "Continue",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.today": "Today",
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
