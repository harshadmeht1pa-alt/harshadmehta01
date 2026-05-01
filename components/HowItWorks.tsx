"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { UserPlus, BookOpen, TrendingUp } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Account",
    subtitle: "Sign Up & Choose Plan",
    description:
      "Choose your plan — Starter, Growth, or Elite. Complete registration in under 2 minutes and instantly access your personal AI dashboard.",
    color: "text-brand-blue",
    borderColor: "border-brand-blue/30",
    bgColor: "bg-brand-blue/10",
  },
  {
    step: "02",
    icon: BookOpen,
    title: "Learn with AI",
    subtitle: "Access Smart Education",
    description:
      "Master earning fundamentals through curated AI-powered learning modules, live strategy sessions, and comprehensive step-by-step guides.",
    color: "text-brand-blueBright",
    borderColor: "border-brand-blueBright/30",
    bgColor: "bg-brand-blueBright/10",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Start Earning Daily",
    subtitle: "Implement & Track Results",
    description:
      "Follow AI signals, implement proven strategies, and unlock your daily ₹60–₹125 earning potential. Results are indicative — AI keeps you consistently guided.",
    color: "text-brand-green",
    borderColor: "border-brand-green/30",
    bgColor: "bg-brand-green/10",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} id="how-it-works" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-card-glow pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-blue/25 bg-brand-blue/10 text-brand-blueBright text-xs font-medium mb-5">
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-white leading-tight mb-4" style={{ fontWeight: 800 }}>
            How{" "}
            <span className="text-gradient-blue">NexaAI Works</span>
          </h2>
          <p className="text-brand-muted text-base sm:text-lg max-w-xl mx-auto">
            Three steps to launch your earning journey — no prior experience or technical knowledge required.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* SVG connector line (desktop) */}
          <div className="hidden md:block absolute top-[3.5rem] left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-px overflow-visible" style={{ zIndex: 0 }}>
            <svg width="100%" height="2" className="overflow-visible">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#3B6EF7" />
                  <stop offset="50%"  stopColor="#5B8DFF" />
                  <stop offset="100%" stopColor="#22C55E" />
                </linearGradient>
              </defs>
              <motion.line
                x1="0" y1="1" x2="100%" y2="1"
                stroke="url(#lineGrad)"
                strokeWidth="1.5"
                strokeDasharray="1"
                initial={{ pathLength: 0, opacity: 0 }}
                style={{ pathLength, opacity: pathLength }}
              />
            </svg>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-6 sm:gap-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {steps.map((step) => (
              <motion.div
                key={step.step}
                variants={cardVariants}
                className={`relative glass-card rounded-xl3 p-6 sm:p-8 border ${step.borderColor} hover:shadow-card-hover transition-shadow duration-300`}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                <div className="text-xs text-brand-dim mb-4 tracking-widest" style={{ fontWeight: 700 }}>
                  STEP {step.step}
                </div>
                <motion.div
                  className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center mb-5`}
                  whileHover={{ scale: 1.12, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <step.icon className={`w-6 h-6 ${step.color}`} strokeWidth={1.8} />
                </motion.div>
                <h3 className={`text-xl ${step.color} mb-1`} style={{ fontWeight: 700 }}>
                  {step.title}
                </h3>
                <div className="text-white text-sm font-semibold mb-3">{step.subtitle}</div>
                <p className="text-brand-muted text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
