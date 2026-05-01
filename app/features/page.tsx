"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Zap, BookOpen, Users, BarChart3, MessageSquare, Brain, ArrowRight, TrendingUp, Star } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Earning Signals",
    description: "Receive real-time, AI-generated signals based on proven earning strategy frameworks. Our algorithms analyse patterns to surface high-confidence opportunities for your plan tier.",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "border-brand-blue/20",
  },
  {
    icon: BookOpen,
    title: "Strategy Modules Library",
    description: "Access a curated library of 10–unlimited strategy modules (depending on your plan), covering everything from basic earning fundamentals to advanced AI-assisted frameworks.",
    color: "text-brand-blueBright",
    bg: "bg-brand-blueBright/10",
    border: "border-brand-blueBright/20",
  },
  {
    icon: TrendingUp,
    title: "Live AI Analysis Sessions",
    description: "Join live sessions where our AI tools walk through real-time strategy analysis. Available to Growth and Elite plan members. Recorded replays available for 30 days.",
    color: "text-brand-green",
    bg: "bg-brand-green/10",
    border: "border-brand-green/20",
  },
  {
    icon: Users,
    title: "Community Access",
    description: "Connect with 12,400+ members in our Discord community. Share strategies, discuss AI signals, and learn from top earners. All plan tiers get community access.",
    color: "text-brand-gold",
    bg: "bg-brand-gold/10",
    border: "border-brand-gold/20",
  },
  {
    icon: BarChart3,
    title: "AI Performance Dashboard",
    description: "Track your progress, review signal history, and monitor your learning journey through a personalised AI-powered dashboard. Elite members get a fully custom dashboard.",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "border-brand-blue/20",
  },
  {
    icon: MessageSquare,
    title: "Priority Support",
    description: "Get help when you need it. Starter plan members receive email support. Growth members get 24-hour response. Elite members enjoy 6-hour priority support.",
    color: "text-brand-muted",
    bg: "bg-brand-bgLight",
    border: "border-brand-border",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <PageHero
        badge="Platform Features"
        badgeColor="blue"
        title="Everything You Need"
        titleHighlight="to Succeed"
        subtitle="NexaAI combines cutting-edge AI signals, proven earning strategies, and a thriving community to give you every advantage on your earning journey."
        breadcrumb={[{ label: "Features", href: "/features" }]}
      />

      {/* Feature grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {features.map((feat) => (
              <motion.div
                key={feat.title}
                variants={cardVariants}
                className={`glass-card rounded-xl3 p-6 border ${feat.border} hover:shadow-card-hover transition-shadow duration-300`}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-xl ${feat.bg} flex items-center justify-center mb-5`}
                  whileHover={{ scale: 1.12, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <feat.icon className={`w-6 h-6 ${feat.color}`} strokeWidth={1.8} />
                </motion.div>
                <h3 className="text-white font-semibold text-base mb-2">{feat.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Highlight split section */}
      <section className="py-16 sm:py-20 border-t border-brand-border/50">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 110, damping: 18 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-green/25 bg-brand-green/10 text-brand-green text-xs font-medium mb-5">
                <Zap className="w-3.5 h-3.5" />
                Why Choose NexaAI
              </div>
              <h2 className="text-3xl sm:text-4xl font-display text-white mb-5 leading-tight" style={{ fontWeight: 800 }}>
                AI-Guided Learning,{" "}
                <span className="text-gradient-blue">Real-World Results</span>
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Brain, text: "AI signals updated in real time — never stale strategy data." },
                  { icon: BookOpen, text: "Structured curriculum — from beginner basics to elite frameworks." },
                  { icon: Users, text: "Active community of 12,400+ members supporting each other." },
                  { icon: Star, text: "4.9/5 platform rating across 3,200+ verified reviews." },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-brand-blue" strokeWidth={1.8} />
                    </div>
                    <p className="text-brand-muted text-sm leading-relaxed pt-1">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="glass-card rounded-xl3 p-6 sm:p-8 border-glow"
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 110, damping: 18 }}
            >
              <div className="text-brand-muted text-xs font-semibold uppercase tracking-widest mb-5">Platform by the Numbers</div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "12,400+", label: "Active Members" },
                  { value: "89%",     label: "Signal Accuracy" },
                  { value: "₹18.5 Cr+", label: "Total Earned" },
                  { value: "4.9★",    label: "Avg. Rating" },
                ].map((s) => (
                  <div key={s.label} className="text-center p-4 rounded-xl bg-brand-bgLight border border-brand-border">
                    <div className="text-2xl text-brand-blue" style={{ fontWeight: 800 }}>{s.value}</div>
                    <div className="text-brand-dim text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <motion.div
            className="glass-card rounded-xl3 border border-brand-blue/30 p-8 sm:p-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-display text-white mb-3" style={{ fontWeight: 800 }}>
              Ready to Access Every Feature?
            </h2>
            <p className="text-brand-muted text-sm mb-6">Choose a plan and get instant access to all features for your tier — one-time payment, no subscriptions.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blueBright text-white font-semibold text-sm transition-colors shadow-glow-md">
                View Pricing
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/faq" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-brand-border hover:border-brand-blue/50 text-brand-muted hover:text-white font-semibold text-sm transition-all">
                See FAQ
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
