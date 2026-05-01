"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Download, Mail, ExternalLink, ArrowRight } from "lucide-react";

const releases = [
  {
    date: "Apr 15, 2026",
    title: "NexaAI Surpasses 12,000 Active Members Milestone",
    excerpt: "India's leading AI earning education platform reaches a landmark 12,000 active members across 22 Indian states, with members reporting consistent application of AI-guided strategies.",
  },
  {
    date: "Mar 1, 2026",
    title: "Launch of AI Signal Engine v2.0 — Industry's Highest Accuracy",
    excerpt: "NexaAI announces the release of its second-generation AI signal engine, achieving 89% strategy signal accuracy over a 6-month test period, a significant improvement over v1.0.",
  },
  {
    date: "Jan 20, 2026",
    title: "NexaAI Partners with Education Organisations Across India",
    excerpt: "NexaAI announces educational partnerships to bring AI-powered earning strategy literacy to tier 2 and tier 3 cities across India, expanding access beyond metro markets.",
  },
];

const mediaKit = [
  { title: "Brand Logo Pack",     desc: "SVG, PNG (light & dark variants)",       icon: Download },
  { title: "Brand Guidelines",    desc: "Colours, typography, usage rules — PDF",  icon: Download },
  { title: "Product Screenshots", desc: "High-res UI screenshots — ZIP",           icon: Download },
  { title: "Founder Photo",       desc: "Press-approved headshots — JPEG",         icon: Download },
];

const coverage = [
  "TechCrunch India",
  "Economic Times",
  "YourStory",
  "Inc42",
  "The Hindu Business Line",
];

export default function PressPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <PageHero
        badge="Press & Media"
        badgeColor="blue"
        title="NexaAI in"
        titleHighlight="the News"
        subtitle="Press releases, media kit, and contact information for journalists, bloggers, and media professionals."
        breadcrumb={[{ label: "Press", href: "/press" }]}
      />

      <div className="mx-auto max-w-5xl px-5 sm:px-8 pb-20 space-y-16">
        {/* Press releases */}
        <div>
          <h2 className="text-white font-semibold text-2xl mb-8">Latest Press Releases</h2>
          <div className="space-y-5">
            {releases.map((r, i) => (
              <motion.a
                key={r.title}
                href="#"
                className="block glass-card rounded-xl2 border border-brand-border p-5 sm:p-6 hover:border-brand-borderGlow hover:shadow-card-hover transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 110, damping: 18 }}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-brand-dim text-xs mb-2">{r.date}</div>
                    <h3 className="text-white font-semibold text-base mb-2 group-hover:text-brand-blueBright transition-colors">{r.title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed">{r.excerpt}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-brand-dim group-hover:text-brand-blue transition-colors shrink-0 mt-1" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Media kit */}
        <div>
          <h2 className="text-white font-semibold text-2xl mb-3">Media Resources</h2>
          <p className="text-brand-muted text-sm mb-7">Download official NexaAI brand assets for use in press coverage.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {mediaKit.map((item, i) => (
              <motion.a
                key={item.title}
                href="#"
                className="glass-card rounded-xl2 border border-brand-border p-5 flex items-center justify-between hover:border-brand-borderGlow hover:shadow-card-hover transition-all duration-300 group"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -3 }}
              >
                <div>
                  <div className="text-white font-semibold text-sm mb-0.5 group-hover:text-brand-blueBright transition-colors">{item.title}</div>
                  <div className="text-brand-dim text-xs">{item.desc}</div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-brand-blue" strokeWidth={1.8} />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* As featured in */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-6 text-center">As Featured In</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {coverage.map((name) => (
              <div key={name} className="glass-card rounded-xl border border-brand-border px-5 py-2.5 text-brand-muted text-sm font-medium hover:border-brand-borderGlow hover:text-white transition-all cursor-default">
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Press contact */}
        <motion.div
          className="glass-card rounded-xl2 border border-brand-border p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-brand-blue" strokeWidth={1.8} />
              <h3 className="text-white font-semibold text-base">Press Contact</h3>
            </div>
            <p className="text-brand-muted text-sm mb-2">For media inquiries, interview requests, and press-related matters:</p>
            <div className="space-y-1 text-sm">
              <div><span className="text-brand-dim">Name:</span> <span className="text-white font-semibold">NexaAI Communications Team</span></div>
              <div><span className="text-brand-dim">Email:</span> <a href="mailto:press@nexaai.in" className="text-brand-blue hover:text-brand-blueBright underline underline-offset-2 transition-colors">press@nexaai.in</a></div>
              <div><span className="text-brand-dim">Response:</span> <span className="text-brand-muted">Typically within 1–2 business days</span></div>
            </div>
          </div>
          <a href="mailto:press@nexaai.in" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blueBright text-white text-sm font-semibold transition-colors shadow-glow-sm shrink-0">
            Contact Press Team <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
