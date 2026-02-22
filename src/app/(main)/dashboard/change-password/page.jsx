"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { AuthGuard } from "@/components/AuthGuard";
import { HiOutlineArrowLeft, HiOutlineLockClosed } from "react-icons/hi2";

function Content() {
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.current || !form.newPass) return toast.error("Please fill all fields");
    if (form.newPass.length < 6) return toast.error("Password must be at least 6 characters");
    if (form.newPass !== form.confirm) return toast.error("Passwords don't match");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success("Password changed successfully!");
    setForm({ current: "", newPass: "", confirm: "" });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/dashboard/settings" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-red-400 transition-colors mb-6">
        <HiOutlineArrowLeft /> Back to Settings
      </Link>
      <div className="glass rounded-2xl p-6 animate-fadeIn">
        <h1 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><HiOutlineLockClosed className="text-red-400" /> Change Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 mb-1.5 block">Current Password</label>
            <input type="password" value={form.current} onChange={(e) => setForm({ ...form, current: e.target.value })} className="input-glass w-full" placeholder="Enter current password" />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1.5 block">New Password</label>
            <input type="password" value={form.newPass} onChange={(e) => setForm({ ...form, newPass: e.target.value })} className="input-glass w-full" placeholder="Min 6 characters" />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1.5 block">Confirm New Password</label>
            <input type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} className="input-glass w-full" placeholder="Repeat new password" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-50">
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ChangePasswordPage() {
  return <AuthGuard><Content /></AuthGuard>;
}
