"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiChartBar,
  HiCloudUpload,
  HiCog,
  HiShoppingBag,
  HiUsers,
  HiViewGrid,
} from "react-icons/hi";

const navItems = [
  { href: "/admin", icon: HiChartBar, label: "Dashboard" },
  { href: "/admin/products", icon: HiShoppingBag, label: "Products" },
  { href: "/admin/orders", icon: HiViewGrid, label: "Orders" },
  { href: "/admin/users", icon: HiUsers, label: "Users" },
  { href: "/admin/upload", icon: HiCloudUpload, label: "Upload" },
  { href: "/admin/settings", icon: HiCog, label: "Settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-[260px] min-h-screen glass border-r border-white/20 fixed left-0 top-0 z-40 pt-20">
      <div className="px-5 pb-4 mb-2 border-b border-white/10">
        <h2 className="text-lg font-bold gradient-text">Admin Panel</h2>
        <p className="text-xs text-slate-500 mt-0.5">Manage your platform</p>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                active
                  ? "bg-gradient-to-r from-orange-500/15 to-yellow-400/10 text-orange-600 shadow-sm shadow-orange-500/10 border border-orange-500/20"
                  : "text-slate-500 hover:text-slate-700 hover:bg-white/40"
              }`}
            >
              <item.icon
                className={`text-lg transition-all ${
                  active ? "text-orange-500 drop-shadow-[0_2px_8px_rgba(255,107,53,0.4)]" : "group-hover:text-orange-400"
                }`}
              />
              <span className="text-sm font-medium">{item.label}</span>
              {active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 shadow shadow-orange-500/50" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mx-3 mb-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-yellow-400/5 border border-orange-500/10">
        <p className="text-xs text-slate-500 font-medium">Source Code Web</p>
        <p className="text-[10px] text-slate-400 mt-0.5">v1.0.0 • Admin</p>
      </div>
    </aside>
  );
}
