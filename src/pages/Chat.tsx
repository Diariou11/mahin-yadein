import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { getProfileImage } from "@/utils/avatarHelper";
import { z } from "zod";

const messageSchema = z.object({
  content: z.string()
    .trim()
    .min(1, "Le message ne peut pas être vide")
    .max(1000, "Le message ne doit pas dépasser 1000 caractères")
});

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
}

export default function Chat() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherUser, setOtherUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversationId && user) {
      fetchConversation();
      fetchMessages();

      // Subscribe to new messages
      const channel = supabase
        .channel(`chat-${conversationId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${conversationId}`
          },
          (payload) => {
            setMessages((prev) => [...prev, payload.new as Message]);
            scrollToBottom();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [conversationId, user]);

  const fetchConversation = async () => {
    const { data } = await supabase
      .from("conversations")
      .select(`
        *,
        passenger_profile:profiles!conversations_passenger_id_fkey(*),
        driver_profile:profiles!conversations_driver_id_fkey(*)
      `)
      .eq("id", conversationId)
      .single();

    if (data) {
      const other = data.passenger_id === user?.id 
        ? data.driver_profile 
        : data.passenger_profile;
      setOtherUser(other);
    }
  };

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    setMessages(data || []);
    scrollToBottom();

    // Mark messages as read
    await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("conversation_id", conversationId)
      .neq("sender_id", user?.id);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    try {
      // Validate message
      const validatedData = messageSchema.parse({ content: newMessage });

      setLoading(true);
      const { error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: user?.id,
          content: validatedData.content,
        });

      if (error) {
        toast.error("Erreur lors de l'envoi du message");
      } else {
        setNewMessage("");
      }
      setLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Erreur lors de la validation");
      }
      setLoading(false);
    }
  };

  const quickMessages = [
    "Je suis en route",
    "J'arrive dans 5 minutes",
    "Je suis là",
    "Désolé, je suis en retard",
  ];

  return (
    <Layout showNav={false}>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary via-accent to-primary p-4">
          <div className="max-w-lg mx-auto flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="text-primary-foreground hover:opacity-80"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <img
              src={getProfileImage(otherUser?.full_name || "User")}
              alt={otherUser?.full_name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-primary-foreground">
                {otherUser?.full_name || "Chargement..."}
              </h2>
            </div>
            <button className="text-primary-foreground hover:opacity-80">
              <Phone className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick messages */}
        <div className="max-w-lg mx-auto w-full px-4 py-2 flex gap-2 overflow-x-auto">
          {quickMessages.map((msg, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              className="whitespace-nowrap flex-shrink-0"
              onClick={() => setNewMessage(msg)}
            >
              {msg}
            </Button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 max-w-lg mx-auto w-full">
          {messages.map((message) => {
            const isOwn = message.sender_id === user?.id;
            return (
              <div
                key={message.id}
                className={`mb-3 flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <Card
                  className={`p-3 max-w-[70%] ${
                    isOwn
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {new Date(message.created_at).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </Card>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t bg-background p-4">
          <form onSubmit={handleSendMessage} className="max-w-lg mx-auto flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={loading || !newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
