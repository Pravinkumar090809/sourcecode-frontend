// app/ClientLayout.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "@/lib/store";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { loadFromCookies } = useAuthStore();
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  useEffect(() => {
    loadFromCookies();
  }, [loadFromCookies]);

  return (
    <>
      {/* Toast */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(255,255,255,0.95)",
            color: "#1E293B",
            border: "1px solid rgba(0,0,0,0.06)",
            backdropFilter: "blur(20px)",
            borderRadius: "14px",
            fontSize: "14px",
            fontWeight: 500,
            padding: "12px 16px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          },
          success: { iconTheme: { primary: "#10B981", secondary: "#fff" } },
          error: { iconTheme: { primary: "#EF4444", secondary: "#fff" } },
        }}
      />

      {/* Background Orbs */}
      <div className="orb orb-orange" />
      <div className="orb orb-blue" />
      <div className="orb orb-purple" />

      {/* Header */}
      {!isAdminPage && <TopBar />}

      {/* Main Content */}
      <main className={`relative z-10 ${isAdminPage ? "" : "page-container"}`}>
        {children}
      </main>

      {/* Bottom Navigation */}
      {!isAdminPage && <BottomNav />}
    </>
  );
}