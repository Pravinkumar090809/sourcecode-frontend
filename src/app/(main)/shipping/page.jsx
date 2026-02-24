"use client";
import Footer from "@/components/Footer";
import { HiOutlineTruck } from "react-icons/hi2";

export default function ShippingPage() {
  const effectiveDate = "23 February 2026";

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8 animate-fadeIn">
          <div
            className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: "rgba(34,197,94,0.08)" }}
          >
            <HiOutlineTruck className="text-2xl text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Shipping &amp; Delivery</h1>
          <p className="text-slate-500 text-sm">
            Information on how orders are delivered (digital or physical) — effective{' '}
            {effectiveDate}.
          </p>
        </div>

        <div className="space-y-6 animate-fadeIn" style={{ animationDelay: "80ms" }}>
          <section className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">1. Scope</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              This page explains how we deliver products you purchase on SourceCode.
              Because we primarily sell digital source code packages, most orders
              are fulfilled instantly via download links. If we ever offer physical
              goods, additional rules will apply as noted below.
            </p>
          </section>

          <section className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">2. Digital Products</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Upon successful payment, you will receive an email containing a download
              link. The link remains active for the period shown on the product page
              (typically 30 days). We recommend saving a local copy as we cannot
              guarantee availability indefinitely. Delivery is considered complete when
              the download link is provided; we are not responsible for issues on your
              network or device.
            </p>
          </section>

          <section className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">3. Physical Goods (if any)</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              If we introduce physical products such as USB drives, printed manuals,
              or merchandise, the following will apply:
            </p>
            <ul className="list-disc list-inside text-sm text-slate-400 space-y-1 mt-2">
              <li>Shipping charges are displayed at checkout and are the buyer’s responsibility.</li>
              <li>We use reputable carriers and provide tracking information where available.</li>
              <li>Delivery estimates are provided by the carrier and are not guaranteed.</li>
              <li>International shipments may be subject to customs duties, import taxes, or other fees
              imposed by the destination country; these are the responsibility of the buyer.
              </li>
              <li>We are not liable for delays due to carrier issues, force majeure, or incorrect
              shipping addresses provided by the customer.</li>
            </ul>
          </section>

          <section className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">4. Change of Address</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              For physical shipments, please provide a complete and accurate delivery address.
              If you need to change the address after placing an order, contact support immediately;
              additional charges may apply and we cannot guarantee successful rerouting.
            </p>
          </section>

          <section className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">5. Lost or Damaged Packages</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Once a package is marked as delivered by the carrier, our responsibility ends.
              If you believe a shipment is lost or damaged, contact the carrier first and
              provide us with the tracking number so we may assist with claims.
              For digital orders, contact support if the download link fails or the file is corrupted.
            </p>
          </section>

          <section className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">6. Contact</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              For questions about delivery or to report problems, email us at{' '}
              <a href="mailto:edubee@proton.me" className="text-red-400 hover:text-red-300 underline">
                edubee@proton.me
              </a>{' '}
              or open a ticket on the <a href="/dashboard/support" className="text-red-400 hover:text-red-300 underline">
                Support</a> page.
            </p>
          </section>

          <section className="text-xs text-slate-500">
            <p>Last updated: {effectiveDate}</p>
            <p className="mt-2">This information is provided for customer transparency and
              compliance with applicable laws. It is not legal advice.</p>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
