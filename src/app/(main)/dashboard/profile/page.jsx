"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { authAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { AuthGuard } from "@/components/AuthGuard";
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineCalendar, HiOutlinePencilSquare } from "react-icons/hi2";

function ProfileContent() {
  const { user, token, setAuth } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setForm({ name: user.name || "", email: user.email || "" });
  }, [user]);

  const handleSave = async () => {
    if (!form.name || !form.email) return toast.error("Please fill all fields");
    setLoading(true);
    const res = await authAPI.updateProfile(token, { name: form.name, email: form.email });
    setLoading(false);
    if (res.success) {
      setAuth(res.user || res.data || { ...user, ...form }, token);
      toast.success("Profile updated!");
      setEditing(false);
    } else toast.error(res.message || "Update failed");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1">Profile</h1>
        <p className="text-slate-500 text-sm">Manage your account details</p>
      </div>
      <div className="glass rounded-2xl p-6 animate-fadeIn">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">{user?.name || "User"}</h2>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
          <button onClick={() => setEditing(!editing)} className="ml-auto btn-secondary px-3 py-2 rounded-lg text-xs flex items-center gap-1.5">
            <HiOutlinePencilSquare /> {editing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm text-slate-400 mb-1.5 flex items-center gap-2"><HiOutlineUser className="text-red-400" /> Full Name</label>
            {editing ? (
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-glass w-full" />
            ) : (
              <p className="text-sm text-white px-4 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>{user?.name || "—"}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1.5 flex items-center gap-2"><HiOutlineEnvelope className="text-red-400" /> Email</label>
            {editing ? (
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-glass w-full" />
            ) : (
              <p className="text-sm text-white px-4 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>{user?.email || "—"}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1.5 flex items-center gap-2"><HiOutlineCalendar className="text-red-400" /> Member Since</label>
            <p className="text-sm text-white px-4 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>{user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}</p>
          </div>
          {editing && (
            <button onClick={handleSave} disabled={loading} className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold disabled:opacity-50 w-full">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return <AuthGuard><ProfileContent /></AuthGuard>;
}
