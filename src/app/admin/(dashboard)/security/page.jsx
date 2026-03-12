"use client";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { adminAPI } from "@/lib/api";
import { HiOutlineShieldCheck, HiOutlineKey, HiOutlineFingerPrint } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function AdminSecurityPage() {
  const [security, setSecurity] = useState({
    security_two_factor: "false",
    security_ip_whitelist: "",
    security_session_timeout: "60",
    security_max_login_attempts: "5",
    security_force_https: "true",
    security_rate_limiting: "true",
    security_csrf_protection: "true",
    security_cors_origins: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const key = Cookies.get("admin_api_key");

  const [sessions, setSessions] = useState([]);

  const fetchSecurity = useCallback(async () => {
    if (!key) return;
    try {
      const res = await adminAPI.getSettings(key, "security_");
      if (res.success && res.data) {
        setSecurity((prev) => ({ ...prev, ...res.data }));
      }
      // Fetch recent activity logs as "sessions"
      const logsRes = await adminAPI.getActivityLogs(key, 5);
      if (logsRes.success && logsRes.data) {
        setSessions(logsRes.data.map((l) => ({
          id: l.id,
          device: l.action,
          ip: l.details || "—",
          location: l.actor || "Admin",
          lastActive: new Date(l.created_at).toLocaleString(),
        })));
      }
    } catch (error) {
      console.error("Failed to fetch security settings:", error);
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => { fetchSecurity(); }, [fetchSecurity]);

  const handleSave = async () => {
    setSaving(true);
    const res = await adminAPI.updateSettings(key, security);
    setSaving(false);
    if (res.success) toast.success("Security settings saved");
    else toast.error(res.message || "Failed to save");
  };

  const toggle = (key_name) => {
    setSecurity({ ...security, [key_name]: security[key_name] === "true" ? "false" : "true" });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6 sm:mb-8 animate-fadeIn">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <HiOutlineShieldCheck className="text-red-400 flex-shrink-0" /> Security Settings
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">Manage platform security &amp; access controls</p>
      </div>

      <div className="space-y-4 sm:space-y-6 animate-fadeIn">
        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2"><HiOutlineFingerPrint className="text-purple-400 flex-shrink-0" /> Authentication</h2>
          <div className="space-y-3 sm:space-y-4">
            {[
              { key: "security_two_factor", label: "Two-Factor Authentication", desc: "Require 2FA for admin login" },
              { key: "security_force_https", label: "Force HTTPS", desc: "Redirect all traffic to HTTPS" },
              { key: "security_rate_limiting", label: "Rate Limiting", desc: "Limit API requests per IP" },
              { key: "security_csrf_protection", label: "CSRF Protection", desc: "Enable CSRF protection" },
            ].map((f) => (
              <div key={f.key} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-white">{f.label}</p>
                  <p className="text-xs text-slate-500 truncate">{f.desc}</p>
                </div>
                <button onClick={() => toggle(f.key)} className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${security[f.key] === "true" ? "bg-red-500" : "bg-white/10"}`}>
                  <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${security[f.key] === "true" ? "left-6" : "left-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2"><HiOutlineKey className="text-yellow-400 flex-shrink-0" /> Access Control</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="text-xs text-slate-500 block mb-1">Session Timeout (min)</label><input className="input-glass w-full" type="number" value={security.security_session_timeout} onChange={(e) => setSecurity({ ...security, security_session_timeout: e.target.value })} /></div>
              <div><label className="text-xs text-slate-500 block mb-1">Max Login Attempts</label><input className="input-glass w-full" type="number" value={security.security_max_login_attempts} onChange={(e) => setSecurity({ ...security, security_max_login_attempts: e.target.value })} /></div>
            </div>
            <div><label className="text-xs text-slate-500 block mb-1">IP Whitelist (comma separated)</label><input className="input-glass w-full" placeholder="e.g. 103.21.0.0, 122.17.0.0" value={security.security_ip_whitelist} onChange={(e) => setSecurity({ ...security, security_ip_whitelist: e.target.value })} /></div>
            <div><label className="text-xs text-slate-500 block mb-1">CORS Origins</label><input className="input-glass w-full" value={security.security_cors_origins} onChange={(e) => setSecurity({ ...security, security_cors_origins: e.target.value })} /></div>
          </div>
        </div>

        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Active Sessions</h2>
          <div className="space-y-3">
            {sessions.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-white truncate">{s.device}</p>
                  <p className="text-xs text-slate-500 truncate">{s.ip} • {s.location}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-slate-500">{s.lastActive}</p>
                  {s.lastActive !== "Active now" && <button className="text-red-400 text-xs hover:text-red-300 mt-1">Revoke</button>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSave} disabled={saving} className="btn-primary w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-50">{saving ? "Saving..." : "Save Security Settings"}</button>
      </div>
    </div>
  );
}
