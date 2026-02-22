"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { orderAPI } from "@/lib/api";
import { HiOutlineClipboardDocumentList, HiOutlineCheckCircle, HiOutlineClock } from "react-icons/hi2";
import { FiPackage } from "react-icons/fi";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const key = Cookies.get("admin_api_key");

  useEffect(() => {
    if (key) orderAPI.adminAll(key).then((res) => {
      if (res.success) setOrders(res.orders || res.data || []);
      setLoading(false);
    });
  }, [key]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <HiOutlineClipboardDocumentList className="text-red-400" /> Orders
        </h1>
        <p className="text-slate-500 text-sm">{orders.length} total orders</p>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="glass rounded-xl h-16 animate-pulse" />)}</div>
      ) : orders.length > 0 ? (
        <div className="glass rounded-2xl overflow-hidden animate-fadeIn">
          <div className="overflow-x-auto">
            <table className="table-glass">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={i} className="animate-fadeIn" style={{ animationDelay: `${i * 40}ms` }}>
                    <td className="font-mono text-xs">{o.id?.slice(0, 8)}...</td>
                    <td><div className="flex items-center gap-2"><FiPackage className="text-red-400 flex-shrink-0" /><span className="truncate max-w-[150px]">{o.product_title || "—"}</span></div></td>
                    <td className="text-xs">{o.email || "—"}</td>
                    <td className="font-medium">₹{o.amount || o.price || 0}</td>
                    <td>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${o.payment_status === "paid" ? "text-green-400 bg-green-500/10" : "text-amber-400 bg-amber-500/10"}`}>
                        {o.payment_status === "paid" ? <HiOutlineCheckCircle /> : <HiOutlineClock />} {o.payment_status || "pending"}
                      </span>
                    </td>
                    <td className="text-xs text-slate-500">{new Date(o.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass rounded-2xl p-16 text-center animate-fadeIn">
          <HiOutlineClipboardDocumentList className="text-5xl text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Orders</h3>
          <p className="text-sm text-slate-500">Orders will appear here when customers purchase products</p>
        </div>
      )}
    </div>
  );
}
