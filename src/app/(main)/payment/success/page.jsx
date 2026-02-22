"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HiOutlineCheckCircle, HiOutlineArrowDownTray } from "react-icons/hi2";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center animate-fadeIn max-w-md">
        <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
          <HiOutlineCheckCircle className="text-5xl text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
        <p className="text-slate-400 text-sm mb-8">Your purchase has been completed successfully. You can now download your source code.</p>
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
