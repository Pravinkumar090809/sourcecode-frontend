"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { orderAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { AuthGuard } from "@/components/AuthGuard";
import { HiOutlineArrowLeft, HiOutlineArrowDownTray, HiOutlineCheckCircle, HiOutlineClock, HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FiPackage } from "react-icons/fi";

function OrderDetailContent() {
  const { id } = useParams();
  const { user, token } = useAuthStore();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getById(id).then((res) => {
      if (res.success) setOrder(res.order || res.data);
      setLoading(false);
    });
  }, [id]);

  const handleDownload = async () => {
    const res = await orderAPI.download(token, order?.product_id);
    if (res.success && (res.data?.download_url || res.download_url)) {
      const url = res.data?.download_url || res.download_url;
      const warning = res.data?.warning || res.warning;
      window.open(url, "_blank");
      toast.success("Download started!");
      if (warning) {
        setTimeout(() => toast(warning, { icon: "⏳", duration: 6000, style: { background: "#1e1e2e", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" } }), 1000);
      }
    } else toast.error(res.message || "Download failed");
  };

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-8"><div className="glass rounded-2xl h-64 animate-pulse" /></div>;
  if (!order) return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-500">Order not found</div>;

  const paid = (order.payment_status||"").toLowerCase() === "paid";

  // use buyer_email fallback since backend names it that way
  const emailValue = order?.buyer_email || order?.email || "";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-red-400 transition-colors mb-6">
        <HiOutlineArrowLeft /> Back to Dashboard
      </Link>
      <div className="glass rounded-2xl p-6 animate-fadeIn">
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
              <FiPackage className="text-2xl text-red-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{order.product_title || "Source Code"}</h1>
              <p className="text-xs text-slate-500">Order #{order.id?.slice(0, 8)}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${paid ? "text-green-400 bg-green-500/10" : "text-amber-400 bg-amber-500/10"}`}>
            {paid ? <><HiOutlineCheckCircle /> Paid</> : <><HiOutlineClock /> Pending</>}
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { label: "Amount", value: `₹${order.amount || order.price || 0}` },
            { label: "Date", value: new Date(order.created_at).toLocaleDateString() },
            { label: "Email", value: emailValue },
            { label: "Payment Status", value: (order.payment_status || "pending").toLowerCase() },
            ...(order.coupon_code ? [{ label: "Coupon", value: order.coupon_code }] : []),
            ...(order.discount_amount ? [{ label: "Discount", value: `-₹${order.discount_amount}` }] : []),
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
              <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
              <p className="text-sm font-medium text-white">{item.value}</p>
            </div>
          ))}
        </div>
        {paid && (
          <div className="flex flex-wrap gap-2">
            <button onClick={handleDownload} className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
              <HiOutlineArrowDownTray /> Download Source Code
            </button>
            <button
              onClick={() => window.open(`/dashboard/invoices/${order.id}`, "_blank")}
              className="btn-secondary px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              <HiOutlineClipboardDocumentList /> View Invoice
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderDetailPage() {
  return <AuthGuard><OrderDetailContent /></AuthGuard>;
}
