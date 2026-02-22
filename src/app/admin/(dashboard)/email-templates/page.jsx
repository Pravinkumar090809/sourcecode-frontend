"use client";
import { useState } from "react";
import { HiOutlineEnvelope, HiOutlinePencilSquare } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function AdminEmailTemplatesPage() {
  const [templates, setTemplates] = useState([
    { id: 1, name: "Welcome Email", subject: "Welcome to SourceCode Store!", trigger: "User Registration", active: true },
    { id: 2, name: "Order Confirmation", subject: "Your order has been confirmed", trigger: "Order Placed", active: true },
    { id: 3, name: "Payment Success", subject: "Payment received successfully", trigger: "Payment Verified", active: true },
    { id: 4, name: "Download Ready", subject: "Your download link is ready", trigger: "Order Completed", active: true },
    { id: 5, name: "Password Reset", subject: "Reset your password", trigger: "Password Reset Request", active: false },
    { id: 6, name: "Refund Processed", subject: "Your refund has been processed", trigger: "Refund Approved", active: false },
  ]);

  const [editing, setEditing] = useState(null);

  return (
    <div>
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2"><HiOutlineEnvelope className="text-red-400" /> Email Templates</h1>
        <p className="text-slate-500 text-sm">Manage automated email templates</p>
      </div>

      <div className="space-y-4 animate-fadeIn">
        {templates.map((t) => (
          <div key={t.id} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-sm font-semibold text-white">{t.name}</h3>
                  <span className={t.active ? "badge-green text-xs" : "badge-red text-xs"}>{t.active ? "Active" : "Inactive"}</span>
                </div>
                <p className="text-xs text-slate-400 mb-1">Subject: {t.subject}</p>
                <p className="text-xs text-slate-600">Trigger: {t.trigger}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => { setTemplates(templates.map((x) => x.id === t.id ? { ...x, active: !x.active } : x)); toast.success(`Template ${t.active ? "disabled" : "enabled"}`); }} className={`w-11 h-6 rounded-full transition-all relative ${t.active ? "bg-red-500" : "bg-white/10"}`}>
                  <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${t.active ? "left-6" : "left-1"}`} />
                </button>
                <button onClick={() => setEditing(editing === t.id ? null : t.id)} className="text-slate-400 hover:text-white transition-colors"><HiOutlinePencilSquare size={18} /></button>
              </div>
            </div>
            {editing === t.id && (
              <div className="mt-4 pt-4 border-t border-white/5 animate-fadeIn">
                <div className="space-y-3">
                  <div><label className="text-xs text-slate-500 block mb-1">Subject</label><input className="input-glass w-full" defaultValue={t.subject} /></div>
                  <div><label className="text-xs text-slate-500 block mb-1">Body (HTML)</label><textarea className="input-glass w-full font-mono text-xs" rows={6} defaultValue={`<h1>Hello {{user_name}}</h1>\n<p>Thank you for using SourceCode Store.</p>\n<p>{{content}}</p>`} /></div>
                  <button onClick={() => { setEditing(null); toast.success("Template saved (demo)"); }} className="btn-primary px-4 py-2 rounded-xl text-sm">Save Template</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
