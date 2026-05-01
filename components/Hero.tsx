"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

// ── Char-by-char reveal variants ──────────────────────────────────────────────
const charContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.022, delayChildren: 0.2 } },
};
const charVariant = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Section stagger ───────────────────────────────────────────────────────────
const sectionContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.55 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// ── Animated headline line ────────────────────────────────────────────────────
function AnimatedLine({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className ?? ""}`}>
      <motion.span className="inline-block" variants={charContainer} initial="hidden" animate="visible">
        {text.split("").map((char, i) => (
          <motion.span key={i} variants={charVariant} className="inline-block" style={{ whiteSpace: char === " " ? "pre" : undefined }}>
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </motion.span>
    </span>
  );
}

// ── Magnetic button ───────────────────────────────────────────────────────────
function MagneticButton({ href, primary, children }: { href: string; primary?: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 300, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 300, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left - rect.width / 2);
    rawY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={
        primary
          ? "group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blueBright text-white font-semibold text-base shadow-glow-md hover:shadow-glow-lg transition-colors duration-200"
          : "inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-brand-border hover:border-brand-blue/50 text-brand-muted hover:text-white font-semibold text-base transition-colors duration-200"
      }
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 pb-24">
      {/* Parallax radial glow */}
      <motion.div
        className="absolute inset-0 bg-hero-glow pointer-events-none"
        style={{ y: glowY }}
      />

      {/* Vertical streaks */}
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-streak-left opacity-70 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-streak-right opacity-70 pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(59,110,247,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-brand-blueBright text-xs sm:text-sm font-medium mb-7"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          India&apos;s Most Advanced AI Earning Platform
        </motion.div>

        {/* Char-by-char headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[1.08] tracking-tight mb-6" style={{ fontWeight: 800 }}>
          <AnimatedLine text="Intelligent Earning" className="text-white block" />
          <AnimatedLine text="Strategies Powered" className="text-gradient-blue block" />
          <AnimatedLine text="by Artificial Intelligence" className="text-white block" />
        </h1>

        {/* Staggered remaining elements */}
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Sub-headline */}
          <motion.p
            variants={fadeUpItem}
            className="text-brand-muted text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
          >
            India&apos;s #1 AI-powered education platform teaching proven{" "}
            <span className="text-white font-semibold">₹60–₹125/day</span> earning
            strategies. Intelligent AI tools, zero guesswork — just results.
          </motion.p>

          {/* CTAs — magnetic buttons */}
          <motion.div
            variants={fadeUpItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <MagneticButton href="#" primary>
              <TrendingUp className="w-4 h-4" />
              Start Earning Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </MagneticButton>
            <MagneticButton href="#">
              Learn More
            </MagneticButton>
          </motion.div>

          {/* Urgency */}
          <motion.div
            variants={fadeUpItem}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-brand-gold/90"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
            </span>
            Limited Time Offer — Price increases soon. Secure your spot today!
          </motion.div>

          {/* Floating stats card — spring float */}
          <motion.div
            variants={fadeUpItem}
            className="mt-16 mx-auto max-w-sm glass-card rounded-xl2 px-6 py-4 border-glow"
            animate={{ y: [0, -12, 0] }}
            transition={{
              y: { duration: 6, ease: "easeInOut", repeat: Infinity },
            }}
          >
            <div className="flex items-center justify-between text-sm">
              <div className="text-center">
                <div className="text-brand-green text-lg" style={{ fontWeight: 700 }}>₹125/day</div>
                <div className="text-brand-muted text-xs mt-0.5">Elite Potential</div>
              </div>
              <div className="h-8 w-px bg-brand-border" />
              <div className="text-center">
                <div className="text-white text-lg" style={{ fontWeight: 700 }}>12,400+</div>
                <div className="text-brand-muted text-xs mt-0.5">Active Members</div>
              </div>
              <div className="h-8 w-px bg-brand-border" />
              <div className="text-center">
                <div className="text-brand-blueBright text-lg" style={{ fontWeight: 700 }}>4.9★</div>
                <div className="text-brand-muted text-xs mt-0.5">Rating</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
