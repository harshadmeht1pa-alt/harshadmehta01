"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Globe, TrendingUp, Brain, Heart, ArrowRight, Mail } from "lucide-react";

const benefits = [
  { icon: Globe,     title: "Remote-First",             description: "Work from anywhere in India. We are a fully distributed team with async-friendly culture." },
  { icon: TrendingUp,title: "Competitive Compensation",  description: "Market-rate salaries, performance bonuses, and equity options for early team members." },
  { icon: Brain,     title: "AI-First Culture",          description: "Work with cutting-edge AI tools daily. We invest in your access to the latest AI platforms." },
  { icon: Heart,     title: "Meaningful Impact",         description: "Directly help thousands of Indians learn earning strategies that improve their financial wellbeing." },
];

const roles = [
  { title: "Senior Full-Stack Engineer",       team: "Engineering",  location: "Remote, India", type: "Full-time", description: "Build and scale our Next.js/TypeScript platform. Own end-to-end features from design to deployment. Experience with React, Node.js, and cloud infrastructure required." },
  { title: "AI/ML Research Analyst",           team: "AI Research",  location: "Remote, India", type: "Full-time", description: "Develop and refine our AI signal generation models. Research earning strategy patterns and translate them into actionable, data-driven signals for our platform." },
  { title: "Growth Marketing Manager",         team: "Marketing",    location: "Remote, India", type: "Full-time", description: "Drive member acquisition and retention across digital channels. Own SEO, paid media, content marketing, and community-led growth initiatives." },
  { title: "Community & Support Lead",         team: "Community",    location: "Remote, India", type: "Full-time", description: "Manage our Discord community of 12,400+ members. Lead the support team, develop community programmes, and create a best-in-class member experience." },
];

const perks = [
  "Health insurance (self + family)",
  "Stock option programme",
  "₹30,000/year learning budget",
  "Flexible working hours",
  "Home office stipend (₹15,000 one-time)",
  "Annual team retreat",
  "1-on-1 mentorship from founders",
  "Access to all AI tools & subscriptions",
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={(e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        rawX.set((e.clientX - rect.left) / rect.width - 0.5);
        rawY.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
    >
      {children}
    </motion.div>
  );
}

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <PageHero
        badge="Join Our Team"
        badgeColor="blue"
        title="Build the Future"
        titleHighlight="of AI Earning"
        subtitle="We're a fast-growing team on a mission to democratise intelligent earning strategies across India. Come build with us."
        breadcrumb={[{ label: "Careers", href: "/careers" }]}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 pb-20 space-y-16">
        {/* Benefits */}
        <div>
          <h2 className="text-white font-semibold text-2xl mb-8 text-center">Why Join NexaAI?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                className="glass-card rounded-xl2 border border-brand-border p-5 text-center hover:border-brand-borderGlow hover:shadow-card-hover transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 110, damping: 18 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon className="w-5 h-5 text-brand-blue" strokeWidth={1.8} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{b.title}</h3>
                <p className="text-brand-muted text-xs leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Open Roles */}
        <div>
          <h2 className="text-white font-semibold text-2xl mb-8">Open Positions</h2>
          <div className="space-y-5">
            {roles.map((role, i) => (
              <TiltCard key={role.title}>
                <motion.div
                  className="glass-card rounded-xl2 border border-brand-border p-5 sm:p-6 hover:border-brand-borderGlow hover:shadow-card-hover transition-all duration-300"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 110, damping: 18 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-white font-semibold text-base">{role.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs border border-brand-blue/20">{role.team}</span>
                        <span className="px-2 py-0.5 rounded-full bg-brand-bgLight text-brand-muted text-xs border border-brand-border">{role.location}</span>
                        <span className="px-2 py-0.5 rounded-full bg-brand-bgLight text-brand-muted text-xs border border-brand-border">{role.type}</span>
                      </div>
                      <p className="text-brand-muted text-sm leading-relaxed">{role.description}</p>
                    </div>
                    <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blueBright text-white text-sm font-semibold transition-colors shadow-glow-sm shrink-0">
                      Apply Now <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Perks */}
        <div>
          <h2 className="text-white font-semibold text-2xl mb-6">Perks & Benefits</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {perks.map((perk, i) => (
              <motion.div
                key={perk}
                className="glass-card rounded-xl border border-brand-border px-4 py-3 flex items-center gap-2.5"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                <span className="text-brand-muted text-xs">{perk}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* No suitable role */}
        <div className="glass-card rounded-xl2 border border-brand-border p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4 text-brand-blue" strokeWidth={1.8} />
              <div className="text-white font-semibold text-sm">Don&rsquo;t see a suitable role?</div>
            </div>
            <p className="text-brand-muted text-sm">Send us your CV and we&rsquo;ll keep you in mind for future openings.</p>
          </div>
          <a href="mailto:careers@nexaai.in" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-brand-border hover:border-brand-blue/50 text-brand-muted hover:text-white text-sm font-semibold transition-all shrink-0">
            careers@nexaai.in
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
