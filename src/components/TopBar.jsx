"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import {
  HiOutlineCodeBracket,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineBell,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function TopBar() {
  const { user, token, logout } = useAuthStore();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    try {
      const n = parseInt(localStorage.getItem("unread_notifications") || "0", 10);
      setUnread(Number.isNaN(n) ? 0 : n);
    } catch (e) {
      setUnread(0);
    }
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      // close profile dropdown when clicking outside
      if (!e.target.closest) return;
      const el = document.querySelector('[data-profile-dropdown]');
      if (el && !el.contains(e.target)) setProfileOpen(false);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

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
    <>
      {/* HEADER BAR */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          width: "100%",
          background: scrolled
            ? "rgba(10, 10, 18, 0.75)"
            : "rgba(10, 10, 18, 0.5)",
          backdropFilter: "blur(30px) saturate(1.5)",
          WebkitBackdropFilter: "blur(30px) saturate(1.5)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.04)",
          boxSizing: "border-box",
          transition: "all 0.3s ease",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)"
            : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 16px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                minWidth: "38px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                boxShadow: "0 4px 20px rgba(239, 68, 68, 0.3)",
              }}
            >
              <HiOutlineCodeBracket
                style={{ color: "white", fontSize: "18px" }}
              />
            </div>
            <span
              className="hidden sm:block"
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "white",
                whiteSpace: "nowrap",
                letterSpacing: "-0.02em",
              }}
            >
              Source
              <span
                style={{
                  background: "linear-gradient(135deg, #ef4444, #f97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Code
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex"
            style={{
              alignItems: "center",
              gap: "2px",
              padding: "4px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            {navLinks.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    fontWeight: isActive ? 600 : 400,
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    color: isActive ? "#fff" : "#94a3b8",
                    background: isActive
                      ? "rgba(239, 68, 68, 0.15)"
                      : "transparent",
                    boxShadow: isActive
                      ? "0 0 20px rgba(239, 68, 68, 0.1)"
                      : "none",
                  }}
                >
                  {l.href === "/notifications" ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <HiOutlineBell style={{ fontSize: 15, color: isActive ? "#fff" : "#fca5a5" }} />
                      <span>{l.label}</span>
                      {unread > 0 && (
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: 18,
                          height: 18,
                          padding: "0 6px",
                          borderRadius: 9999,
                          background: "#ef4444",
                          color: "white",
                          fontSize: 12,
                          fontWeight: 700,
                          marginLeft: 6,
                        }}>{unread > 99 ? "99+" : unread}</span>
                      )}
                    </span>
                  ) : (
                    l.label
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth */}
          <div
            className="hidden md:flex"
            style={{
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
            }}
          >
            {token ? (
              <>
                <Link
                  href="/dashboard"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 14px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    color: "#94a3b8",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <HiOutlineShoppingBag style={{ fontSize: "15px" }} />
                  Dashboard
                </Link>

                {/* Notifications icon (replaces logout) */}
                <Link
                  href="/notifications"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    color: "#94a3b8",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <HiOutlineBell style={{ fontSize: 16, color: "#fca5a5" }} />
                  {unread > 0 && (
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 18,
                      height: 18,
                      padding: "0 6px",
                      borderRadius: 9999,
                      background: "#ef4444",
                      color: "white",
                      fontSize: 12,
                      fontWeight: 700,
                    }}>{unread > 99 ? "99+" : unread}</span>
                  )}
                </Link>

                {/* Profile dropdown */}
                <div style={{ position: 'relative' }} data-profile-dropdown>
                  <button
                    onClick={() => setProfileOpen((s) => !s)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 12px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      color: "#94a3b8",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                      cursor: 'pointer'
                    }}
                  >
                    <HiOutlineUser style={{ fontSize: 15 }} />
                    {user?.name?.split(" ")[0] || "Profile"}
                  </button>
                  {profileOpen && (
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      marginTop: 8,
                      background: 'rgba(10,10,18,0.98)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 12,
                      padding: 8,
                      minWidth: 160,
                      zIndex: 200,
                    }}>
                      <Link href="/dashboard/profile" style={{ display: 'block', padding: '8px 10px', color: '#cbd5e1', textDecoration: 'none', borderRadius: 8 }} onClick={() => setProfileOpen(false)}>Profile</Link>
                      <button onClick={() => { logout(); setProfileOpen(false); }} style={{ display: 'block', width: '100%', marginTop: 6, padding: '8px 10px', color: '#f87171', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', borderRadius: 8 }}>Logout</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  style={{
                    padding: "8px 18px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    color: "#cbd5e1",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  style={{
                    padding: "8px 18px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    color: "white",
                    fontWeight: 600,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    background: "linear-gradient(135deg, #ef4444, #dc2626)",
                    boxShadow: "0 4px 20px rgba(239, 68, 68, 0.25)",
                    transition: "all 0.3s",
                  }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            style={{
              color: "white",
              fontSize: "22px",
              padding: "10px",
              background: open
                ? "rgba(239, 68, 68, 0.1)"
                : "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              cursor: "pointer",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              position: "relative",
              zIndex: 101,
            }}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU - OUTSIDE HEADER */}
      {open && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
            background: "rgba(5, 5, 12, 0.95)",
            backdropFilter: "blur(40px) saturate(1.5)",
            WebkitBackdropFilter: "blur(40px) saturate(1.5)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            overflowY: "auto",
            overflowX: "hidden",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              padding: "20px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {navLinks.map((l, i) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "14px 18px",
                    borderRadius: "14px",
                    fontSize: "15px",
                    fontWeight: isActive ? 600 : 400,
                    textDecoration: "none",
                    transition: "all 0.2s",
                    color: isActive ? "#fff" : "#94a3b8",
                    background: isActive
                      ? "rgba(239, 68, 68, 0.12)"
                      : "rgba(255,255,255,0.02)",
                    border: isActive
                      ? "1px solid rgba(239, 68, 68, 0.2)"
                      : "1px solid transparent",
                    boxSizing: "border-box",
                    opacity: 0,
                    animation: `slideDown 0.3s ease forwards`,
                    animationDelay: `${i * 50}ms`,
                  }}
                >
                  {isActive && (
                    <div
                      style={{
                        width: "3px",
                        height: "20px",
                        borderRadius: "2px",
                        background:
                          "linear-gradient(180deg, #ef4444, #f97316)",
                        marginRight: "12px",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {l.href === "/notifications" ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                      <HiOutlineBell style={{ fontSize: 18, color: isActive ? "#fff" : "#94a3b8" }} />
                      <span>{l.label}</span>
                      {unread > 0 && (
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: 18,
                          height: 18,
                          padding: "0 6px",
                          borderRadius: 9999,
                          background: "#ef4444",
                          color: "white",
                          fontSize: 12,
                          fontWeight: 700,
                        }}>{unread > 99 ? "99+" : unread}</span>
                      )}
                    </span>
                  ) : (
                    l.label
                  )}
                </Link>
              );
            })}

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                margin: "12px 0",
              }}
            />

            {token ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 18px",
                    borderRadius: "14px",
                    fontSize: "15px",
                    color: "#94a3b8",
                    textDecoration: "none",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    transition: "all 0.2s",
                    boxSizing: "border-box",
                  }}
                >
                  <HiOutlineShoppingBag
                    style={{ flexShrink: 0, fontSize: "18px" }}
                  />
                  Dashboard
                </Link>

                {/* Mobile: profile collapsible with Logout inside */}
                <div>
                  <button onClick={() => setMobileProfileOpen((s) => !s)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderRadius: 14, fontSize: 15, color: '#94a3b8', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', width: '100%', textAlign: 'left' }}>
                    <HiOutlineUser style={{ flexShrink: 0, fontSize: 18 }} />
                    {user?.name?.split(' ')[0] || 'Profile'}
                  </button>
                  {mobileProfileOpen && (
                    <div style={{ paddingLeft: 12, paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <Link href="/dashboard/profile" onClick={() => { setOpen(false); setMobileProfileOpen(false); }} style={{ padding: '10px 16px', borderRadius: 10, color: '#cbd5e1', textDecoration: 'none', background: 'rgba(255,255,255,0.02)' }}>Profile</Link>
                      <button onClick={() => { logout(); setOpen(false); setMobileProfileOpen(false); }} style={{ padding: '10px 16px', borderRadius: 10, color: '#f87171', background: 'transparent', border: '1px solid rgba(239,68,68,0.12)', textAlign: 'left' }}>Logout</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginTop: "4px",
                }}
              >
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  style={{
                    display: "block",
                    padding: "14px 18px",
                    borderRadius: "14px",
                    fontSize: "15px",
                    color: "#cbd5e1",
                    textDecoration: "none",
                    textAlign: "center",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "all 0.2s",
                    boxSizing: "border-box",
                  }}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  style={{
                    display: "block",
                    padding: "14px 18px",
                    borderRadius: "14px",
                    fontSize: "15px",
                    textAlign: "center",
                    color: "white",
                    fontWeight: 600,
                    textDecoration: "none",
                    background:
                      "linear-gradient(135deg, #ef4444, #dc2626)",
                    boxShadow:
                      "0 4px 20px rgba(239, 68, 68, 0.25)",
                    transition: "all 0.2s",
                    boxSizing: "border-box",
                  }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}