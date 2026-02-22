// components/TopBar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { HiMenuAlt3, HiX, HiChevronDown } from "react-icons/hi";

export default function TopBar() {
  const { user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path;

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    ...(user ? [{ href: "/dashboard", label: "Dashboard" }] : []),
    ...(user?.role === "admin" ? [{ href: "/admin", label: "Admin" }] : []),
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 safe-top">
      <div className="glass-strong border-b border-white/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-white font-extrabold text-base sm:text-lg shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all group-hover:scale-105">
                S
              </div>
              <span className="text-base sm:text-lg font-extrabold gradient-text hidden xs:block">
                SourceCode
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => (
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

            {/* Right Side */}
            <div className="flex items-center gap-2 sm:gap-3">
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  {/* User Button */}
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white/50 hover:bg-white/80 transition-all border border-white/60 shadow-sm"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-md">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-slate-700 hidden sm:block max-w-[80px] truncate">
                      {user.name.split(" ")[0]}
                    </span>
                    <HiChevronDown className={`text-slate-400 hidden sm:block transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 glass-strong rounded-xl shadow-xl overflow-hidden animate-fade-in-down z-50">
                      <div className="p-3 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/dashboard"
                          className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                          📊 Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                          👤 Profile
                        </Link>
                        {user.role === "admin" && (
                          <Link
                            href="/admin"
                            className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            ⚙️ Admin Panel
                          </Link>
                        )}
                        <hr className="my-2 border-slate-100" />
                        <button
                          onClick={logout}
                          className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          🚪 Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors hidden sm:block px-3 py-2"
                  >
                    Login
                  </Link>
                  <Link href="/signup" className="btn-primary text-xs sm:text-sm !py-2 !px-4 sm:!px-5">
                    Sign Up
                  </Link>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-white/50 transition-all"
              >
                {menuOpen ? <HiX className="text-xl" /> : <HiMenuAlt3 className="text-xl" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/30 animate-fade-in-down">
            <div className="px-4 py-3 space-y-1 max-h-[60vh] overflow-y-auto">
              {[
                { href: "/", label: "🏠 Home" },
                { href: "/products", label: "🛍️ Products" },
                ...(user ? [{ href: "/dashboard", label: "📊 Dashboard" }] : []),
                ...(user ? [{ href: "/profile", label: "👤 Profile" }] : []),
                ...(user?.role === "admin" ? [{ href: "/admin", label: "⚙️ Admin Panel" }] : []),
                ...(!user ? [{ href: "/login", label: "🔐 Login" }] : []),
                ...(!user ? [{ href: "/signup", label: "✨ Sign Up" }] : []),
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? "bg-orange-500/10 text-orange-600"
                      : "text-slate-600 hover:bg-white/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {user && (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left py-2.5 px-4 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all font-medium"
                >
                  🚪 Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}