import { useState } from "react";
import { Menu, X, Home, Search, Car, MessageCircle, User, Calendar, LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface HamburgerMenuProps {
  isDriver?: boolean;
}

const passengerNavItems = [
  { icon: Home, label: "Accueil", path: "/home" },
  { icon: Search, label: "Rechercher", path: "/search" },
  { icon: Car, label: "Trajets", path: "/rides" },
  { icon: MessageCircle, label: "Messages", path: "/messages" },
  { icon: User, label: "Profil", path: "/profile" },
];

const driverNavItems = [
  { icon: LayoutDashboard, label: "Tableau de bord", path: "/driver-dashboard" },
  { icon: Car, label: "Publier", path: "/publish-ride" },
  { icon: Calendar, label: "Réservations", path: "/driver/manage-bookings" },
  { icon: MessageCircle, label: "Messages", path: "/messages" },
  { icon: User, label: "Profil", path: "/driver/profile" },
];

export const HamburgerMenu = ({ isDriver = false }: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = isDriver ? driverNavItems : passengerNavItems;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:flex hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <div className="flex flex-col gap-4 mt-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "hover:bg-muted"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
