import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { AlertTriangle, ShieldOff, BookOpen, TrendingUp, User, FileText, Globe, MessageSquare } from "lucide-react";

const sections = [
  {
    id: "educational",
    icon: BookOpen,
    title: "1. Educational Purpose Only",
    content: `NexaAI is an educational technology platform designed to provide information, strategies, and guidance related to earning and financial literacy. All content available on this platform — including articles, modules, AI signals, webinars, and community discussions — is intended solely for educational and informational purposes.

Nothing on this platform should be interpreted as a recommendation to buy, sell, hold, or transact in any financial instrument, security, commodity, currency, or any other asset class. The platform does not provide personalised financial planning or advice.`,
  },
  {
    id: "no-advice",
    icon: ShieldOff,
    title: "2. No Financial Advice",
    content: `NexaAI does not provide financial advice, investment advice, tax advice, legal advice, or any other form of professional advice. Any information or material provided by NexaAI should not be relied upon as a substitute for consultation with qualified financial, legal, or other professional advisors.

Users are strongly encouraged to consult with a registered financial advisor, chartered accountant, or other qualified professional before making any financial decisions.`,
  },
  {
    id: "no-registration",
    icon: ShieldOff,
    title: "3. No SEBI / RBI Registration",
    content: `NexaAI is not registered with the Securities and Exchange Board of India (SEBI), the Reserve Bank of India (RBI), or any other financial regulatory authority in India or globally. NexaAI does not hold a licence as a registered investment advisor, portfolio manager, broker-dealer, mutual fund distributor, or any other regulated financial entity.

The services and content provided by NexaAI must not be construed as regulated financial services. Users must be aware that seeking or following any strategy or signal from NexaAI is done entirely at their own discretion and risk.`,
  },
  {
    id: "risk",
    icon: TrendingUp,
    title: "4. Risk Disclosure",
    content: `All earning activities involve inherent risk. The earning figures displayed on this platform — ₹60/day (Starter), ₹95/day (Growth), and ₹125/day (Elite) — are indicative estimates based on general strategy frameworks. These figures are not guarantees, projections, or forecasts of actual earnings.

Actual results may differ materially from the indicative figures due to a wide range of factors including, but not limited to, individual effort, time invested, market conditions, economic environment, platform changes, and personal financial circumstances.`,
  },
  {
    id: "no-guarantee",
    icon: AlertTriangle,
    title: "5. No Guarantee of Returns",
    content: `NexaAI makes no representation, warranty, or guarantee — express or implied — regarding the accuracy, completeness, adequacy, or fitness for any purpose of any earning figure, strategy, or AI signal published on this platform.

Past performance of any strategy, signal, or earning approach described on NexaAI does not guarantee or indicate future results. Users who have achieved certain results in the past should not assume they or others will achieve the same results in the future.`,
  },
  {
    id: "responsibility",
    icon: User,
    title: "6. Individual Responsibility",
    content: `Each user is solely responsible for their own decisions and actions based on any content consumed on this platform. NexaAI expressly disclaims all liability for any loss, damage, or adverse outcome — financial or otherwise — arising directly or indirectly from the use of, or reliance on, any content, strategy, signal, or information made available on this platform.

Users must comply with all applicable laws, regulations, and tax obligations in their respective jurisdictions. NexaAI is not responsible for ensuring users' compliance with local laws.`,
  },
  {
    id: "third-party",
    icon: Globe,
    title: "7. Third-Party Content",
    content: `This platform may reference, link to, or incorporate content from third-party sources for informational purposes. NexaAI does not endorse, validate, or take responsibility for the accuracy, completeness, or reliability of any third-party content, website, product, or service.

Any third-party strategies, tools, or resources mentioned on this platform are referenced solely for educational context and should not be taken as endorsements.`,
  },
  {
    id: "forward-looking",
    icon: FileText,
    title: "8. Forward-Looking Statements",
    content: `Certain statements on this platform may contain forward-looking language such as "potential," "may," "could," "expected to," "indicative," or similar expressions. These statements involve known and unknown risks, uncertainties, and other factors that could cause actual results to differ materially from those expressed or implied.

NexaAI undertakes no obligation to publicly update or revise any forward-looking statements, whether as a result of new information, future events, or otherwise.`,
  },
  {
    id: "contact",
    icon: MessageSquare,
    title: "9. Questions & Contact",
    content: `If you have any questions about this disclaimer or the nature of our platform, please contact us at legal@nexaai.in. We are happy to clarify the educational nature of our services and what they do and do not constitute.

By continuing to use this platform, you acknowledge that you have read, understood, and agree to the terms of this disclaimer.`,
  },
];

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <PageHero
        badge="Legal"
        badgeColor="gold"
        title="Legal Disclaimer &"
        titleHighlight="Risk Disclosure"
        subtitle="Important information regarding the nature of our platform, regulatory status, and associated risks. Please read carefully before using NexaAI."
        breadcrumb={[{ label: "Legal", href: "/legal/disclaimer" }]}
      />

      <div className="mx-auto max-w-4xl px-5 sm:px-8 pb-20">
        {/* Warning box */}
        <div className="relative rounded-xl2 border border-brand-gold/30 bg-brand-gold/05 p-6 mb-10">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-brand-gold" strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="text-brand-gold font-semibold text-sm mb-2">Summary of Key Points</h3>
              <ul className="text-brand-dim text-xs space-y-1 leading-relaxed">
                <li>• NexaAI is an <strong className="text-brand-muted">educational platform only</strong> — not a financial service.</li>
                <li>• <strong className="text-brand-muted">Not registered</strong> with SEBI, RBI, or any financial regulatory authority.</li>
                <li>• All earning figures (₹60–₹125/day) are <strong className="text-brand-muted">indicative estimates only</strong> — not guaranteed returns.</li>
                <li>• Past performance does not guarantee future results.</li>
                <li>• Users are solely responsible for their financial decisions.</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-brand-dim text-xs mb-10">Last updated: May 1, 2026. Effective immediately for all users.</p>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center shrink-0">
                  <section.icon className="w-4 h-4 text-brand-gold" strokeWidth={1.8} />
                </div>
                <h2 className="text-white font-semibold text-base sm:text-lg">{section.title}</h2>
              </div>
              {section.content.split("\n\n").map((para, i) => (
                <p key={i} className="text-brand-muted text-sm leading-relaxed mb-3">{para}</p>
              ))}
              <div className="h-px bg-brand-border/60 mt-6" />
            </section>
          ))}
        </div>

        <div className="mt-10 glass-card rounded-xl2 border border-brand-border p-5 text-center">
          <p className="text-brand-dim text-xs">
            Related legal documents:{" "}
            <a href="/legal/terms" className="text-brand-blue hover:text-brand-blueBright underline underline-offset-2 transition-colors">Terms of Service</a>
            {" · "}
            <a href="/legal/privacy" className="text-brand-blue hover:text-brand-blueBright underline underline-offset-2 transition-colors">Privacy Policy</a>
            {" · "}
            <a href="/legal/refund" className="text-brand-blue hover:text-brand-blueBright underline underline-offset-2 transition-colors">Refund Policy</a>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
