"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { paymentAPI } from "@/lib/api";
import Loading from "@/components/Loading";
import { HiCheckCircle, HiClock, HiXCircle, HiArrowRight } from "react-icons/hi";

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState<string>("checking");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (orderId) {
      (async () => {
        try {
          const res = await paymentAPI.verify(orderId);
          setStatus(res.success ? res.data.payment_status : "PENDING");
        } catch {
          setStatus("error");
        }
        setChecking(false);
      })();
    } else {
      setStatus("error");
      setChecking(false);
    }
  }, [orderId]);

  if (checking) return <Loading />;

  const config: Record<string, { icon: typeof HiCheckCircle; color: string; bg: string; title: string; desc: string }> = {
    PAID: { icon: HiCheckCircle, color: "text-emerald-500", bg: "bg-emerald-50 border-emerald-100", title: "Payment Successful! 🎉", desc: "Your source code is ready for download." },
    PENDING: { icon: HiClock, color: "text-amber-500", bg: "bg-amber-50 border-amber-100", title: "Payment Pending ⏳", desc: "Your payment is being processed. It may take a few minutes." },
    FAILED: { icon: HiXCircle, color: "text-red-500", bg: "bg-red-50 border-red-100", title: "Payment Failed ❌", desc: "Something went wrong. Please try again." },
    error: { icon: HiXCircle, color: "text-red-500", bg: "bg-red-50 border-red-100", title: "Error", desc: "Could not verify payment status." },
  };

  const c = config[status] || config.error;

  return (
    <div className="px-4 py-16 relative z-10 min-h-[75vh] flex items-center">
      <div className="max-w-md mx-auto w-full glass-strong p-10 text-center animate-fade-in-scale">
        <div className={`w-20 h-20 rounded-full ${c.bg} border flex items-center justify-center mx-auto mb-6`}>
          <c.icon className={`text-4xl ${c.color}`} />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">{c.title}</h1>
        <p className="text-sm text-slate-400 mb-6">{c.desc}</p>
        {orderId && <p className="text-xs text-slate-300 mb-6 font-mono bg-slate-50 inline-block px-3 py-1 rounded-lg">Order: {orderId}</p>}
        <div className="flex gap-3 justify-center flex-col sm:flex-row">
          <button onClick={() => router.push("/dashboard")} className="btn-primary">My Orders <HiArrowRight /></button>
          <button onClick={() => router.push("/products")} className="btn-secondary">Browse More</button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentStatusPage() {
  return <Suspense fallback={<Loading />}><PaymentStatusContent /></Suspense>;
}
