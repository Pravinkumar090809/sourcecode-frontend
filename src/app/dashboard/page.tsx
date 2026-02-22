"use client";

import { useEffect, useState } from "react";
import { orderAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { AuthGuard } from "@/components/AuthGuard";
import Loading from "@/components/Loading";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiShoppingBag, HiClock, HiCheckCircle, HiXCircle, HiDownload, HiArrowRight } from "react-icons/hi";

interface Order {
  id: string;
  product_id: string;
  buyer_email: string;
  payment_status: string;
  cashfree_order_id: string | null;
  created_at: string;
  products?: { title?: string; price?: number };
}

function DashboardContent() {
  const { user, token } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email && token) {
      orderAPI.getByEmail(token, user.email).then((res) => {
        if (res.success) setOrders(res.data || []);
        setLoading(false);
      });
    }
  }, [user, token]);

  const paidOrders = orders.filter((o) => o.payment_status === "PAID");
  const pendingOrders = orders.filter((o) => o.payment_status === "PENDING");

  return (
    <div className="px-4 py-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Welcome */}
        <div className="glass-strong p-6 sm:p-8 mb-6 animate-fade-in-up relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-pink-500" />
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-white text-xl font-extrabold shadow-xl shadow-orange-500/20">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-800">Welcome, {user?.name?.split(" ")[0]}! 👋</h1>
              <p className="text-sm text-slate-400">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          {[
            { icon: HiShoppingBag, value: orders.length, label: "Total Orders", color: "text-orange-500", bg: "icon-box-orange" },
            { icon: HiCheckCircle, value: paidOrders.length, label: "Purchased", color: "text-emerald-500", bg: "icon-box-green" },
            { icon: HiClock, value: pendingOrders.length, label: "Pending", color: "text-amber-500", bg: "icon-box-orange" },
          ].map((s, i) => (
            <div key={i} className="stat-card text-center animate-fade-in-up" style={{ animationDelay: `${0.08 * i}s` }}>
              <div className={`icon-box ${s.bg} mx-auto mb-2 w-10 h-10`}>
                <s.icon className={`${s.color} text-lg`} />
              </div>
              <p className="text-2xl font-extrabold text-slate-800">{s.value}</p>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Orders */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-800">Your <span className="gradient-text">Orders</span></h2>
          <Link href="/products" className="text-sm text-orange-500 flex items-center gap-1 hover:text-orange-600 font-semibold">
            Shop More <HiArrowRight />
          </Link>
        </div>

        {loading ? <Loading /> : orders.length === 0 ? (
          <div className="glass p-10 text-center animate-fade-in-scale">
            <div className="icon-box icon-box-orange mx-auto mb-4 w-16 h-16">
              <HiShoppingBag className="text-orange-500 text-2xl" />
            </div>
            <p className="text-slate-500 font-medium mb-1">No orders yet</p>
            <p className="text-xs text-slate-400 mb-5">Start shopping for premium source code</p>
            <Link href="/products" className="btn-primary text-sm">Browse Products</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order, i) => (
              <div key={order.id} className="glass p-4 sm:p-5 flex items-center justify-between animate-fade-in-up" style={{ animationDelay: `${0.05 * i}s` }}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    order.payment_status === "PAID" ? "bg-emerald-50 border border-emerald-100" : order.payment_status === "PENDING" ? "bg-amber-50 border border-amber-100" : "bg-red-50 border border-red-100"
                  }`}>
                    {order.payment_status === "PAID" ? <HiCheckCircle className="text-emerald-500 text-lg" /> :
                     order.payment_status === "PENDING" ? <HiClock className="text-amber-500 text-lg" /> :
                     <HiXCircle className="text-red-500 text-lg" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-700 truncate">{order.products?.title || "Product"}</p>
                    <p className="text-[11px] text-slate-400">{new Date(order.created_at).toLocaleDateString("en-IN")}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className={`badge text-[10px] ${order.payment_status === "PAID" ? "badge-success" : order.payment_status === "PENDING" ? "badge-pending" : "badge-error"}`}>
                      {order.payment_status}
                    </span>
                    <p className="text-sm font-extrabold gradient-text mt-1">₹{order.products?.price || 0}</p>
                  </div>
                  {order.payment_status === "PAID" && (
                    <button
                      onClick={async () => {
                        const res = await orderAPI.download(token!, order.id, user!.email);
                        if (res.success) window.open(res.data.download_url, "_blank");
                        else toast.error(res.message || "Download failed");
                      }}
                      className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 hover:bg-emerald-100 transition-colors"
                      title="Download"
                    >
                      <HiDownload />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return <AuthGuard><DashboardContent /></AuthGuard>;
}
