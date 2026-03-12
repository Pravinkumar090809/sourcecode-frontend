"use client";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { adminAPI } from "@/lib/api";
import { HiOutlineUserCircle } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function AdminProfilePage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", bio: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const key = Cookies.get("admin_api_key");

  const fetchProfile = useCallback(async () => {
    if (!key) return;
    try {
      const res = await adminAPI.getProfile(key);
      if (res.success && res.data) {
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          bio: res.data.bio || "Platform administrator",
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const handleSave = async () => {
    setSaving(true);
    const res = await adminAPI.updateProfile(key, { name: form.name, email: form.email });
    setSaving(false);
    if (res.success) toast.success("Profile updated");
    else toast.error(res.message || "Failed to update");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 sm:mb-8 animate-fadeIn">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <HiOutlineUserCircle className="text-red-400 flex-shrink-0" /> Admin Profile
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">Manage your admin profile</p>
      </div>

      <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 animate-fadeIn">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-white/5">
          <div className="avatar-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-xl sm:text-2xl font-bold rounded-2xl flex-shrink-0">A</div>
          <div className="min-w-0">
            <p className="text-base sm:text-lg font-semibold text-white truncate">{form.name}</p>
            <p className="text-xs sm:text-sm text-slate-500 truncate">{form.email}</p>
            <span className="badge-red text-[10px] sm:text-xs mt-1 inline-block">Administrator</span>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div><label className="text-xs text-slate-500 block mb-1">Name</label><input className="input-glass w-full" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><label className="text-xs text-slate-500 block mb-1">Email</label><input className="input-glass w-full" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div><label className="text-xs text-slate-500 block mb-1">Phone</label><input className="input-glass w-full" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          <div><label className="text-xs text-slate-500 block mb-1">Bio</label><textarea className="input-glass w-full" rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
          <button onClick={handleSave} disabled={saving} className="btn-primary w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-50">{saving ? "Saving..." : "Update Profile"}</button>
        </div>
      </div>
    </div>
  );
}
