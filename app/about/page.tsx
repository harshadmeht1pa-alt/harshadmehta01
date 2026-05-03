"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Shield, Zap, Users, BookOpen, ArrowRight } from "lucide-react";

const values = [
  { icon: Shield,   title: "Transparency", description: "We are transparent about what our platform is and what it is not. All earning figures are indicative. All limitations are disclosed upfront." },
  { icon: Zap,      title: "Innovation",   description: "We continuously improve our AI models and strategy frameworks to give members access to the most current and effective earning guidance available." },
  { icon: Users,    title: "Community",    description: "We believe learning is better together. Our 12,400+ member community is the backbone of RPC — collaborative, supportive, and growth-focused." },
  { icon: BookOpen, title: "Education First", description: "We are educators first, technology company second. Every feature we build serves one goal: helping members learn more effectively and earn more consistently." },
];

const team = [
  { initial: "A", name: "Arjun Mehta",   role: "Co-Founder & CEO",         bg: "bg-brand-blue",       bio: "AI engineer and fintech enthusiast with 8 years of experience building educational technology platforms." },
  { initial: "S", name: "Sahil Kapoor",  role: "Co-Founder & CTO",         bg: "bg-brand-blueBright", bio: "Machine learning researcher focused on signal generation and pattern recognition in financial education data." },
  { initial: "R", name: "Riya Sharma",   role: "Head of Content & Strategy",bg: "bg-brand-green",      bio: "Financial educator and content strategist with expertise in translating complex strategies into accessible curricula." },
  { initial: "V", name: "Vikram Nair",   role: "Head of Community",         bg: "bg-brand-gold",       bio: "Community builder who has grown and managed online learning communities across India for over 6 years." },
];

const companyStats = [
  { value: "2023",    label: "Founded" },
  { value: "18+",     label: "Team Members" },
  { value: "12,400+", label: "Members Served" },
  { value: "22+",     label: "Indian States" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <PageHero
        badge="Our Story"
        badgeColor="blue"
        title="Building India's"
        titleHighlight="AI Earning Future"
        subtitle="We started RPC with a simple belief: every Indian deserves access to intelligent earning strategies and the education to use them effectively."
        breadcrumb={[{ label: "About Us", href: "/about" }]}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 pb-20 space-y-20">
        {/* Mission */}
        <motion.div
          className="glass-card rounded-xl3 border border-brand-blue/25 p-8 sm:p-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-brand-blue text-xs font-semibold uppercase tracking-widest mb-4">Our Mission</div>
          <blockquote className="text-white text-xl sm:text-2xl font-display leading-relaxed max-w-3xl mx-auto" style={{ fontWeight: 600 }}>
            &ldquo;To democratise AI-powered earning education across India — making intelligent strategy guidance accessible to anyone willing to learn and apply it.&rdquo;
          </blockquote>
        </motion.div>

        {/* Values */}
        <div>
          <h2 className="text-white font-semibold text-2xl mb-8 text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="glass-card rounded-xl2 border border-brand-border p-6 hover:border-brand-borderGlow hover:shadow-card-hover transition-all duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 110, damping: 18 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-brand-blue" strokeWidth={1.8} />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{v.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-white font-semibold text-2xl mb-3 text-center">Our Team</h2>
          <p className="text-brand-muted text-sm text-center mb-8 max-w-lg mx-auto">Built by a passionate team of AI engineers, educators, and fintech professionals united by a shared mission.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="glass-card rounded-xl2 border border-brand-border p-5 text-center hover:border-brand-borderGlow transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 110, damping: 18 }}
                whileHover={{ y: -4 }}
              >
                <div className={`w-14 h-14 rounded-full ${member.bg} flex items-center justify-center text-white text-xl font-bold mx-auto mb-3`}>
                  {member.initial}
                </div>
                <div className="text-white font-semibold text-sm mb-0.5">{member.name}</div>
                <div className="text-brand-blue text-xs mb-3">{member.role}</div>
                <p className="text-brand-dim text-xs leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {companyStats.map((s, i) => (
            <motion.div
              key={s.label}
              className="glass-card rounded-xl2 border border-brand-border p-5 text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
            >
              <div className="text-brand-blue text-2xl font-display mb-1" style={{ fontWeight: 800 }}>{s.value}</div>
              <div className="text-brand-dim text-xs">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h3 className="text-white font-semibold text-xl mb-3">Join the RPC Community</h3>
            <p className="text-brand-muted text-sm mb-6">Be part of India&rsquo;s fastest-growing AI earning education platform.</p>
            <a href="/auth" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blueBright text-white font-semibold text-sm shadow-glow-md transition-colors">
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
