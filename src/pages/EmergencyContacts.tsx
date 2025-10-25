import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, Trash2, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export default function EmergencyContacts() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "", relationship: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchContacts();
    }
  }, [user]);

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from("emergency_contacts")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erreur lors du chargement des contacts");
      return;
    }

    setContacts(data || []);
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const { error } = await supabase
      .from("emergency_contacts")
      .insert({
        user_id: user.id,
        ...newContact,
      });

    if (error) {
      toast.error("Erreur lors de l'ajout du contact");
    } else {
      toast.success("Contact d'urgence ajouté");
      setNewContact({ name: "", phone: "", relationship: "" });
      setShowForm(false);
      fetchContacts();
    }
    setLoading(false);
  };

  const handleDeleteContact = async (id: string) => {
    const { error } = await supabase
      .from("emergency_contacts")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Erreur lors de la suppression");
    } else {
      toast.success("Contact supprimé");
      fetchContacts();
    }
  };

  return (
    <Layout showNav={false}>
      <div className="min-h-screen pb-8">
        <div className="bg-gradient-to-br from-primary via-accent to-primary p-6">
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-primary-foreground mb-4 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>
            <h1 className="text-2xl font-bold text-primary-foreground">Contacts d'urgence</h1>
            <p className="text-primary-foreground/80 mt-2">
              En cas d'urgence (SOS), ces contacts seront alertés automatiquement
            </p>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 mt-6 space-y-4">
          {!showForm && (
            <Button onClick={() => setShowForm(true)} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un contact d'urgence
            </Button>
          )}

          {showForm && (
            <Card className="p-4">
              <form onSubmit={handleAddContact} className="space-y-4">
                <div>
                  <Label>Nom complet</Label>
                  <Input
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Téléphone</Label>
                  <Input
                    type="tel"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Relation</Label>
                  <Input
                    placeholder="Ex: Mère, Frère, Ami..."
                    value={newContact.relationship}
                    onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? "Ajout..." : "Ajouter"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {contacts.length === 0 && !showForm && (
            <Card className="p-8 text-center">
              <UserPlus className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Aucun contact d'urgence configuré</p>
            </Card>
          )}

          {contacts.map((contact) => (
            <Card key={contact.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground">{contact.phone}</p>
                  <p className="text-xs text-muted-foreground mt-1">{contact.relationship}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteContact(contact.id)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
