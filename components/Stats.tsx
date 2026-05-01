"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Users, TrendingUp, Star, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatDef {
  icon: LucideIcon;
  numericTarget: number;
  formatter: (v: number) => string;
  label: string;
  sublabel: string;
  color: string;
  bgColor: string;
}

const stats: StatDef[] = [
  {
    icon: Users,
    numericTarget: 12400,
    formatter: (v) => `${Math.round(v).toLocaleString("en-IN")}+`,
    label: "Active Members",
    sublabel: "Across India",
    color: "text-brand-blue",
    bgColor: "bg-brand-blue/10",
  },
  {
    icon: TrendingUp,
    numericTarget: 18.5,
    formatter: (v) => `₹${v.toFixed(1)} Cr+`,
    label: "Total Earned",
    sublabel: "Earned by members to date",
    color: "text-brand-green",
    bgColor: "bg-brand-green/10",
  },
  {
    icon: Star,
    numericTarget: 4.9,
    formatter: (v) => `${v.toFixed(1)} / 5`,
    label: "Platform Rating",
    sublabel: "3,200+ verified reviews",
    color: "text-brand-gold",
    bgColor: "bg-brand-gold/10",
  },
  {
    icon: Zap,
    numericTarget: 89,
    formatter: (v) => `${Math.round(v)}%`,
    label: "AI Signal Accuracy",
    sublabel: "Last 6 months average",
    color: "text-brand-blueBright",
    bgColor: "bg-brand-blueBright/10",
  },
];

function StatCard({ stat, index }: { stat: StatDef; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const displayValue = useTransform(count, (v) => stat.formatter(v));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, stat.numericTarget, {
      duration: 1.8,
      ease: "easeOut",
    });
    return controls.stop;
  }, [isInView, count, stat.numericTarget]);

  return (
    <motion.div
      ref={ref}
      className="glass-card rounded-xl2 p-5 sm:p-6 text-center border border-brand-border hover:border-brand-borderGlow transition-all duration-300 hover:shadow-card-hover group"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 120, damping: 18 }}
      whileHover={{ y: -6 }}
    >
      <div className="flex justify-center mb-3">
        <motion.div
          className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}
          whileHover={{ scale: 1.15, rotate: 6 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <stat.icon className={`w-5 h-5 ${stat.color}`} strokeWidth={1.8} />
        </motion.div>
      </div>
      <motion.div
        className={`text-2xl sm:text-3xl font-display ${stat.color} mb-1`}
        style={{ fontWeight: 800 }}
      >
        {displayValue}
      </motion.div>
      <div className="text-white text-sm font-semibold mb-0.5">{stat.label}</div>
      <div className="text-brand-dim text-xs">{stat.sublabel}</div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
