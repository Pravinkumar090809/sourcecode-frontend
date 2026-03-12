"use client";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { adminAPI } from "@/lib/api";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    site_name: "",
    site_description: "",
    admin_email: "",
    currency: "INR",
    tax_rate: "18",
    maintenance_mode: "false",
    signup_enabled: "true",
    reviews_enabled: "true",
    max_upload_size: "50",
    download_expiry: "72",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const key = Cookies.get("admin_api_key");

  const fetchSettings = useCallback(async () => {
    if (!key) return;
    try {
      const res = await adminAPI.getSettings(key);
      if (res.success && res.data) {
        setSettings((prev) => ({ ...prev, ...res.data }));
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const handleSave = async () => {
    setSaving(true);
    const res = await adminAPI.updateSettings(key, settings);
    setSaving(false);
    if (res.success) toast.success("Settings saved");
    else toast.error(res.message || "Failed to save");
  };

  const toggle = (key_name) => {
    setSettings({ ...settings, [key_name]: settings[key_name] === "true" ? "false" : "true" });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6 sm:mb-8 animate-fadeIn">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <HiOutlineCog6Tooth className="text-red-400 flex-shrink-0" /> Platform Settings
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">Configure your platform preferences</p>
      </div>

      <div className="space-y-4 sm:space-y-6 animate-fadeIn">
        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">General</h2>
          <div className="space-y-3 sm:space-y-4">
            <div><label className="text-xs text-slate-500 block mb-1">Site Name</label><input className="input-glass w-full" value={settings.site_name} onChange={(e) => setSettings({ ...settings, site_name: e.target.value })} /></div>
            <div><label className="text-xs text-slate-500 block mb-1">Description</label><textarea className="input-glass w-full" rows={2} value={settings.site_description} onChange={(e) => setSettings({ ...settings, site_description: e.target.value })} /></div>
            <div><label className="text-xs text-slate-500 block mb-1">Admin Email</label><input className="input-glass w-full" value={settings.admin_email} onChange={(e) => setSettings({ ...settings, admin_email: e.target.value })} /></div>
          </div>
        </div>

        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Payment & Pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div><label className="text-xs text-slate-500 block mb-1">Currency</label>
              <select className="input-glass w-full" value={settings.currency} onChange={(e) => setSettings({ ...settings, currency: e.target.value })}>
                <option value="INR">INR (₹)</option><option value="USD">USD ($)</option>
              </select>
            </div>
            <div><label className="text-xs text-slate-500 block mb-1">Tax Rate (%)</label><input className="input-glass w-full" type="number" value={settings.tax_rate} onChange={(e) => setSettings({ ...settings, tax_rate: e.target.value })} /></div>
          </div>
        </div>

        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Features</h2>
          <div className="space-y-3 sm:space-y-4">
            {[
              { key: "maintenance_mode", label: "Maintenance Mode", desc: "Show maintenance page to visitors" },
              { key: "signup_enabled", label: "User Signup", desc: "Allow new user registrations" },
              { key: "reviews_enabled", label: "Reviews", desc: "Enable product reviews" },
            ].map((f) => (
              <div key={f.key} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-white">{f.label}</p>
                  <p className="text-xs text-slate-500 truncate">{f.desc}</p>
                </div>
                <button onClick={() => toggle(f.key)} className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${settings[f.key] === "true" ? "bg-red-500" : "bg-white/10"}`}>
                  <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings[f.key] === "true" ? "left-6" : "left-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Limits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div><label className="text-xs text-slate-500 block mb-1">Max Upload Size (MB)</label><input className="input-glass w-full" type="number" value={settings.max_upload_size} onChange={(e) => setSettings({ ...settings, max_upload_size: e.target.value })} /></div>
            <div><label className="text-xs text-slate-500 block mb-1">Download Link Expiry (hrs)</label><input className="input-glass w-full" type="number" value={settings.download_expiry} onChange={(e) => setSettings({ ...settings, download_expiry: e.target.value })} /></div>
          </div>
        </div>

        <button onClick={handleSave} disabled={saving} className="btn-primary w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-50">{saving ? "Saving..." : "Save Settings"}</button>
      </div>
    </div>
  );
}
