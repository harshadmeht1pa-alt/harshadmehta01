"use client";

import Navbar from "@/components/Navbar";
import Disclaimer from "@/components/Disclaimer";
import Footer from "@/components/Footer";

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-brand-bg flex flex-col">
      <Navbar />
      <div className="flex-1 pt-24 pb-12">
        <Disclaimer />
      </div>
      <Footer />
    </main>
  );
}
