"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Accordion from "@/components/ui/Accordion";
import type { AccordionItem } from "@/components/ui/Accordion";
import { MessageCircle } from "lucide-react";

const categories = ["General", "Earnings", "Plans & Pricing", "Technical", "Legal"] as const;
type Category = (typeof categories)[number];

const faqData: Record<Category, AccordionItem[]> = {
  General: [
    { question: "What is NexaAI?", answer: "NexaAI is an AI-powered educational platform that teaches proven earning strategies. We provide AI-generated signals, strategy modules, live sessions, and community access to help members learn how to maximise their daily earning potential — all for educational purposes." },
    { question: "Who is NexaAI designed for?", answer: "NexaAI is designed for individuals aged 18 and above across India who are interested in learning AI-assisted earning strategies. No prior financial or technical knowledge is required — our modules are structured for complete beginners through to advanced learners." },
    { question: "Is NexaAI available across all of India?", answer: "Yes. NexaAI is a fully digital platform accessible from anywhere in India with an internet connection. All content is delivered online through our web platform and mobile-optimised website." },
    { question: "Do I need any prior experience?", answer: "No prior experience is needed. Our learning journey starts from the fundamentals — from understanding how AI signals work to implementing strategies step by step. All you need is an internet connection and a willingness to learn." },
  ],
  Earnings: [
    { question: "How are the earning figures calculated?", answer: "Earning figures (₹60/day, ₹95/day, ₹125/day) are indicative estimates based on general strategy frameworks taught on the platform. They are not guarantees or projections of actual earnings. Real results depend on individual effort, consistency, market conditions, and other personal factors." },
    { question: "Are the returns guaranteed?", answer: "No. NexaAI does not guarantee any financial returns. All earning figures displayed on the platform are strictly indicative and for educational reference only. As with any earning activity, results will vary by individual. Please read our full Legal Disclaimer for more information." },
    { question: "How soon can I start seeing results?", answer: "There is no defined timeline for results, as outcomes vary greatly between individuals. Members who consistently apply the strategies taught on the platform typically begin to see results within their first few weeks, but this is not guaranteed for all users." },
    { question: "What factors affect my earning results?", answer: "Key factors include: time and effort invested, consistency in applying strategies, understanding of the modules, prevailing market conditions, and individual risk tolerance. NexaAI's AI guidance helps you navigate these factors, but cannot control external conditions." },
  ],
  "Plans & Pricing": [
    { question: "What is the difference between plans?", answer: "The three plans — Starter (₹1,999), Growth (₹2,999), and Elite (₹3,999) — differ in the depth of AI signals, number of strategy modules, support priority, and additional features like 1-on-1 sessions (Elite only) and live analysis access (Growth and Elite). See the Pricing page for a full feature breakdown." },
    { question: "Can I upgrade my plan after purchase?", answer: "Yes, plan upgrades are available. Contact support@nexaai.in with your account details and desired plan, and our team will process the upgrade with a differential payment arrangement." },
    { question: "Is there a refund policy?", answer: "Yes. We offer a 7-day refund window from the date of purchase, subject to eligibility conditions including less than 20% content accessed and fewer than 3 AI signals consumed. See our full Refund Policy for details." },
    { question: "Is this a one-time fee or a subscription?", answer: "NexaAI plans are one-time payments with lifetime access to the content available at the time of purchase. There are no recurring monthly or annual fees. Major feature updates are included." },
  ],
  Technical: [
    { question: "What devices are supported?", answer: "NexaAI is fully responsive and works on desktops, laptops, tablets, and smartphones. No app installation is required — you can access everything through any modern web browser." },
    { question: "Do I need to install any software?", answer: "No software installation is required. NexaAI is entirely web-based. A stable internet connection and a modern browser (Chrome, Firefox, Safari, Edge) are all you need." },
  ],
  Legal: [
    { question: "Is NexaAI registered with SEBI or RBI?", answer: "No. NexaAI is not registered with SEBI, RBI, or any financial regulatory authority. NexaAI operates solely as an educational technology platform and is not a registered financial advisor, broker, or investment manager." },
    { question: "Is the content on NexaAI financial advice?", answer: "No. All content on NexaAI is provided for educational purposes only and must not be interpreted as financial advice, investment advice, or a recommendation to buy, sell, or hold any financial instrument. Always consult a qualified financial advisor for personalised advice." },
    { question: "How is my personal data protected?", answer: "We take data privacy seriously. Your personal information is stored securely in compliance with the Information Technology Act, 2000 and associated Rules. We do not sell your data to third parties. See our Privacy Policy for full details." },
  ],
};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("General");

  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <PageHero
        badge="Help & FAQ"
        badgeColor="blue"
        title="Frequently Asked"
        titleHighlight="Questions"
        subtitle="Everything you need to know about NexaAI, our platform, and how it works. Can't find your answer? Contact us."
        breadcrumb={[{ label: "FAQ", href: "/faq" }]}
      />

      <div className="mx-auto max-w-3xl px-5 sm:px-8 pb-20">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-brand-blue text-white shadow-glow-sm"
                  : "bg-brand-bgLight border border-brand-border text-brand-muted hover:text-white hover:border-brand-blue/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion — animates on category switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-xl3 border border-brand-border p-5 sm:p-6"
          >
            <Accordion items={faqData[activeCategory]} />
          </motion.div>
        </AnimatePresence>

        {/* Still have questions */}
        <motion.div
          className="mt-10 glass-card rounded-xl2 border border-brand-blue/25 p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <MessageCircle className="w-8 h-8 text-brand-blue mx-auto mb-3" strokeWidth={1.5} />
          <h3 className="text-white font-semibold mb-1">Still have questions?</h3>
          <p className="text-brand-muted text-sm mb-4">Our support team responds within 24 hours.</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blueBright text-white text-sm font-semibold transition-colors duration-200 shadow-glow-sm"
          >
            Contact Support
          </a>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
