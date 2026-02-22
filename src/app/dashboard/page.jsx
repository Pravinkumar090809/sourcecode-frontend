"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { orderAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { AuthGuard } from "@/components/AuthGuard";
import {
  HiDownload,
  HiShoppingBag,
  HiCube,
  HiClock,
  HiCheckCircle,
  HiXCircle,
} from "react-icons/hi";

function DashboardContent() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (!token) return;
    orderAPI
      .getMyOrders(token)
      .then((res) => setOrders(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const completed = orders.filter((o) => o.status === "completed");
  const pending = orders.filter((o) => o.status === "pending");

  const statusIcon = (status) => {
    if (status === "completed")
      return <HiCheckCircle className="text-green-500" />;
    if (status === "failed") return <HiXCircle className="text-red-500" />;
    return <HiClock className="text-yellow-500" />;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-4">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          Hey, <span className="gradient-text">{user?.name || "User"}</span> 👋
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Welcome to your dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="stat-card">
          <div className="icon-box icon-box-orange w-10 h-10">
            <HiShoppingBag className="text-lg" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-800">
            {orders.length}
          </div>
          <div className="text-xs text-slate-500">Total Orders</div>
        </div>

        <div className="stat-card">
          <div className="icon-box icon-box-green w-10 h-10">
            <HiCheckCircle className="text-lg" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-800">
            {completed.length}
          </div>
          <div className="text-xs text-slate-500">Completed</div>
        </div>

        <div className="stat-card col-span-2 sm:col-span-1">
          <div className="icon-box icon-box-yellow w-10 h-10">
            <HiClock className="text-lg" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-800">
            {pending.length}
          </div>
          <div className="text-xs text-slate-500">Pending</div>
        </div>
      </div>

      {/* Orders */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-4">Your Orders</h2>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass rounded-2xl h-20 animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center">
            <HiCube className="text-4xl text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 mb-4">No orders yet</p>
            <Link href="/products" className="btn-primary text-sm">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="glass rounded-2xl p-4 sm:p-5 flex items-center gap-4 hover:shadow-md transition-all"
              >
                <div className="icon-box icon-box-orange w-10 h-10 shrink-0">
                  <HiCube className="text-lg" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base text-slate-800 truncate">
                    {order.product_name || `Order #${order.id.slice(0, 8)}`}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {statusIcon(order.status)}
                  <span
                    className={`text-xs font-semibold capitalize ${
                      order.status === "completed"
                        ? "text-green-600"
                        : order.status === "failed"
                        ? "text-red-500"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {order.status === "completed" && order.download_url && (
                  <a
                    href={order.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-2 rounded-xl bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors"
                  >
                    <HiDownload className="text-lg" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
