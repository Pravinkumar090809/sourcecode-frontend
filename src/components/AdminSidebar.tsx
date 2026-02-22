"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiViewGrid, HiShoppingBag, HiClipboardList, HiUsers, HiUpload, HiCog, HiArrowLeft } from "react-icons/hi";

const sidebarItems = [
  { href: "/admin", icon: HiViewGrid, label: "Dashboard", color: "text-orange-500" },
  { href: "/admin/products", icon: HiShoppingBag, label: "Products", color: "text-blue-500" },
  { href: "/admin/orders", icon: HiClipboardList, label: "Orders", color: "text-emerald-500" },
  { href: "/admin/users", icon: HiUsers, label: "Users", color: "text-purple-500" },
  { href: "/admin/upload", icon: HiUpload, label: "Upload", color: "text-pink-500" },
  { href: "/admin/settings", icon: HiCog, label: "Settings", color: "text-slate-500" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-[260px] min-h-screen glass-strong border-r border-white/40 fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="text-white font-extrabold text-lg">A</span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Admin Panel</p>
            <p className="text-[11px] text-slate-400">Manage everything</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-orange-500/10 to-yellow-500/5 text-orange-600 shadow-sm border border-orange-100"
                  : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
              }`}
            >
              <item.icon className={`text-lg ${isActive ? "text-orange-500" : item.color}`} />
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Back */}
      <div className="px-3 py-4 border-t border-slate-100">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white/50 transition-all">
          <HiArrowLeft className="text-lg" />
          <span className="text-sm font-medium">Back to Site</span>
        </Link>
      </div>
    </aside>
  );
}
