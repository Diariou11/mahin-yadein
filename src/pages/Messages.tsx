import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getProfileImage } from "@/utils/avatarHelper";

interface Conversation {
  id: string;
  trip_id: string;
  passenger_id: string;
  driver_id: string;
  created_at: string;
  passenger_profile?: any;
  driver_profile?: any;
  last_message?: any;
  unread_count?: number;
}

export default function Messages() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchConversations();
      
      // Subscribe to new messages
      const channel = supabase
        .channel('messages')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages'
          },
          () => fetchConversations()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const fetchConversations = async () => {
    const { data: convData, error } = await supabase
      .from("conversations")
      .select(`
        *,
        passenger_profile:profiles!conversations_passenger_id_fkey(*),
        driver_profile:profiles!conversations_driver_id_fkey(*)
      `)
      .or(`passenger_id.eq.${user?.id},driver_id.eq.${user?.id}`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching conversations:", error);
      setLoading(false);
      return;
    }

    // Fetch last message and unread count for each conversation
    const conversationsWithMessages = await Promise.all(
      (convData || []).map(async (conv) => {
        const { data: lastMsg } = await supabase
          .from("messages")
          .select("*")
          .eq("conversation_id", conv.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        const { count: unreadCount } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true })
          .eq("conversation_id", conv.id)
          .eq("is_read", false)
          .neq("sender_id", user?.id);

        return {
          ...conv,
          last_message: lastMsg,
          unread_count: unreadCount || 0,
        };
      })
    );

    setConversations(conversationsWithMessages);
    setLoading(false);
  };

  const getOtherUser = (conv: Conversation) => {
    return conv.passenger_id === user?.id 
      ? conv.driver_profile 
      : conv.passenger_profile;
  };

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
              {conversations.map((conv, index) => {
                const otherUser = getOtherUser(conv);
                return (
                  <Card
                    key={conv.id}
                    className="p-4 cursor-pointer hover:border-primary transition-all hover:scale-[1.02] animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => navigate(`/chat/${conv.id}`)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={getProfileImage(otherUser?.full_name || "User")}
                        alt={otherUser?.full_name || "User"}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold truncate">{otherUser?.full_name || "Utilisateur"}</span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0 ml-2">
                            <Clock className="w-3 h-3" />
                            <span>{conv.last_message ? formatTime(conv.last_message.created_at) : ""}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground truncate flex-1">
                            {conv.last_message?.content || "Nouvelle conversation"}
                          </p>
                          {conv.unread_count! > 0 && (
                            <Badge className="flex-shrink-0 bg-primary text-primary-foreground">
                              {conv.unread_count}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
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
