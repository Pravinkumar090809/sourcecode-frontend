"use client";
import Footer from "@/components/Footer";
import { HiOutlineDocumentText } from "react-icons/hi2";

export default function TermsPage() {
  const sections = [
    { title: "1. Acceptance of Terms", content: "By accessing and using SourceCode, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our services." },
    { title: "2. User Accounts", content: "You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your account credentials." },
    { title: "3. Purchases & Licensing", content: "All purchases grant you a license to use the source code. The specific license type (Personal/Commercial/Enterprise) depends on the plan you choose." },
    { title: "4. Intellectual Property", content: "All source code, designs, and content remain the intellectual property of their respective creators. Purchases grant usage licenses, not ownership." },
    { title: "5. Prohibited Uses", content: "You may not redistribute, resell, or share purchased source code. You may not use our platform for illegal activities or to infringe on others' rights." },
    { title: "6. Refund Policy", content: "Refunds are available within 7 days of purchase under our refund policy conditions. Digital products are non-refundable after download in certain cases." },
    { title: "7. Limitation of Liability", content: "SourceCode is provided 'as is'. We are not liable for any damages arising from the use of purchased source code or our platform." },
    { title: "8. Changes to Terms", content: "We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance of the new terms." },
  ];

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10 animate-fadeIn">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
            <HiOutlineDocumentText className="text-2xl text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
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
