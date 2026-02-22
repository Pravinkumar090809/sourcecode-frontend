"use client";

import { useEffect, useState } from "react";
import { productAPI } from "@/lib/api";
import { ADMIN_API_KEY } from "@/lib/store";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { HiPlus, HiPencil, HiTrash, HiX, HiCode, HiExclamationCircle } from "react-icons/hi";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  zip_path: string | null;
  is_active: boolean;
  created_at: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", price: "" });
  const [formErrors, setFormErrors] = useState<{ title?: string; price?: string }>({});
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    const res = await productAPI.adminAll(ADMIN_API_KEY);
    if (res.success) setProducts(res.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const validateForm = () => {
    const errs: typeof formErrors = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.price || Number(form.price) <= 0) errs.price = "Enter a valid price";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSaving(true);

    try {
      const payload = { title: form.title.trim(), description: form.description.trim(), price: Number(form.price) };
      if (editId) {
        const res = await productAPI.update(ADMIN_API_KEY, editId, payload);
        if (res.success) { toast.success("Product updated ✅"); resetForm(); fetchProducts(); }
        else toast.error(res.message);
      } else {
        const res = await productAPI.create(ADMIN_API_KEY, payload);
        if (res.success) { toast.success("Product created ✅"); resetForm(); fetchProducts(); }
        else toast.error(res.message);
      }
    } catch { toast.error("Failed"); }
    setSaving(false);
  };

  const handleEdit = (p: Product) => {
    setEditId(p.id);
    setForm({ title: p.title, description: p.description, price: String(p.price) });
    setFormErrors({});
    setShowForm(true);
  };

  const handleDelete = async (id: string, permanent = false) => {
    if (!confirm(permanent ? "Permanently delete this product?" : "Deactivate this product?")) return;
    const res = permanent ? await productAPI.hardDelete(ADMIN_API_KEY, id) : await productAPI.delete(ADMIN_API_KEY, id);
    if (res.success) { toast.success(permanent ? "Deleted permanently" : "Deactivated"); fetchProducts(); }
    else toast.error(res.message);
  };

  const resetForm = () => { setShowForm(false); setEditId(null); setForm({ title: "", description: "", price: "" }); setFormErrors({}); };

  if (loading) return <Loading />;

  return (
    <div className="pb-20 lg:pb-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Manage <span className="gradient-text">Products</span></h1>
          <p className="text-xs text-slate-400 mt-1">{products.length} total products</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-primary text-sm !py-2.5 !px-5">
          <HiPlus /> Add Product
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 animate-fade-in" onClick={resetForm}>
          <div className="glass-strong p-6 sm:p-8 w-full max-w-md animate-fade-in-scale" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-extrabold text-slate-800">{editId ? "Edit" : "Add"} Product</h2>
              <button onClick={resetForm} className="text-slate-300 hover:text-slate-600 transition-colors"><HiX className="text-xl" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <input value={form.title} onChange={(e) => { setForm({ ...form, title: e.target.value }); setFormErrors({ ...formErrors, title: undefined }); }} className={`input-glass ${formErrors.title ? "input-error" : ""}`} placeholder="Product Title" />
                {formErrors.title && <p className="error-text"><HiExclamationCircle /> {formErrors.title}</p>}
              </div>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-glass min-h-[90px] resize-none" placeholder="Description (optional)" />
              <div>
                <input type="number" value={form.price} onChange={(e) => { setForm({ ...form, price: e.target.value }); setFormErrors({ ...formErrors, price: undefined }); }} className={`input-glass ${formErrors.price ? "input-error" : ""}`} placeholder="Price (₹)" min="1" />
                {formErrors.price && <p className="error-text"><HiExclamationCircle /> {formErrors.price}</p>}
              </div>
              <button type="submit" disabled={saving} className="btn-primary w-full !mt-6">
                {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>{editId ? "Update" : "Create"} Product</>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      {products.length === 0 ? (
        <div className="glass p-10 text-center animate-fade-in-scale">
          <div className="icon-box icon-box-orange mx-auto mb-4 w-16 h-16">
            <HiCode className="text-orange-500 text-2xl" />
          </div>
          <p className="text-slate-500 font-medium">No products yet</p>
          <p className="text-xs text-slate-400 mt-1">Click &quot;Add Product&quot; to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((p, i) => (
            <div key={p.id} className={`glass p-4 sm:p-5 flex items-center justify-between animate-fade-in-up ${!p.is_active ? "opacity-50" : ""}`} style={{ animationDelay: `${0.04 * i}s` }}>
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="icon-box icon-box-orange w-11 h-11 shrink-0">
                  <HiCode className="text-orange-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-700 truncate">{p.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-extrabold gradient-text">₹{p.price}</span>
                    <span className={`badge text-[10px] ${p.is_active ? "badge-success" : "badge-error"}`}>
                      {p.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button onClick={() => handleEdit(p)} className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 hover:bg-blue-100 transition-colors" title="Edit">
                  <HiPencil className="text-sm" />
                </button>
                <button onClick={() => handleDelete(p.id)} className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 hover:bg-amber-100 transition-colors" title="Deactivate">
                  <HiX className="text-sm" />
                </button>
                <button onClick={() => handleDelete(p.id, true)} className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors" title="Delete">
                  <HiTrash className="text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
