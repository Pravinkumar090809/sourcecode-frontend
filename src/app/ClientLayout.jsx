"use client";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "@/lib/store";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function ClientLayout({ children }) {
  const loadFromCookies = useAuthStore((s) => s.loadFromCookies);
  useEffect(() => { loadFromCookies(); }, [loadFromCookies]);

  return (
    <>
      <Toaster position="top-center" toastOptions={{
        duration: 3000,
        style: { background: "rgba(20,20,30,0.95)", color: "#f1f5f9", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", fontSize: "14px", borderRadius: "12px" },
        success: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
      }} />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <TopBar />
      <main className="page-container">{children}</main>
      <BottomNav />
    </>
  );
}
