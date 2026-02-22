"use client";
import Link from "next/link";
import { HiOutlineXCircle } from "react-icons/hi2";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center animate-fadeIn max-w-md">
        <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <HiOutlineXCircle className="text-5xl text-red-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Payment Failed</h1>
        <p className="text-slate-400 text-sm mb-8">Your payment could not be processed. Please try again or contact support.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/products" className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold">Try Again</Link>
          <Link href="/contact" className="btn-secondary px-6 py-3 rounded-xl text-sm">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
