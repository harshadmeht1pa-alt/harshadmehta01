import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

const toc = [
  "Information We Collect",
  "How We Use Your Information",
  "Data Sharing & Third Parties",
  "Cookies Policy",
  "Data Retention",
  "Your Rights",
  "Security Measures",
  "Children's Privacy",
  "Changes to This Policy",
  "Data Grievance Officer",
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <PageHero
        badge="Legal"
        badgeColor="blue"
        title="Privacy"
        titleHighlight="Policy"
        subtitle="Last updated: May 1, 2026. This policy explains how NexaAI collects, uses, and protects your personal information in compliance with the Information Technology Act, 2000."
        breadcrumb={[{ label: "Privacy Policy", href: "/legal/privacy" }]}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 pb-20">
        <div className="lg:grid lg:grid-cols-[220px_1fr] gap-12">
          {/* Sticky ToC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 glass-card rounded-xl2 border border-brand-border p-5">
              <div className="text-white text-xs font-semibold mb-4 uppercase tracking-wider">Contents</div>
              <nav className="space-y-2">
                {toc.map((item, i) => (
                  <a
                    key={item}
                    href={`#priv-${i + 1}`}
                    className="block text-brand-dim text-xs hover:text-brand-muted transition-colors leading-snug"
                  >
                    {i + 1}. {item}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-10 text-sm leading-relaxed">
            <p className="text-brand-muted">NexaAI Education Technologies Pvt. Ltd. (&ldquo;NexaAI&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your personal information. This Privacy Policy is published in compliance with the Information Technology Act, 2000 (&ldquo;IT Act&rdquo;), the Information Technology (Amendment) Act, 2008, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.</p>

            <section id="priv-1">
              <h2 className="text-white font-semibold text-base mb-3">1. Information We Collect</h2>
              <p className="text-brand-muted mb-3">We collect the following categories of personal information:</p>
              <div className="space-y-3">
                {[
                  { label: "Identity Data", desc: "Full name, username, date of birth, and profile photograph (if provided)." },
                  { label: "Contact Data", desc: "Email address and phone number." },
                  { label: "Payment Data", desc: "Transaction ID, payment method type (processed and tokenised by our payment gateway — we do not store full card details)." },
                  { label: "Usage Data", desc: "Pages visited, modules accessed, time spent, AI signals viewed, login history, and device/browser information." },
                  { label: "Communication Data", desc: "Messages sent to our support team, community posts, and survey responses." },
                  { label: "Cookies & Tracking", desc: "Session cookies, analytics cookies, and preference cookies. See Section 4 for details." },
                ].map((item) => (
                  <div key={item.label} className="glass-card rounded-xl p-4 border border-brand-border">
                    <div className="text-white text-xs font-semibold mb-1">{item.label}</div>
                    <p className="text-brand-muted text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="priv-2">
              <h2 className="text-white font-semibold text-base mb-3">2. How We Use Your Information</h2>
              <p className="text-brand-muted mb-3">We use the personal information collected for the following purposes:</p>
              <ul className="list-disc list-inside space-y-1.5 text-brand-muted pl-2">
                <li>To create and manage your account and provide access to purchased plans.</li>
                <li>To deliver educational content, AI signals, and platform features.</li>
                <li>To process payments and send purchase confirmations.</li>
                <li>To respond to support requests and communications.</li>
                <li>To send transactional emails (e.g., account updates, refund status).</li>
                <li>To send promotional emails and newsletters (you may opt out at any time).</li>
                <li>To improve our platform, content, and user experience through analytics.</li>
                <li>To detect, prevent, and respond to security incidents or fraud.</li>
                <li>To comply with applicable legal obligations.</li>
              </ul>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="priv-3">
              <h2 className="text-white font-semibold text-base mb-3">3. Data Sharing &amp; Third Parties</h2>
              <p className="text-brand-muted mb-3">We do not sell your personal information. We may share your data with the following categories of third parties solely to operate the Platform:</p>
              <ul className="list-disc list-inside space-y-1.5 text-brand-muted pl-2">
                <li><strong className="text-white">Payment Processors:</strong> Razorpay or similar (PCI-DSS compliant) for transaction processing.</li>
                <li><strong className="text-white">Analytics Providers:</strong> Google Analytics (anonymised data) for platform usage analysis.</li>
                <li><strong className="text-white">Email Service Providers:</strong> For transactional and marketing communications.</li>
                <li><strong className="text-white">Cloud Infrastructure:</strong> Hosting and data storage providers operating under appropriate data protection agreements.</li>
                <li><strong className="text-white">Legal Authorities:</strong> When required by law, court order, or governmental authority.</li>
              </ul>
              <p className="text-brand-muted mt-3">All third-party service providers are contractually required to maintain the confidentiality and security of your data.</p>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="priv-4">
              <h2 className="text-white font-semibold text-base mb-3">4. Cookies Policy</h2>
              <p className="text-brand-muted mb-3">We use the following types of cookies:</p>
              <ul className="list-disc list-inside space-y-1.5 text-brand-muted pl-2">
                <li><strong className="text-white">Essential Cookies:</strong> Required for the Platform to function (e.g., session management, authentication). Cannot be disabled.</li>
                <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how users interact with the Platform (e.g., Google Analytics). You may opt out.</li>
                <li><strong className="text-white">Preference Cookies:</strong> Store your settings and preferences for a better experience.</li>
              </ul>
              <p className="text-brand-muted mt-3">You can manage cookie preferences through your browser settings. Disabling certain cookies may affect Platform functionality.</p>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="priv-5">
              <h2 className="text-white font-semibold text-base mb-3">5. Data Retention</h2>
              <p className="text-brand-muted mb-3">We retain personal data for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law:</p>
              <ul className="list-disc list-inside space-y-1 text-brand-muted pl-2">
                <li>Account data: Retained for the duration of your account and 3 years thereafter.</li>
                <li>Payment records: Retained for 7 years as required under financial record-keeping obligations.</li>
                <li>Usage data: Retained in anonymised form for up to 24 months.</li>
                <li>Support communications: Retained for 2 years.</li>
              </ul>
              <p className="text-brand-muted mt-3">After the applicable retention period, your data is securely deleted or anonymised.</p>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="priv-6">
              <h2 className="text-white font-semibold text-base mb-3">6. Your Rights</h2>
              <p className="text-brand-muted mb-3">Under the IT Act and applicable data protection principles, you have the following rights regarding your personal data:</p>
              <ul className="list-disc list-inside space-y-1.5 text-brand-muted pl-2">
                <li><strong className="text-white">Access:</strong> Request a copy of the personal data we hold about you.</li>
                <li><strong className="text-white">Correction:</strong> Request correction of inaccurate or incomplete data.</li>
                <li><strong className="text-white">Deletion:</strong> Request deletion of your data, subject to our legal retention obligations.</li>
                <li><strong className="text-white">Opt-out:</strong> Unsubscribe from marketing communications at any time via the link in any email or by contacting us.</li>
                <li><strong className="text-white">Withdraw Consent:</strong> Withdraw consent for data processing where consent is the legal basis, without affecting prior processing.</li>
              </ul>
              <p className="text-brand-muted mt-3">To exercise any of these rights, contact our Data Grievance Officer at <strong className="text-white">privacy@nexaai.in</strong>. We will respond within 30 days.</p>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="priv-7">
              <h2 className="text-white font-semibold text-base mb-3">7. Security Measures</h2>
              <p className="text-brand-muted mb-3">We implement reasonable security practices and procedures as required under the Information Technology (Reasonable Security Practices) Rules, 2011, including:</p>
              <ul className="list-disc list-inside space-y-1 text-brand-muted pl-2">
                <li>SSL/TLS encryption for all data transmitted to and from our Platform.</li>
                <li>Encrypted storage of sensitive data at rest.</li>
                <li>Role-based access controls limiting employee access to personal data.</li>
                <li>Regular security assessments and audits.</li>
                <li>Incident response procedures for data breaches.</li>
              </ul>
              <p className="text-brand-muted mt-3">Despite these measures, no system is completely secure. We cannot guarantee the absolute security of your data.</p>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="priv-8">
              <h2 className="text-white font-semibold text-base mb-3">8. Children&rsquo;s Privacy</h2>
              <p className="text-brand-muted">NexaAI is not intended for use by persons under the age of 18. We do not knowingly collect personal information from minors. If we become aware that we have collected data from a person under 18, we will delete that data promptly. If you believe we have inadvertently collected such information, please contact us at privacy@nexaai.in.</p>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="priv-9">
              <h2 className="text-white font-semibold text-base mb-3">9. Changes to This Policy</h2>
              <p className="text-brand-muted">We reserve the right to update this Privacy Policy at any time. We will notify registered users of material changes via email or a prominent notice on the Platform at least 15 days prior to the changes taking effect. Continued use of the Platform after that date constitutes acceptance of the updated Policy.</p>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="priv-10">
              <h2 className="text-white font-semibold text-base mb-3">10. Data Grievance Officer</h2>
              <p className="text-brand-muted mb-3">In accordance with the Information Technology Act, 2000, and the IT Rules, 2011, we have appointed a Data Grievance Officer to address privacy-related concerns:</p>
              <div className="glass-card rounded-xl p-5 border border-brand-border">
                <div className="space-y-1.5 text-sm">
                  <div><span className="text-brand-dim">Name:</span> <span className="text-white font-semibold">Data Grievance Officer, NexaAI</span></div>
                  <div><span className="text-brand-dim">Email:</span> <a href="mailto:privacy@nexaai.in" className="text-brand-blue hover:text-brand-blueBright underline underline-offset-2">privacy@nexaai.in</a></div>
                  <div><span className="text-brand-dim">Response Time:</span> <span className="text-brand-muted">Within 30 days of receiving your grievance.</span></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
