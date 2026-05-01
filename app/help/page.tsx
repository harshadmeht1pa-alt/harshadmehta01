"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, BookOpen, TrendingUp, CreditCard, Wrench, BarChart3, Shield, ArrowRight } from "lucide-react";

const categories = [
  { icon: BookOpen,   title: "Getting Started",      count: 12, color: "text-brand-blue",       bg: "bg-brand-blue/10" },
  { icon: TrendingUp, title: "Earning Strategies",   count: 18, color: "text-brand-green",      bg: "bg-brand-green/10" },
  { icon: CreditCard, title: "Account & Billing",    count: 9,  color: "text-brand-gold",       bg: "bg-brand-gold/10" },
  { icon: Wrench,     title: "Technical Issues",     count: 7,  color: "text-brand-muted",      bg: "bg-brand-bgLight" },
  { icon: BarChart3,  title: "Platform Features",    count: 15, color: "text-brand-blueBright", bg: "bg-brand-blueBright/10" },
  { icon: Shield,     title: "Safety & Compliance",  count: 5,  color: "text-brand-gold",       bg: "bg-brand-gold/10" },
];

const allArticles = [
  { title: "How to access your AI dashboard after purchase",         category: "Getting Started",    reading: "3 min" },
  { title: "Understanding AI signals: what they mean and how to use them", category: "Earning Strategies", reading: "5 min" },
  { title: "How to upgrade from Starter to Growth or Elite plan",   category: "Account & Billing",  reading: "2 min" },
  { title: "Troubleshooting login issues on mobile browsers",        category: "Technical Issues",    reading: "3 min" },
  { title: "How the live AI analysis sessions work",                 category: "Platform Features",  reading: "4 min" },
  { title: "Is NexaAI registered with SEBI or RBI?",                category: "Safety & Compliance", reading: "2 min" },
  { title: "Setting up your profile and earning preferences",        category: "Getting Started",    reading: "4 min" },
  { title: "How to submit a refund request",                         category: "Account & Billing",  reading: "2 min" },
];

const popularSearches = ["AI signals", "Refund", "Discord", "Upgrade plan", "Dashboard", "Live sessions"];

export default function HelpPage() {
  const [query, setQuery] = useState("");

  const filtered = query.length >= 2
    ? allArticles.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase()))
    : allArticles;

  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />

      {/* Custom search hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none opacity-50" />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-display text-white mb-4" style={{ fontWeight: 800 }}>
            How can we <span className="text-gradient-blue">help you?</span>
          </h1>
          <p className="text-brand-muted text-sm mb-8">Search our help articles or browse categories below.</p>

          {/* Search input */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dim" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full bg-brand-bgCard border border-brand-border rounded-xl pl-11 pr-4 py-3.5 text-white text-sm placeholder:text-brand-dim focus:border-brand-blue/60 focus:outline-none transition-colors"
            />
          </div>

          {/* Popular searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <span className="text-brand-dim text-xs">Popular:</span>
            {popularSearches.map((s) => (
              <button key={s} onClick={() => setQuery(s)} className="px-3 py-1 rounded-full bg-brand-bgLight border border-brand-border text-brand-muted text-xs hover:border-brand-blue/40 hover:text-white transition-all">
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 sm:px-8 pb-20 space-y-14">
        {/* Categories */}
        {query.length < 2 && (
          <div>
            <h2 className="text-white font-semibold text-lg mb-6">Browse by Category</h2>
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {categories.map((cat) => (
                <motion.a
                  key={cat.title}
                  href="#"
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } } }}
                  className="glass-card rounded-xl2 border border-brand-border p-5 flex items-center gap-4 hover:border-brand-borderGlow hover:shadow-card-hover transition-all duration-300 group"
                  whileHover={{ y: -4 }}
                >
                  <div className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <cat.icon className={`w-5 h-5 ${cat.color}`} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{cat.title}</div>
                    <div className="text-brand-dim text-xs">{cat.count} articles</div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        )}

        {/* Articles */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-6">
            {query.length >= 2 ? `Results for "${query}"` : "Featured Articles"}
          </h2>
          {filtered.length === 0 ? (
            <p className="text-brand-muted text-sm">No articles found for &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            <div className="divide-y divide-brand-border/50">
              {filtered.map((art, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="flex items-center justify-between gap-4 py-4 group hover:bg-brand-bgCard/30 px-2 -mx-2 rounded-xl transition-colors"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                >
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-4 h-4 text-brand-dim shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <div className="text-white text-sm group-hover:text-brand-blueBright transition-colors">{art.title}</div>
                      <div className="text-brand-dim text-xs mt-0.5">{art.category} · {art.reading} read</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-dim group-hover:text-brand-blue group-hover:translate-x-1 transition-all shrink-0" />
                </motion.a>
              ))}
            </div>
          )}
        </div>

        {/* Still need help */}
        <div className="glass-card rounded-xl2 border border-brand-border p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white font-semibold mb-1">Can&rsquo;t find what you need?</div>
            <p className="text-brand-muted text-sm">Our support team responds within 24 hours.</p>
          </div>
          <a href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blueBright text-white text-sm font-semibold transition-colors shadow-glow-sm shrink-0">
            Contact Support
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
