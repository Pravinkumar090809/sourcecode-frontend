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
    { icon: HiOutlineCurrencyRupee, label: "Revenue", value: stats ? `₹${stats.total_revenue || stats.revenue || 0}` : "—", color: "#ef4444" },
    { icon: HiOutlineClipboardDocumentList, label: "Orders", value: stats?.total_orders || stats?.orders || 0, color: "#22c55e" },
    { icon: HiOutlineShoppingBag, label: "Products", value: stats?.total_products || stats?.products || 0, color: "#f59e0b" },
    { icon: HiOutlineUsers, label: "Users", value: stats?.total_users || stats?.users || 0, color: "#8b5cf6" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <HiOutlineChartBarSquare className="text-red-400" /> Dashboard
        </h1>
        <p className="text-slate-500 text-sm">Overview of your marketplace</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s, i) => (
          <div key={i} className="glass rounded-2xl p-5 animate-fadeIn hover-lift" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                <s.icon className="text-lg" style={{ color: s.color }} />
              </div>
              <HiOutlineArrowTrendingUp className="text-green-400 ml-auto" />
            </div>
            <p className="text-2xl font-bold text-white">{loading ? "..." : s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: "300ms" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs text-red-400 hover:text-red-300">View All →</Link>
        </div>
        {loading ? (
          <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-14 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.03)" }} />)}</div>
        ) : orders.length > 0 ? (
          <div className="overflow-x-auto">
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
                    <td><div className="flex items-center gap-2"><FiPackage className="text-red-400" />{o.product_title || "—"}</div></td>
                    <td className="font-medium">₹{o.amount || o.price || 0}</td>
                    <td><span className={`px-2 py-0.5 rounded-full text-xs ${o.payment_status === "paid" ? "text-green-400 bg-green-500/10" : "text-amber-400 bg-amber-500/10"}`}>{o.payment_status || "pending"}</span></td>
                    <td className="text-slate-500 text-xs">{new Date(o.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-sm text-slate-500">No orders yet</div>
        )}
      </div>
    </div>
  );
}
