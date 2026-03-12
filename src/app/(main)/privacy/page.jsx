"use client";
import Footer from "@/components/Footer";
import { HiOutlineShieldCheck } from "react-icons/hi2";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Definitions",
      content: `
        <p class="mb-2"><strong>"Personal Data"</strong> means any information relating to an identifiable person (e.g. name, email address, order history).</p>
        <p class="mb-2"><strong>"Processing"</strong> refers to any operation performed on personal data, such as collection, storage, use, or deletion.</p>
        <p><strong>"Services"</strong> refers to the SourceCode website and any related features offered to registered users.</p>
      `,
    },
    {
      title: "Information We Collect",
      content: `
        <p class="mb-2">We collect information that you provide directly to us when you register an account, place orders, contact support, or otherwise interact with the Services. This includes name, email address, billing/shipping address, payment details (handled by third-party processors), and any content you post.</p>
        <p>We automatically collect certain technical data when you visit the site; this may include your IP address, browser type and version, operating system, pages visited, referral URL, and device identifiers. We use cookies and similar technologies (see section below) to collect this information.</p>
      `,
    },
    {
      title: "How We Use Your Data",
      content: `
        <p class="mb-2">We use personal data to provide and improve the Services, process transactions, send order confirmations and updates, respond to your inquiries, and deliver marketing communications if you opt in.</p>
        <p>We may use aggregated or anonymized data for analytics, research, and business planning. Such data cannot be used to identify you specifically.</p>
      `,
    },
    {
      title: "Legal Basis for Processing",
      content: `
        <p class="mb-2">Where applicable, we rely on the following legal bases in accordance with GDPR and similar laws:</p>
        <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
          <li>Performance of a contract (processing necessary to fulfil your orders).</li>
          <li>Consent (for marketing communications and non-essential cookies).</li>
          <li>Legitimate interests (improving our Services, fraud prevention, and security).</li>
          <li>Compliance with legal obligations (tax reporting, record keeping).</li>
        </ul>
      `,
    },
    {
      title: "Data Security",
      content: `
        <p>We implement industry-standard physical, administrative, and technical safeguards to protect your personal data. These measures include encryption in transit (HTTPS), encrypted databases, access controls, firewalls, and regular security audits. However, no method of transmission or storage is 100% secure; we cannot guarantee absolute security.</p>
      `,
    },
    {
      title: "Third-Party Services",
      content: `
        <p class="mb-2">We engage third-party providers such as Cashfree (payment gateway), Supabase (database & storage), and SendGrid (email delivery). These providers process data on our behalf and may transfer data to their own subcontractors. Each third party has its own privacy policy and security practices. We encourage you to review their terms:</p>
        <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
          <li><a href="https://www.cashfree.com/privacy-policy" class="text-red-400 hover:text-red-300 underline" target="_blank" rel="noopener noreferrer">Cashfree Privacy Policy</a></li>
          <li><a href="https://supabase.com/privacy" class="text-red-400 hover:text-red-300 underline" target="_blank" rel="noopener noreferrer">Supabase Privacy Policy</a></li>
        </ul>
      `,
    },
    {
      title: "Cookies & Tracking",
      content: `
        <p class="mb-2">We use cookies and similar technologies to operate the site, remember your preferences, and analyze site usage. Types of cookies:</p>
        <ul class="list-disc list-inside text-sm text-slate-400 space-y-1 mb-2">
          <li><strong>Essential cookies:</strong> Required for login, shopping cart, and security.</li>
          <li><strong>Performance cookies:</strong> (e.g., Google Analytics) help us understand how visitors use the site.</li>
          <li><strong>Marketing cookies:</strong> used by third parties for advertising; we do not use them without your consent.</li>
        </ul>
        <p>You can manage cookie preferences via your browser settings or the cookie banner when available.</p>
      `,
    },
    {
      title: "International Data Transfers",
      content: `
        <p>Our servers and third-party providers may be located outside your country. By using the Services, you consent to the transfer of your data to jurisdictions that may have different data protection laws. Where required by law, we implement appropriate safeguards such as standard contractual clauses.</p>
      `,
    },
    {
      title: "Your Rights",
      content: `
        <p class="mb-2">Depending on your jurisdiction, you may have the right to:</p>
        <ul class="list-disc list-inside text-sm text-slate-400 space-y-1 mb-2">
          <li>Access and receive a copy of your personal data.</li>
          <li>Rectify inaccurate or incomplete information.</li>
          <li>Erase your data (the "right to be forgotten").</li>
          <li>Restrict or object to processing.</li>
          <li>Data portability.</li>
          <li>Withdraw consent where processing is based on consent.</li>
        </ul>
        <p>To exercise these rights, contact us at <a href="mailto:edubee@proton.me" class="text-red-400 hover:text-red-300 underline">edubee@proton.me</a>. We may need to verify your identity before fulfilling requests.</p>
      `,
    },
    {
      title: "Data Retention",
      content: `
        <p>We retain personal data as long as your account is active or as necessary to provide you Services. We also retain data to comply with legal obligations, resolve disputes, and enforce agreements. When data is no longer needed, we securely delete or anonymize it.</p>
      `,
    },
    {
      title: "Children's Privacy",
      content: `
        <p>Our Services are not directed to children under 13 (or higher age under applicable law). We do not knowingly collect personal data from children. If you believe we have collected data from a child, please contact us and we will delete it.</p>
      `,
    },
    {
      title: "Changes to This Policy",
      content: `
        <p>We may update this policy periodically to reflect changes in our practices or legal requirements. When we make material changes, we will notify you via email or a notice on the site. The 'Last updated' date at the top indicates when the policy was last revised.</p>
      `,
    },
    {
      title: "Contact",
      content: `
        <p>For privacy-related questions or to make requests, email us at <a href="mailto:edubee@proton.me" class="text-red-400 hover:text-red-300 underline">edubee@proton.me</a> or visit our <a href="/dashboard/support" class="text-red-400 hover:text-red-300 underline">Support</a> page.</p>
      `,
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-10 animate-fadeIn">
            <div 
              className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-green-500/10"
            >
              <HiOutlineShieldCheck className="text-2xl text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-slate-500 text-sm">Last updated: January 2025</p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div 
                key={index} 
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 animate-fadeIn"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <h2 className="text-base font-semibold text-white mb-3">
                  {section.title}
                </h2>
                {/* ✅ Fixed: Use div with dangerouslySetInnerHTML to render HTML */}
                <div 
                  className="text-sm text-slate-400 leading-relaxed prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}