"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { HiOutlineCodeBracket, HiOutlineShoppingBag, HiOutlineUser, HiOutlineArrowRightOnRectangle, HiOutlineCog6Tooth } from "react-icons/hi2";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function TopBar() {
  const { user, token, logout } = useAuthStore();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  if (pathname.startsWith("/admin")) return null;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(10,10,15,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
            <HiOutlineCodeBracket className="text-white text-lg" />
          </div>
          <span className="text-lg font-bold text-white hidden sm:block">Source<span style={{ color: "#ef4444" }}>Code</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${pathname === l.href ? "text-red-400 bg-red-500/10" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {token ? (
            <>
              <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                <HiOutlineShoppingBag className="text-base" /> Dashboard
              </Link>
              <Link href="/dashboard/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                <HiOutlineUser className="text-base" /> {user?.name?.split(" ")[0] || "Profile"}
              </Link>
              <button onClick={logout} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all">
                <HiOutlineArrowRightOnRectangle className="text-base" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all">Login</Link>
              <Link href="/signup" className="px-4 py-2 rounded-lg text-sm text-white font-medium transition-all" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>Sign Up</Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white text-2xl p-2">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 animate-fadeIn" style={{ background: "rgba(10,10,15,0.98)", backdropFilter: "blur(20px)" }}>
          <div className="p-4 space-y-1">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={`block px-4 py-3 rounded-lg text-sm transition-all ${pathname === l.href ? "text-red-400 bg-red-500/10" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
                {l.label}
              </Link>
            ))}
            <div className="border-t border-white/5 pt-3 mt-3 space-y-1">
              {token ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5">
                    <HiOutlineShoppingBag /> Dashboard
                  </Link>
                  <Link href="/dashboard/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5">
                    <HiOutlineUser /> Profile
                  </Link>
                  <button onClick={() => { logout(); setOpen(false); }} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-500/10">
                    <HiOutlineArrowRightOnRectangle /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5">Login</Link>
                  <Link href="/signup" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-sm text-center text-white font-medium" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
