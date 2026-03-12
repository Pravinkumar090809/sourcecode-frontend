"use client";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { adminAPI } from "@/lib/api";
import { HiOutlineMagnifyingGlass, HiOutlineGlobeAlt } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function AdminSeoPage() {
  const [seo, setSeo] = useState({
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    seo_og_image: "",
    seo_robots: "index, follow",
    seo_canonical: "",
    seo_google_analytics: "",
    seo_sitemap: "true",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const key = Cookies.get("admin_api_key");

  const fetchSeo = useCallback(async () => {
    if (!key) return;
    try {
      const res = await adminAPI.getSettings(key, "seo_");
      if (res.success && res.data) {
        setSeo((prev) => ({ ...prev, ...res.data }));
      }
    } catch (error) {
      console.error("Failed to fetch SEO settings:", error);
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => { fetchSeo(); }, [fetchSeo]);

  const handleSave = async () => {
    setSaving(true);
    const res = await adminAPI.updateSettings(key, seo);
    setSaving(false);
    if (res.success) toast.success("SEO settings saved");
    else toast.error(res.message || "Failed to save");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6 sm:mb-8 animate-fadeIn">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <HiOutlineMagnifyingGlass className="text-red-400 flex-shrink-0" /> SEO Settings
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">Optimize your platform for search engines</p>
      </div>

      <div className="space-y-4 sm:space-y-6 animate-fadeIn">
        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2"><HiOutlineGlobeAlt className="text-blue-400" /> Meta Tags</h2>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="text-xs text-slate-500 block mb-1">Page Title</label>
              <input className="input-glass w-full" value={seo.seo_title} onChange={(e) => setSeo({ ...seo, seo_title: e.target.value })} />
              <p className="text-[10px] text-slate-600 mt-1">{seo.seo_title.length}/60 characters</p>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1">Meta Description</label>
              <textarea className="input-glass w-full" rows={3} value={seo.seo_description} onChange={(e) => setSeo({ ...seo, seo_description: e.target.value })} />
              <p className="text-[10px] text-slate-600 mt-1">{seo.seo_description.length}/160 characters</p>
            </div>
            <div><label className="text-xs text-slate-500 block mb-1">Keywords</label><input className="input-glass w-full" value={seo.seo_keywords} onChange={(e) => setSeo({ ...seo, seo_keywords: e.target.value })} /></div>
            <div><label className="text-xs text-slate-500 block mb-1">Canonical URL</label><input className="input-glass w-full" value={seo.seo_canonical} onChange={(e) => setSeo({ ...seo, seo_canonical: e.target.value })} /></div>
          </div>
        </div>

        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Search Engine Preview</h2>
          <div className="p-3 sm:p-4 rounded-xl bg-white/[0.03] overflow-hidden">
            <p className="text-blue-400 text-sm sm:text-base font-medium truncate">{seo.seo_title || "Page Title"}</p>
            <p className="text-green-400 text-[10px] sm:text-xs mt-1 truncate">{seo.seo_canonical || "https://example.com"}</p>
            <p className="text-slate-400 text-[10px] sm:text-xs mt-1 line-clamp-2">{seo.seo_description || "Meta description..."}</p>
          </div>
        </div>

        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Advanced</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div><label className="text-xs text-slate-500 block mb-1">Robots</label>
                <select className="input-glass w-full" value={seo.seo_robots} onChange={(e) => setSeo({ ...seo, seo_robots: e.target.value })}>
                  <option value="index, follow">Index, Follow</option>
                  <option value="noindex, nofollow">No Index, No Follow</option>
                  <option value="index, nofollow">Index, No Follow</option>
                </select>
              </div>
              <div><label className="text-xs text-slate-500 block mb-1">Google Analytics ID</label><input className="input-glass w-full" placeholder="G-XXXXXXXXXX" value={seo.seo_google_analytics} onChange={(e) => setSeo({ ...seo, seo_google_analytics: e.target.value })} /></div>
            </div>
            <div><label className="text-xs text-slate-500 block mb-1">OG Image URL</label><input className="input-glass w-full" placeholder="https://example.com/og-image.jpg" value={seo.seo_og_image} onChange={(e) => setSeo({ ...seo, seo_og_image: e.target.value })} /></div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] gap-3">
              <div className="min-w-0"><p className="text-sm text-white">Auto Sitemap</p><p className="text-xs text-slate-500">Generate sitemap.xml automatically</p></div>
              <button onClick={() => setSeo({ ...seo, seo_sitemap: seo.seo_sitemap === "true" ? "false" : "true" })} className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${seo.seo_sitemap === "true" ? "bg-red-500" : "bg-white/10"}`}>
                <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${seo.seo_sitemap === "true" ? "left-6" : "left-1"}`} />
              </button>
            </div>
          </div>
        </div>

        <button onClick={handleSave} disabled={saving} className="btn-primary w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-50">{saving ? "Saving..." : "Save SEO Settings"}</button>
      </div>
    </div>
  );
}
