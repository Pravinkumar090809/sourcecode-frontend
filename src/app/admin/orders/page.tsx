"use client";

import { useEffect, useState } from "react";
import { orderAPI } from "@/lib/api";
import { ADMIN_API_KEY } from "@/lib/store";
import Loading from "@/components/Loading";
import { HiShoppingCart, HiMail, HiClock, HiSearch } from "react-icons/hi";

interface Order {
  id: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  amount: number;
  status: string;
  cashfree_order_id: string | null;
  created_at: string;
  product_title?: string;
  products?: { title: string };
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filtered, setFiltered] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const res = await orderAPI.adminAll(ADMIN_API_KEY);
      if (res.success) { setOrders(res.data || []); setFiltered(res.data || []); }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!search.trim()) setFiltered(orders);
    else {
      const q = search.toLowerCase();
      setFiltered(orders.filter((o) =>
        o.buyer_email?.toLowerCase().includes(q) ||
        o.buyer_name?.toLowerCase().includes(q) ||
        o.products?.title?.toLowerCase().includes(q)
      ));
    }
  }, [search, orders]);

  const statusBadge = (s: string) => {
    switch (s) {
      case "PAID": return "badge-success";
      case "PENDING": return "badge-warning";
      default: return "badge-error";
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="pb-20 lg:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Manage <span className="gradient-text">Orders</span></h1>
          <p className="text-xs text-slate-400 mt-1">{orders.length} total orders</p>
        </div>
        <div className="relative w-full sm:w-64">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="input-glass !pl-10 !py-2.5 text-sm" placeholder="Search orders..." />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass p-10 text-center animate-fade-in-scale">
          <div className="icon-box icon-box-blue mx-auto mb-4 w-16 h-16">
            <HiShoppingCart className="text-blue-500 text-2xl" />
          </div>
          <p className="text-slate-500 font-medium">{search ? "No matching orders" : "No orders yet"}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((o, i) => (
            <div key={o.id} className="glass p-4 sm:p-5 animate-fade-in-up" style={{ animationDelay: `${0.04 * i}s` }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="icon-box icon-box-orange w-11 h-11 shrink-0">
                    <HiShoppingCart className="text-orange-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-700 truncate">{o.products?.title || o.product_title || "Product"}</p>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-0.5">
                      <HiMail className="text-[10px]" />
                      <span className="truncate">{o.buyer_email}</span>
                    </div>
                  </div>
                </div>
                <span className={`badge text-[10px] shrink-0 ${statusBadge(o.status)}`}>{o.status}</span>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-slate-500">{o.buyer_name}</span>
                  <span>•</span>
                  <span className="font-extrabold gradient-text">₹{o.amount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <HiClock className="text-[10px]" />
                  <span>{new Date(o.created_at).toLocaleDateString("en-IN")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
