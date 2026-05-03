"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Mail, Clock, Twitter, Instagram, Youtube, CheckCircle } from "lucide-react";

const subjects = ["General Inquiry", "Technical Support", "Billing & Refunds", "Partnership", "Press & Media", "Community Report"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: subjects[0], message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <PageHero
        badge="Get in Touch"
        badgeColor="blue"
        title="Contact"
        titleHighlight="Us"
        subtitle="Have a question, need support, or want to explore a partnership? We typically respond within 24 hours."
        breadcrumb={[{ label: "Contact", href: "/contact" }]}
      />

      <div className="mx-auto max-w-5xl px-5 sm:px-8 pb-20">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10">
          {/* Contact info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 110, damping: 18 }}
          >
            <div className="glass-card rounded-xl2 border border-brand-border p-5">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/15 flex items-center justify-center mb-3">
                <Mail className="w-4 h-4 text-brand-blue" strokeWidth={1.8} />
              </div>
              <div className="text-white font-semibold text-sm mb-1">Email Support</div>
              <a href="mailto:support@RPC.in" className="text-brand-blue hover:text-brand-blueBright text-xs underline underline-offset-2 transition-colors">support@RPC.in</a>
            </div>

            <div className="glass-card rounded-xl2 border border-brand-border p-5">
              <div className="w-8 h-8 rounded-lg bg-brand-gold/15 flex items-center justify-center mb-3">
                <Clock className="w-4 h-4 text-brand-gold" strokeWidth={1.8} />
              </div>
              <div className="text-white font-semibold text-sm mb-1">Support Hours</div>
              <p className="text-brand-muted text-xs">Monday – Saturday<br />9:00 AM – 6:00 PM IST</p>
            </div>

            <div className="glass-card rounded-xl2 border border-brand-border p-5">
              <div className="text-white font-semibold text-sm mb-3">Follow Us</div>
              <div className="flex gap-3">
                {[Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-lg bg-brand-bgLight border border-brand-border flex items-center justify-center hover:border-brand-blue/50 hover:bg-brand-blue/10 transition-all">
                    <Icon className="w-3.5 h-3.5 text-brand-dim hover:text-brand-blue" strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="glass-card rounded-xl3 border border-brand-border p-6 sm:p-8"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 110, damping: 18 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <CheckCircle className="w-12 h-12 text-brand-green mx-auto mb-4" strokeWidth={1.5} />
                  <h3 className="text-white font-semibold text-lg mb-2">Message Sent!</h3>
                  <p className="text-brand-muted text-sm max-w-xs mx-auto">Thank you for reaching out. We&rsquo;ll get back to you within 24 hours at <strong className="text-white">{form.email}</strong>.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-brand-muted text-xs font-medium mb-1.5">Full Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full bg-brand-bgLight border border-brand-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-brand-dim focus:border-brand-blue/60 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-brand-muted text-xs font-medium mb-1.5">Email Address</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full bg-brand-bgLight border border-brand-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-brand-dim focus:border-brand-blue/60 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-brand-muted text-xs font-medium mb-1.5">Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-brand-bgLight border border-brand-border rounded-xl px-4 py-3 text-white text-sm focus:border-brand-blue/60 focus:outline-none transition-colors"
                    >
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-brand-muted text-xs font-medium mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your question or issue in detail..."
                      className="w-full bg-brand-bgLight border border-brand-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-brand-dim focus:border-brand-blue/60 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-brand-blue hover:bg-brand-blueBright disabled:opacity-70 text-white font-semibold text-sm shadow-glow-sm transition-colors"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </motion.button>

                  <p className="text-brand-dim text-xs text-center">We respond within 24 business hours. Your data is protected per our <a href="/legal/privacy" className="text-brand-blue/80 hover:text-brand-blue underline underline-offset-2">Privacy Policy</a>.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
