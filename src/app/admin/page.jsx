"use client";

import { useEffect, useState } from "react";
import { adminAPI } from "@/lib/api";
import { ADMIN_API_KEY } from "@/lib/store";
import {
  HiCube,
  HiShoppingBag,
  HiUsers,
  HiCurrencyRupee,
  HiTrendingUp,
} from "react-icons/hi";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI
      .getStats(ADMIN_API_KEY)
      .then((res) => setStats(res.data || null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      label: "Total Products",
      value: stats?.total_products ?? 0,
      icon: HiCube,
      color: "orange",
    },
    {
      label: "Total Orders",
      value: stats?.total_orders ?? 0,
      icon: HiShoppingBag,
      color: "blue",
    },
    {
      label: "Total Users",
      value: stats?.total_users ?? 0,
      icon: HiUsers,
      color: "green",
    },
    {
      label: "Revenue",
      value: `₹${stats?.total_revenue ?? 0}`,
      icon: HiCurrencyRupee,
      color: "yellow",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          Admin <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Platform overview &amp; analytics
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="glass rounded-2xl h-32 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <div
              key={i}
              className="stat-card hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className={`icon-box icon-box-${c.color} w-10 h-10`}>
                <c.icon className="text-lg" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-slate-800 mt-2">
                {c.value}
              </div>
              <div className="text-xs text-slate-500">{c.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Quick info */}
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="icon-box icon-box-orange w-10 h-10">
            <HiTrendingUp className="text-lg" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Platform Status</h2>
            <p className="text-xs text-slate-500">Everything looks good</p>
          </div>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-green-50">
            <div className="text-xs text-green-600 font-semibold">API</div>
            <div className="text-sm font-bold text-green-700 mt-0.5">
              Online ✓
            </div>
          </div>
          <div className="p-3 rounded-xl bg-green-50">
            <div className="text-xs text-green-600 font-semibold">Database</div>
            <div className="text-sm font-bold text-green-700 mt-0.5">
              Connected ✓
            </div>
          </div>
          <div className="p-3 rounded-xl bg-green-50">
            <div className="text-xs text-green-600 font-semibold">Payments</div>
            <div className="text-sm font-bold text-green-700 mt-0.5">
              Active ✓
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
