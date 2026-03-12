"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { orderAPI } from "@/lib/api";
import { HiOutlineCurrencyRupee, HiOutlineArrowTrendingUp, HiOutlineChartBar } from "react-icons/hi2";

export default function RevenuePage() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const key = Cookies.get("admin_api_key");

  // utility to format date labels
  const getLastDays = (n) => {
    const arr = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      arr.push(d);
    }
    return arr;
  };

  useEffect(() => {
    if (key) {
      orderAPI.adminStats(key).then((res) => {
        if (res.success) setStats(res.data || res);
        setLoading(false);
      });
      // also pull all orders for chart
      orderAPI.adminAll(key).then((r) => {
        if (r.success) {
          setOrders(r.orders || r.data || []);
        }
      });
    }
  }, [key]);

  // generate some fake orders for preview (if enabled)
  const previewOrders = (() => {
    if (!showPreview) return [];
    const arr = [];
    const days = getLastDays(7);
    days.forEach((d, idx) => {
      arr.push({
        payment_status: "paid",
        created_at: d.toISOString(),
        products: { price: Math.round(Math.random() * 500 + 100) },
      });
    });
    return arr;
  })();

  // prepare chart data (last 7 days)
  const chartData = (() => {
    const source = (orders.length ? orders : previewOrders);
    if (source.length === 0) return [];
    const dayMap = {};
    // iterate orders, group by simple date
    source.forEach((o) => {
      if ((o.payment_status || "").toLowerCase() !== "paid") return;
      const d = new Date(o.created_at || o.createdAt || o.createdAt || o.created_at);
      const keyDate = d.toISOString().slice(0, 10);
      const price = o.products?.price || o.amount || 0;
      dayMap[keyDate] = (dayMap[keyDate] || 0) + price;
    });
    const days = getLastDays(7);
    return days.map((d) => {
      const label = d.toLocaleDateString("en-US", { weekday: "short" });
      const v = dayMap[d.toISOString().slice(0, 10)] || 0;
      return { label, value: v };
    });
  })();

  function RevenueChart({ data }) {
    if (!data || data.length === 0) return <p className="text-sm text-slate-500">No revenue data yet</p>;
    const max = Math.max(...data.map((d) => d.value));
    return (
      <div className="flex items-end gap-2 h-40">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end">
            <div
              className="bg-red-400 transition-all"
              style={{ height: max ? `${(d.value / max) * 100}%` : "0%" }}
            />
            <div className="text-xs text-center mt-1">{d.label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8 animate-fadeIn flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <HiOutlineCurrencyRupee className="text-red-400 flex-shrink-0" /> Revenue Analytics
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">Revenue insights and financial overview</p>
        </div>
        <button
          onClick={() => setShowPreview((p) => !p)}
          className="btn-secondary text-xs px-3 py-1"
        >
          {showPreview ? "Hide" : "Show"} Preview
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {showPreview && (
          <div className="col-span-full text-center text-xs text-yellow-300 mb-2">
            Preview data is being shown; real orders will replace this.
          </div>
        )}
        {[
          { label: "Total Revenue", value: stats ? `₹${stats.total_revenue || 0}` : "—", color: "#ef4444" },
          { label: "Total Orders", value: stats?.total_orders || 0, color: "#22c55e" },
          { label: "Avg. Order Value", value: stats && stats.total_orders > 0 ? `₹${Math.round((stats.total_revenue || 0) / stats.total_orders)}` : "—", color: "#f59e0b" },
        ].map((s, i) => (
          <div key={i} className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 animate-fadeIn hover-lift" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <HiOutlineChartBar className="text-lg sm:text-xl" style={{ color: s.color }} />
              <HiOutlineArrowTrendingUp className="text-green-400" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-white">{loading ? "..." : s.value}</p>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 animate-fadeIn">
        <h2 className="text-lg font-semibold text-white mb-4">Last 7 Days Revenue</h2>
        <RevenueChart data={chartData} />
        <p className="text-xs sm:text-sm text-slate-500 mt-4">
          Amounts shown are for paid orders only.
        </p>
      </div>
    </div>
  );
}
