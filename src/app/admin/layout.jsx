"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AdminGuard } from "@/components/AuthGuard";
import AdminSidebar from "@/components/AdminSidebar";
import {
  HiChartBar,
  HiShoppingBag,
  HiViewGrid,
  HiUsers,
  HiCloudUpload,
  HiCog,
} from "react-icons/hi";

const mobileNav = [
  { href: "/admin", icon: HiChartBar, label: "Home" },
  { href: "/admin/products", icon: HiShoppingBag, label: "Products" },
  { href: "/admin/orders", icon: HiViewGrid, label: "Orders" },
  { href: "/admin/users", icon: HiUsers, label: "Users" },
  { href: "/admin/upload", icon: HiCloudUpload, label: "Upload" },
  { href: "/admin/settings", icon: HiCog, label: "Settings" },
];

function AdminLayoutContent({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <AdminSidebar />

      {/* Main content */}
      <div className="lg:ml-[260px] min-h-screen pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pt-20 lg:pt-6">
          {children}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="glass-strong border-t border-white/30 safe-bottom">
          <div className="flex justify-around items-center h-[64px] px-1">
            {mobileNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center gap-0.5 min-w-[48px] py-1.5 rounded-xl transition-all ${
                    active
                      ? "text-orange-500"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <item.icon className={`text-lg ${active ? "scale-110" : ""}`} />
                  <span className="text-[9px] font-semibold">{item.label}</span>
                  {active && (
                    <div className="w-1 h-1 rounded-full bg-orange-500" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <AdminGuard>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminGuard>
  );
}
