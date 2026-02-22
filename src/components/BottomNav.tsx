"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiShoppingBag, HiUser, HiViewGrid } from "react-icons/hi";
import { useAuthStore } from "@/lib/store";

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const navItems = [
    { href: "/", icon: HiHome, label: "Home" },
    { href: "/products", icon: HiShoppingBag, label: "Products" },
    { href: "/dashboard", icon: HiViewGrid, label: "Dashboard" },
    { href: user ? "/profile" : "/login", icon: HiUser, label: user ? "Profile" : "Login" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/40 safe-bottom">
      <div className="max-w-lg mx-auto flex justify-around items-center h-[68px] px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "text-orange-500 bg-orange-500/8 scale-105"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <item.icon className={`text-xl transition-all ${isActive ? "drop-shadow-[0_2px_8px_rgba(255,107,53,0.4)]" : ""}`} />
              <span className="text-[10px] font-semibold">{item.label}</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 shadow-sm shadow-orange-500/50" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
