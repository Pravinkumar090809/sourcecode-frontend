"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { HiOutlineHome, HiOutlineSquares2X2, HiOutlineShoppingBag, HiOutlineUser, HiOutlineMagnifyingGlass } from "react-icons/hi2";

export default function BottomNav() {
  const { token } = useAuthStore();
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const links = [
    { href: "/", icon: HiOutlineHome, label: "Home" },
    { href: "/categories", icon: HiOutlineSquares2X2, label: "Browse" },
    { href: "/products", icon: HiOutlineMagnifyingGlass, label: "Explore" },
    { href: token ? "/dashboard" : "/login", icon: HiOutlineShoppingBag, label: "Orders" },
    { href: token ? "/dashboard/profile" : "/login", icon: HiOutlineUser, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{ background: "rgba(10,10,15,0.92)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center justify-around py-2 px-2">
        {links.map((l) => {
          const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
          return (
            <Link key={l.label} href={l.href} className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all duration-200" style={active ? { color: "#ef4444" } : { color: "#64748b" }}>
              <l.icon className="text-xl" />
              <span className="text-[10px] font-medium">{l.label}</span>
              {active && <div className="w-1 h-1 rounded-full mt-0.5" style={{ background: "#ef4444" }} />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
