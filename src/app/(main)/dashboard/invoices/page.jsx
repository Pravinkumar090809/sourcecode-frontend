"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { orderAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { AuthGuard } from "@/components/AuthGuard";
import { HiOutlineDocumentText, HiOutlineArrowRight } from "react-icons/hi2";
import { FiFileText } from "react-icons/fi";

function InvoicesContent() {
  const { user, token } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && user?.email) {
      orderAPI.getByEmail(token, user.email).then((res) => {
        if (res.success) setOrders((res.orders || res.data || []).filter((o) => o.payment_status === "paid"));
        setLoading(false);
      });
    }
  }, [token, user]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1">Invoices</h1>
        <p className="text-slate-500 text-sm">Your payment invoices and receipts</p>
      </div>
      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="glass rounded-xl h-16 animate-pulse" />)}</div>
      ) : orders.length > 0 ? (
        <div className="space-y-3">
          {orders.map((order, i) => (
            <Link key={i} href={`/dashboard/invoices/${order.id}`} className="glass rounded-xl p-4 flex items-center justify-between group hover:border-red-500/20 transition-all animate-fadeIn" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                  <FiFileText className="text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">Invoice #{order.id?.slice(0, 8)}</p>
                  <p className="text-xs text-slate-500">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-white">₹{order.amount || order.price || 0}</span>
                <HiOutlineArrowRight className="text-slate-600 group-hover:text-red-400 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-16 text-center animate-fadeIn">
          <HiOutlineDocumentText className="text-5xl text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Invoices</h3>
          <p className="text-sm text-slate-500">Invoices will appear here after purchases</p>
        </div>
      )}
    </div>
  );
}

export default function InvoicesPage() {
  return <AuthGuard><InvoicesContent /></AuthGuard>;
}
