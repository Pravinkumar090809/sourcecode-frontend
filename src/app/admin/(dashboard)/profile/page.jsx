"use client";
import { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function AdminProfilePage() {
  const [form, setForm] = useState({ name: "Admin", email: "admin@sourcecode.com", phone: "", bio: "Platform administrator" });

  const handleSave = () => toast.success("Profile updated (demo)");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2"><HiOutlineUserCircle className="text-red-400" /> Admin Profile</h1>
        <p className="text-slate-500 text-sm">Manage your admin profile</p>
      </div>

      <div className="glass rounded-2xl p-6 animate-fadeIn">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
          <div className="avatar-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-2xl font-bold rounded-2xl">A</div>
          <div>
            <p className="text-lg font-semibold text-white">{form.name}</p>
            <p className="text-sm text-slate-500">{form.email}</p>
            <span className="badge-red text-xs mt-1 inline-block">Administrator</span>
          </div>
        </div>

        <div className="space-y-4">
          <div><label className="text-xs text-slate-500 block mb-1">Name</label><input className="input-glass w-full" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><label className="text-xs text-slate-500 block mb-1">Email</label><input className="input-glass w-full" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div><label className="text-xs text-slate-500 block mb-1">Phone</label><input className="input-glass w-full" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          <div><label className="text-xs text-slate-500 block mb-1">Bio</label><textarea className="input-glass w-full" rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
          <button onClick={handleSave} className="btn-primary w-full py-3 rounded-xl text-sm font-semibold">Update Profile</button>
        </div>
      </div>
    </div>
  );
}
