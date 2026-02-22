"use client";
import { useState } from "react";
import { HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function AdminChangePasswordPage() {
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.current || !form.newPass || !form.confirm) return toast.error("Fill all fields");
    if (form.newPass.length < 6) return toast.error("Password must be at least 6 characters");
    if (form.newPass !== form.confirm) return toast.error("Passwords do not match");
    toast.success("Password changed (demo)");
    setForm({ current: "", newPass: "", confirm: "" });
  };

  const PasswordInput = ({ label, field }) => (
    <div>
      <label className="text-xs text-slate-500 block mb-1">{label}</label>
      <div className="relative">
        <input className="input-glass w-full pr-10" type={show[field] ? "text" : "password"} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} placeholder="••••••••" />
        <button type="button" onClick={() => setShow({ ...show, [field]: !show[field] })} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
          {show[field] ? <HiOutlineEyeSlash size={18} /> : <HiOutlineEye size={18} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2"><HiOutlineLockClosed className="text-red-400" /> Change Password</h1>
        <p className="text-slate-500 text-sm">Update your admin password</p>
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4 animate-fadeIn">
        <PasswordInput label="Current Password" field="current" />
        <PasswordInput label="New Password" field="newPass" />
        <PasswordInput label="Confirm New Password" field="confirm" />

        <div className="pt-2">
          <p className="text-xs text-slate-600 mb-3">Password requirements:</p>
          <ul className="space-y-1">
            {[
              { text: "At least 6 characters", ok: form.newPass.length >= 6 },
              { text: "Contains a number", ok: /\d/.test(form.newPass) },
              { text: "Passwords match", ok: form.newPass && form.newPass === form.confirm },
            ].map((r) => (
              <li key={r.text} className={`text-xs flex items-center gap-2 ${r.ok ? "text-green-400" : "text-slate-600"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${r.ok ? "bg-green-400" : "bg-slate-600"}`} />{r.text}
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="btn-primary w-full py-3 rounded-xl text-sm font-semibold">Change Password</button>
      </form>
    </div>
  );
}
