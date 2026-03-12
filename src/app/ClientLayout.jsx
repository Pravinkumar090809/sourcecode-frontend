"use client";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "@/lib/store";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function ClientLayout({ children }) {
  const loadFromCookies = useAuthStore((s) => s.loadFromCookies);

  useEffect(() => {
    loadFromCookies();
  }, [loadFromCookies]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        minHeight: "100vh",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(15, 15, 25, 0.85)",
            color: "#f1f5f9",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            fontSize: "14px",
            borderRadius: "16px",
            maxWidth: "90vw",
            boxSizing: "border-box",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
            padding: "12px 16px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <TopBar />

      <main
        className="page-container"
        style={{
          paddingTop: "64px",
          paddingBottom: "80px",
          minHeight: "100vh",
          width: "100%",
          maxWidth: "100vw",
          overflowX: "hidden",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </main>

      <BottomNav />
    </div>
  );
}