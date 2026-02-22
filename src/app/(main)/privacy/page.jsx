"use client";
import Footer from "@/components/Footer";
import { HiOutlineShieldCheck } from "react-icons/hi2";

export default function PrivacyPage() {
  const sections = [
    { title: "Information We Collect", content: "We collect personal information you provide (name, email) and usage data (browser type, pages visited) to improve our services." },
    { title: "How We Use Your Data", content: "Your data is used to process orders, provide support, send important updates, and improve our platform experience." },
    { title: "Data Security", content: "We implement industry-standard security measures including encryption, secure servers, and regular security audits." },
    { title: "Third-Party Services", content: "We use Cashfree for payments and Supabase for data storage. These services have their own privacy policies." },
    { title: "Cookies", content: "We use essential cookies for authentication and preferences. No tracking cookies are used without consent." },
    { title: "Your Rights", content: "You can request access to, correction of, or deletion of your personal data at any time by contacting us." },
    { title: "Data Retention", content: "We retain your data as long as your account is active. You can request deletion of your account and data at any time." },
    { title: "Contact", content: "For privacy-related questions, contact us at privacy@sourcecode.com." },
  ];

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10 animate-fadeIn">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(34,197,94,0.1)" }}>
            <HiOutlineShieldCheck className="text-2xl text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: January 2025</p>
        </div>
        <div className="space-y-6">
          {sections.map((s, i) => (
            <div key={i} className="glass rounded-xl p-5 animate-fadeIn" style={{ animationDelay: `${i * 60}ms` }}>
              <h2 className="text-base font-semibold text-white mb-2">{s.title}</h2>
              <p className="text-sm text-slate-400 leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
