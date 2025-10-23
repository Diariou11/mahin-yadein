import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { DriverBottomNav } from "./DriverBottomNav";
import { Chatbot } from "./Chatbot";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";

interface LayoutProps {
  children: ReactNode;
  showNav?: boolean;
  showChatbot?: boolean;
  showHeader?: boolean;
  isDriver?: boolean;
}

export const Layout = ({ children, showNav = true, showChatbot = true, showHeader = true, isDriver = false }: LayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {showHeader && (
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border safe-top">
          <div className="max-w-lg mx-auto px-6 py-3 flex items-center justify-center">
            <img 
              src={logo} 
              alt="Mahin Yadein" 
              className="h-12 sm:h-14 cursor-pointer hover:scale-105 transition-transform duration-300" 
              onClick={() => navigate('/')}
            />
          </div>
        </header>
      )}
      <main className={showNav ? "pb-20" : ""}>{children}</main>
      {showNav && (isDriver ? <DriverBottomNav /> : <BottomNav />)}
      {showChatbot && <Chatbot />}
    </div>
  );
};
