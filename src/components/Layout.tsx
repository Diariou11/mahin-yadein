import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { DriverBottomNav } from "./DriverBottomNav";
import { Chatbot } from "./Chatbot";
import { HamburgerMenu } from "./HamburgerMenu";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import logo from "@/assets/logo.svg";

interface LayoutProps {
  children: ReactNode;
  showNav?: boolean;
  showChatbot?: boolean;
  showHeader?: boolean;
  isDriver?: boolean;
  showBackButton?: boolean;
}

export const Layout = ({ 
  children, 
  showNav = true, 
  showChatbot = true, 
  showHeader = true, 
  isDriver = false,
  showBackButton = false 
}: LayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {showHeader && (
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border safe-top">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showBackButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(-1)}
                  className="hover:bg-muted"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <HamburgerMenu isDriver={isDriver} />
            </div>
            <img 
              src={logo} 
              alt="Mahin Yadein" 
              className="h-12 sm:h-14 cursor-pointer hover:scale-105 transition-transform duration-300" 
              onClick={() => navigate('/')}
            />
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </header>
      )}
      <main className={showNav ? "pb-20 md:pb-0" : ""}>{children}</main>
      {showNav && (
        <div className="md:hidden">
          {isDriver ? <DriverBottomNav /> : <BottomNav />}
        </div>
      )}
      {showChatbot && <Chatbot />}
    </div>
  );
};
