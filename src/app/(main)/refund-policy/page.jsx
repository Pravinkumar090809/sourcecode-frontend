"use client";
import Footer from "@/components/Footer";
import { HiOutlineReceiptRefund, HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";

export default function RefundPolicyPage() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10 animate-fadeIn">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(245,158,11,0.1)" }}>
            <HiOutlineReceiptRefund className="text-2xl text-amber-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Refund Policy</h1>
          <p className="text-slate-500 text-sm">Our fair and transparent refund policy</p>
        </div>
        <div className="space-y-6 animate-fadeIn" style={{ animationDelay: "100ms" }}>
          <div className="glass rounded-xl p-5">
            <h2 className="text-base font-semibold text-white mb-3">Eligible for Refund</h2>
            <div className="space-y-2">
              {["Product doesn't match the description", "Critical bugs that prevent usage", "Duplicate purchase (accidental)", "Request within 7 days of purchase"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-400"><HiOutlineCheckCircle className="text-green-400 flex-shrink-0" />{t}</div>
              ))}
            </div>
          </div>
          <div className="glass rounded-xl p-5">
            <h2 className="text-base font-semibold text-white mb-3">Not Eligible for Refund</h2>
            <div className="space-y-2">
              {["Changed your mind after download", "Lack of technical knowledge to use", "Product works as described", "Request after 7 days of purchase"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-400"><HiOutlineXCircle className="text-red-400 flex-shrink-0" />{t}</div>
              ))}
            </div>
          </div>
          <div className="glass rounded-xl p-5">
            <h2 className="text-base font-semibold text-white mb-3">How to Request a Refund</h2>
            <p className="text-sm text-slate-400 leading-relaxed">Email us at <span className="text-red-400">support@sourcecode.com</span> with your order ID and reason for refund. We&apos;ll process eligible refunds within 5-7 business days.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
