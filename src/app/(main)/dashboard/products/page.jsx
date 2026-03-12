"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { orderAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { AuthGuard } from "@/components/AuthGuard";
import { HiOutlineArrowDownTray, HiOutlineCheckCircle } from "react-icons/hi2";
import { FiPackage } from "react-icons/fi";

function ProductsContent() {
  const { user, token } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userEmail = user?.email || user?.buyer_email;
    if (token && userEmail) {
      orderAPI.getByEmail(token, userEmail).then((res) => {
        if (res.success) setOrders((res.orders || res.data || []).filter((o) => (o.payment_status||"").toLowerCase() === "paid"));
        setLoading(false);
      });
    } else setLoading(false);
  }, [token, user]);

  const handleDownload = async (order) => {
    const res = await orderAPI.download(token, order.product_id);
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1">My Products</h1>
        <p className="text-slate-500 text-sm">Your purchased source code packages</p>
      </div>
      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="glass rounded-2xl h-24 animate-pulse" />)}</div>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order, i) => (
            <div key={i} className="glass rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                  <FiPackage className="text-xl text-red-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{order.product_title || `Product #${order.product_id?.slice(0, 8)}`}</h3>
                  <p className="text-xs text-slate-500">Purchased {new Date(order.created_at).toLocaleDateString()}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-green-400"><HiOutlineCheckCircle /> Licensed</div>
                </div>
              </div>
              <button onClick={() => handleDownload(order)} className="btn-primary px-5 py-2 rounded-lg text-xs font-medium flex items-center gap-2">
                <HiOutlineArrowDownTray /> Download
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-16 text-center animate-fadeIn">
          <FiPackage className="text-5xl text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Products Yet</h3>
          <p className="text-sm text-slate-500 mb-4">You haven&apos;t purchased any products</p>
          <Link href="/products" className="btn-primary px-6 py-2.5 rounded-xl text-sm inline-block">Browse Products</Link>
        </div>
      )}
    </div>
  );
}

export default function MyProductsPage() {
  return <AuthGuard><ProductsContent /></AuthGuard>;
}
