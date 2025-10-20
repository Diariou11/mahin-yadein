import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { Chatbot } from "./Chatbot";
import logo from "@/assets/logo.svg";

interface LayoutProps {
  children: ReactNode;
  showNav?: boolean;
  showChatbot?: boolean;
  showHeader?: boolean;
}

export const Layout = ({ children, showNav = true, showChatbot = true, showHeader = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {showHeader && (
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border safe-top">
          <div className="max-w-lg mx-auto px-6 py-3 flex items-center justify-center">
            <img src={logo} alt="Mahin Yadein" className="h-10" />
          </div>
        </header>
      )}
      <main className={showNav ? "pb-20" : ""}>{children}</main>
      {showNav && <BottomNav />}
      {showChatbot && <Chatbot />}
    </div>
  );
};
