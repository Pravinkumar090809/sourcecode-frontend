"use client";
import { useState } from "react";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "SourceCode Store",
    siteDescription: "Premium source code marketplace",
    adminEmail: "admin@sourcecode.com",
    currency: "INR",
    taxRate: "18",
    maintenanceMode: false,
    signupEnabled: true,
    reviewsEnabled: true,
    maxUploadSize: "50",
    downloadExpiry: "72",
  });

  const handleSave = () => toast.success("Settings saved (demo)");

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2"><HiOutlineCog6Tooth className="text-red-400" /> Platform Settings</h1>
        <p className="text-slate-500 text-sm">Configure your platform</p>
      </div>

      <div className="space-y-6 animate-fadeIn">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">General</h2>
          <div className="space-y-4">
            <div><label className="text-xs text-slate-500 block mb-1">Site Name</label><input className="input-glass w-full" value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} /></div>
            <div><label className="text-xs text-slate-500 block mb-1">Description</label><textarea className="input-glass w-full" rows={2} value={settings.siteDescription} onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })} /></div>
            <div><label className="text-xs text-slate-500 block mb-1">Admin Email</label><input className="input-glass w-full" value={settings.adminEmail} onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })} /></div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Payment & Pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-xs text-slate-500 block mb-1">Currency</label>
              <select className="input-glass w-full" value={settings.currency} onChange={(e) => setSettings({ ...settings, currency: e.target.value })}>
                <option value="INR">INR (₹)</option><option value="USD">USD ($)</option>
              </select>
            </div>
            <div><label className="text-xs text-slate-500 block mb-1">Tax Rate (%)</label><input className="input-glass w-full" type="number" value={settings.taxRate} onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })} /></div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Features</h2>
          <div className="space-y-4">
            {[
              { key: "maintenanceMode", label: "Maintenance Mode", desc: "Show maintenance page to visitors" },
              { key: "signupEnabled", label: "User Signup", desc: "Allow new user registrations" },
              { key: "reviewsEnabled", label: "Reviews", desc: "Enable product reviews" },
            ].map((f) => (
              <div key={f.key} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <div><p className="text-sm text-white">{f.label}</p><p className="text-xs text-slate-500">{f.desc}</p></div>
                <button onClick={() => setSettings({ ...settings, [f.key]: !settings[f.key] })} className={`w-11 h-6 rounded-full transition-all relative ${settings[f.key] ? "bg-red-500" : "bg-white/10"}`}>
                  <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings[f.key] ? "left-6" : "left-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Limits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-xs text-slate-500 block mb-1">Max Upload Size (MB)</label><input className="input-glass w-full" type="number" value={settings.maxUploadSize} onChange={(e) => setSettings({ ...settings, maxUploadSize: e.target.value })} /></div>
            <div><label className="text-xs text-slate-500 block mb-1">Download Link Expiry (hrs)</label><input className="input-glass w-full" type="number" value={settings.downloadExpiry} onChange={(e) => setSettings({ ...settings, downloadExpiry: e.target.value })} /></div>
          </div>
        </div>

        <button onClick={handleSave} className="btn-primary w-full py-3 rounded-xl text-sm font-semibold">Save Settings</button>
      </div>
    </div>
  );
}
