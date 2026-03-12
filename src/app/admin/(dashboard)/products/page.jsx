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

  const handleDeactivate = async (id) => {
    console.log("handleDeactivate called", id);
    if (!confirm("Deactivate this product? This is a soft delete.")) return;
    try {
      const res = await productAPI.delete(key, id);
      console.log("deactivate API returned", res);
      if (res && res.success) {
        toast.success("Product deactivated");
        load();
      } else {
        console.error("Deactivate failed response:", res);
        toast.error((res && res.message) || "Deactivate failed");
      }
    } catch (err) {
      console.error("Deactivate API threw", err);
      toast.error("Request error, check console/ network");
    }
  };

  const handleHardDelete = async (id) => {
    console.log("handleHardDelete called", id);
    if (!confirm("PERMANENTLY delete this product? This cannot be undone.")) return;
    try {
      const res = await productAPI.hardDelete(key, id);
      console.log("hard delete API returned", res);
      if (res && res.success) {
        toast.success("Product permanently deleted");
        load();
      } else {
        console.error("Hard delete failed response:", res);
        toast.error((res && res.message) || "Hard delete failed");
      }
    } catch (err) {
      console.error("Hard delete API threw", err);
      toast.error("Request error, check console/ network");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 animate-fadeIn">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <HiOutlineShoppingBag className="text-red-400 flex-shrink-0" /> All Products
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">{products.length} total products</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 w-fit">
          <HiOutlinePlus /> Add Product
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="glass rounded-xl h-20 animate-pulse" />)}</div>
      ) : products.length > 0 ? (
        <div className="space-y-2 sm:space-y-3">
          {products.map((p, i) => (
            <div key={i} className="glass rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 animate-fadeIn" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center gap-3 flex-1 min-w-0 w-full sm:w-auto">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden" style={{ background: "rgba(239,68,68,0.1)" }}>
                  {p.thumbnail_url ? (
                    <img src={p.thumbnail_url} alt="" className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <FiPackage className="text-red-400 text-sm sm:text-base" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-white truncate">
                    {p.title}
                    {!p.is_active && (
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-semibold rounded bg-yellow-500/20 text-yellow-400">
                        Inactive
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-red-400">₹{p.price || 0}</span>
                    {p.tags && <span className="items-center gap-1 hidden sm:flex"><HiOutlineTag className="text-[10px]" />{typeof p.tags === "string" ? p.tags.split(",")[0] : p.tags[0]}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 ml-12 sm:ml-0">
                <Link href={`/admin/products/${p.id}/edit`} className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5">
                  <HiOutlinePencilSquare /> Edit
                </Link>
                <button onClick={() => handleDeactivate(p.id)} className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-1.5">
                  <HiOutlineTrash /> Deactivate
                </button>
                <button onClick={() => handleHardDelete(p.id)} className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs text-white bg-red-600 hover:bg-red-700 transition-all flex items-center gap-1.5">
                  <HiOutlineTrash /> Hard Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-xl sm:rounded-2xl p-10 sm:p-16 text-center animate-fadeIn">
          <FiPackage className="text-4xl sm:text-5xl text-slate-600 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3">No Products Yet</h3>
          <Link href="/admin/products/new" className="btn-primary px-5 py-2.5 rounded-xl text-xs inline-flex items-center gap-2">
            <HiOutlinePlus /> Add First Product
          </Link>
        </div>
      )}
    </div>
  );
}
