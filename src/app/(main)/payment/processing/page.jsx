"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { paymentAPI } from "@/lib/api";
import { HiOutlineArrowPath } from "react-icons/hi2";

export default function PaymentProcessingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (!orderId) { router.push("/products"); return; }
    let active = true;
    const check = async () => {
      if (!active) return;
      const res = await paymentAPI.verify(orderId);
      if (!active) return;
      if (res.success) {
        const d = res.data || res;
        if (d.payment_status === "PAID" || d.cashfree_status === "PAID") {
          router.push(`/payment/success?order_id=${orderId}`);
        } else if (d.payment_status === "FAILED") {
          router.push(`/payment/failed?order_id=${orderId}`);
        } else {
          setTimeout(check, 3000);
        }
      } else {
        setTimeout(check, 3000);
      }
    };
    const timer = setTimeout(check, 2000);
    return () => { active = false; clearTimeout(timer); };
  }, [orderId, router]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center animate-fadeIn">
        <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <HiOutlineArrowPath className="text-4xl text-red-400 animate-spin" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Processing Payment</h1>
        <p className="text-slate-500 text-sm mb-4">Please wait while we verify your payment...</p>
        <div className="flex items-center justify-center gap-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-red-400 animate-pulse" style={{ animationDelay: `${i * 300}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
