import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Clock, CheckCircle, XCircle, Mail, ArrowRight, AlertTriangle } from "lucide-react";

const eligibilityConditions = [
  "Refund request submitted within 7 calendar days of the purchase date.",
  "Less than 20% of the total course or module content has been accessed.",
  "No more than 3 AI signal alerts have been consumed in the account.",
  "The account has not previously received a refund from NexaAI.",
  "The purchase was made at full price (non-promotional, non-discounted pricing).",
];

const refundSteps = [
  {
    num: "01",
    title: "Send a Refund Request",
    desc: "Email support@nexaai.in with the subject line \"Refund Request — [Your Order ID]\". Include your registered email address and the reason for your request.",
  },
  {
    num: "02",
    title: "Include Your Order Details",
    desc: "Attach your purchase confirmation email or provide your Order ID. This is required to locate and verify your transaction.",
  },
  {
    num: "03",
    title: "Await Review",
    desc: "Our team will review your request within 2–3 business days and verify eligibility against the conditions above. You will receive a confirmation email with the outcome.",
  },
  {
    num: "04",
    title: "Receive Your Refund",
    desc: "Approved refunds are credited to the original payment method within 7–10 business days. Processing time may vary depending on your bank or payment provider.",
  },
];

const nonRefundable = [
  "Requests submitted more than 7 calendar days after the purchase date.",
  "Accounts where more than 20% of module content has been accessed.",
  "Accounts where more than 3 AI signal alerts have been consumed.",
  "Purchases made under promotional, discounted, or bundle pricing.",
  "Accounts that have previously received a refund from NexaAI.",
  "Partial refunds for individual modules or features within a plan.",
];

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <PageHero
        badge="Legal"
        badgeColor="blue"
        title="Refund"
        titleHighlight="Policy"
        subtitle="Our commitment to fair and transparent refund practices. Please read these terms carefully before requesting a refund."
        breadcrumb={[{ label: "Refund Policy", href: "/legal/refund" }]}
      />

      <div className="mx-auto max-w-3xl px-5 sm:px-8 pb-20 space-y-10">
        {/* 7-day window */}
        <div className="glass-card rounded-xl2 border border-brand-green/30 p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-green/15 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-brand-green" strokeWidth={1.8} />
          </div>
          <div>
            <div className="text-brand-green font-semibold text-sm mb-1">7-Day Refund Window</div>
            <div className="text-white text-2xl font-bold mb-1">7 Calendar Days</div>
            <p className="text-brand-muted text-sm">from the date of purchase to submit a refund request, subject to all eligibility conditions being met.</p>
          </div>
        </div>

        {/* Eligibility */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-brand-green" strokeWidth={1.8} />
            Eligibility Conditions
          </h2>
          <p className="text-brand-muted text-sm mb-4">A refund will only be considered if <strong className="text-white">all</strong> of the following conditions are satisfied:</p>
          <div className="space-y-3">
            {eligibilityConditions.map((cond, i) => (
              <div key={i} className="flex items-start gap-3 glass-card rounded-xl p-4 border border-brand-border">
                <div className="w-5 h-5 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-brand-green" strokeWidth={2.5} />
                </div>
                <p className="text-brand-muted text-sm leading-relaxed">{cond}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-brand-blue" strokeWidth={1.8} />
            How to Request a Refund
          </h2>
          <div className="space-y-5">
            {refundSteps.map((step) => (
              <div key={step.num} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center shrink-0 text-brand-blue text-xs font-bold">{step.num}</div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">{step.title}</div>
                  <p className="text-brand-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Non-refundable */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" strokeWidth={1.8} />
            Non-Refundable Scenarios
          </h2>
          <div className="glass-card rounded-xl2 border border-red-500/20 bg-red-500/03 p-5">
            <ul className="space-y-2.5">
              {nonRefundable.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-brand-muted text-sm">
                  <XCircle className="w-4 h-4 text-red-400/70 shrink-0 mt-0.5" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer note */}
        <div className="glass-card rounded-xl2 border border-brand-gold/20 p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" strokeWidth={1.8} />
          <p className="text-brand-dim text-sm leading-relaxed">
            NexaAI provides an educational platform with digital content. Once digital content has been substantially accessed, it cannot be "returned." Our refund policy reflects this reality while maintaining fair consumer protections.
          </p>
        </div>

        {/* Contact */}
        <div className="glass-card rounded-xl2 border border-brand-border p-6 text-center">
          <Mail className="w-8 h-8 text-brand-blue mx-auto mb-3" strokeWidth={1.5} />
          <h3 className="text-white font-semibold mb-1">Questions About Your Refund?</h3>
          <p className="text-brand-muted text-sm mb-3">Our support team is available to assist with refund-related queries.</p>
          <a href="mailto:support@nexaai.in" className="text-brand-blue hover:text-brand-blueBright text-sm font-semibold transition-colors underline underline-offset-2">
            support@nexaai.in
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
