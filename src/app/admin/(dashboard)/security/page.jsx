"use client";
import { useState } from "react";
import { HiOutlineShieldCheck, HiOutlineKey, HiOutlineFingerPrint } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function AdminSecurityPage() {
  const [security, setSecurity] = useState({
    twoFactor: false,
    ipWhitelist: "",
    sessionTimeout: "60",
    maxLoginAttempts: "5",
    forceHttps: true,
    rateLimiting: true,
    csrfProtection: true,
    corsOrigins: "https://sourcecodestore.com",
  });

  const [sessions] = useState([
    { id: 1, device: "Chrome on macOS", ip: "103.21.xx.xx", location: "Mumbai, IN", lastActive: "Active now" },
    { id: 2, device: "Safari on iPhone", ip: "49.36.xx.xx", location: "Delhi, IN", lastActive: "2 hours ago" },
  ]);

  const handleSave = () => toast.success("Security settings saved (demo)");

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2"><HiOutlineShieldCheck className="text-red-400" /> Security</h1>
        <p className="text-slate-500 text-sm">Platform security settings</p>
      </div>

      <div className="space-y-6 animate-fadeIn">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><HiOutlineFingerPrint className="text-purple-400" /> Authentication</h2>
          <div className="space-y-4">
            {[
              { key: "twoFactor", label: "Two-Factor Authentication", desc: "Require 2FA for admin login" },
              { key: "forceHttps", label: "Force HTTPS", desc: "Redirect all traffic to HTTPS" },
              { key: "rateLimiting", label: "Rate Limiting", desc: "Limit API requests per IP" },
              { key: "csrfProtection", label: "CSRF Protection", desc: "Enable cross-site request forgery protection" },
            ].map((f) => (
              <div key={f.key} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <div><p className="text-sm text-white">{f.label}</p><p className="text-xs text-slate-500">{f.desc}</p></div>
                <button onClick={() => setSecurity({ ...security, [f.key]: !security[f.key] })} className={`w-11 h-6 rounded-full transition-all relative ${security[f.key] ? "bg-red-500" : "bg-white/10"}`}>
                  <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${security[f.key] ? "left-6" : "left-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><HiOutlineKey className="text-yellow-400" /> Access Control</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="text-xs text-slate-500 block mb-1">Session Timeout (min)</label><input className="input-glass w-full" type="number" value={security.sessionTimeout} onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })} /></div>
              <div><label className="text-xs text-slate-500 block mb-1">Max Login Attempts</label><input className="input-glass w-full" type="number" value={security.maxLoginAttempts} onChange={(e) => setSecurity({ ...security, maxLoginAttempts: e.target.value })} /></div>
            </div>
            <div><label className="text-xs text-slate-500 block mb-1">IP Whitelist (comma separated)</label><input className="input-glass w-full" placeholder="e.g. 103.21.0.0, 122.17.0.0" value={security.ipWhitelist} onChange={(e) => setSecurity({ ...security, ipWhitelist: e.target.value })} /></div>
            <div><label className="text-xs text-slate-500 block mb-1">CORS Origins</label><input className="input-glass w-full" value={security.corsOrigins} onChange={(e) => setSecurity({ ...security, corsOrigins: e.target.value })} /></div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Active Sessions</h2>
          <div className="space-y-3">
            {sessions.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <div>
                  <p className="text-sm text-white">{s.device}</p>
                  <p className="text-xs text-slate-500">{s.ip} • {s.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">{s.lastActive}</p>
                  {s.lastActive !== "Active now" && <button className="text-red-400 text-xs hover:text-red-300 mt-1">Revoke</button>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSave} className="btn-primary w-full py-3 rounded-xl text-sm font-semibold">Save Security Settings</button>
      </div>
    </div>
  );
}
