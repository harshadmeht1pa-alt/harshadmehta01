"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <motion.div
          className="relative rounded-xl2 border border-brand-gold/25 bg-brand-gold/05 p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-brand-gold" strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="text-brand-gold text-base mb-3" style={{ fontWeight: 700 }}>
                Legal Disclaimer &amp; Risk Disclosure
              </h3>
              <div className="space-y-2 text-brand-dim text-xs sm:text-sm leading-relaxed">
                <p>
                  <strong className="text-brand-muted">Important Notice:</strong> RPC is an educational
                  and strategy-based platform. All earning figures displayed — ₹60/day, ₹95/day, ₹125/day —
                  represent <em>indicative potential only</em> and do not constitute guaranteed returns of any kind.
                </p>
                <p>
                  This platform does not provide financial advice, investment advice, or any regulated financial
                  product or service. All financial and earning activities carry inherent risk, and past performance
                  does not guarantee future results.
                </p>
                <p>
                  Users must evaluate their own risk tolerance, financial circumstances, and compliance with
                  applicable local laws before acting on any content published on this platform. All content is
                  provided strictly for educational purposes. Individual results will vary based on effort, market
                  conditions, and prior knowledge.
                </p>
                <p>
                  RPC is not registered with, licensed by, or affiliated with SEBI, RBI, or any financial
                  regulatory authority. Its services must not be construed as regulated financial services.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
