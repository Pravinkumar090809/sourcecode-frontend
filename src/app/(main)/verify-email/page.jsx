"use client";
import Link from "next/link";
import { HiOutlineCheckBadge, HiOutlineCodeBracket } from "react-icons/hi2";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fadeIn text-center">
        <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
          <HiOutlineCodeBracket className="text-2xl text-white" />
        </div>
        <div className="glass rounded-2xl p-8">
          <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <HiOutlineCheckBadge className="text-4xl text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Email Verified!</h1>
          <p className="text-sm text-slate-500 mb-6">Your email has been successfully verified. You can now access all features.</p>
          <Link href="/dashboard" className="btn-primary px-8 py-3 rounded-xl text-sm font-semibold inline-block">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
