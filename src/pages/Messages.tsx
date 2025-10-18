import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Clock } from "lucide-react";

const mockMessages = [
  {
    id: 1,
    driver: "Amadou Diallo",
    lastMessage: "Je serai là à 14h pile!",
    time: "Il y a 5 min",
    unread: 2,
    avatar: "AD",
  },
  {
    id: 2,
    driver: "Fatoumata Bah",
    lastMessage: "Merci pour le trajet!",
    time: "Il y a 2h",
    unread: 0,
    avatar: "FB",
  },
  {
    id: 3,
    driver: "Ibrahima Sow",
    lastMessage: "Je confirme pour samedi",
    time: "Hier",
    unread: 0,
    avatar: "IS",
  },
];

export default function Messages() {
  return (
    <Layout>
      <div className="min-h-screen pb-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary via-accent to-primary p-6">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-primary-foreground">Messages</h1>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 mt-6">
          {mockMessages.length > 0 ? (
            <div className="space-y-3">
              {mockMessages.map((message, index) => (
                <Card
                  key={message.id}
                  className="p-4 cursor-pointer hover:border-primary transition-all hover:scale-[1.02] animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary flex-shrink-0">
                      {message.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold truncate">{message.driver}</span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0 ml-2">
                          <Clock className="w-3 h-3" />
                          <span>{message.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground truncate flex-1">
                          {message.lastMessage}
                        </p>
                        {message.unread > 0 && (
                          <Badge className="flex-shrink-0 bg-primary text-primary-foreground">
                            {message.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 animate-fade-in">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun message</h3>
              <p className="text-muted-foreground">
                Vos conversations apparaîtront ici
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
