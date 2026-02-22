"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { orderAPI } from "@/lib/api";
import { AuthGuard } from "@/components/AuthGuard";
import { HiOutlineArrowLeft, HiOutlineCheckCircle } from "react-icons/hi2";

function InvoiceDetailContent() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getById(id).then((res) => {
      if (res.success) setOrder(res.order || res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-8"><div className="glass rounded-2xl h-64 animate-pulse" /></div>;
  if (!order) return <div className="max-w-3xl mx-auto px-4 py-20 text-center text-slate-500">Invoice not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/dashboard/invoices" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-red-400 transition-colors mb-6">
        <HiOutlineArrowLeft /> Back to Invoices
      </Link>
      <div className="glass rounded-2xl p-6 sm:p-8 animate-fadeIn">
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
          <div>
            <h1 className="text-xl font-bold text-white">Invoice</h1>
            <p className="text-xs text-slate-500">#{order.id?.slice(0, 8)}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-medium text-green-400 bg-green-500/10 flex items-center gap-1">
            <HiOutlineCheckCircle /> Paid
          </span>
        </div>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm"><span className="text-slate-500">Product</span><span className="text-white">{order.product_title || "Source Code"}</span></div>
          <div className="flex justify-between text-sm"><span className="text-slate-500">Date</span><span className="text-white">{new Date(order.created_at).toLocaleDateString()}</span></div>
          <div className="flex justify-between text-sm"><span className="text-slate-500">Order ID</span><span className="text-white font-mono text-xs">{order.id}</span></div>
          <div className="flex justify-between text-sm"><span className="text-slate-500">Email</span><span className="text-white">{order.email}</span></div>
        </div>
        <div className="border-t border-white/5 pt-4">
          <div className="flex justify-between text-lg font-bold"><span className="text-white">Total</span><span style={{ color: "#ef4444" }}>₹{order.amount || order.price || 0}</span></div>
        </div>
      </div>
    </div>
  );
}

export default function InvoiceDetailPage() {
  return <AuthGuard><InvoiceDetailContent /></AuthGuard>;
}
