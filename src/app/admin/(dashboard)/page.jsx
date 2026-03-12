"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { adminAPI, orderAPI, productAPI } from "@/lib/api";
import { HiOutlineChartBarSquare, HiOutlineCurrencyRupee, HiOutlineShoppingBag, HiOutlineUsers, HiOutlineArrowTrendingUp, HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FiPackage } from "react-icons/fi";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const key = Cookies.get("admin_api_key");

  useEffect(() => {
    if (!key) return;
    Promise.all([
      adminAPI.dashboard(key),
      orderAPI.adminAll(key),
    ]).then(([dashRes, ordersRes]) => {
      if (dashRes.success) setStats(dashRes.data || dashRes);
      if (ordersRes.success) setOrders((ordersRes.orders || ordersRes.data || []).slice(0, 5));
      setLoading(false);
    });
  }, [key]);

  const statCards = [
    { icon: HiOutlineCurrencyRupee, label: "Total Revenue", value: stats ? `₹${stats.total_revenue || stats.revenue || 0}` : "—", color: "#ef4444" },
    { icon: HiOutlineClipboardDocumentList, label: "Total Orders", value: stats?.total_orders || stats?.orders || 0, color: "#22c55e" },
    { icon: HiOutlineShoppingBag, label: "Products", value: stats?.total_products || stats?.products || 0, color: "#f59e0b" },
    { icon: HiOutlineUsers, label: "Users", value: stats?.total_users || stats?.users || 0, color: "#8b5cf6" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8 animate-fadeIn">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <HiOutlineChartBarSquare className="text-red-400 flex-shrink-0" /> Dashboard
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">Overview of your marketplace</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statCards.map((s, i) => (
          <div key={i} className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5 animate-fadeIn hover-lift" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}15` }}>
                <s.icon className="text-sm sm:text-lg" style={{ color: s.color }} />
              </div>
              <HiOutlineArrowTrendingUp className="text-green-400 ml-auto text-sm sm:text-base" />
            </div>
            <p className="text-lg sm:text-2xl font-bold text-white">{loading ? "..." : s.value}</p>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: "300ms" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-white">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs text-red-400 hover:text-red-300 transition-colors">View All →</Link>
        </div>
        {loading ? (
          <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-14 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.03)" }} />)}</div>
        ) : orders.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
              <table className="table-glass">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => (
                    <tr key={i}>
                      <td className="font-mono text-xs">{o.id?.slice(0, 8)}...</td>
                      <td><div className="flex items-center gap-2"><FiPackage className="text-red-400 flex-shrink-0" /><span className="truncate max-w-[180px]">{o.product_title || "—"}</span></div></td>
                      <td className="font-medium">₹{o.amount || o.price || 0}</td>
                      <td><span className={`px-2 py-0.5 rounded-full text-xs ${((o.payment_status||"").toLowerCase() === "paid") ? "text-green-400 bg-green-500/10" : "text-amber-400 bg-amber-500/10"}`}>{(o.payment_status || "pending").toLowerCase()}</span></td>
                      <td className="text-slate-500 text-xs">{new Date(o.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Cards */}
            <div className="sm:hidden space-y-3">
              {orders.map((o, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <FiPackage className="text-red-400 flex-shrink-0 text-sm" />
                      <span className="text-sm text-white font-medium truncate">{o.product_title || "—"}</span>
                    </div>
                    <span className="font-medium text-white text-sm ml-2">₹{o.amount || o.price || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-500">{o.id?.slice(0, 8)}...</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${((o.payment_status||"").toLowerCase() === "paid") ? "text-green-400 bg-green-500/10" : "text-amber-400 bg-amber-500/10"}`}>{(o.payment_status || "pending").toLowerCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-sm text-slate-500">No orders yet</div>
        )}
      </div>
    </div>
  );
}
