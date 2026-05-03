"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Mail, Phone, Lock, User, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false); // Default to Create Account

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Supabase integration will be added later
    console.log("Form submitted", isLogin ? "Login" : "Sign Up");
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none opacity-50" />
      <div className="absolute top-0 left-1/4 w-px h-full bg-streak-left pointer-events-none opacity-40" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-streak-right pointer-events-none opacity-40" />

      {/* Back to Home Logo */}
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 group z-10">
        <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center shadow-glow-sm transition-transform group-hover:scale-105">
          <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-white font-display text-lg tracking-widest font-bold">
          RPC
        </span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-brand-bgCard border border-brand-border rounded-xl3 p-8 shadow-card relative z-10 overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-blue opacity-10 blur-3xl rounded-full" />
          
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-brand-muted text-sm">
              {isLogin 
                ? "Enter your credentials to access your account." 
                : "Join RPC to start your journey."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: "auto", scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1"
                >
                  <label className="text-xs font-semibold text-brand-muted ml-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-brand-dim" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full bg-brand-bgLight border border-brand-border rounded-xl2 py-3 pl-10 pr-4 text-white placeholder-brand-dim focus:outline-none focus:border-brand-blueBright focus:ring-1 focus:ring-brand-blueBright transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-muted ml-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-brand-dim" />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-brand-bgLight border border-brand-border rounded-xl2 py-3 pl-10 pr-4 text-white placeholder-brand-dim focus:outline-none focus:border-brand-blueBright focus:ring-1 focus:ring-brand-blueBright transition-all"
                />
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: "auto", scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1"
                >
                  <label className="text-xs font-semibold text-brand-muted ml-1">
                    Email Address <span className="text-brand-dim font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-brand-dim" />
                    </div>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-brand-bgLight border border-brand-border rounded-xl2 py-3 pl-10 pr-4 text-white placeholder-brand-dim focus:outline-none focus:border-brand-blueBright focus:ring-1 focus:ring-brand-blueBright transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-muted ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-brand-dim" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-brand-bgLight border border-brand-border rounded-xl2 py-3 pl-10 pr-4 text-white placeholder-brand-dim focus:outline-none focus:border-brand-blueBright focus:ring-1 focus:ring-brand-blueBright transition-all"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-6 bg-brand-blue hover:bg-brand-blueBright text-white font-semibold py-3 px-4 rounded-xl2 shadow-glow-sm flex items-center justify-center gap-2 transition-colors"
            >
              {isLogin ? "Log In" : "Create Account"}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>
          
          <div className="mt-6 text-center relative z-10">
            <p className="text-brand-muted text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-brand-blueBright hover:text-white font-medium transition-colors"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
