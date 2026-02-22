"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { orderAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { AuthGuard } from "@/components/AuthGuard";
import { HiOutlineShoppingBag, HiOutlineArrowDownTray, HiOutlineCurrencyRupee, HiOutlineClipboardDocumentList, HiOutlineArrowRight, HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi2";
import { FiPackage } from "react-icons/fi";

function DashboardContent() {
  const { user, token } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && user?.email) {
      orderAPI.getByEmail(token, user.email).then((res) => {
        if (res.success) setOrders(res.orders || res.data || []);
        setLoading(false);
      });
    } else setLoading(false);
  }, [token, user]);

  const stats = [
    { icon: HiOutlineShoppingBag, label: "Total Orders", value: orders.length, color: "#ef4444" },
    { icon: HiOutlineCheckCircle, label: "Completed", value: orders.filter((o) => o.status === "completed" || o.payment_status === "paid").length, color: "#22c55e" },
    { icon: HiOutlineCurrencyRupee, label: "Total Spent", value: `₹${orders.reduce((s, o) => s + (o.amount || o.price || 0), 0)}`, color: "#f59e0b" },
    { icon: HiOutlineArrowDownTray, label: "Downloads", value: orders.filter((o) => o.payment_status === "paid").length, color: "#8b5cf6" },
  ];

  const quickLinks = [
    { href: "/dashboard/products", label: "My Products", icon: FiPackage, desc: "View purchased products" },
    { href: "/dashboard/downloads", label: "Downloads", icon: HiOutlineArrowDownTray, desc: "Download your files" },
    { href: "/dashboard/invoices", label: "Invoices", icon: HiOutlineClipboardDocumentList, desc: "View payment invoices" },
    { href: "/dashboard/support", label: "Support", icon: HiOutlineClock, desc: "Get help & support" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1">Welcome back, <span style={{ color: "#ef4444" }}>{user?.name?.split(" ")[0] || "User"}</span></h1>
        <p className="text-slate-500 text-sm">Here&apos;s an overview of your account</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="glass rounded-2xl p-4 animate-fadeIn" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                <s.icon className="text-lg" style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-xl font-bold text-white">{loading ? "—" : s.value}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickLinks.map((l, i) => (
          <Link key={i} href={l.href} className="glass rounded-2xl p-4 hover-lift group animate-fadeIn transition-all hover:border-red-500/20" style={{ animationDelay: `${(i + 4) * 80}ms` }}>
            <l.icon className="text-xl text-red-400 mb-3" />
            <h3 className="text-sm font-semibold text-white mb-0.5 group-hover:text-red-400 transition-colors">{l.label}</h3>
            <p className="text-xs text-slate-500">{l.desc}</p>
            <HiOutlineArrowRight className="text-slate-600 mt-2 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>

      <div className="glass rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: "400ms" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
          <Link href="/dashboard/products" className="text-xs text-red-400 hover:text-red-300">View All →</Link>
        </div>
        {loading ? (
          <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.03)" }} />)}</div>
        ) : orders.length > 0 ? (
          <div className="space-y-3">
            {orders.slice(0, 5).map((order, i) => (
              <Link key={i} href={`/dashboard/orders/${order.id}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                    <FiPackage className="text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">{order.product_title || `Order #${order.id?.slice(0, 8)}`}</p>
                    <p className="text-xs text-slate-500">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">₹{order.amount || order.price || 0}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${order.payment_status === "paid" ? "text-green-400 bg-green-500/10" : "text-amber-400 bg-amber-500/10"}`}>
                    {order.payment_status || "pending"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FiPackage className="text-3xl text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-500">No orders yet</p>
            <Link href="/products" className="text-xs text-red-400 mt-2 inline-block">Browse Products →</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return <AuthGuard><DashboardContent /></AuthGuard>;
}
