"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { adminAPI } from "@/lib/api";
import { HiOutlineUsers, HiOutlineEnvelope, HiOutlineCalendar } from "react-icons/hi2";

export default function AdminBuyersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const key = Cookies.get("admin_api_key");

  useEffect(() => {
    if (key) adminAPI.getUsers(key).then((res) => {
      if (res.success) setUsers(res.users || res.data || []);
      setLoading(false);
    });
  }, [key]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <HiOutlineUsers className="text-red-400" /> Buyers
        </h1>
        <p className="text-slate-500 text-sm">{users.length} registered users</p>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="glass rounded-xl h-16 animate-pulse" />)}</div>
      ) : users.length > 0 ? (
        <div className="space-y-3">
          {users.map((u, i) => (
            <div key={i} className="glass rounded-xl p-4 flex items-center gap-4 animate-fadeIn" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
                {u.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{u.name || "User"}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><HiOutlineEnvelope className="text-[10px]" />{u.email}</span>
                  <span className="flex items-center gap-1 hidden sm:flex"><HiOutlineCalendar className="text-[10px]" />{u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-16 text-center animate-fadeIn">
          <HiOutlineUsers className="text-5xl text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Users</h3>
          <p className="text-sm text-slate-500">Users will appear here when they register</p>
        </div>
      )}
    </div>
  );
}
