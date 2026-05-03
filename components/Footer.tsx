"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Platform: [
    { label: "Features",      href: "/features" },
    { label: "How It Works",  href: "/how-it-works" },
    { label: "Pricing",       href: "/pricing" },
  ],
  Support: [
    { label: "Contact Us",  href: "/contact" },
    { label: "Help Center", href: "/help" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Privacy Policy",   href: "/legal/privacy" },
    { label: "Disclaimer",       href: "/disclaimer" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
  ],
};



const sectionContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Footer() {
  return (
    <footer className="relative border-t border-brand-border/60 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-14 pb-8">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-12"
          variants={sectionContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand column */}
          <motion.div variants={fadeUpItem} className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center shadow-glow-sm">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-white font-display text-lg tracking-widest" style={{ fontWeight: 700 }}>
                RPC
              </span>
            </div>
            <p className="text-brand-dim text-xs leading-relaxed mb-5 max-w-[180px]">
              India's most advanced AI-powered earning education platform.
            </p>

          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={fadeUpItem}>
              <div className="text-white text-xs tracking-wider mb-4 uppercase" style={{ fontWeight: 700 }}>
                {category}
              </div>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-brand-dim text-xs hover:text-brand-muted transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="pt-6 border-t border-brand-border/50 flex flex-col sm:flex-row items-center justify-between gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-brand-dim text-xs text-center sm:text-left">
            © {new Date().getFullYear()} RPC. All rights reserved.
          </p>
          <p className="text-brand-dim text-xs text-center sm:text-right">
            Educational platform only. No guaranteed returns.{" "}
            <a href="/disclaimer" className="hover:text-brand-muted underline underline-offset-2 transition-colors">
              Read Disclaimer
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
