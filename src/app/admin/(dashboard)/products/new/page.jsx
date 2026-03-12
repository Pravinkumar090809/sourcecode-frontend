"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { adminAPI } from "@/lib/api";
import {
  HiOutlineDocumentPlus,
  HiOutlineArrowLeft,
  HiOutlineCloudArrowUp,
  HiOutlineCheckCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import Link from "next/link";
import MarkdownEditor from "@/components/admin/MarkdownEditor";

// Description Templates
const templates = {
  full: `# Product Overview

A brief introduction about this product and what problem it solves.

## ✨ Key Features

- **Feature 1** - Description of this feature
- **Feature 2** - Description of this feature
- **Feature 3** - Description of this feature

## 🛠️ Tech Stack

\`\`\`javascript
// Technologies used
- React / Next.js
- Tailwind CSS
- Node.js / Express
\`\`\`

## 📦 What's Included

- [x] Complete source code
- [x] Documentation
- [x] Free lifetime updates
- [x] Premium support

## 🚀 Getting Started

1. Download the source code
2. Run \`npm install\`
3. Configure environment variables
4. Run \`npm run dev\`

---

> **Note:** This product comes with lifetime free updates and dedicated support.
`,
  minimal: `## About This Product

A short description of what this product does and why it's useful.

### Features
- Feature 1
- Feature 2
- Feature 3

### Technologies
\`React\` \`Next.js\` \`Tailwind CSS\`
`,
};

export default function AddProductPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    tags: "",
    thumbnail_url: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const key = Cookies.get("admin_api_key");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return toast.error("Title and price are required");
    if (!form.description.trim()) return toast.error("Description is required");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", Number(form.price));
    if (form.tags) formData.append("tags", form.tags);
    if (form.thumbnail_url) formData.append("thumbnail_url", form.thumbnail_url);
    if (file) formData.append("file", file);

    const res = await adminAPI.createProductWithUpload(key, formData);
    setLoading(false);
    if (res.success) {
      toast.success("Product created!");
      router.push("/admin/products");
    } else toast.error(res.message || "Failed to create product");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-500 hover:text-red-400 transition-colors mb-4 sm:mb-6"
      >
        <HiOutlineArrowLeft className="flex-shrink-0" /> Back to Products
      </Link>

      <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 animate-fadeIn">
        <h1 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
          <HiOutlineDocumentPlus className="text-red-400 flex-shrink-0" /> Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Title */}
          <div>
            <label className="text-sm text-slate-400 mb-1.5 block">Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-glass w-full"
              placeholder="e.g., Premium E-commerce Dashboard"
            />
          </div>

          {/* Description with Markdown Editor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm text-slate-400 flex items-center gap-2">
                Description *
                <span className="text-xs text-slate-600">(Markdown supported)</span>
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, description: templates.full })}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  Full Template
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, description: templates.minimal })}
                  className="text-xs text-slate-500 hover:text-slate-400 transition-colors"
                >
                  Minimal
                </button>
              </div>
            </div>
            <MarkdownEditor
              value={form.description}
              onChange={(val) => setForm({ ...form, description: val })}
              placeholder="Write a detailed product description using Markdown..."
            />
            <p className="text-xs text-slate-600 mt-2 flex items-center gap-1">
              <HiOutlineInformationCircle />
              Use headings, lists, code blocks to make description attractive
            </p>
          </div>

          {/* Price & Tags */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1.5 block">Price (₹) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="input-glass w-full"
                placeholder="499"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1.5 block">Tags</label>
              <input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="input-glass w-full"
                placeholder="react, nextjs, dashboard, admin"
              />
            </div>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="text-sm text-slate-400 mb-1.5 block">Thumbnail URL</label>
            <input
              type="url"
              value={form.thumbnail_url}
              onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
              className="input-glass w-full"
              placeholder="https://i.imgur.com/your-image.png"
            />
            <p className="text-xs text-slate-600 mt-1.5 flex items-center gap-1">
              <HiOutlineInformationCircle />
              Paste any image URL (imgur, unsplash, etc.) — shown as product thumbnail
            </p>
            {form.thumbnail_url && (
              <div className="mt-3 rounded-xl overflow-hidden border border-white/10" style={{ maxWidth: 280 }}>
                <img
                  src={form.thumbnail_url}
                  alt="Thumbnail preview"
                  className="w-full h-40 object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </div>

          {/* ZIP File Upload */}
          <div>
            <label className="text-sm text-slate-400 mb-1.5 block">Source Code ZIP *</label>
            <div
              className="border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer hover:border-red-500/40"
              style={{
                borderColor: file ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.08)",
                background: file ? "rgba(34,197,94,0.05)" : "rgba(255,255,255,0.02)",
              }}
              onClick={() => document.getElementById("zip-upload").click()}
            >
              <input
                id="zip-upload"
                type="file"
                accept=".zip"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files[0];
                  if (f && f.size > 50 * 1024 * 1024) {
                    toast.error("File size must be under 50MB");
                    return;
                  }
                  setFile(f || null);
                }}
              />
              {file ? (
                <div className="flex items-center justify-center gap-2">
                  <HiOutlineCheckCircle className="text-green-400 text-xl" />
                  <div>
                    <p className="text-sm font-medium text-green-400">{file.name}</p>
                    <p className="text-xs text-slate-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <HiOutlineCloudArrowUp className="text-3xl text-slate-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">Click to upload ZIP file</p>
                  <p className="text-xs text-slate-600 mt-1">Max 50MB • ZIP files only</p>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}