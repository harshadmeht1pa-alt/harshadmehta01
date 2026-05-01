"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    featured: true,
    category: "Strategies",
    title: "How AI Signals Changed My Daily Earning Strategy",
    excerpt: "A deep dive into how AI-generated signals can transform your approach to daily earning — from reactive to proactive, from guesswork to data-guided decisions.",
    author: "Rahul K.",
    date: "Apr 28, 2026",
    readTime: "5 min",
    gradientFrom: "from-brand-blue/30",
    gradientTo: "to-brand-blueBright/10",
  },
  {
    category: "Education",
    title: "Understanding Indicative Returns: What ₹95/day Really Means",
    excerpt: "We break down exactly what our earning figures represent, what factors influence real-world results, and how to set realistic expectations.",
    author: "Riya S.",
    date: "Apr 22, 2026",
    readTime: "7 min",
    gradientFrom: "from-brand-green/20",
    gradientTo: "to-brand-green/5",
  },
  {
    category: "Updates",
    title: "NexaAI Platform Update: New AI Dashboard Features",
    excerpt: "We've shipped a major update to the AI dashboard — including enhanced signal history, performance visualisations, and personalised module recommendations.",
    author: "NexaAI Team",
    date: "Apr 18, 2026",
    readTime: "3 min",
    gradientFrom: "from-brand-blueBright/20",
    gradientTo: "to-brand-blue/5",
  },
  {
    category: "Mindset",
    title: "Building Financial Discipline with AI-Assisted Strategies",
    excerpt: "The best strategy in the world is useless without consistent application. Here's how NexaAI members build the discipline to execute day after day.",
    author: "Arjun M.",
    date: "Apr 12, 2026",
    readTime: "6 min",
    gradientFrom: "from-brand-gold/20",
    gradientTo: "to-brand-gold/5",
  },
  {
    category: "Community",
    title: "Community Spotlight: Top Earners Share Their Approach",
    excerpt: "We spoke with five of NexaAI's top-performing members about their daily routines, how they use AI signals, and what advice they'd give to newcomers.",
    author: "Vikram N.",
    date: "Apr 6, 2026",
    readTime: "4 min",
    gradientFrom: "from-brand-blue/15",
    gradientTo: "to-brand-muted/5",
  },
  {
    category: "Getting Started",
    title: "Beginner's Complete Guide to Getting Started on NexaAI",
    excerpt: "Everything a new member needs to know — from completing onboarding and setting up your dashboard to following your first AI signal with confidence.",
    author: "Sneha T.",
    date: "Mar 30, 2026",
    readTime: "8 min",
    gradientFrom: "from-brand-green/15",
    gradientTo: "to-brand-green/5",
  },
];

const categoryColors: Record<string, string> = {
  Strategies:      "text-brand-blue border-brand-blue/30 bg-brand-blue/10",
  Education:       "text-brand-green border-brand-green/30 bg-brand-green/10",
  Updates:         "text-brand-blueBright border-brand-blueBright/30 bg-brand-blueBright/10",
  Mindset:         "text-brand-gold border-brand-gold/30 bg-brand-gold/10",
  Community:       "text-brand-muted border-brand-border bg-brand-bgLight",
  "Getting Started": "text-brand-green border-brand-green/30 bg-brand-green/10",
};

export default function BlogPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [featured, ...rest] = articles;

  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <PageHero
        badge="NexaAI Blog"
        badgeColor="blue"
        title="Insights &"
        titleHighlight="Strategies"
        subtitle="Expert articles on AI-powered earning, financial literacy, platform updates, and community stories."
        breadcrumb={[{ label: "Blog", href: "/blog" }]}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 pb-20 space-y-12">
        {/* Featured */}
        <motion.a
          href="#"
          className={`block glass-card rounded-xl3 border border-brand-border overflow-hidden hover:shadow-card-hover transition-all duration-300 group`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -4 }}
        >
          <div className={`h-48 sm:h-64 bg-gradient-to-br ${featured.gradientFrom} ${featured.gradientTo} relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl opacity-20">✍️</div>
            </div>
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[featured.category]}`}>{featured.category}</span>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <h2 className="text-white font-display text-xl sm:text-2xl mb-3 group-hover:text-brand-blueBright transition-colors" style={{ fontWeight: 700 }}>{featured.title}</h2>
            <p className="text-brand-muted text-sm leading-relaxed mb-4">{featured.excerpt}</p>
            <div className="flex items-center justify-between">
              <span className="text-brand-dim text-xs">{featured.author} · {featured.date} · {featured.readTime} read</span>
              <span className="inline-flex items-center gap-1 text-brand-blue text-xs font-semibold group-hover:gap-2 transition-all">Read Article <ArrowRight className="w-3 h-3" /></span>
            </div>
          </div>
        </motion.a>

        {/* Article grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((art, i) => (
            <motion.a
              key={art.title}
              href="#"
              className="glass-card rounded-xl2 border border-brand-border overflow-hidden hover:border-brand-borderGlow hover:shadow-card-hover transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 110, damping: 18 }}
              whileHover={{ y: -4 }}
            >
              <div className={`h-32 bg-gradient-to-br ${art.gradientFrom} ${art.gradientTo} flex items-center justify-center`}>
                <div className="text-3xl opacity-25">📝</div>
              </div>
              <div className="p-5">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border mb-3 ${categoryColors[art.category]}`}>{art.category}</span>
                <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-brand-blueBright transition-colors">{art.title}</h3>
                <p className="text-brand-muted text-xs leading-relaxed mb-3 line-clamp-2">{art.excerpt}</p>
                <span className="text-brand-dim text-xs">{art.date} · {art.readTime} read</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          className="glass-card rounded-xl3 border border-brand-blue/25 p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-white font-semibold text-lg mb-2">Get Weekly Insights</h3>
          <p className="text-brand-muted text-sm mb-5">Strategy articles, platform updates, and community stories — delivered to your inbox every week.</p>
          {subscribed ? (
            <p className="text-brand-green font-semibold text-sm">✓ You&rsquo;re subscribed! Check your inbox for a confirmation email.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-brand-bgLight border border-brand-border rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-brand-dim focus:border-brand-blue/60 focus:outline-none"
              />
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blueBright text-white text-sm font-semibold transition-colors shadow-glow-sm shrink-0">
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
