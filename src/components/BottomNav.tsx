import { Home, Search, Car, MessageCircle, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Accueil", path: "/home" },
  { icon: Search, label: "Rechercher", path: "/search" },
  { icon: Car, label: "Trajets", path: "/rides" },
  { icon: MessageCircle, label: "Messages", path: "/messages" },
  { icon: User, label: "Profil", path: "/profile" },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border backdrop-blur-lg bg-card/95">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
                isActive
                  ? "text-secondary scale-110"
                  : "text-muted-foreground hover:text-foreground hover:scale-105"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={cn(
                    "transition-all duration-300",
                    isActive ? "w-6 h-6" : "w-5 h-5"
                  )}
                />
                <span className="text-[10px] font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
