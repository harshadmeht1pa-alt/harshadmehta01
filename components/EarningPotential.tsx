"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, IndianRupee, Calendar, Award } from "lucide-react";

const tiers = [
  {
    plan: "Starter AI Plan",
    daily: 60,
    monthly: 1800,
    color: "text-brand-blue",
    barColor: "bg-brand-blue",
    scaleTarget: 0.48,
    emoji: "🚀",
  },
  {
    plan: "Growth AI Plan",
    daily: 95,
    monthly: 2850,
    color: "text-brand-blueBright",
    barColor: "bg-brand-blueBright",
    scaleTarget: 0.76,
    emoji: "🔥",
    featured: true,
  },
  {
    plan: "Elite AI Plan",
    daily: 125,
    monthly: 3750,
    color: "text-brand-green",
    barColor: "bg-brand-green",
    scaleTarget: 1,
    emoji: "👑",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};
const slideRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 110, damping: 18 } },
};

export default function EarningPotential() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="earning" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-brand-blue via-brand-blueBright to-brand-green"
        style={{ width: progressWidth }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-green/25 bg-brand-green/10 text-brand-green text-xs font-medium mb-5">
            <TrendingUp className="w-3.5 h-3.5" />
            Real Earning Potential
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-white leading-tight mb-4" style={{ fontWeight: 800 }}>
            Your{" "}
            <span className="text-gradient-blue">Earning Potential</span>
          </h2>
          <p className="text-brand-muted text-base sm:text-lg max-w-xl mx-auto">
            Daily earning potential through AI-driven strategies. Results vary by individual effort — these are indicative figures only.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Bar Chart Visual */}
          <motion.div
            className="glass-card rounded-xl3 p-6 sm:p-8 border-glow"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 110, damping: 18 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <IndianRupee className="w-5 h-5 text-brand-green" />
              <h3 className="text-white text-lg" style={{ fontWeight: 700 }}>Daily Earning Potential</h3>
            </div>

            <div className="space-y-5">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.plan}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: "spring", stiffness: 120, damping: 18 }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-brand-muted flex items-center gap-1.5">
                      <span>{tier.emoji}</span> {tier.plan}
                    </span>
                    <span className={`text-sm ${tier.color}`} style={{ fontWeight: 700 }}>
                      ₹{tier.daily}/day
                    </span>
                  </div>
                  {/* scaleX bar — GPU-accelerated */}
                  <div className="h-3 w-full bg-brand-bgLight rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${tier.barColor} rounded-full origin-left`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: tier.scaleTarget }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.2, duration: 0.85, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Monthly projection */}
            <div className="mt-8 pt-6 border-t border-brand-border grid grid-cols-3 gap-4">
              {tiers.map((tier) => (
                <div key={tier.plan} className="text-center">
                  <div className={`text-lg ${tier.color}`} style={{ fontWeight: 700 }}>
                    ₹{tier.monthly.toLocaleString("en-IN")}
                  </div>
                  <div className="text-brand-dim text-xs mt-0.5">Monthly</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right cards */}
          <motion.div
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {tiers.map((tier) => (
              <motion.div
                key={tier.plan}
                variants={slideRight}
                className={`relative glass-card rounded-xl2 p-5 hover:shadow-card-hover transition-shadow duration-300 ${
                  tier.featured ? "border border-brand-blue/50 shadow-glow-sm" : "border border-brand-border"
                }`}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                {tier.featured && (
                  <span className="absolute -top-2.5 left-4 text-xs px-3 py-0.5 rounded-full bg-brand-blue text-white font-semibold">
                    Most Popular
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold text-sm mb-0.5">
                      {tier.emoji} {tier.plan}
                    </div>
                    <div className="text-brand-dim text-xs flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      ₹{tier.monthly.toLocaleString("en-IN")}/month potential
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl ${tier.color}`} style={{ fontWeight: 800 }}>₹{tier.daily}</div>
                    <div className="text-brand-dim text-xs">per day</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Yearly note */}
            <motion.div
              variants={slideRight}
              className="glass-card rounded-xl2 p-5 border border-brand-gold/20"
            >
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <div className="text-white text-sm font-semibold mb-1">Elite Members — Annual Potential</div>
                  <div className="text-brand-gold text-xl" style={{ fontWeight: 800 }}>₹45,625 / year</div>
                  <div className="text-brand-dim text-xs mt-1">
                    Follow AI strategies consistently — compounding results over time.
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
