"use client";
import Link from "next/link";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { FiGithub, FiMail, FiInstagram, FiYoutube, FiLinkedin, FiHeart } from "react-icons/fi";

export default function Footer() {
  const links = {
    Products: [
      { href: "/products", label: "All Products" },
      { href: "/categories", label: "Categories" },
      { href: "/pricing", label: "Pricing" },
      { href: "/become-customer", label: "Become Customer" },
    ],
    Company: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/faqs", label: "FAQs" },
    ],
    Legal: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/refund-policy", label: "Refund Policy" },
      { href: "/shipping", label: "Shipping & Delivery" },
    ],
  };

  return (
    <footer className="border-t border-white/5 mt-20" style={{ background: "rgba(10,10,15,0.8)" }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
                <HiOutlineCodeBracket className="text-white text-lg" />
              </div>
              <span className="text-lg font-bold text-white">Source<span style={{ color: "#ef4444" }}>Code</span></span>
            </Link>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">Premium source code marketplace. Buy, download, and build amazing projects.</p>
            <div className="flex gap-3">
              {[
                { Icon: FiGithub, href: "https://github.com/Pravinkumar0908/" },
                { Icon: FiMail, href: "mailto:edubee@proton.me" },
                { Icon: FiInstagram, href: "https://www.instagram.com/pravinkumar_90/" },
                { Icon: FiYoutube, href: "https://www.youtube.com/@codewithturn" },
                { Icon: FiLinkedin, href: "https://www.linkedin.com/in/pravin-kumar-verma-9084b3213/" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 transition-all"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <item.Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-slate-500 hover:text-red-400 transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} SourceCode. All rights reserved.</p>
          <p className="text-xs text-slate-600 flex items-center gap-1">Made with <FiHeart className="text-red-500" /> by Pravinkumar</p>
        </div>
      </div>
    </footer>
  );
}
