"use client";
import Footer from "@/components/Footer";
import { HiOutlineDocumentText } from "react-icons/hi2";

export default function TermsPage() {
  const sections = [
    {
      title: "Introduction",
      content: `
        <p class="mb-2">Welcome to SourceCode. These Terms of Service ("Terms") govern your use of our website, products, and services (collectively, the "Services"). Please read these Terms carefully before using the Services. By accessing or using the Services, you agree to be bound by these Terms.</p>
      `,
    },
    {
      title: "Acceptance of Terms",
      content: `
        <p class="mb-2">By creating an account, placing an order, or otherwise using the Services you confirm that you accept and agree to be bound by these Terms, our Privacy Policy, and any additional terms referenced herein.</p>
      `,
    },
    {
      title: "Eligibility",
      content: `
        <p class="mb-2">You must be at least 13 years old (or the minimum age permitted by local law) to use the Services. By using the Services you represent and warrant that you meet the eligibility requirements and that you will comply with all applicable laws and regulations.</p>
      `,
    },
    {
      title: "Account Registration & Security",
      content: `
        <p class="mb-2">To access certain features you must create an account. You agree to provide accurate, current, and complete information during registration and to maintain and promptly update your account information. You are responsible for maintaining the confidentiality of your password and for all activities that occur under your account.</p>
      `,
    },
    {
      title: "Ordering and Payment",
      content: `
        <p class="mb-2">All orders are subject to acceptance and availability. Prices are shown on the site and are subject to change. Payment is processed through third-party payment processors; by completing a purchase you agree to the terms of those providers. Payment disputes should be raised with both us and your payment provider.</p>
      `,
    },
    {
      title: "License & Permitted Use",
      content: `
        <p class="mb-2">Subject to your compliance with these Terms and payment of any applicable fees, SourceCode grants you a limited, non-exclusive, non-transferable license to use purchased digital products for your internal business or personal use. You may not resell, redistribute, sublicense, or publish the products without explicit written permission.</p>
      `,
    },
    {
      title: "Intellectual Property",
      content: `
        <p class="mb-2">All content on the Services, including text, graphics, logos, images, and software, is owned or licensed by SourceCode and protected by copyright, trademark, and other laws. Nothing in these Terms transfers ownership of any intellectual property to you.</p>
      `,
    },
    {
      title: "User Content",
      content: `
        <p class="mb-2">If you submit content (e.g., reviews, messages, or other material), you grant SourceCode a worldwide, royalty-free, sublicensable, and transferable license to use, reproduce, modify, publish, and distribute that content in connection with the Services. You represent that you have the rights to post such content and that it does not violate any laws or third-party rights.</p>
      `,
    },
    {
      title: "Prohibited Uses",
      content: `
        <ul class="list-disc list-inside text-sm text-slate-400">
          <li>Illegal activities or fraudulent behavior.</li>
          <li>Infringing intellectual property or privacy rights.</li>
          <li>Uploading viruses, malware, or harmful code.</li>
          <li>Attempting to breach security or interfere with the Services.</li>
        </ul>
      `,
    },
    {
      title: "Refunds and Cancellations",
      content: `
        <p class="mb-2">Our refund policy is described separately on the Refunds page. In general, digital products are non-refundable after delivery unless explicitly stated. For subscriptions, cancellations may be managed from your account or by contacting support.</p>
      `,
    },
    {
      title: "Delivery of Digital Goods",
      content: `
        <p class="mb-2">Digital products are delivered via download links or access tokens. It is your responsibility to ensure delivery addresses and email information are accurate. We are not liable for delivery failures caused by incorrect contact information.</p>
      `,
    },
    {
      title: "Third-Party Services",
      content: `
        <p class="mb-2">We may use third-party services for payments, hosting, analytics, or communication. Your use of such third-party services is governed by their terms and privacy policies. We are not responsible for third-party practices or content.</p>
      `,
    },
    {
      title: "Disclaimers",
      content: `
        <p class="mb-2">THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. TO THE FULLEST EXTENT PERMITTED BY LAW, SOURCECODE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
      `,
    },
    {
      title: "Limitation of Liability",
      content: `
        <p class="mb-2">TO THE MAXIMUM EXTENT PERMITTED BY LAW, SOURCECODE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICES. OUR AGGREGATE LIABILITY FOR DIRECT DAMAGES IS LIMITED TO THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.</p>
      `,
    },
    {
      title: "Indemnification",
      content: `
        <p class="mb-2">You agree to indemnify and hold SourceCode and its officers, directors, employees, and agents harmless from any claims, losses, liabilities, damages, and expenses arising from your violation of these Terms or your use of the Services.</p>
      `,
    },
    {
      title: "Termination",
      content: `
        <p class="mb-2">We may suspend or terminate your access to the Services at any time for violations of these Terms, inactivity, or legal reasons. Upon termination, your rights to access the Services cease and we may delete associated data in accordance with our retention policies.</p>
      `,
    },
    {
      title: "Governing Law & Dispute Resolution",
      content: `
        <p class="mb-2">These Terms are governed by the laws of the jurisdiction in which SourceCode operates, without regard to conflict of laws principles. Disputes will be resolved in the courts located in that jurisdiction unless otherwise agreed in writing.</p>
      `,
    },
    {
      title: "Changes to Terms",
      content: `
        <p class="mb-2">We may modify these Terms from time to time. Material changes will be posted on the site or communicated by email. Continued use of the Services after such changes constitutes acceptance of the revised Terms.</p>
      `,
    },
    {
      title: "Contact Information",
      content: `
        <p class="mb-2">For questions regarding these Terms, please contact us at <a href="mailto:edubee@proton.me" class="text-red-400">edubee@proton.me</a> or visit our <a href="/dashboard/support" class="text-red-400">Support</a> page.</p>
      `,
    },
  ];

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10 animate-fadeIn">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(59,130,246,0.08)" }}>
            <HiOutlineDocumentText className="text-2xl text-sky-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-slate-500 text-sm">Last updated: January 2025</p>
        </div>

        <div className="space-y-6">
          {sections.map((s, i) => (
            <div key={i} className="glass rounded-xl p-5 animate-fadeIn" style={{ animationDelay: `${i * 60}ms` }}>
              <h2 className="text-base font-semibold text-white mb-2">{s.title}</h2>
              <div className="text-sm text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.content }} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
    );
  }
