import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Phone, MessageCircle, CheckCircle, XCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface BookingRequest {
  id: string;
  passenger: {
    name: string;
    avatar: string;
    rating: number;
    trips: number;
    badge: string;
  };
  trip: {
    from: string;
    to: string;
    date: string;
    time: string;
    seats: number;
  };
  status: "pending" | "accepted" | "rejected";
}

export default function ManageBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingRequest[]>([
    {
      id: "1",
      passenger: {
        name: "Aissatou Bah",
        avatar: "/placeholder.svg",
        rating: 4.8,
        trips: 23,
        badge: "Passager vérifié"
      },
      trip: {
        from: "Conakry",
        to: "Kindia",
        date: "15 Nov 2025",
        time: "08:00",
        seats: 2
      },
      status: "pending"
    },
    {
      id: "2",
      passenger: {
        name: "Ibrahima Sow",
        avatar: "/placeholder.svg",
        rating: 5.0,
        trips: 45,
        badge: "Super passager"
      },
      trip: {
        from: "Conakry",
        to: "Kindia",
        date: "15 Nov 2025",
        time: "08:00",
        seats: 1
      },
      status: "pending"
    }
  ]);

  const handleAccept = (bookingId: string) => {
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, status: "accepted" as const } : b
    ));
    toast.success("Réservation acceptée");
  };

  const handleReject = (bookingId: string) => {
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, status: "rejected" as const } : b
    ));
    toast.success("Réservation refusée");
  };

  const pendingBookings = bookings.filter(b => b.status === "pending");
  const acceptedBookings = bookings.filter(b => b.status === "accepted");

  return (
    <Layout>
      <div className="min-h-screen pb-8">
        <div className="bg-gradient-to-br from-primary via-primary/90 to-secondary p-6 mb-6">
          <h1 className="text-2xl font-bold text-primary-foreground mb-2">
            Gestion des réservations
          </h1>
          <p className="text-primary-foreground/80">
            {pendingBookings.length} demande{pendingBookings.length > 1 ? "s" : ""} en attente
          </p>
        </div>

        <div className="px-6">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="pending">
                En attente ({pendingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="accepted">
                Acceptées ({acceptedBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingBookings.length === 0 ? (
                <Card className="p-8 text-center">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Aucune demande en attente</p>
                </Card>
              ) : (
                pendingBookings.map((booking) => (
                  <Card key={booking.id} className="p-4 animate-fade-in">
                    {/* Infos passager */}
                    <div className="flex items-start gap-3 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={booking.passenger.avatar} />
                        <AvatarFallback>{booking.passenger.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{booking.passenger.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-secondary text-secondary" />
                            <span className="text-sm font-medium">{booking.passenger.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {booking.passenger.trips} trajets • {booking.passenger.badge}
                        </p>
                      </div>
                    </div>

                    {/* Détails du trajet */}
                    <div className="bg-muted/30 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm text-muted-foreground">De</p>
                          <p className="font-medium">{booking.trip.from}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">À</p>
                          <p className="font-medium">{booking.trip.to}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {booking.trip.date} • {booking.trip.time}
                        </span>
                        <Badge variant="outline">{booking.trip.seats} place{booking.trip.seats > 1 ? "s" : ""}</Badge>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleReject(booking.id)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Refuser
                      </Button>
                      <Button onClick={() => handleAccept(booking.id)}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accepter
                      </Button>
                    </div>

                    {/* Boutons de contact */}
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Button size="sm" variant="ghost">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Phone className="w-4 h-4 mr-2" />
                        Appeler
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="accepted" className="space-y-4">
              {acceptedBookings.length === 0 ? (
                <Card className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Aucune réservation acceptée</p>
                </Card>
              ) : (
                acceptedBookings.map((booking) => (
                  <Card key={booking.id} className="p-4 animate-fade-in">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={booking.passenger.avatar} />
                        <AvatarFallback>{booking.passenger.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{booking.passenger.name}</h3>
                          <Badge className="bg-secondary text-secondary-foreground">Confirmé</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {booking.trip.from} → {booking.trip.to}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {booking.trip.date} • {booking.trip.time}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Appeler
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
