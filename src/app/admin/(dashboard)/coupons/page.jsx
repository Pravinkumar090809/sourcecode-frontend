"use client";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { adminAPI } from "@/lib/api";
import { HiOutlineGift, HiOutlinePlus, HiOutlineTrash, HiOutlineArrowPath } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: "", discount: "", type: "percent", max_uses: "", expiry: "" });
  const key = Cookies.get("admin_api_key");

  const fetchCoupons = useCallback(async () => {
    if (!key) return;
    try {
      const res = await adminAPI.getCoupons(key);
      if (res.success) setCoupons(res.data || []);
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => { fetchCoupons(); }, [fetchCoupons]);

  const handleAdd = async () => {
    if (!form.code || !form.discount) return toast.error("Fill required fields");
    const res = await adminAPI.createCoupon(key, {
      code: form.code.toUpperCase(),
      discount: Number(form.discount),
      type: form.type,
      max_uses: Number(form.max_uses) || 999,
      expiry: form.expiry || null,
    });
    if (res.success) {
      toast.success("Coupon created");
      setForm({ code: "", discount: "", type: "percent", max_uses: "", expiry: "" });
      setShowForm(false);
      fetchCoupons();
    } else {
      toast.error(res.message || "Failed to create coupon");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 animate-fadeIn">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <HiOutlineGift className="text-red-400 flex-shrink-0" /> Discount Coupons
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">Create and manage discount codes</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-2 w-fit">
          <HiOutlinePlus /> Add Coupon
        </button>
      </div>

      {showForm && (
        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input className="input-glass" placeholder="Coupon Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} />
            <input className="input-glass" type="number" placeholder="Discount Value" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} />
            <select className="input-glass" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="percent">Percentage (%)</option>
              <option value="flat">Flat (₹)</option>
            </select>
            <input className="input-glass" type="number" placeholder="Max Uses" value={form.max_uses} onChange={(e) => setForm({ ...form, max_uses: e.target.value })} />
            <input className="input-glass" type="date" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
          </div>
          <button onClick={handleAdd} className="btn-primary px-6 py-2 rounded-xl text-sm mt-4">Create Coupon</button>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block glass rounded-xl sm:rounded-2xl overflow-hidden animate-fadeIn">
        <div className="overflow-x-auto">
          <table className="table-glass">
            <thead><tr><th>Code</th><th>Discount</th><th>Uses</th><th>Expiry</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id}>
                  <td className="text-white font-mono font-medium text-sm">{c.code}</td>
                  <td className="text-slate-300 text-sm">{c.type === "percent" ? `${c.discount}%` : `₹${c.discount}`}</td>
                  <td className="text-slate-400 text-sm">{c.uses || 0}/{c.max_uses || 999}</td>
                  <td className="text-slate-500 text-xs">{c.expiry ? new Date(c.expiry).toLocaleDateString() : "—"}</td>
                  <td><span className={c.active ? "badge-green text-xs" : "badge-red text-xs"}>{c.active ? "Active" : "Inactive"}</span></td>
                  <td><button onClick={async () => { const res = await adminAPI.deleteCoupon(key, c.id); if (res.success) { setCoupons(coupons.filter((x) => x.id !== c.id)); toast.success("Deleted"); } else toast.error(res.message || "Failed"); }} className="text-red-400 hover:text-red-300 transition-colors"><HiOutlineTrash size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3 animate-fadeIn">
        {coupons.map((c) => (
          <div key={c.id} className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-mono font-semibold text-sm">{c.code}</span>
              <span className={c.active ? "badge-green text-[10px]" : "badge-red text-[10px]"}>{c.active ? "Active" : "Inactive"}</span>
            </div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-300">{c.type === "percent" ? `${c.discount}% off` : `₹${c.discount} off`}</span>
              <span className="text-slate-500">{c.uses || 0}/{c.max_uses || 999} uses</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-600">Expires: {c.expiry ? new Date(c.expiry).toLocaleDateString() : "—"}</span>
              <button onClick={async () => { const res = await adminAPI.deleteCoupon(key, c.id); if (res.success) { setCoupons(coupons.filter((x) => x.id !== c.id)); toast.success("Deleted"); } else toast.error(res.message || "Failed"); }} className="text-red-400 hover:text-red-300 transition-colors"><HiOutlineTrash size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
