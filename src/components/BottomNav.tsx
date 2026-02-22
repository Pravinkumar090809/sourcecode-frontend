// components/BottomNav.tsx
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

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-strong border-t border-white/30 safe-bottom">
        <div className="max-w-lg mx-auto flex justify-around items-center h-[68px] px-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[60px] py-2 px-3 rounded-2xl transition-all duration-300 ${
                  active
                    ? "text-orange-500"
                    : "text-slate-400 hover:text-slate-600 active:scale-95"
                }`}
              >
                {/* Active Background */}
                {active && (
                  <div className="absolute inset-0 bg-orange-500/8 rounded-2xl" />
                )}
                
                {/* Icon */}
                <item.icon 
                  className={`relative z-10 text-xl transition-all ${
                    active ? "scale-110 drop-shadow-[0_2px_8px_rgba(255,107,53,0.4)]" : ""
                  }`} 
                />
                
                {/* Label */}
                <span className={`relative z-10 text-[10px] font-semibold ${active ? "text-orange-500" : ""}`}>
                  {item.label}
                </span>
                
                {/* Active Dot */}
                {active && (
                  <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 shadow-sm shadow-orange-500/50" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}