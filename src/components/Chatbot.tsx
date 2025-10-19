import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface FAQ {
  question: string;
  keywords: string[];
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Comment réserver un trajet ?",
    keywords: ["réserver", "trajet", "comment", "reservation"],
    answer: "Pour réserver un trajet : 1) Recherchez votre destination sur la page d'accueil, 2) Sélectionnez un trajet qui vous convient, 3) Confirmez avec Mobile Money (Orange, MTN ou PayCard)."
  },
  {
    question: "Quels sont les moyens de paiement acceptés ?",
    keywords: ["paiement", "mobile money", "orange", "mtn", "paycard", "payer"],
    answer: "Nous acceptons Orange Money, MTN Mobile Money et PayCard. Tous les paiements sont sécurisés et cryptés."
  },
  {
    question: "Comment devenir conducteur ?",
    keywords: ["conducteur", "driver", "publier", "devenir"],
    answer: "Pour devenir conducteur : 1) Inscrivez-vous en tant que conducteur, 2) Téléchargez votre permis et les documents du véhicule, 3) Publiez votre premier trajet en 30 secondes !"
  },
  {
    question: "Comment fonctionne le score de fiabilité ?",
    keywords: ["score", "fiabilité", "étoiles", "notation", "avis"],
    answer: "Le score de fiabilité est calculé à partir des avis des passagers. Plus vous voyagez et recevez de bons avis, plus votre score augmente. Un score élevé renforce la confiance."
  },
  {
    question: "Puis-je annuler une réservation ?",
    keywords: ["annuler", "annulation", "rembourser", "remboursement"],
    answer: "Oui, vous pouvez annuler jusqu'à 2 heures avant le départ. Le remboursement est automatique et prend 24-48h selon votre opérateur Mobile Money."
  },
  {
    question: "Comment suivre mon trajet en temps réel ?",
    keywords: ["suivre", "temps réel", "gps", "localisation", "tracking"],
    answer: "Une fois votre trajet confirmé, vous recevrez un lien de suivi. Vous pourrez voir la position du conducteur en temps réel et partager votre localisation avec vos proches."
  },
  {
    question: "Que signifie 'Trajet familial' ?",
    keywords: ["familial", "famille", "enfants"],
    answer: "Un trajet 'Familial' signifie que le conducteur accepte les enfants et les familles. Ces trajets sont généralement plus calmes et adaptés aux voyages en groupe."
  },
  {
    question: "Comment contacter le support ?",
    keywords: ["support", "aide", "contact", "assistance", "problème"],
    answer: "Notre support est disponible 7j/7 via l'onglet 'Messages' ou par WhatsApp au +224 XXX XXX XXX. Nous répondons généralement en moins de 30 minutes."
  },
  {
    question: "Les conducteurs sont-ils vérifiés ?",
    keywords: ["vérifié", "vérification", "sécurité", "confiance"],
    answer: "Oui ! Tous les conducteurs sont vérifiés. Nous contrôlons leur permis de conduire, l'assurance du véhicule et leur identité. Les conducteurs avec le badge 'Vérifié' sont approuvés."
  },
  {
    question: "Comment gagner de l'argent en tant que conducteur ?",
    keywords: ["gagner", "argent", "revenus", "tarif"],
    answer: "Publiez vos trajets réguliers et partagez vos frais ! Vous gardez 100% du montant payé par les passagers. Plus vous voyagez, plus vous gagnez. Certains conducteurs gagnent jusqu'à 500 000 GNF/mois."
  },
  {
    question: "Combien coûte un trajet Conakry-Kindia ?",
    keywords: ["prix", "coût", "tarif", "conakry", "kindia"],
    answer: "Le prix moyen pour Conakry-Kindia est de 75 000 à 85 000 GNF par personne. Le prix varie selon le confort, l'heure et la demande."
  },
  {
    question: "Puis-je choisir mon conducteur ?",
    keywords: ["choisir", "sélectionner", "préférence"],
    answer: "Oui, absolument ! Vous pouvez voir tous les conducteurs disponibles, leur score, leur véhicule et les avis. Choisissez celui qui vous convient le mieux."
  },
  {
    question: "Que faire si mon conducteur est en retard ?",
    keywords: ["retard", "retardé", "attendre"],
    answer: "Si votre conducteur a plus de 15 minutes de retard, contactez-le via l'app. Si le problème persiste, vous pouvez annuler sans frais et être remboursé immédiatement."
  },
  {
    question: "Comment ajouter un passager favori ?",
    keywords: ["favori", "favoris", "sauvegarder"],
    answer: "Après un trajet réussi, allez dans votre historique et appuyez sur l'icône ❤️ à côté du conducteur. Il apparaîtra dans vos 'Favoris' pour vos prochains voyages."
  },
  {
    question: "Y a-t-il une limite de bagages ?",
    keywords: ["bagages", "valise", "sac", "limite"],
    answer: "La limite standard est d'un sac moyen par passager. Pour des bagages supplémentaires, contactez le conducteur avant de réserver pour confirmer."
  },
  {
    question: "Puis-je réserver pour quelqu'un d'autre ?",
    keywords: ["réserver", "quelqu'un", "autre", "personne"],
    answer: "Oui ! Lors de la réservation, vous pouvez indiquer le nom et le numéro de la personne qui voyagera. Le conducteur recevra ces informations."
  },
  {
    question: "Comment fonctionne l'IA de suggestions ?",
    keywords: ["ia", "intelligence", "artificielle", "suggestions", "recommandations"],
    answer: "Notre IA analyse vos trajets habituels, vos préférences et les horaires pour vous suggérer automatiquement des trajets pertinents. Plus vous utilisez l'app, plus elle devient précise."
  },
  {
    question: "Puis-je publier un trajet récurrent ?",
    keywords: ["récurrent", "régulier", "répéter", "tous les jours"],
    answer: "Oui ! En tant que conducteur, vous pouvez marquer un trajet comme 'Récurrent' et définir les jours de la semaine. Vos passagers réguliers seront notifiés automatiquement."
  },
  {
    question: "Comment obtenir le badge 'Conducteur Or' ?",
    keywords: ["badge", "or", "gold", "récompense"],
    answer: "Le badge 'Conducteur Or' est attribué après 50 trajets réussis avec un score moyen de 4.8/5. Vous bénéficierez d'une meilleure visibilité et de passagers prioritaires."
  },
  {
    question: "L'app fonctionne-t-elle hors ligne ?",
    keywords: ["hors ligne", "offline", "internet", "connexion"],
    answer: "Certaines fonctionnalités (historique, profil) fonctionnent hors ligne. Cependant, la recherche de trajets et le suivi GPS nécessitent une connexion internet."
  },
  {
    question: "Comment partager mon trajet avec un proche ?",
    keywords: ["partager", "proche", "famille", "sécurité"],
    answer: "Pendant le trajet, appuyez sur 'Partager ma localisation' dans l'écran de suivi. Vous pourrez envoyer un lien de suivi en temps réel par SMS ou WhatsApp."
  },
  {
    question: "Que faire en cas de problème pendant le trajet ?",
    keywords: ["problème", "urgence", "incident", "accident"],
    answer: "En cas d'urgence, utilisez le bouton SOS dans l'app (écran de suivi). Pour les problèmes non urgents, contactez le support. Votre sécurité est notre priorité absolue."
  },
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! 👋 Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const findBestAnswer = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Find FAQs that match the user's message
    const matches = faqs.map(faq => {
      const matchScore = faq.keywords.reduce((score, keyword) => {
        return lowerMessage.includes(keyword) ? score + 1 : score;
      }, 0);
      return { faq, score: matchScore };
    });

    // Get the best match
    const bestMatch = matches.sort((a, b) => b.score - a.score)[0];

    if (bestMatch.score > 0) {
      return bestMatch.faq.answer;
    }

    return "Je n'ai pas compris votre question. Voici quelques sujets sur lesquels je peux vous aider : réservations, paiements, devenir conducteur, scores de fiabilité, annulations, ou sécurité. Reformulez votre question s'il vous plaît ! 😊";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: findBestAnswer(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  const quickQuestions = [
    "Comment réserver ?",
    "Moyens de paiement",
    "Devenir conducteur",
    "Annuler un trajet",
  ];

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          size="lg"
          className="fixed bottom-20 right-6 z-50 rounded-full w-14 h-14 shadow-2xl animate-pulse-glow"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-6 z-50 w-[90vw] max-w-md h-[600px] flex flex-col shadow-2xl animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary to-accent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">Assistant IA</h3>
                <p className="text-xs text-primary-foreground/80">Toujours là pour vous aider</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"} animate-slide-up`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isBot
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className="text-[10px] mt-1 opacity-60">
                      {message.timestamp.toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-border bg-muted/30">
              <p className="text-xs text-muted-foreground mb-2">Questions rapides :</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Posez votre question..."
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};
