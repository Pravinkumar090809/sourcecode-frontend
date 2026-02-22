"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { productAPI } from "@/lib/api";
import { ADMIN_API_KEY } from "@/lib/store";
import {
  HiCube,
  HiPencil,
  HiTrash,
  HiPlus,
  HiX,
  HiTag,
} from "react-icons/hi";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    tags: "",
    file_url: "",
  });
  const [saving, setSaving] = useState(false);

  const fetchProducts = () => {
    setLoading(true);
    productAPI
      .adminAll(ADMIN_API_KEY)
      .then((res) => setProducts(res.data || []))
      .catch(() => toast.error("Failed to load"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: "", description: "", price: "", tags: "", file_url: "" });
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      title: p.title || "",
      description: p.description || "",
      price: String(p.price || ""),
      tags: (p.tags || []).join(", "),
      file_url: p.file_url || "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.price) return toast.error("Title and price required");
    setSaving(true);
    try {
      const body = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        file_url: form.file_url,
      };

      let res;
      if (editing) {
        res = await productAPI.update(ADMIN_API_KEY, editing.id, body);
      } else {
        res = await productAPI.create(ADMIN_API_KEY, body);
      }

      if (res.success) {
        toast.success(editing ? "Updated!" : "Created!");
        setShowModal(false);
        fetchProducts();
      } else {
        toast.error(res.message || "Failed");
      }
    } catch {
      toast.error("Failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await productAPI.delete(ADMIN_API_KEY, id);
      if (res.success) {
        toast.success("Deleted!");
        fetchProducts();
      } else {
        toast.error(res.message || "Failed");
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Manage <span className="gradient-text">Products</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {products.length} products
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm">
          <HiPlus /> Add
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="glass rounded-2xl h-20 animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <HiCube className="text-4xl text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">No products yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="glass rounded-2xl p-4 sm:p-5 flex items-center gap-4"
            >
              <div className="icon-box icon-box-orange w-10 h-10 shrink-0">
                <HiCube className="text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-slate-800 truncate">
                  {p.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold gradient-text">
                    ₹{p.price}
                  </span>
                  {p.tags?.slice(0, 2).map((t, i) => (
                    <span key={i} className="badge-orange">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEdit(p)}
                  className="p-2 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
                >
                  <HiPencil />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                >
                  <HiTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editing ? "Edit Product" : "New Product"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl hover:bg-white/50 transition-colors"
              >
                <HiX className="text-lg" />
              </button>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                Title *
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="input-glass"
                placeholder="Product title"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="input-glass min-h-[100px] resize-y"
                placeholder="Product description"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="input-glass"
                  placeholder="499"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                  Tags
                </label>
                <div className="relative">
                  <HiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    className="input-glass pl-11"
                    placeholder="react, api"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                File URL
              </label>
              <input
                value={form.file_url}
                onChange={(e) => setForm({ ...form, file_url: e.target.value })}
                className="input-glass"
                placeholder="https://..."
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary w-full justify-center"
            >
              {saving
                ? "Saving..."
                : editing
                ? "Update Product"
                : "Create Product"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
