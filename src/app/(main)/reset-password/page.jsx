"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeSlash, HiOutlineCodeBracket } from "react-icons/hi2";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || password.length < 6) return toast.error("Password must be at least 6 characters");
    if (password !== confirm) return toast.error("Passwords don't match");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setDone(true);
    toast.success("Password reset successfully!");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fadeIn">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
            <HiOutlineCodeBracket className="text-2xl text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Reset Password</h1>
          <p className="text-slate-500 text-sm">Enter your new password</p>
        </div>
        <div className="glass rounded-2xl p-6 sm:p-8">
          {done ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(34,197,94,0.1)" }}>
                <HiOutlineLockClosed className="text-3xl text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Password Updated!</h3>
              <p className="text-sm text-slate-500 mb-6">Your password has been reset successfully.</p>
              <Link href="/login" className="btn-primary px-6 py-2.5 rounded-xl text-sm inline-block">Sign In</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">New Password</label>
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="input-glass w-full pl-10 pr-10" placeholder="Min 6 characters" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"><HiOutlineEye /></button>
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">Confirm Password</label>
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="input-glass w-full pl-10" placeholder="Repeat password" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-50">
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
