"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { UserPlus, BookOpen, TrendingUp, BarChart3, RefreshCcw, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: UserPlus,
    title: "Sign Up & Choose Your Plan",
    description: "Create your account in under 2 minutes. Choose the plan that fits your goals — Starter (₹1,999), Growth (₹2,999), or Elite (₹3,999). Complete secure payment and receive instant access via email.",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "border-brand-blue/30",
  },
  {
    num: "02",
    icon: BookOpen,
    title: "Complete Your Onboarding",
    description: "Begin with our structured onboarding sequence. Set your earning goals, learn the platform layout, configure your AI signal preferences, and join the community. Takes approximately 20–30 minutes.",
    color: "text-brand-blueBright",
    bg: "bg-brand-blueBright/10",
    border: "border-brand-blueBright/30",
  },
  {
    num: "03",
    icon: BookOpen,
    title: "Work Through Strategy Modules",
    description: "Progress through AI-curated learning modules at your own pace. Each module covers a specific earning strategy framework, from fundamentals to advanced techniques. Track your completion progress on your dashboard.",
    color: "text-brand-muted",
    bg: "bg-brand-bgLight",
    border: "border-brand-border",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "Follow Daily AI Signals",
    description: "Receive AI-generated signals daily based on your plan tier. Each signal includes context, rationale, and suggested approach. Apply the strategy to your preferred earning activity as guided.",
    color: "text-brand-green",
    bg: "bg-brand-green/10",
    border: "border-brand-green/30",
  },
  {
    num: "05",
    icon: BarChart3,
    title: "Track & Optimise Your Results",
    description: "Use your AI dashboard to track signal outcomes, measure consistency, and identify areas for improvement. Review performance weekly and adapt your approach based on data-driven insights.",
    color: "text-brand-gold",
    bg: "bg-brand-gold/10",
    border: "border-brand-gold/30",
  },
];

const quickFAQs = [
  { q: "How long does onboarding take?", a: "Most members complete onboarding in 20–30 minutes. You can start following AI signals on your first day." },
  { q: "Can I go through modules at my own pace?", a: "Yes. All modules are self-paced. There are no deadlines or expiry dates on your content access." },
  { q: "What if I miss a daily signal?", a: "Signals are archived in your dashboard for 30 days so you can review any signal you missed at your convenience." },
];

export default function HowItWorksPage() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start end", "end center"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <PageHero
        badge="The Process"
        badgeColor="blue"
        title="How RPC"
        titleHighlight="Works"
        subtitle="A transparent, step-by-step look at the journey from sign-up to earning — no guesswork, no surprises."
        breadcrumb={[{ label: "How It Works", href: "/how-it-works" }]}
      />

      {/* 5-step vertical timeline */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div ref={lineRef} className="relative">
            {/* Vertical line (desktop) */}
            <div className="hidden sm:block absolute left-[2.4rem] top-6 bottom-6 w-px bg-brand-border overflow-hidden">
              <motion.div className="w-full bg-gradient-to-b from-brand-blue to-brand-green" style={{ height: lineHeight }} />
            </div>

            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  className="flex gap-6"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -32 : 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.12, type: "spring", stiffness: 110, damping: 18 }}
                >
                  {/* Step circle */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full ${step.bg} border ${step.border} flex items-center justify-center z-10`}>
                      <step.icon className={`w-5 h-5 ${step.color}`} strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`glass-card rounded-xl3 border ${step.border} p-5 sm:p-6 flex-1 mb-2 hover:shadow-card-hover transition-shadow duration-300`}>
                    <div className={`text-xs ${step.color} font-semibold mb-1 tracking-widest`}>STEP {step.num}</div>
                    <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick FAQs */}
      <section className="py-10 sm:py-16 border-t border-brand-border/50">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="flex items-center gap-2 mb-6">
            <RefreshCcw className="w-5 h-5 text-brand-blue" strokeWidth={1.8} />
            <h2 className="text-white font-semibold text-xl">Quick Answers</h2>
          </div>
          <div className="space-y-4">
            {quickFAQs.map((faq) => (
              <div key={faq.q} className="glass-card rounded-xl2 border border-brand-border p-5">
                <div className="text-white font-semibold text-sm mb-2">{faq.q}</div>
                <p className="text-brand-muted text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a href="/faq" className="text-brand-blue hover:text-brand-blueBright text-sm font-semibold transition-colors underline underline-offset-2">
              See Full FAQ →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <motion.div
            className="glass-card rounded-xl3 border border-brand-blue/25 p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-2xl sm:text-3xl font-display text-white mb-3" style={{ fontWeight: 800 }}>Ready to Begin?</h2>
            <p className="text-brand-muted text-sm mb-6">Join 12,400+ members already on their earning journey.</p>
            <a href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blueBright text-white font-semibold text-sm shadow-glow-md transition-colors">
              Choose Your Plan <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
