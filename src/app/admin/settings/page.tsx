"use client";

import { HiCog, HiServer, HiKey, HiGlobe, HiShieldCheck, HiCode, HiDatabase, HiCreditCard } from "react-icons/hi";

export default function AdminSettings() {
  const items = [
    {
      title: "Platform Info",
      icon: <HiGlobe className="text-blue-500" />,
      boxClass: "icon-box-blue",
      rows: [
        { label: "Platform Name", value: "Source Code Web" },
        { label: "Version", value: "1.0.0" },
        { label: "Framework", value: "Next.js 16 + Express" },
      ],
    },
    {
      title: "Backend API",
      icon: <HiServer className="text-emerald-500" />,
      boxClass: "icon-box-green",
      rows: [
        { label: "Base URL", value: "sourcecode-backend-rxvt.onrender.com" },
        { label: "Auth", value: "JWT (Bearer Token)" },
        { label: "Hosting", value: "Render" },
      ],
    },
    {
      title: "Database",
      icon: <HiDatabase className="text-purple-500" />,
      boxClass: "icon-box-purple",
      rows: [
        { label: "Provider", value: "Supabase (PostgreSQL)" },
        { label: "Tables", value: "products, orders, users, admins" },
        { label: "Storage", value: "source-codes bucket" },
      ],
    },
    {
      title: "Payments",
      icon: <HiCreditCard className="text-orange-500" />,
      boxClass: "icon-box-orange",
      rows: [
        { label: "Gateway", value: "Cashfree" },
        { label: "Mode", value: "Sandbox (Test)" },
        { label: "API Version", value: "2023-08-01" },
      ],
    },
    {
      title: "Admin Credentials",
      icon: <HiShieldCheck className="text-amber-500" />,
      boxClass: "icon-box-orange",
      rows: [
        { label: "Admin Email", value: "admin@sourcecode.com" },
        { label: "Default Password", value: "••••••••••" },
        { label: "Role", value: "Super Admin" },
      ],
    },
    {
      title: "API Endpoints",
      icon: <HiCode className="text-blue-500" />,
      boxClass: "icon-box-blue",
      rows: [
        { label: "Products", value: "/api/products" },
        { label: "Orders", value: "/api/orders" },
        { label: "Auth", value: "/api/auth" },
        { label: "Payments", value: "/api/payments" },
        { label: "Admin", value: "/api/admin" },
      ],
    },
  ];

  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
          <HiCog className="text-slate-400" /> <span className="gradient-text">Settings</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">Platform configuration & information</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <div key={i} className="glass p-5 animate-fade-in-up" style={{ animationDelay: `${0.05 * i}s` }}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`icon-box ${item.boxClass} w-10 h-10`}>{item.icon}</div>
              <h2 className="font-bold text-slate-700">{item.title}</h2>
            </div>
            <div className="space-y-2.5">
              {item.rows.map((r, j) => (
                <div key={j} className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{r.label}</span>
                  <span className="text-slate-700 font-semibold text-right max-w-[60%] truncate">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="glass p-5 mt-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="icon-box icon-box-green w-10 h-10"><HiKey className="text-emerald-500" /></div>
          <h2 className="font-bold text-slate-700">Security Notes</h2>
        </div>
        <ul className="space-y-2 text-xs text-slate-500">
          <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Passwords hashed with bcrypt (12 rounds)</li>
          <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> JWT tokens expire after 7 days</li>
          <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Admin API key required for all admin endpoints</li>
          <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> File downloads use signed URLs (1 hour expiry)</li>
        </ul>
      </div>
    </div>
  );
}
