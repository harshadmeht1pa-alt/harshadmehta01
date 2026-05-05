"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import EarningPotential from "@/components/EarningPotential";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace("/dashboard");
      }
    };
    checkUser();
  }, [router]);

  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <Hero />
      <Ticker />
      <Stats />
      <HowItWorks />
      <EarningPotential />
      <Pricing />
      <Footer />
    </main>
  );
}
