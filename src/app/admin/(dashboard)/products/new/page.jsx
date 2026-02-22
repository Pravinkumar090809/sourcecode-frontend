"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { productAPI } from "@/lib/api";
import { HiOutlineDocumentPlus, HiOutlineArrowLeft } from "react-icons/hi2";
import Link from "next/link";

export default function AddProductPage() {
  const [form, setForm] = useState({ title: "", description: "", price: "", tags: "", file_url: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const key = Cookies.get("admin_api_key");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return toast.error("Title and price are required");
    setLoading(true);
    const res = await productAPI.create(key, { ...form, price: Number(form.price) });
    setLoading(false);
    if (res.success) { toast.success("Product created!"); router.push("/admin/products"); }
    else toast.error(res.message || "Failed to create product");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-red-400 transition-colors mb-6">
        <HiOutlineArrowLeft /> Back to Products
      </Link>
      <div className="glass rounded-2xl p-6 animate-fadeIn">
        <h1 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <HiOutlineDocumentPlus className="text-red-400" /> Add New Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 mb-1.5 block">Title *</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-glass w-full" placeholder="Product title" />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1.5 block">Description</label>
            <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-glass w-full resize-none" placeholder="Product description" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1.5 block">Price (₹) *</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-glass w-full" placeholder="499" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1.5 block">Tags</label>
              <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="input-glass w-full" placeholder="react, nextjs, web" />
            </div>
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1.5 block">File URL</label>
            <input value={form.file_url} onChange={(e) => setForm({ ...form, file_url: e.target.value })} className="input-glass w-full" placeholder="https://storage.example.com/file.zip" />
            <p className="text-xs text-slate-600 mt-1">Upload files in the Upload section first, then paste URL here</p>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-50">
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
