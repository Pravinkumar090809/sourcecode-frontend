"use client";
import { useState } from "react";
import { HiOutlineMagnifyingGlass, HiOutlineGlobeAlt } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function AdminSeoPage() {
  const [seo, setSeo] = useState({
    title: "SourceCode Store - Premium Source Code Marketplace",
    description: "Buy premium source code, templates, and scripts for web, mobile, and backend projects.",
    keywords: "source code, buy code, web templates, mobile app source, react, node.js, flutter",
    ogImage: "",
    robots: "index, follow",
    canonical: "https://sourcecodestore.com",
    googleAnalytics: "",
    sitemap: true,
  });

  const handleSave = () => toast.success("SEO settings saved (demo)");

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2"><HiOutlineMagnifyingGlass className="text-red-400" /> SEO Settings</h1>
        <p className="text-slate-500 text-sm">Optimize your platform for search engines</p>
      </div>

      <div className="space-y-6 animate-fadeIn">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><HiOutlineGlobeAlt className="text-blue-400" /> Meta Tags</h2>
          <div className="space-y-4">
            <div><label className="text-xs text-slate-500 block mb-1">Page Title</label><input className="input-glass w-full" value={seo.title} onChange={(e) => setSeo({ ...seo, title: e.target.value })} /><p className="text-[10px] text-slate-600 mt-1">{seo.title.length}/60 characters</p></div>
            <div><label className="text-xs text-slate-500 block mb-1">Meta Description</label><textarea className="input-glass w-full" rows={3} value={seo.description} onChange={(e) => setSeo({ ...seo, description: e.target.value })} /><p className="text-[10px] text-slate-600 mt-1">{seo.description.length}/160 characters</p></div>
            <div><label className="text-xs text-slate-500 block mb-1">Keywords</label><input className="input-glass w-full" value={seo.keywords} onChange={(e) => setSeo({ ...seo, keywords: e.target.value })} /></div>
            <div><label className="text-xs text-slate-500 block mb-1">Canonical URL</label><input className="input-glass w-full" value={seo.canonical} onChange={(e) => setSeo({ ...seo, canonical: e.target.value })} /></div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Search Engine Preview</h2>
          <div className="p-4 rounded-xl bg-white/[0.03]">
            <p className="text-blue-400 text-base font-medium truncate">{seo.title || "Page Title"}</p>
            <p className="text-green-400 text-xs mt-1">{seo.canonical || "https://example.com"}</p>
            <p className="text-slate-400 text-xs mt-1 line-clamp-2">{seo.description || "Meta description..."}</p>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Advanced</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="text-xs text-slate-500 block mb-1">Robots</label>
                <select className="input-glass w-full" value={seo.robots} onChange={(e) => setSeo({ ...seo, robots: e.target.value })}>
                  <option value="index, follow">Index, Follow</option>
                  <option value="noindex, nofollow">No Index, No Follow</option>
                  <option value="index, nofollow">Index, No Follow</option>
                </select>
              </div>
              <div><label className="text-xs text-slate-500 block mb-1">Google Analytics ID</label><input className="input-glass w-full" placeholder="G-XXXXXXXXXX" value={seo.googleAnalytics} onChange={(e) => setSeo({ ...seo, googleAnalytics: e.target.value })} /></div>
            </div>
            <div><label className="text-xs text-slate-500 block mb-1">OG Image URL</label><input className="input-glass w-full" placeholder="https://example.com/og-image.jpg" value={seo.ogImage} onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })} /></div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
              <div><p className="text-sm text-white">Auto Sitemap</p><p className="text-xs text-slate-500">Generate sitemap.xml automatically</p></div>
              <button onClick={() => setSeo({ ...seo, sitemap: !seo.sitemap })} className={`w-11 h-6 rounded-full transition-all relative ${seo.sitemap ? "bg-red-500" : "bg-white/10"}`}>
                <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${seo.sitemap ? "left-6" : "left-1"}`} />
              </button>
            </div>
          </div>
        </div>

        <button onClick={handleSave} className="btn-primary w-full py-3 rounded-xl text-sm font-semibold">Save SEO Settings</button>
      </div>
    </div>
  );
}
