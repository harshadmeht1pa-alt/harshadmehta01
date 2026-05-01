"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { TrendingUp, Users, Star, Zap, IndianRupee } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const rowA = [
  { icon: Users,       text: "12,400+ Active Members" },
  { icon: IndianRupee, text: "₹18.5 Crore+ Earned by Members" },
  { icon: TrendingUp,  text: "Rahul K. — ₹3,800 This Week" },
  { icon: Star,        text: "4.9/5 Average Rating" },
  { icon: Zap,         text: "AI Signals — 89% Accuracy" },
  { icon: Users,       text: "Priya S. just joined NexaAI" },
  { icon: IndianRupee, text: "₹125/day — Elite Plan Members" },
  { icon: TrendingUp,  text: "Amit V. — ₹2,100 Today" },
  { icon: Star,        text: "Top Rated AI Platform 2024" },
  { icon: Zap,         text: "Ravi M. — ₹4,500 This Month" },
];

const rowB = [
  { icon: IndianRupee, text: "Elite Plan — Max ₹125/day Potential" },
  { icon: Users,       text: "7 new members in the last hour" },
  { icon: Star,        text: "Trusted by 12,400+ earners" },
  { icon: TrendingUp,  text: "Sneha R. — ₹1,800 This Week" },
  { icon: Zap,         text: "Live AI signals — updated every hour" },
  { icon: IndianRupee, text: "₹60/day Starter Plan earning potential" },
  { icon: Users,       text: "Active community across India" },
  { icon: Star,        text: "4.9★ verified on 3,200+ reviews" },
  { icon: TrendingUp,  text: "Karan M. — ₹5,200 This Month" },
  { icon: Zap,         text: "89% signal accuracy — last 6 months" },
];

function TickerItem({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="flex items-center gap-2.5 shrink-0 px-6">
      <span className="w-5 h-5 rounded-full bg-brand-blue/20 flex items-center justify-center">
        <Icon className="w-3 h-3 text-brand-blueBright" strokeWidth={2} />
      </span>
      <span className="text-brand-muted text-sm whitespace-nowrap">{text}</span>
      <span className="text-brand-border mx-2 select-none">•</span>
    </div>
  );
}

function TickerRow({
  items,
  direction,
  duration,
}: {
  items: typeof rowA;
  direction: "left" | "right";
  duration: number;
}) {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const doubled = [...items, ...items];
  const isPausedRef = useRef(false);

  useEffect(() => {
    const startAnimation = (fromX = 0) => {
      const target = direction === "left" ? "-50%" : "50%";
      controls.start({
        x: [fromX === 0 ? (direction === "left" ? "0%" : "-50%") : `${fromX}px`, target],
        transition: { duration: duration - Math.abs(fromX) * 0.001, ease: "linear", repeat: Infinity, repeatType: "loop" },
      });
    };
    if (!isPausedRef.current) startAnimation();
  }, [controls, direction, duration]);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
    controls.stop();
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
    const target = direction === "left" ? "-50%" : "50%";
    controls.start({
      x: [direction === "left" ? "0%" : "-50%", target],
      transition: { duration, ease: "linear", repeat: Infinity, repeatType: "loop" },
    });
  };

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="flex w-max"
        animate={controls}
        style={{ x }}
      >
        {doubled.map((item, i) => (
          <TickerItem key={i} icon={item.icon} text={item.text} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Ticker() {
  return (
    <motion.section
      className="relative overflow-hidden py-3 border-y border-brand-border/60 bg-brand-bgCard/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-brand-bg to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-brand-bg to-transparent pointer-events-none" />

      <div className="space-y-2.5">
        <TickerRow items={rowA} direction="left"  duration={32} />
        <TickerRow items={rowB} direction="right" duration={38} />
      </div>
    </motion.section>
  );
}
