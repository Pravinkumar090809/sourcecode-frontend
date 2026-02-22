"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { orderAPI } from "@/lib/api";
import { HiOutlineCurrencyRupee, HiOutlineArrowTrendingUp, HiOutlineChartBar } from "react-icons/hi2";

export default function RevenuePage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const key = Cookies.get("admin_api_key");

  useEffect(() => {
    if (key) orderAPI.adminStats(key).then((res) => {
      if (res.success) setStats(res.data || res);
      setLoading(false);
    });
  }, [key]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <HiOutlineCurrencyRupee className="text-red-400" /> Revenue
        </h1>
        <p className="text-slate-500 text-sm">Revenue analytics and insights</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Revenue", value: stats ? `₹${stats.total_revenue || 0}` : "—", color: "#ef4444" },
          { label: "Total Orders", value: stats?.total_orders || 0, color: "#22c55e" },
          { label: "Avg. Order Value", value: stats && stats.total_orders > 0 ? `₹${Math.round((stats.total_revenue || 0) / stats.total_orders)}` : "—", color: "#f59e0b" },
        ].map((s, i) => (
          <div key={i} className="glass rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center justify-between mb-3">
              <HiOutlineChartBar className="text-xl" style={{ color: s.color }} />
              <HiOutlineArrowTrendingUp className="text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">{loading ? "..." : s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="glass rounded-2xl p-8 text-center animate-fadeIn">
        <HiOutlineChartBar className="text-4xl text-slate-600 mx-auto mb-3" />
        <p className="text-sm text-slate-500">Detailed revenue charts coming soon</p>
      </div>
    </div>
  );
}
