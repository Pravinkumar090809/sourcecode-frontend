"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import Loading from "@/components/Loading";
import { useAuthStore } from "@/lib/store";

export default function ClientLayout({ children }) {
  const [mounted, setMounted] = useState(false);
  const loadFromCookies = useAuthStore((s) => s.loadFromCookies);
  const isLoading = useAuthStore((s) => s.isLoading);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    loadFromCookies();
    setMounted(true);
  }, [loadFromCookies]);

  if (!mounted || isLoading) return <Loading />;

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "16px",
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#1e293b",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          },
        }}
      />

      {/* Background orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="orb-1" />
        <div className="orb-2" />
        <div className="orb-3" />
      </div>

      {!isAdmin && <TopBar />}

      <main className={isAdmin ? "" : "page-container"}>
        {children}
      </main>

      {!isAdmin && <BottomNav />}
    </>
  );
}
