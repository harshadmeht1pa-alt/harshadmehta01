"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, Zap, ArrowRight } from "lucide-react";

interface PlanDef {
  emoji: string;
  name: string;
  price: number;
  daily: number;
  badge: string | null;
  description: string;
  color: string;
  borderClass: string;
  btnClass: string;
  features: string[];
  featured?: boolean;
}

const plans: PlanDef[] = [
  {
    emoji: "🚀",
    name: "Starter AI Plan",
    price: 1999,
    daily: 60,
    badge: null,
    description: "The perfect entry point for newcomers to AI-assisted earning.",
    color: "text-brand-blue",
    borderClass: "border-brand-border",
    btnClass: "bg-brand-bgLight hover:bg-brand-border text-white border border-brand-border hover:border-brand-blue/50",
    features: [
      "AI Earning Signals — Basic",
      "10 Strategy Modules",
      "Daily Market Briefing",
      "Community Discord Access",
      "Email Support",
      "₹60/day Earning Potential",
    ],
  },
  {
    emoji: "🔥",
    name: "Growth AI Plan",
    price: 2999,
    daily: 95,
    badge: "Most Popular",
    description: "Built for those who are serious about consistent daily earning.",
    color: "text-brand-blueBright",
    borderClass: "border-brand-blue/60",
    btnClass: "bg-brand-blue hover:bg-brand-blueBright text-white shadow-glow-md hover:shadow-glow-lg",
    features: [
      "AI Earning Signals — Advanced",
      "30 Strategy Modules",
      "Live AI Analysis Sessions",
      "Priority Community Access",
      "Dedicated Support (24hr)",
      "Weekly Webinar Access",
      "₹95/day Earning Potential",
    ],
    featured: true,
  },
  {
    emoji: "👑",
    name: "Elite AI Plan",
    price: 3999,
    daily: 125,
    badge: null,
    description: "For those who demand maximum earning potential and premium support.",
    color: "text-brand-green",
    borderClass: "border-brand-border",
    btnClass: "bg-brand-bgLight hover:bg-brand-border text-white border border-brand-border hover:border-brand-green/50",
    features: [
      "AI Earning Signals — Elite",
      "Unlimited Strategy Modules",
      "1-on-1 AI Strategy Call",
      "VIP Community Access",
      "Priority Support (6hr)",
      "Daily Live Sessions",
      "Custom AI Dashboard",
      "₹125/day Earning Potential",
    ],
  },
];

// ── 3D tilt card ──────────────────────────────────────────────────────────────
function PricingCard({ plan, index }: { plan: PlanDef; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative glass-card rounded-xl3 p-6 sm:p-8 border ${plan.borderClass} transition-colors duration-300 cursor-default`}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: plan.featured ? -16 : 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={
        plan.featured
          ? { delay: index * 0.12, type: "spring", stiffness: 110, damping: 18, boxShadow: { duration: 3, ease: "easeInOut", repeat: Infinity } }
          : { delay: index * 0.12, type: "spring", stiffness: 110, damping: 18 }
      }
      animate={plan.featured ? {
        boxShadow: [
          "0 0 40px rgba(59,110,247,0.30)",
          "0 0 70px rgba(59,110,247,0.55)",
          "0 0 40px rgba(59,110,247,0.30)",
        ],
      } : {}}
    >
      {/* Featured glow overlay */}
      {plan.featured && (
        <div className="absolute inset-0 rounded-xl3 bg-card-glow pointer-events-none" />
      )}

      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-blue text-white text-xs whitespace-nowrap shadow-glow-sm" style={{ fontWeight: 700 }}>
          ⚡ {plan.badge}
        </div>
      )}

      <div className="relative" style={{ transform: "translateZ(12px)" }}>
        <div className="text-2xl mb-1">{plan.emoji}</div>
        <div className={`text-base ${plan.color} mb-1`} style={{ fontWeight: 700 }}>{plan.name}</div>
        <div className="text-brand-muted text-xs mb-6">{plan.description}</div>

        {/* Price */}
        <div className="mb-2">
          <div className="flex items-end gap-1">
            <span className="text-brand-dim text-lg">₹</span>
            <span className="text-4xl sm:text-5xl text-white" style={{ fontWeight: 800 }}>
              {plan.price.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="text-brand-dim text-xs mt-0.5">one-time payment • lifetime access</div>
        </div>

        {/* Daily potential */}
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-bgLight text-xs font-semibold ${plan.color} mb-6`}>
          Potential: ₹{plan.daily}/day
        </div>

        {/* CTA */}
        <a
          href="/auth"
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm transition-all duration-200 mb-7 ${plan.btnClass}`}
          style={{ fontWeight: 700 }}
        >
          Get Started
          <ArrowRight className="w-3.5 h-3.5" />
        </a>

        {/* Features */}
        <div className="space-y-2.5">
          {plan.features.map((feat) => (
            <div key={feat} className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 text-brand-blueBright" strokeWidth={2.5} />
              </div>
              <span className="text-brand-muted text-sm">{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
const sectionContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14 sm:mb-20"
          variants={sectionContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={fadeUpItem}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-blue/25 bg-brand-blue/10 text-brand-blueBright text-xs font-medium mb-5"
          >
            <Zap className="w-3.5 h-3.5" />
            Simple Pricing
          </motion.div>
          <motion.h2
            variants={fadeUpItem}
            className="text-3xl sm:text-4xl md:text-5xl font-display text-white leading-tight mb-4"
            style={{ fontWeight: 800 }}
          >
            Choose Your{" "}
            <span className="text-gradient-blue">Plan</span>
          </motion.h2>
          <motion.p variants={fadeUpItem} className="text-brand-muted text-base sm:text-lg max-w-xl mx-auto">
            One-time payment, lifetime access. No hidden charges. No recurring subscriptions.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 items-start" style={{ perspective: "1000px" }}>
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* Trust note */}
        <motion.p
          className="text-center text-brand-dim text-xs mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          🔒 Secure Payment &nbsp;|&nbsp; 📧 Instant Access via Email &nbsp;|&nbsp; 💬 24/7 Support Available
        </motion.p>
      </div>
    </section>
  );
}
