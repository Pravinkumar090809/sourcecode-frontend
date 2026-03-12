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
  const barHeights = [35, 45, 55, 40, 65, 80, 70, 90, 60, 75, 85, 95];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8 animate-fadeIn">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <HiOutlineChartBar className="text-red-400 flex-shrink-0" /> Sales Reports
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">Analytics, sales data and insights</p>
      </div>

      {loading ? (
        <div className="text-center py-12"><span className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin inline-block" /></div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 animate-fadeIn">
            {[
              { label: "Total Revenue", value: `₹${stats?.total_revenue || 0}`, icon: <HiOutlineCurrencyRupee />, color: "red" },
              { label: "Total Orders", value: stats?.total_orders || 0, icon: <HiOutlineShoppingCart />, color: "blue" },
              { label: "Avg Order Value", value: `₹${stats?.total_orders ? Math.round((stats?.total_revenue || 0) / stats.total_orders) : 0}`, icon: <HiOutlineArrowTrendingUp />, color: "green" },
              { label: "Completed", value: stats?.completed_orders || stats?.paid_orders || 0, icon: <HiOutlineChartBar />, color: "purple" },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <div className={`icon-box icon-box-${s.color} mb-2 sm:mb-3`}>{s.icon}</div>
                <p className="text-[10px] sm:text-xs text-slate-500 mb-0.5 sm:mb-1">{s.label}</p>
                <p className="text-lg sm:text-xl font-bold text-white">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 animate-fadeIn">
            <h2 className="text-base sm:text-lg font-semibold text-white mb-4">Monthly Overview</h2>
            <div className="flex items-end gap-1 sm:gap-2 h-36 sm:h-48">
              {months.map((m, i) => (
                <div key={m} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md sm:rounded-t-lg transition-all duration-500 hover:opacity-80"
                    style={{
                      height: `${barHeights[i]}%`,
                      background: "linear-gradient(to top, #dc2626, #ef4444)",
                    }}
                  />
                  <span className="text-[8px] sm:text-[10px] text-slate-500">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
