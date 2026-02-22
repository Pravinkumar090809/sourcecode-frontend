"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineCodeBracket, HiOutlineChartBarSquare, HiOutlineCurrencyRupee, HiOutlineShoppingBag, HiOutlineDocumentPlus, HiOutlineClipboardDocumentList, HiOutlineUsers, HiOutlineStar, HiOutlineChatBubbleLeftRight, HiOutlineTicket, HiOutlineReceiptRefund, HiOutlineChartBar, HiOutlineArrowDownTray, HiOutlineCog6Tooth, HiOutlineEnvelope, HiOutlineGlobeAlt, HiOutlineShieldCheck, HiOutlineClipboardDocumentCheck, HiOutlineUser, HiOutlineKey, HiOutlineCloudArrowUp, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { useState } from "react";
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

  const sidebar = (
    <div className="h-full flex flex-col" style={{ background: "rgba(10,10,15,0.98)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="p-4 flex items-center gap-3 border-b border-white/5">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
          <HiOutlineCodeBracket className="text-white text-lg" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Admin Panel</h2>
          <p className="text-[10px] text-slate-500">SourceCode</p>
        </div>
        <button onClick={() => setOpen(false)} className="ml-auto lg:hidden text-slate-400">
          <FiX className="text-xl" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4 no-scrollbar">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider px-3 mb-1.5">{group.title}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${active ? "text-red-400 font-medium" : "text-slate-400 hover:text-white hover:bg-white/5"}`} style={active ? { background: "rgba(239,68,68,0.1)" } : {}}>
                    <item.icon className="text-base flex-shrink-0" />
                    <span>{item.label}</span>
                    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="p-3 border-t border-white/5">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all">
          <HiOutlineArrowRightOnRectangle className="text-base" /> Back to Site
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <button onClick={() => setOpen(true)} className="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-lg text-white" style={{ background: "rgba(239,68,68,0.2)", backdropFilter: "blur(10px)" }}>
        <FiMenu className="text-xl" />
      </button>
      {open && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} lg:sticky lg:top-0`}>
        {sidebar}
      </aside>
    </>
  );
}
