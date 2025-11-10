import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProfileImage } from "@/utils/avatarHelper";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar: string;
}

// Demo conversations data
const demoConversations: Conversation[] = [
  {
    id: "1",
    name: "Mamadou Diallo",
    lastMessage: "J'arrive dans 5 minutes",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    unreadCount: 2,
    avatar: "Mamadou Diallo"
  },
  {
    id: "2",
    name: "Aissatou Bah",
    lastMessage: "Merci pour le trajet !",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    unreadCount: 0,
    avatar: "Aissatou Bah"
  },
  {
    id: "3",
    name: "Ibrahim Souare",
    lastMessage: "On se retrouve où exactement ?",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    unreadCount: 1,
    avatar: "Ibrahim Souare"
  },
  {
    id: "4",
    name: "Fatoumata Camara",
    lastMessage: "D'accord, à demain alors",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    unreadCount: 0,
    avatar: "Fatoumata Camara"
  }
];

export default function Messages() {
  const navigate = useNavigate();
  const [conversations] = useState<Conversation[]>(demoConversations);
  const [loading] = useState(false);

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days === 1) return "Hier";
    return `Il y a ${days} jours`;
  };

  return (
    <Layout>
      <div className="min-h-screen pb-8">
        <div className="bg-gradient-to-br from-primary via-accent to-primary p-6">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-primary-foreground">Messages</h1>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 mt-6">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-1/3" />
                      <div className="h-3 bg-muted rounded w-2/3" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : conversations.length > 0 ? (
            <div className="space-y-3">
              {conversations.map((conv, index) => (
                <Card
                  key={conv.id}
                  className="p-4 cursor-pointer hover:border-primary transition-all hover:scale-[1.02] animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/chat/${conv.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={getProfileImage(conv.avatar)}
                      alt={conv.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold truncate">{conv.name}</span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0 ml-2">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(conv.timestamp)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground truncate flex-1">
                          {conv.lastMessage}
                        </p>
                        {conv.unreadCount > 0 && (
                          <Badge className="flex-shrink-0 bg-primary text-primary-foreground">
                            {conv.unreadCount}
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
