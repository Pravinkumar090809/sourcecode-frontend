"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import Footer from "@/components/Footer";
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlineClock, HiOutlinePaperAirplane, HiOutlineUser, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error("Please fill required fields");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success("Message sent successfully! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const info = [
    { icon: HiOutlineEnvelope, title: "Email", value: "support@sourcecode.com", color: "#ef4444" },
    { icon: HiOutlineMapPin, title: "Location", value: "India", color: "#22c55e" },
    { icon: HiOutlineClock, title: "Response Time", value: "Within 24 hours", color: "#f59e0b" },
  ];

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-3xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-slate-500">Have a question? We&apos;d love to hear from you.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-4 animate-fadeIn">
            {info.map((item, i) => (
              <div key={i} className="glass rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15` }}>
                  <item.icon style={{ color: item.color }} className="text-lg" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2 glass rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: "100ms" }}>
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <HiOutlineChatBubbleLeftRight className="text-red-400" /> Send Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-1.5 block">Name *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-glass w-full" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-1.5 block">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-glass w-full" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">Subject</label>
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-glass w-full" placeholder="What's this about?" />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">Message *</label>
                <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-glass w-full resize-none" placeholder="Your message..." />
              </div>
              <button type="submit" disabled={loading} className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold disabled:opacity-50 flex items-center gap-2">
                {loading ? "Sending..." : <><HiOutlinePaperAirplane /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
