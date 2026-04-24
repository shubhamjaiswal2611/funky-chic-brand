import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background transition-theme">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
