"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const navLinks = ["Features", "How It Works", "Pricing"];

const navItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};
const navContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
};

const linkHrefs: Record<string, string> = {
  Features: "/features",
  "How It Works": "/how-it-works",
  Pricing: "/pricing",
};

export default function Navbar() {
  const { scrollY } = useScroll();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Scroll-linked values
  const bgOpacity  = useTransform(scrollY, [0, 80], [0, 0.95]);
  const blurAmount = useTransform(scrollY, [0, 80], [0, 18]);
  const borderOp   = useTransform(scrollY, [0, 80], [0, 0.5]);

  const backdropFilter = useMotionTemplate`blur(${blurAmount}px)`;
  const borderColor    = useMotionTemplate`rgba(26,37,64,${borderOp})`;
  const backgroundColor = useMotionTemplate`rgba(3,6,15,${bgOpacity})`;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Dynamic glass backdrop */}
      <motion.div
        className="absolute inset-0 border-b"
        style={{ backgroundColor, backdropFilter, borderColor }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <motion.div
            className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center shadow-glow-sm"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </motion.div>
          <span className="text-white font-display text-lg tracking-widest" style={{ fontWeight: 700 }}>
            RPC
          </span>
        </a>

        {/* Staggered nav links */}
        <motion.nav
          className="hidden md:flex items-center gap-7 text-sm text-brand-muted"
          variants={navContainer}
          initial="hidden"
          animate="visible"
        >
          {navLinks.map((item) => (
            <motion.a
              key={item}
              href={linkHrefs[item] ?? "#"}
              variants={navItemVariants}
              className="hover:text-white transition-colors duration-200 relative group"
            >
              {item}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-blue group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </motion.nav>

        {/* CTA */}
        <motion.a
          href={session ? "/dashboard" : "/auth"}
          className="relative inline-flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold text-white overflow-hidden
            bg-brand-blue hover:bg-brand-blueBright transition-colors duration-200 shadow-glow-sm hover:shadow-glow-md"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {session ? "Dashboard" : "Login"}
        </motion.a>
      </div>
    </motion.header>
  );
}
