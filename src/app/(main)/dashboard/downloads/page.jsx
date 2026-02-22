"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { orderAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { AuthGuard } from "@/components/AuthGuard";
import { HiOutlineArrowDownTray, HiOutlineCheckCircle } from "react-icons/hi2";
import { FiPackage, FiDownload } from "react-icons/fi";

function DownloadsContent() {
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

  const handleDownload = async (order) => {
    const res = await orderAPI.download(token, order.id, user.email);
    if (res.success && res.download_url) {
      window.open(res.download_url, "_blank");
      toast.success("Download started!");
    } else toast.error(res.message || "Download failed");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1">Downloads</h1>
        <p className="text-slate-500 text-sm">Download your purchased files</p>
      </div>
      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="glass rounded-2xl h-20 animate-pulse" />)}</div>
      ) : orders.length > 0 ? (
        <div className="space-y-3">
          {orders.map((order, i) => (
            <div key={i} className="glass rounded-xl p-4 flex items-center justify-between animate-fadeIn" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                  <FiDownload className="text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{order.product_title || "Source Code Package"}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <HiOutlineCheckCircle className="text-green-400" /> Ready to download
                  </div>
                </div>
              </div>
              <button onClick={() => handleDownload(order)} className="btn-primary px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5">
                <HiOutlineArrowDownTray /> Download
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-16 text-center animate-fadeIn">
          <FiPackage className="text-5xl text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Downloads</h3>
          <p className="text-sm text-slate-500">Purchase a product to see downloads here</p>
        </div>
      )}
    </div>
  );
}

export default function DownloadsPage() {
  return <AuthGuard><DownloadsContent /></AuthGuard>;
}
