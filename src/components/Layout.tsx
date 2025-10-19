import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { Chatbot } from "./Chatbot";

interface LayoutProps {
  children: ReactNode;
  showNav?: boolean;
  showChatbot?: boolean;
}

export const Layout = ({ children, showNav = true, showChatbot = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <main className={showNav ? "pb-20" : ""}>{children}</main>
      {showNav && <BottomNav />}
      {showChatbot && <Chatbot />}
    </div>
  );
};
