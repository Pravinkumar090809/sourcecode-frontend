"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import {
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";

export default function BottomNav() {
  const { token } = useAuthStore();
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const links = [
    { href: "/", icon: HiOutlineHome, label: "Home" },
    { href: "/categories", icon: HiOutlineSquares2X2, label: "Browse" },
    { href: "/products", icon: HiOutlineMagnifyingGlass, label: "Explore" },
    {
      href: token ? "/dashboard" : "/login",
      icon: HiOutlineShoppingBag,
      label: "Orders",
    },
    {
      href: token ? "/dashboard/profile" : "/login",
      icon: HiOutlineUser,
      label: "Profile",
    },
  ];

  return (
    <nav
      className="md:hidden"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        background: "rgba(8, 8, 15, 0.75)",
        backdropFilter: "blur(30px) saturate(1.5)",
        WebkitBackdropFilter: "blur(30px) saturate(1.5)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        boxSizing: "border-box",
        boxShadow:
          "0 -8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
          padding: "8px 4px 6px",
          margin: 0,
          boxSizing: "border-box",
        }}
      >
        {links.map((l) => {
          const active =
            pathname === l.href ||
            (l.href !== "/" && pathname.startsWith(l.href));

          const IconComponent = l.icon;

          return (
            <Link
              key={l.label}
              href={l.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: active ? "#ef4444" : "#64748b",
                flex: "1 1 0%",
                minWidth: 0,
                maxWidth: "20%",
                padding: "6px 2px",
                textDecoration: "none",
                gap: "3px",
                overflow: "hidden",
                borderRadius: "12px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxSizing: "border-box",
                background: active ? "rgba(239, 68, 68, 0.08)" : "transparent",
                position: "relative",
              }}
            >
              {active && (
                <div
                  style={{
                    position: "absolute",
                    top: "-1px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "20px",
                    height: "2px",
                    borderRadius: "0 0 2px 2px",
                    background: "linear-gradient(90deg, #ef4444, #f97316)",
                    boxShadow: "0 0 10px rgba(239, 68, 68, 0.5)",
                  }}
                />
              )}
              <IconComponent
                style={{
                  fontSize: "20px",
                  flexShrink: 0,
                  width: "20px",
                  height: "20px",
                  filter: active ? "drop-shadow(0 0 6px rgba(239,68,68,0.4))" : "none",
                }}
              />
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: active ? 600 : 500,
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                  display: "block",
                  textAlign: "center",
                  letterSpacing: "0.01em",
                }}
              >
                {l.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}