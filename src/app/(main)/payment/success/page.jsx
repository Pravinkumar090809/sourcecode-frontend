"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { orderAPI, paymentAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { HiOutlineCheckCircle, HiOutlineArrowDownTray, HiOutlineBell, HiOutlineExclamationTriangle } from "react-icons/hi2";
import { FiPackage } from "react-icons/fi";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { token } = useAuthStore();
  const [orderDetails, setOrderDetails] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // Fetch order details to show product info
    if (orderId) {
      paymentAPI.verify(orderId).then((res) => {
        if (res.success) {
          setOrderDetails(res.data || res);
        }
      });
    }

    // Show purchase notification
    setTimeout(() => {
      toast.success("🎉 Purchase complete! Your source code is ready to download.", {
        duration: 5000,
        style: { background: "#1e1e2e", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" },
      });
    }, 500);
  }, [orderId]);

  const handleDirectDownload = async () => {
    if (!token || !orderDetails?.product?.id) {
      toast.error("Please go to Downloads to get your file");
      return;
    }
    setDownloading(true);
    const res = await orderAPI.download(token, orderDetails.product.id || orderDetails.product_id);
    setDownloading(false);
    if (res.success && (res.data?.download_url || res.download_url)) {
      const url = res.data?.download_url || res.download_url;
      const warning = res.data?.warning || res.warning;
      window.open(url, "_blank");
      toast.success("Download started!");
      if (warning) {
        setTimeout(() => toast(warning, { icon: "⏳", duration: 6000, style: { background: "#1e1e2e", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" } }), 1000);
      }
    } else {
      toast.error(res.message || "Download failed — try from the Downloads page");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center animate-fadeIn max-w-md">
        <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
          <HiOutlineCheckCircle className="text-5xl text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
        <p className="text-slate-400 text-sm mb-6">Your purchase has been completed successfully. You can now download your source code.</p>

        {/* Purchase Notification Card */}
        <div className="glass rounded-2xl p-5 mb-6 text-left animate-fadeIn" style={{ animationDelay: "200ms", border: "1px solid rgba(34,197,94,0.15)" }}>
          <div className="flex items-center gap-2 mb-3">
            <HiOutlineBell className="text-green-400" />
            <span className="text-sm font-semibold text-green-400">Purchase Confirmed</span>
          </div>
          {orderDetails?.product && (
            <div className="flex items-center gap-3 mb-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                <FiPackage className="text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{orderDetails.product.title || "Source Code"}</p>
                <p className="text-xs text-slate-500">₹{orderDetails.order_amount || orderDetails.product.price || 0}</p>
              </div>
            </div>
          )}

          {/* Expiry Warning */}
          <div className="flex items-start gap-2 p-2.5 rounded-lg mb-3" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.12)" }}>
            <HiOutlineExclamationTriangle className="text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-400/90">Download links expire in <strong>10 minutes</strong>. Download your file immediately after clicking.</p>
          </div>

          {token && (
            <button
              onClick={handleDirectDownload}
              disabled={downloading}
              className="btn-primary w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {downloading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating Link...</>
              ) : (
                <><HiOutlineArrowDownTray /> Download Now</>
              )}
            </button>
          )}
        </div>

        {orderId && <p className="text-xs text-slate-600 mb-6">Order ID: {orderId}</p>}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/dashboard/downloads" className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2">
            <HiOutlineArrowDownTray /> Go to Downloads
          </Link>
          <Link href="/products" className="btn-secondary px-6 py-3 rounded-xl text-sm">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
