import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { useState } from "react";

interface City {
  name: string;
  x: number;
  y: number;
  rides: number;
  popular: boolean;
}

const cities: City[] = [
  { name: "Conakry", x: 20, y: 55, rides: 45, popular: true },
  { name: "Kindia", x: 32, y: 50, rides: 28, popular: true },
  { name: "Mamou", x: 45, y: 45, rides: 15, popular: true },
  { name: "Labé", x: 50, y: 25, rides: 12, popular: true },
  { name: "Kankan", x: 75, y: 45, rides: 18, popular: true },
  { name: "N'Zérékoré", x: 70, y: 75, rides: 10, popular: false },
  { name: "Boké", x: 30, y: 25, rides: 8, popular: false },
  { name: "Faranah", x: 55, y: 50, rides: 9, popular: false },
];

interface GuineaMapProps {
  onCitySelect?: (cityName: string) => void;
}

export const GuineaMap = ({ onCitySelect }: GuineaMapProps) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const handleCityClick = (city: City) => {
    setSelectedCity(city.name);
    onCitySelect?.(city.name);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card/80 to-card backdrop-blur-sm animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Destinations populaires</h3>
      </div>
      
      {/* Stylized Guinea Map */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl border-2 border-border overflow-hidden">
        {/* Map SVG Background - Simplified Guinea shape */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 15 30 Q 25 20 35 25 L 55 20 Q 65 18 70 25 L 85 35 Q 90 45 85 55 L 80 70 Q 75 85 60 85 L 40 90 Q 25 88 20 75 L 15 60 Q 12 45 15 30 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-primary/20"
          />
        </svg>

        {/* Interactive City Points */}
        {cities.map((city) => {
          const isHovered = hoveredCity === city.name;
          const isSelected = selectedCity === city.name;
          const scale = isHovered || isSelected ? 1.3 : 1;
          
          return (
            <div
              key={city.name}
              className="absolute cursor-pointer transition-all duration-300 group"
              style={{
                left: `${city.x}%`,
                top: `${city.y}%`,
                transform: `translate(-50%, -50%) scale(${scale})`,
              }}
              onClick={() => handleCityClick(city)}
              onMouseEnter={() => setHoveredCity(city.name)}
              onMouseLeave={() => setHoveredCity(null)}
            >
              {/* Pulse animation for popular cities */}
              {city.popular && (
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
              )}
              
              {/* City marker */}
              <div
                className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  city.popular
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                    : "bg-secondary text-secondary-foreground shadow-md"
                } ${isSelected ? "ring-4 ring-accent" : ""}`}
              >
                <MapPin className="w-4 h-4" />
              </div>

              {/* City label */}
              <div
                className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                  isHovered || isSelected ? "opacity-100" : "opacity-0"
                }`}
              >
                <Badge
                  variant={city.popular ? "default" : "secondary"}
                  className="text-xs font-medium shadow-lg"
                >
                  {city.name}
                  <span className="ml-1 text-[10px] opacity-70">
                    {city.rides} trajets
                  </span>
                </Badge>
              </div>

              {/* Connection lines for selected city */}
              {isSelected && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-0.5 h-4 bg-accent/50 absolute top-full left-1/2 -translate-x-1/2 animate-pulse" />
                </div>
              )}
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full border border-border">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">Populaire</span>
          </div>
          <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full border border-border">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            <span className="text-muted-foreground">Autre</span>
          </div>
        </div>
      </div>

      {selectedCity && (
        <div className="mt-4 p-3 bg-primary/10 rounded-lg animate-slide-up">
          <p className="text-sm">
            <span className="font-semibold text-primary">{selectedCity}</span> sélectionnée
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Cliquez sur "Rechercher" pour voir les trajets disponibles
          </p>
        </div>
      )}
    </Card>
  );
};
