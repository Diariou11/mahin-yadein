import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Clock, Shield, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockRides = [
  {
    id: 1,
    driver: "Amadou Diallo",
    rating: 4.8,
    verified: true,
    from: "Conakry",
    to: "Kindia",
    time: "14:00",
    date: "Aujourd'hui",
    price: 80000,
    seats: 3,
    car: "Toyota Corolla 2018",
    familial: true,
  },
  {
    id: 2,
    driver: "Fatoumata Bah",
    rating: 4.9,
    verified: true,
    from: "Conakry",
    to: "Kindia",
    time: "16:30",
    date: "Aujourd'hui",
    price: 75000,
    seats: 2,
    car: "Honda Civic 2020",
    familial: false,
  },
  {
    id: 3,
    driver: "Ibrahima Sow",
    rating: 4.7,
    verified: true,
    from: "Conakry",
    to: "Kindia",
    time: "18:00",
    date: "Aujourd'hui",
    price: 85000,
    seats: 4,
    car: "Nissan Altima 2019",
    familial: true,
  },
];

export default function SearchRides() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen pb-8">
        {/* Header with search summary */}
        <div className="bg-gradient-to-br from-primary via-accent to-primary p-6">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-primary-foreground mb-3">
              Résultats de recherche
            </h1>
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Conakry → Kindia • Aujourd'hui</span>
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 -mt-4">
          {/* Filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 animate-slide-up">
            <Badge variant="secondary" className="cursor-pointer whitespace-nowrap">
              Prix ↓
            </Badge>
            <Badge variant="outline" className="cursor-pointer whitespace-nowrap">
              Fiabilité ↓
            </Badge>
            <Badge variant="outline" className="cursor-pointer whitespace-nowrap">
              Heure ↓
            </Badge>
            <Badge variant="outline" className="cursor-pointer whitespace-nowrap">
              Familial
            </Badge>
          </div>

          {/* Rides List */}
          <div className="space-y-4">
            {mockRides.map((ride, index) => (
              <Card
                key={ride.id}
                className="p-4 cursor-pointer hover:border-primary transition-all hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/ride/${ride.id}`)}
              >
                {/* Driver Info */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary">
                      {ride.driver.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{ride.driver}</span>
                        {ride.verified && (
                          <Shield className="w-4 h-4 text-secondary" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        <span>{ride.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>

                {/* Route */}
                <div className="flex items-center gap-2 mb-3 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{ride.time}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{ride.car}</span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {ride.familial && (
                    <Badge variant="outline" className="text-xs">
                      Familial
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    Conducteur vérifié
                  </Badge>
                </div>

                {/* Price and Seats */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{ride.seats} places</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {ride.price.toLocaleString()} GNF
                    </div>
                    <div className="text-xs text-muted-foreground">par personne</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Map View Toggle */}
          <Button variant="outline" className="w-full mt-6">
            <MapPin className="mr-2 w-4 h-4" />
            Voir sur la carte
          </Button>
        </div>
      </div>
    </Layout>
  );
}
