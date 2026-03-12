"use client";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import AdminSidebar from "@/components/AdminSidebar";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const adminAuth = Cookies.get("admin_authenticated");
    if (adminAuth === "true") {
      setAuthenticated(true);
    } else {
      if (pathname !== "/admin/login") router.push("/admin/login");
    }
  }, [router, pathname]);

  if (!authenticated && pathname !== "/admin/login") return null;

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(20,20,30,0.95)",
            color: "#f1f5f9",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            fontSize: "14px",
            borderRadius: "12px",
          },
        }}
      />
      <div className="flex min-h-screen w-full overflow-x-hidden" style={{ background: "#0a0a0f" }}>
        <AdminSidebar />
        <main className="flex-1 min-h-screen min-w-0 overflow-x-hidden admin-main">
          <div className="p-4 pt-14 sm:p-6 sm:pt-14 lg:p-8 lg:pt-8 w-full max-w-full">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
