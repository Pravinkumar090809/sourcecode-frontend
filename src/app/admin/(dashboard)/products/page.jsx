"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { productAPI } from "@/lib/api";
import { HiOutlineShoppingBag, HiOutlinePencilSquare, HiOutlineTrash, HiOutlinePlus, HiOutlineTag } from "react-icons/hi2";
import { FiPackage } from "react-icons/fi";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const key = Cookies.get("admin_api_key");

  const load = () => {
    if (key) productAPI.adminAll(key).then((res) => {
      if (res.success) setProducts(res.products || res.data || []);
      setLoading(false);
    });
  };

  useEffect(load, [key]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    const res = await productAPI.delete(key, id);
    if (res.success) { toast.success("Product deleted"); load(); }
    else toast.error(res.message || "Delete failed");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8 animate-fadeIn">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <HiOutlineShoppingBag className="text-red-400" /> Products
          </h1>
          <p className="text-slate-500 text-sm">{products.length} total products</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2">
          <HiOutlinePlus /> Add Product
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="glass rounded-xl h-20 animate-pulse" />)}</div>
      ) : products.length > 0 ? (
        <div className="space-y-3">
          {products.map((p, i) => (
            <div key={i} className="glass rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(239,68,68,0.1)" }}>
                  <FiPackage className="text-red-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-white truncate">{p.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-red-400">₹{p.price || 0}</span>
                    {p.tags && <span className="flex items-center gap-1"><HiOutlineTag className="text-[10px]" />{typeof p.tags === "string" ? p.tags.split(",")[0] : p.tags[0]}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/admin/products/${p.id}/edit`} className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5">
                  <HiOutlinePencilSquare /> Edit
                </Link>
                <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-1.5">
                  <HiOutlineTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-16 text-center animate-fadeIn">
          <FiPackage className="text-5xl text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Products</h3>
          <Link href="/admin/products/new" className="btn-primary px-5 py-2.5 rounded-xl text-xs inline-flex items-center gap-2">
            <HiOutlinePlus /> Add First Product
          </Link>
        </div>
      )}
    </div>
  );
}
