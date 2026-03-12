"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineCodeBracket,
  HiOutlineChartBarSquare,
  HiOutlineCurrencyRupee,
  HiOutlineShoppingBag,
  HiOutlineDocumentPlus,
  HiOutlineClipboardDocumentList,
  HiOutlineUsers,
  HiOutlineStar,
  HiOutlineChatBubbleLeftRight,
  HiOutlineTicket,
  HiOutlineReceiptRefund,
  HiOutlineChartBar,
  HiOutlineArrowDownTray,
  HiOutlineCog6Tooth,
  HiOutlineEnvelope,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
  HiOutlineClipboardDocumentCheck,
  HiOutlineUser,
  HiOutlineKey,
  HiOutlineCloudArrowUp,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { useState, useEffect, useCallback } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navGroups = [
  {
    title: "Overview",
    items: [
      { href: "/admin", icon: HiOutlineChartBarSquare, label: "Dashboard" },
      { href: "/admin/revenue", icon: HiOutlineCurrencyRupee, label: "Revenue" },
    ],
  },
  {
    title: "Products",
    items: [
      { href: "/admin/products", icon: HiOutlineShoppingBag, label: "All Products" },
      { href: "/admin/products/new", icon: HiOutlineDocumentPlus, label: "Add Product" },
      { href: "/admin/upload", icon: HiOutlineCloudArrowUp, label: "Upload Files" },
    ],
  },
  {
    title: "Orders & Users",
    items: [
      { href: "/admin/orders", icon: HiOutlineClipboardDocumentList, label: "Orders" },
      { href: "/admin/buyers", icon: HiOutlineUsers, label: "Buyers" },
    ],
  },
  {
    title: "Engagement",
    items: [
      { href: "/admin/reviews", icon: HiOutlineStar, label: "Reviews" },
      { href: "/admin/support", icon: HiOutlineChatBubbleLeftRight, label: "Support" },
      { href: "/admin/coupons", icon: HiOutlineTicket, label: "Coupons" },
      { href: "/admin/refunds", icon: HiOutlineReceiptRefund, label: "Refunds" },
    ],
  },
  {
    title: "Analytics",
    items: [
      { href: "/admin/reports", icon: HiOutlineChartBar, label: "Reports" },
      { href: "/admin/download-logs", icon: HiOutlineArrowDownTray, label: "Download Logs" },
      { href: "/admin/activity-logs", icon: HiOutlineClipboardDocumentCheck, label: "Activity Logs" },
    ],
  },
  {
    title: "Settings",
    items: [
      { href: "/admin/settings", icon: HiOutlineCog6Tooth, label: "General" },
      { href: "/admin/email-templates", icon: HiOutlineEnvelope, label: "Email Templates" },
      { href: "/admin/seo", icon: HiOutlineGlobeAlt, label: "SEO" },
      { href: "/admin/security", icon: HiOutlineShieldCheck, label: "Security" },
    ],
  },
  {
    title: "Account",
    items: [
      { href: "/admin/profile", icon: HiOutlineUser, label: "Profile" },
      { href: "/admin/change-password", icon: HiOutlineKey, label: "Change Password" },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const closeSidebar = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-[60] p-2.5 rounded-xl text-white/80 hover:text-white transition-colors"
        style={{ background: "rgba(15,15,25,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)" }}
        aria-label="Open menu"
      >
        <FiMenu className="text-lg" />
      </button>

      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden" onClick={closeSidebar} />}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-[80] h-dvh w-[260px] transform transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:translate-x-0 lg:z-10 lg:h-screen ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "rgba(8,8,14,0.98)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] flex-shrink-0">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
              <HiOutlineCodeBracket className="text-white text-lg" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-white leading-tight">Admin Panel</h2>
              <p className="text-[10px] text-slate-500 leading-tight">SourceCode</p>
            </div>
            <button onClick={closeSidebar} className="ml-auto lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors" aria-label="Close menu">
              <FiX className="text-lg" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-3 px-3 no-scrollbar">
            <div className="space-y-5">
              {navGroups.map((group) => (
                <div key={group.title}>
                  <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider px-3 mb-1.5">{group.title}</p>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                      return (
                        <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-all duration-200 ${active ? "text-red-400 font-medium bg-red-500/[0.08]" : "text-slate-400 hover:text-white hover:bg-white/[0.04]"}`}>
                          <item.icon className="text-base flex-shrink-0" />
                          <span className="truncate">{item.label}</span>
                          {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="px-3 py-3 border-t border-white/[0.06] flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-slate-500 hover:text-red-400 hover:bg-red-500/[0.06] transition-all">
              <HiOutlineArrowRightOnRectangle className="text-base" />
              <span>Back to Site</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
