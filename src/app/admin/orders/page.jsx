"use client";

import { useEffect, useState, useMemo } from "react";
import { orderAPI } from "@/lib/api";
import { ADMIN_API_KEY } from "@/lib/store";
import {
  HiViewGrid,
  HiSearch,
  HiCheckCircle,
  HiXCircle,
  HiClock,
  HiCube,
} from "react-icons/hi";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    orderAPI
      .adminAll(ADMIN_API_KEY)
      .then((res) => setOrders(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return orders;
    const q = search.toLowerCase();
    return orders.filter(
      (o) =>
        o.id?.toLowerCase().includes(q) ||
        o.user_email?.toLowerCase().includes(q) ||
        o.product_name?.toLowerCase().includes(q) ||
        o.status?.toLowerCase().includes(q)
    );
  }, [orders, search]);

  const statusIcon = (status) => {
    if (status === "completed")
      return <HiCheckCircle className="text-green-500" />;
    if (status === "failed") return <HiXCircle className="text-red-500" />;
    return <HiClock className="text-yellow-500" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          All <span className="gradient-text">Orders</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">{orders.length} orders</p>
      </div>

      <div className="relative max-w-md">
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-glass pl-11"
          placeholder="Search orders..."
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="glass rounded-2xl h-20 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <HiViewGrid className="text-4xl text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">
            {search ? "No orders match" : "No orders yet"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
            <div
              key={order.id}
              className="glass rounded-2xl p-4 sm:p-5 flex items-center gap-4"
            >
              <div className="icon-box icon-box-blue w-10 h-10 shrink-0">
                <HiCube className="text-lg" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-slate-800 truncate">
                  {order.product_name || `Order #${order.id.slice(0, 8)}`}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 truncate">
                  {order.user_email || "—"} •{" "}
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="text-sm font-bold text-slate-700 shrink-0">
                ₹{order.amount || 0}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
