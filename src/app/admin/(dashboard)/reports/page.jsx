"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { orderAPI } from "@/lib/api";
import { HiOutlineChartBar, HiOutlineArrowTrendingUp, HiOutlineCurrencyRupee, HiOutlineShoppingCart } from "react-icons/hi2";

export default function AdminReportsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const key = Cookies.get("admin_api_key");

  useEffect(() => {
    const load = async () => {
      const res = await orderAPI.adminStats(key);
      if (res.success) setStats(res.data || res);
      setLoading(false);
    };
    load();
  }, [key]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div>
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2"><HiOutlineChartBar className="text-red-400" /> Reports</h1>
        <p className="text-slate-500 text-sm">Sales and analytics reports</p>
      </div>

      {loading ? (
        <div className="text-center py-12"><span className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin inline-block" /></div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fadeIn">
            {[
              { label: "Total Revenue", value: `₹${stats?.total_revenue || 0}`, icon: <HiOutlineCurrencyRupee />, color: "red" },
              { label: "Total Orders", value: stats?.total_orders || 0, icon: <HiOutlineShoppingCart />, color: "blue" },
              { label: "Avg Order Value", value: `₹${stats?.total_orders ? Math.round((stats?.total_revenue || 0) / stats.total_orders) : 0}`, icon: <HiOutlineArrowTrendingUp />, color: "green" },
              { label: "Completed", value: stats?.completed_orders || stats?.paid_orders || 0, icon: <HiOutlineChartBar />, color: "purple" },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <div className={`icon-box icon-box-${s.color} mb-3`}>{s.icon}</div>
                <p className="text-xs text-slate-500 mb-1">{s.label}</p>
                <p className="text-xl font-bold text-white">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="glass rounded-2xl p-6 animate-fadeIn">
            <h2 className="text-lg font-semibold text-white mb-4">Monthly Overview</h2>
            <div className="flex items-end gap-2 h-48">
              {months.map((m, i) => {
                const h = Math.random() * 80 + 20;
                return (
                  <div key={m} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-lg bg-gradient-to-t from-red-600 to-red-400 transition-all duration-500 hover:opacity-80" style={{ height: `${h}%` }} />
                    <span className="text-[10px] text-slate-500">{m}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
