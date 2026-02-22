"use client";
import { useState } from "react";
import { HiOutlineGift, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([
    { id: 1, code: "WELCOME10", discount: 10, type: "percent", uses: 45, maxUses: 100, active: true, expiry: "2025-06-30" },
    { id: 2, code: "FLAT200", discount: 200, type: "flat", uses: 12, maxUses: 50, active: true, expiry: "2025-03-31" },
    { id: 3, code: "DIWALI50", discount: 50, type: "percent", uses: 100, maxUses: 100, active: false, expiry: "2024-11-15" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: "", discount: "", type: "percent", maxUses: "", expiry: "" });

  const handleAdd = () => {
    if (!form.code || !form.discount) return toast.error("Fill required fields");
    setCoupons([...coupons, { ...form, id: Date.now(), discount: Number(form.discount), maxUses: Number(form.maxUses) || 999, uses: 0, active: true }]);
    setForm({ code: "", discount: "", type: "percent", maxUses: "", expiry: "" });
    setShowForm(false);
    toast.success("Coupon created (demo)");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 animate-fadeIn">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2"><HiOutlineGift className="text-red-400" /> Coupons</h1>
          <p className="text-slate-500 text-sm">Manage discount coupons</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary px-4 py-2 rounded-xl text-sm flex items-center gap-2"><HiOutlinePlus /> Add Coupon</button>
      </div>

      {showForm && (
        <div className="glass rounded-2xl p-6 mb-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="input-glass" placeholder="Coupon Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} />
            <input className="input-glass" type="number" placeholder="Discount Value" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} />
            <select className="input-glass" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="percent">Percentage (%)</option>
              <option value="flat">Flat (₹)</option>
            </select>
            <input className="input-glass" type="number" placeholder="Max Uses" value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: e.target.value })} />
            <input className="input-glass" type="date" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
          </div>
          <button onClick={handleAdd} className="btn-primary px-6 py-2 rounded-xl text-sm mt-4">Create Coupon</button>
        </div>
      )}

      <div className="glass rounded-2xl overflow-hidden animate-fadeIn">
        <div className="overflow-x-auto">
          <table className="table-glass">
            <thead><tr><th>Code</th><th>Discount</th><th>Uses</th><th>Expiry</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id}>
                  <td className="text-white font-mono font-medium text-sm">{c.code}</td>
                  <td className="text-slate-300 text-sm">{c.type === "percent" ? `${c.discount}%` : `₹${c.discount}`}</td>
                  <td className="text-slate-400 text-sm">{c.uses}/{c.maxUses}</td>
                  <td className="text-slate-500 text-xs">{c.expiry}</td>
                  <td><span className={c.active ? "badge-green text-xs" : "badge-red text-xs"}>{c.active ? "Active" : "Expired"}</span></td>
                  <td><button onClick={() => { setCoupons(coupons.filter((x) => x.id !== c.id)); toast.success("Deleted"); }} className="text-red-400 hover:text-red-300"><HiOutlineTrash size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
