"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiOutlineEnvelope, HiOutlineCodeBracket, HiOutlineArrowLeft } from "react-icons/hi2";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    toast.success("Reset link sent to your email!");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fadeIn">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
            <HiOutlineCodeBracket className="text-2xl text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Forgot Password</h1>
          <p className="text-slate-500 text-sm">We&apos;ll send you a reset link</p>
        </div>
        <div className="glass rounded-2xl p-6 sm:p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <HiOutlineEnvelope className="text-3xl text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Check your email</h3>
              <p className="text-sm text-slate-500 mb-6">We&apos;ve sent a password reset link to <span className="text-white">{email}</span></p>
              <Link href="/login" className="btn-primary px-6 py-2.5 rounded-xl text-sm inline-block">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">Email Address</label>
                <div className="relative">
                  <HiOutlineEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-glass w-full pl-10" placeholder="you@example.com" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-50">
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <Link href="/login" className="text-sm text-slate-500 hover:text-red-400 transition-colors inline-flex items-center gap-2">
              <HiOutlineArrowLeft /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
