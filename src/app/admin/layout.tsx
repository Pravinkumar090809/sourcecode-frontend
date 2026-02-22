"use client";

import { AdminGuard } from "@/components/AuthGuard";
import AdminSidebar from "@/components/AdminSidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiViewGrid, HiShoppingBag, HiClipboardList, HiUsers, HiUpload, HiCog, HiArrowLeft } from "react-icons/hi";

const mobileNavItems = [
  { href: "/admin", icon: HiViewGrid, label: "Home" },
  { href: "/admin/products", icon: HiShoppingBag, label: "Products" },
  { href: "/admin/orders", icon: HiClipboardList, label: "Orders" },
  { href: "/admin/users", icon: HiUsers, label: "Users" },
  { href: "/admin/upload", icon: HiUpload, label: "Upload" },
];

function AdminContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#FAFBFE]">
      <AdminSidebar />

      <div className="flex-1 lg:ml-[260px]">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 glass-strong border-b border-white/40 h-16 flex items-center px-4 sm:px-6 justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="lg:hidden text-slate-400 hover:text-slate-700 transition-colors">
              <HiArrowLeft className="text-xl" />
            </Link>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-orange-500/20">A</div>
            <div>
              <span className="font-bold text-sm text-slate-800">Admin Panel</span>
              <p className="text-[10px] text-slate-400 hidden sm:block">Manage your platform</p>
            </div>
          </div>
          <Link href="/" className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 font-medium transition-colors">
            <HiArrowLeft className="text-sm" /> Back to Site
          </Link>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/40 safe-bottom">
          <div className="flex justify-around items-center h-[60px] px-1 max-w-lg mx-auto">
            {mobileNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${isActive ? "text-orange-500" : "text-slate-400"}`}>
                  <item.icon className="text-lg" />
                  <span className="text-[9px] font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminGuard><AdminContent>{children}</AdminContent></AdminGuard>;
}
