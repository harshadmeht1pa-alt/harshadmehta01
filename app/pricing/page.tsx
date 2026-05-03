import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Pricing from "@/components/Pricing";
import Accordion from "@/components/ui/Accordion";
import { Check, X, AlertTriangle } from "lucide-react";

const features = [
  { name: "AI Earning Signals",      starter: "Basic",    growth: "Advanced", elite: "Elite" },
  { name: "Strategy Modules",        starter: "10",       growth: "30",       elite: "Unlimited" },
  { name: "Daily Market Briefing",   starter: true,       growth: true,       elite: true },
  { name: "Community Access",        starter: "Standard", growth: "Priority", elite: "VIP" },
  { name: "Live AI Analysis",        starter: false,      growth: true,       elite: true },
  { name: "Weekly Webinars",         starter: false,      growth: true,       elite: true },
  { name: "Daily Live Sessions",     starter: false,      growth: false,      elite: true },
  { name: "1-on-1 Strategy Call",    starter: false,      growth: false,      elite: true },
  { name: "Custom AI Dashboard",     starter: false,      growth: false,      elite: true },
  { name: "Email Support",           starter: true,       growth: true,       elite: true },
  { name: "Priority Support",        starter: false,      growth: "24hr",     elite: "6hr" },
];

const pricingFAQs = [
  { question: "Is this a subscription?", answer: "No. RPC plans are a one-time payment with lifetime access. There are no recurring monthly or annual charges." },
  { question: "What payment methods are accepted?", answer: "We accept UPI, net banking, debit/credit cards, and popular wallets via our secure payment gateway (Razorpay). All transactions are encrypted." },
  { question: "Can I upgrade my plan later?", answer: "Yes. You can upgrade from Starter to Growth or Elite at any time by paying the differential. Contact support@RPC.in to process an upgrade." },
  { question: "Is there a free trial?", answer: "We do not currently offer a free trial. However, we offer a 7-day refund window (subject to eligibility conditions) for members who are not satisfied after joining." },
  { question: "What happens immediately after purchase?", answer: "You will receive an email confirmation with your access credentials within minutes of payment. Your dashboard, modules, and AI signals are available immediately." },
  { question: "Do the prices include taxes?", answer: "All displayed prices are inclusive of applicable GST at the prevailing rate. You will receive a GST invoice via email." },
];

function FeatureCell({ value }: { value: string | boolean }) {
  if (value === false) return <X className="w-4 h-4 text-brand-dim mx-auto" strokeWidth={2} />;
  if (value === true)  return <Check className="w-4 h-4 text-brand-green mx-auto" strokeWidth={2.5} />;
  return <span className="text-brand-muted text-xs text-center block">{value}</span>;
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <PageHero
        badge="Transparent Pricing"
        badgeColor="blue"
        title="Choose Your"
        titleHighlight="Plan"
        subtitle="One-time payment, lifetime access. No hidden fees, no subscriptions, no surprises."
        breadcrumb={[{ label: "Pricing", href: "/pricing" }]}
      />

      {/* Pricing component (reused from landing) */}
      <Pricing />

      {/* Feature comparison table */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-white text-2xl sm:text-3xl font-display mb-2 text-center" style={{ fontWeight: 800 }}>
            Full Feature Comparison
          </h2>
          <p className="text-brand-muted text-sm text-center mb-10">See exactly what's included in each plan.</p>

          <div className="glass-card rounded-xl3 border border-brand-border overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 border-b border-brand-border">
              <div className="p-4 text-brand-dim text-xs font-semibold uppercase tracking-wider">Feature</div>
              {["🚀 Starter", "🔥 Growth", "👑 Elite"].map((h, i) => (
                <div key={h} className={`p-4 text-center text-xs font-semibold ${i === 1 ? "text-brand-blueBright bg-brand-blue/08" : "text-brand-muted"}`}>
                  {h}
                </div>
              ))}
            </div>

            {features.map((feat, i) => (
              <div key={feat.name} className={`grid grid-cols-4 border-b border-brand-border/50 last:border-0 ${i % 2 === 0 ? "" : "bg-brand-bgCard/30"}`}>
                <div className="p-3.5 text-brand-muted text-xs">{feat.name}</div>
                <div className="p-3.5 flex items-center justify-center"><FeatureCell value={feat.starter} /></div>
                <div className="p-3.5 flex items-center justify-center bg-brand-blue/04"><FeatureCell value={feat.growth} /></div>
                <div className="p-3.5 flex items-center justify-center"><FeatureCell value={feat.elite} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="text-white text-2xl font-display mb-8 text-center" style={{ fontWeight: 700 }}>
            Pricing FAQ
          </h2>
          <div className="glass-card rounded-xl3 border border-brand-border p-5 sm:p-6">
            <Accordion items={pricingFAQs} />
          </div>
        </div>
      </section>

      {/* Money-back note */}
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="glass-card rounded-xl2 border border-brand-gold/25 p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-brand-gold" strokeWidth={1.8} />
            </div>
            <div>
              <div className="text-brand-gold font-semibold text-sm mb-1">7-Day Refund Guarantee</div>
              <p className="text-brand-dim text-xs leading-relaxed">
                Not satisfied? Submit a refund request within 7 days of purchase (subject to eligibility conditions).{" "}
                <a href="/legal/refund" className="text-brand-gold/80 hover:text-brand-gold underline underline-offset-2 transition-colors">
                  Read Refund Policy →
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
