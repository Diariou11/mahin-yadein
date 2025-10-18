import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, User, Car } from "lucide-react";

const upcomingRides = [
  {
    id: 1,
    from: "Conakry",
    to: "Mamou",
    date: "Samedi 15 juin",
    time: "14:00",
    driver: "Amadou Diallo",
    rating: 4.8,
    price: 150000,
    status: "confirmed",
    car: "Toyota Corolla",
  },
];

const pastRides = [
  {
    id: 2,
    from: "Conakry",
    to: "Kindia",
    date: "5 juin 2024",
    time: "10:00",
    driver: "Fatoumata Bah",
    rating: 4.9,
    price: 80000,
    status: "completed",
    car: "Honda Civic",
  },
];

export default function Rides() {
  return (
    <Layout>
      <div className="min-h-screen pb-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary via-accent to-primary p-6">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-primary-foreground">Mes trajets</h1>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 mt-6">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="upcoming">À venir</TabsTrigger>
              <TabsTrigger value="past">Passés</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingRides.map((ride, index) => (
                <Card
                  key={ride.id}
                  className="p-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-secondary text-secondary-foreground">
                      Confirmé
                    </Badge>
                    <span className="text-sm text-muted-foreground">{ride.date}</span>
                  </div>

                  {/* Route */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="font-semibold">{ride.from}</span>
                    </div>
                    <div className="h-8 border-l-2 border-dashed border-muted ml-2" />
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="font-semibold">{ride.to}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4 p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{ride.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{ride.driver}</span>
                      <span className="text-muted-foreground">• {ride.rating}★</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Car className="w-4 h-4 text-muted-foreground" />
                      <span>{ride.car}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-sm text-muted-foreground">Prix payé</span>
                    <span className="text-xl font-bold text-primary">
                      {ride.price.toLocaleString()} GNF
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <Button variant="outline" size="sm">
                      Contacter
                    </Button>
                    <Button variant="outline" size="sm">
                      Voir détails
                    </Button>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastRides.map((ride, index) => (
                <Card
                  key={ride.id}
                  className="p-4 opacity-75 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">Terminé</Badge>
                    <span className="text-sm text-muted-foreground">{ride.date}</span>
                  </div>

                  {/* Route */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold">{ride.from}</span>
                    </div>
                    <div className="h-8 border-l-2 border-dashed border-muted ml-2" />
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold">{ride.to}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4 p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{ride.driver}</span>
                      <span className="text-muted-foreground">• {ride.rating}★</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Car className="w-4 h-4 text-muted-foreground" />
                      <span>{ride.car}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-sm text-muted-foreground">Prix payé</span>
                    <span className="text-xl font-bold text-muted-foreground">
                      {ride.price.toLocaleString()} GNF
                    </span>
                  </div>

                  {/* Actions */}
                  <Button variant="outline" className="w-full mt-4">
                    Laisser un avis
                  </Button>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
