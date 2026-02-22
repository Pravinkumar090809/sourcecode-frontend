"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import { HiOutlineQuestionMarkCircle, HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";

const faqs = [
  { q: "What do I get after purchase?", a: "You get instant access to download the complete source code package, including documentation, setup guides, and all related files." },
  { q: "Can I use the code for commercial projects?", a: "Yes! All our source codes come with a commercial license. You can use them in personal and commercial projects." },
  { q: "Do I get free updates?", a: "Yes, you get lifetime free updates for any source code you purchase. Updates are automatically available in your dashboard." },
  { q: "What payment methods are accepted?", a: "We accept all major payment methods through Cashfree including UPI, credit/debit cards, net banking, and wallets." },
  { q: "Is there a refund policy?", a: "Yes, we offer refunds within 7 days of purchase if the product doesn't match the description. See our refund policy for details." },
  { q: "How do I download after purchase?", a: "After successful payment, go to your Dashboard → My Products. You'll find a download button next to each purchased product." },
  { q: "Can I get support for setup?", a: "Yes, every purchase includes email support. Premium and Enterprise plans get priority and dedicated support respectively." },
  { q: "Do you offer custom development?", a: "Yes! Contact us through the contact page for custom development requests. We'll get back to you within 24 hours." },
];

export default function FAQsPage() {
  const [open, setOpen] = useState(null);
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fadeIn">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
            <HiOutlineQuestionMarkCircle className="text-2xl text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">FAQs</h1>
          <p className="text-slate-500">Frequently asked questions about SourceCode</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden animate-fadeIn" style={{ animationDelay: `${i * 60}ms` }}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                {open === i ? <HiOutlineChevronUp className="text-red-400 flex-shrink-0" /> : <HiOutlineChevronDown className="text-slate-500 flex-shrink-0" />}
              </button>
              {open === i && (
                <div className="px-4 pb-4 animate-fadeIn">
                  <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
