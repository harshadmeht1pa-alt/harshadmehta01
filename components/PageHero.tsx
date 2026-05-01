"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface PageHeroProps {
  badge?: string;
  badgeColor?: "blue" | "green" | "gold";
  title: string;
  titleHighlight?: string;
  subtitle: string;
  breadcrumb?: BreadcrumbItem[];
}

const badgeStyles: Record<NonNullable<PageHeroProps["badgeColor"]>, string> = {
  blue:  "border-brand-blue/25 bg-brand-blue/10 text-brand-blueBright",
  green: "border-brand-green/25 bg-brand-green/10 text-brand-green",
  gold:  "border-brand-gold/25 bg-brand-gold/10 text-brand-gold",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function PageHero({
  badge,
  badgeColor = "blue",
  title,
  titleHighlight,
  subtitle,
  breadcrumb,
}: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none opacity-60" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(59,110,247,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <motion.div
            className="flex items-center justify-center gap-1.5 text-xs text-brand-dim mb-4"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <a href="/" className="hover:text-brand-muted transition-colors">Home</a>
            {breadcrumb.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 opacity-50" />
                <a href={crumb.href} className="hover:text-brand-muted transition-colors">{crumb.label}</a>
              </span>
            ))}
          </motion.div>
        )}

        {/* Badge */}
        {badge && (
          <motion.div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium mb-5 ${badgeStyles[badgeColor]}`}
            custom={breadcrumb?.length ? 1 : 0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            {badge}
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-[1.1] tracking-tight mb-5"
          style={{ fontWeight: 800 }}
          custom={badge ? 2 : 1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <span className="text-white">{title}</span>
          {titleHighlight && (
            <>
              {" "}
              <span className="text-gradient-blue">{titleHighlight}</span>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-brand-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          custom={badge ? 3 : 2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
