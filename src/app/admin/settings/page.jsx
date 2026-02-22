"use client";

import {
  HiCube,
  HiServer,
  HiCode,
  HiShieldCheck,
  HiGlobe,
  HiDatabase,
} from "react-icons/hi";

export default function AdminSettingsPage() {
  const cards = [
    {
      icon: HiGlobe,
      title: "Platform",
      items: [
        { label: "Name", value: "Source Code Web" },
        { label: "Version", value: "1.0.0" },
        { label: "Framework", value: "Next.js 16" },
      ],
      color: "orange",
    },
    {
      icon: HiServer,
      title: "Backend",
      items: [
        { label: "Runtime", value: "Node.js + Express" },
        { label: "Database", value: "Supabase PostgreSQL" },
        { label: "Host", value: "Render" },
      ],
      color: "blue",
    },
    {
      icon: HiShieldCheck,
      title: "Security",
      items: [
        { label: "Auth", value: "JWT + bcrypt" },
        { label: "Admin", value: "API Key Protected" },
        { label: "CORS", value: "Configured" },
      ],
      color: "green",
    },
    {
      icon: HiDatabase,
      title: "Storage",
      items: [
        { label: "Files", value: "Supabase Storage" },
        { label: "Format", value: "ZIP Archives" },
        { label: "Max Size", value: "50MB" },
      ],
      color: "yellow",
    },
    {
      icon: HiCube,
      title: "Payments",
      items: [
        { label: "Gateway", value: "Cashfree" },
        { label: "Mode", value: "Sandbox" },
        { label: "Currency", value: "INR (₹)" },
      ],
      color: "orange",
    },
    {
      icon: HiCode,
      title: "Frontend",
      items: [
        { label: "UI", value: "Tailwind CSS v4" },
        { label: "State", value: "Zustand" },
        { label: "Deploy", value: "Vercel" },
      ],
      color: "blue",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          Platform <span className="gradient-text">Settings</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Configuration &amp; platform info
        </p>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="glass rounded-2xl p-5 sm:p-6 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`icon-box icon-box-${card.color} w-9 h-9`}>
                <card.icon className="text-sm" />
              </div>
              <h3 className="font-bold text-slate-800">{card.title}</h3>
            </div>

            <div className="space-y-2.5">
              {card.items.map((item, j) => (
                <div
                  key={j}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-slate-500">{item.label}</span>
                  <span className="font-semibold text-slate-700">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
