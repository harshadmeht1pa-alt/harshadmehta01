"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { MessageSquare, Globe, Star, TrendingUp, Shield, Heart, Lightbulb, Users } from "lucide-react";

const communityStats = [
  { numericTarget: 12400, formatter: (v: number) => `${Math.round(v).toLocaleString("en-IN")}+`, label: "Members", color: "text-brand-blue" },
  { numericTarget: 4800, formatter: (v: number) => `${Math.round(v).toLocaleString("en-IN")}+`, label: "Daily Messages", color: "text-brand-green" },
  { numericTarget: 28, formatter: (v: number) => `${Math.round(v)}+`, label: "States Represented", color: "text-brand-gold" },
  { numericTarget: 125, formatter: (v: number) => `₹${Math.round(v)}`, label: "Top Earner/Day", color: "text-brand-blueBright" },
];

const testimonials = [
  { initial: "R", name: "Rahul K.", plan: "Elite", stars: 5, quote: "The AI signals are genuinely useful. I've been consistently applying the strategies for 3 months and see steady progress. The community is very supportive." },
  { initial: "P", name: "Priya S.", plan: "Growth", stars: 5, quote: "I was sceptical at first, but the structured modules really helped me understand the strategies. The live sessions are a great addition." },
  { initial: "A", name: "Amit V.", plan: "Growth", stars: 5, quote: "What I love most is the community — everyone shares what works and what doesn't. It's collaborative learning at its best." },
  { initial: "S", name: "Sneha R.", plan: "Elite", stars: 5, quote: "The 1-on-1 strategy call on the Elite plan was worth it alone. Got personalised guidance that I couldn't find anywhere else." },
  { initial: "K", name: "Karan M.", plan: "Starter", stars: 4, quote: "Great entry point for beginners. The Starter plan gave me the foundation I needed. Planning to upgrade to Growth soon." },
  { initial: "N", name: "Neha T.", plan: "Growth", stars: 5, quote: "NexaAI's platform is different — it actually teaches you why the strategies work, not just what to do. That understanding makes a real difference." },
];

const standards = [
  { icon: Shield,    text: "Respect all members regardless of plan tier, background, or experience level." },
  { icon: Heart,     text: "Share knowledge generously. The community grows when we help each other." },
  { icon: Lightbulb, text: "Ask questions freely. There are no silly questions in a learning community." },
  { icon: Globe,     text: "No spam, self-promotion, or off-topic content. Keep discussions relevant." },
];

function CounterStat({ stat, index }: { stat: typeof communityStats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);

  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(count, stat.numericTarget, { duration: 1.8, ease: "easeOut" });
    return ctrl.stop;
  }, [isInView, count, stat.numericTarget]);

  return (
    <motion.div
      ref={ref}
      className="text-center glass-card rounded-xl2 border border-brand-border p-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 120, damping: 18 }}
    >
      <motion.div className={`text-2xl sm:text-3xl font-display ${stat.color} mb-1`} style={{ fontWeight: 800 }}>
        {count.get() === 0 ? "0" : stat.formatter(count.get())}
      </motion.div>
      <div className="text-brand-dim text-xs">{stat.label}</div>
    </motion.div>
  );
}

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <PageHero
        badge="Join the Community"
        badgeColor="blue"
        title="Connect, Learn,"
        titleHighlight="and Grow Together"
        subtitle="12,400+ members across India sharing strategies, wins, and support every single day. You're not alone on this journey."
        breadcrumb={[{ label: "Community", href: "/community" }]}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 pb-20 space-y-16">
        {/* Discord CTA */}
        <motion.div
          className="glass-card rounded-xl3 border border-brand-blue/40 p-8 sm:p-10 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ boxShadow: ["0 0 30px rgba(59,110,247,0.20)", "0 0 60px rgba(59,110,247,0.40)", "0 0 30px rgba(59,110,247,0.20)"] }}
          transition={{ boxShadow: { duration: 3, ease: "easeInOut", repeat: Infinity } }}
        >
          <div className="w-16 h-16 rounded-2xl bg-brand-blue/15 flex items-center justify-center mx-auto mb-5">
            <MessageSquare className="w-8 h-8 text-brand-blue" strokeWidth={1.5} />
          </div>
          <h2 className="text-white text-2xl sm:text-3xl font-display mb-3" style={{ fontWeight: 800 }}>Join Our Discord Community</h2>
          <p className="text-brand-muted text-sm max-w-lg mx-auto mb-6">Access daily discussions, strategy sharing, live session announcements, and peer support from thousands of fellow NexaAI members.</p>
          <a href="#" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blueBright text-white font-semibold shadow-glow-md hover:shadow-glow-lg transition-all">
            <MessageSquare className="w-4 h-4" />
            Join Free Discord →
          </a>
          <div className="mt-4 text-brand-dim text-xs">Free for all NexaAI members · 12,400+ members active</div>
        </motion.div>

        {/* Community stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {communityStats.map((stat, i) => (
            <CounterStat key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <Star className="w-5 h-5 text-brand-gold" strokeWidth={1.8} />
            <h2 className="text-white font-semibold text-xl">What Our Members Say</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="glass-card rounded-xl2 border border-brand-border p-5 hover:border-brand-borderGlow hover:shadow-card-hover transition-all duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 110, damping: 18 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-sm">
                    {t.initial}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{t.name}</div>
                    <div className="text-brand-dim text-xs">{t.plan} Plan</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <Star key={s} className="w-3 h-3 text-brand-gold fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-brand-muted text-xs leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community standards */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-brand-blue" strokeWidth={1.8} />
            <h2 className="text-white font-semibold text-xl">Community Standards</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {standards.map((s, i) => (
              <motion.div
                key={i}
                className="glass-card rounded-xl2 border border-brand-border p-5 flex items-start gap-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
              >
                <s.icon className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" strokeWidth={1.8} />
                <p className="text-brand-muted text-sm leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
