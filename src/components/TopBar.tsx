"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function TopBar() {
  const { user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/40">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all group-hover:scale-105">
            S
          </div>
          <span className="text-lg font-extrabold gradient-text hidden sm:block">SourceCode</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: "/", label: "Home" },
            { href: "/products", label: "Products" },
            ...(user ? [{ href: "/dashboard", label: "Dashboard" }] : []),
            ...(user?.role === "admin" ? [{ href: "/admin", label: "Admin" }] : []),
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive(item.href)
                  ? "bg-gradient-to-r from-orange-500/10 to-yellow-500/5 text-orange-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/profile" className="hidden sm:flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/50 hover:bg-white/80 transition-all border border-white/60 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-white text-xs font-bold shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-slate-700">{user.name.split(" ")[0]}</span>
              </Link>
              <button onClick={logout} className="hidden sm:block text-xs text-slate-400 hover:text-red-500 transition-colors px-2 py-1">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-primary text-sm !py-2.5 !px-5">Login</Link>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-slate-500 hover:text-slate-800 p-2 rounded-xl hover:bg-white/50 transition-all">
            {menuOpen ? <HiX className="text-xl" /> : <HiMenuAlt3 className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass-strong border-t border-white/40 animate-fade-in-down">
          <div className="px-4 py-3 space-y-1">
            {[
              { href: "/", label: "🏠 Home" },
              { href: "/products", label: "🛍️ Products" },
              ...(user ? [{ href: "/dashboard", label: "📊 Dashboard" }] : []),
              ...(user ? [{ href: "/profile", label: "👤 Profile" }] : []),
              ...(user?.role === "admin" ? [{ href: "/admin", label: "⚙️ Admin Panel" }] : []),
              ...(!user ? [{ href: "/login", label: "🔐 Login" }] : []),
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? "bg-orange-500/10 text-orange-600"
                    : "text-slate-600 hover:bg-white/50 hover:text-slate-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <button onClick={() => { logout(); setMenuOpen(false); }} className="block w-full text-left py-2.5 px-4 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all font-medium">
                🚪 Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
