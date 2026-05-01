import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

const toc = [
  "Acceptance of Terms",
  "Platform Description",
  "Eligibility",
  "Account Registration",
  "Payment & Access",
  "Intellectual Property",
  "Prohibited Activities",
  "Disclaimers & Limitation of Liability",
  "Indemnification",
  "Termination",
  "Governing Law & Jurisdiction",
  "Contact Information",
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <PageHero
        badge="Legal"
        badgeColor="blue"
        title="Terms of"
        titleHighlight="Service"
        subtitle="Last updated: May 1, 2026. By accessing or using NexaAI, you agree to be bound by these Terms of Service."
        breadcrumb={[{ label: "Terms of Service", href: "/legal/terms" }]}
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
                    href={`#section-${i + 1}`}
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
            <p className="text-brand-muted">These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the NexaAI platform, website, and related services (&ldquo;Platform&rdquo;). Please read these Terms carefully.</p>

            <section id="section-1">
              <h2 className="text-white font-semibold text-base mb-3">1. Acceptance of Terms</h2>
              <p className="text-brand-muted mb-3">By accessing, registering for, or using the NexaAI Platform, you confirm that you have read, understood, and agree to be bound by these Terms, our Privacy Policy, and our Legal Disclaimer. If you do not agree to these Terms, you must not use the Platform.</p>
              <p className="text-brand-muted">NexaAI reserves the right to update or modify these Terms at any time. We will provide at least 30 days&rsquo; notice of material changes. Continued use of the Platform after such notice constitutes acceptance of the revised Terms.</p>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="section-2">
              <h2 className="text-white font-semibold text-base mb-3">2. Platform Description</h2>
              <p className="text-brand-muted mb-3">NexaAI is an educational technology platform that provides AI-assisted earning strategies, financial literacy content, learning modules, AI-generated signals, and community access. The Platform is designed solely for educational and informational purposes.</p>
              <p className="text-brand-muted">NexaAI is <strong className="text-white">not</strong> a registered financial advisor, broker, investment manager, or any other regulated financial entity. All content is educational in nature and must not be interpreted as financial, investment, legal, or tax advice. See our Legal Disclaimer for full risk disclosure.</p>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="section-3">
              <h2 className="text-white font-semibold text-base mb-3">3. Eligibility</h2>
              <p className="text-brand-muted mb-3">To use the Platform, you must:</p>
              <ul className="list-disc list-inside space-y-1 text-brand-muted pl-2">
                <li>Be at least 18 years of age.</li>
                <li>Be a resident of India or otherwise permitted to access the Platform under your local laws.</li>
                <li>Have the legal capacity to enter into a binding contract.</li>
                <li>Not be prohibited from accessing the Platform under any applicable law or regulation.</li>
              </ul>
              <p className="text-brand-muted mt-3">By using the Platform, you represent and warrant that you meet all of the above eligibility requirements.</p>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="section-4">
              <h2 className="text-white font-semibold text-base mb-3">4. Account Registration</h2>
              <p className="text-brand-muted mb-3">To access certain features of the Platform, you must register for an account. You agree to provide accurate, current, and complete information during registration and to keep your account information up to date.</p>
              <p className="text-brand-muted mb-3">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately at support@nexaai.in if you suspect any unauthorised use of your account.</p>
              <p className="text-brand-muted">NexaAI reserves the right to suspend or terminate accounts that provide false information or violate these Terms.</p>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="section-5">
              <h2 className="text-white font-semibold text-base mb-3">5. Payment &amp; Access</h2>
              <p className="text-brand-muted mb-3">Access to premium content on NexaAI is available upon a one-time payment for your chosen plan (Starter, Growth, or Elite). All prices are listed in Indian Rupees (INR) inclusive of applicable taxes.</p>
              <p className="text-brand-muted mb-3">Payment is processed through third-party payment gateways. NexaAI does not store your complete payment information. By making a purchase, you agree to the terms of the applicable payment processor.</p>
              <p className="text-brand-muted">Please refer to our <a href="/legal/refund" className="text-brand-blue hover:text-brand-blueBright underline underline-offset-2">Refund Policy</a> for information about refund eligibility and procedures.</p>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="section-6">
              <h2 className="text-white font-semibold text-base mb-3">6. Intellectual Property</h2>
              <p className="text-brand-muted mb-3">All content on the NexaAI Platform — including but not limited to text, graphics, logos, AI models, learning modules, strategy frameworks, and software — is the exclusive intellectual property of NexaAI or its licensors and is protected by applicable copyright, trademark, and other intellectual property laws.</p>
              <p className="text-brand-muted">You are granted a limited, non-exclusive, non-transferable, revocable licence to access and use the Platform content for personal, non-commercial educational purposes only. You must not reproduce, distribute, modify, create derivative works from, or commercially exploit any content from the Platform without express written consent from NexaAI.</p>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="section-7">
              <h2 className="text-white font-semibold text-base mb-3">7. Prohibited Activities</h2>
              <p className="text-brand-muted mb-3">You agree not to:</p>
              <ul className="list-disc list-inside space-y-1 text-brand-muted pl-2">
                <li>Use the Platform for any unlawful purpose or in violation of any applicable law or regulation.</li>
                <li>Share your account credentials with any other person or allow others to access your account.</li>
                <li>Reproduce, republish, or commercially exploit any Platform content without written consent.</li>
                <li>Attempt to reverse engineer, decompile, or circumvent any security measure on the Platform.</li>
                <li>Transmit any viruses, malware, or other harmful code.</li>
                <li>Harass, abuse, or harm other users or community members.</li>
                <li>Misrepresent your identity or affiliation with any person or entity.</li>
                <li>Use automated tools to scrape or extract data from the Platform.</li>
              </ul>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="section-8">
              <h2 className="text-white font-semibold text-base mb-3">8. Disclaimers &amp; Limitation of Liability</h2>
              <p className="text-brand-muted mb-3">THE PLATFORM IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. NEXAAI DOES NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.</p>
              <p className="text-brand-muted mb-3">TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, NEXAAI AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF OR INABILITY TO USE THE PLATFORM.</p>
              <p className="text-brand-muted">All earning figures are indicative only. NexaAI makes no guarantee of any specific financial outcome. See our full <a href="/legal/disclaimer" className="text-brand-blue hover:text-brand-blueBright underline underline-offset-2">Legal Disclaimer</a>.</p>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="section-9">
              <h2 className="text-white font-semibold text-base mb-3">9. Indemnification</h2>
              <p className="text-brand-muted">You agree to indemnify, defend, and hold harmless NexaAI and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising out of or in connection with: (a) your use of the Platform; (b) your violation of these Terms; (c) your violation of any applicable law or regulation; or (d) your infringement of any third-party rights.</p>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="section-10">
              <h2 className="text-white font-semibold text-base mb-3">10. Termination</h2>
              <p className="text-brand-muted mb-3">NexaAI reserves the right to suspend or terminate your access to the Platform at any time, with or without notice, for any reason including breach of these Terms. Upon termination, your right to access the Platform will immediately cease.</p>
              <p className="text-brand-muted">You may terminate your account at any time by contacting us at support@nexaai.in. Termination does not entitle you to a refund unless you meet the eligibility criteria in our Refund Policy.</p>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="section-11">
              <h2 className="text-white font-semibold text-base mb-3">11. Governing Law &amp; Jurisdiction</h2>
              <p className="text-brand-muted">These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Bangalore, Karnataka, India.</p>
            </section>
            <div className="h-px bg-brand-border/50" />

            <section id="section-12">
              <h2 className="text-white font-semibold text-base mb-3">12. Contact Information</h2>
              <p className="text-brand-muted mb-3">If you have any questions about these Terms of Service, please contact us:</p>
              <div className="glass-card rounded-xl p-4 border border-brand-border space-y-1 text-brand-muted text-xs">
                <div><strong className="text-white">Company:</strong> NexaAI Education Technologies Pvt. Ltd.</div>
                <div><strong className="text-white">Email:</strong> legal@nexaai.in</div>
                <div><strong className="text-white">Support:</strong> support@nexaai.in</div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
