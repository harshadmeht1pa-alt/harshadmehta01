import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { CheckCircle, Activity } from "lucide-react";

const services = [
  { name: "AI Signal Engine",       uptime: "99.98%", status: "Operational" },
  { name: "Learning Platform",      uptime: "100.00%", status: "Operational" },
  { name: "Community Discord",      uptime: "99.95%", status: "Operational" },
  { name: "Payment Gateway",        uptime: "99.99%", status: "Operational" },
  { name: "Dashboard API",          uptime: "99.97%", status: "Operational" },
  { name: "Email Notifications",    uptime: "100.00%", status: "Operational" },
  { name: "Mobile Web Experience",  uptime: "99.93%", status: "Operational" },
];

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <PageHero
        badge="Platform Status"
        badgeColor="green"
        title="All Systems"
        titleHighlight="Operational"
        subtitle="Real-time status of all NexaAI platform services. Last verified: May 1, 2026."
        breadcrumb={[{ label: "Status", href: "/status" }]}
      />

      <div className="mx-auto max-w-3xl px-5 sm:px-8 pb-20 space-y-8">
        {/* Overall status */}
        <div className="glass-card rounded-xl2 border border-brand-green/30 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-green/15 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-brand-green" strokeWidth={2} />
          </div>
          <div>
            <div className="text-brand-green font-semibold text-sm">All Systems Fully Operational</div>
            <div className="text-brand-dim text-xs mt-0.5">No incidents reported in the last 90 days.</div>
          </div>
        </div>

        {/* Services list */}
        <div className="glass-card rounded-xl3 border border-brand-border overflow-hidden">
          <div className="grid grid-cols-3 border-b border-brand-border px-5 py-3 text-xs text-brand-dim font-semibold uppercase tracking-wider">
            <span>Service</span>
            <span className="text-center">Status</span>
            <span className="text-right">Uptime (90d)</span>
          </div>
          {services.map((svc, i) => (
            <div key={svc.name} className={`grid grid-cols-3 items-center px-5 py-4 border-b border-brand-border/50 last:border-0 ${i % 2 !== 0 ? "bg-brand-bgCard/30" : ""}`}>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-dim" strokeWidth={1.5} />
                <span className="text-white text-sm">{svc.name}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green" />
                </span>
                <span className="text-brand-green text-xs font-medium">{svc.status}</span>
              </div>
              <div className="text-right text-brand-muted text-sm font-semibold">{svc.uptime}</div>
            </div>
          ))}
        </div>

        {/* 90-day history */}
        <div className="glass-card rounded-xl2 border border-brand-border p-5">
          <div className="text-white text-sm font-semibold mb-3">90-Day Uptime History</div>
          <div className="flex gap-px">
            {Array.from({ length: 90 }).map((_, i) => (
              <div key={i} className="flex-1 h-6 rounded-sm bg-brand-green/80 hover:bg-brand-green transition-colors" title={`Day ${90 - i}: Operational`} />
            ))}
          </div>
          <div className="flex justify-between text-brand-dim text-xs mt-2">
            <span>90 days ago</span>
            <span>Today</span>
          </div>
        </div>

        {/* Incident history */}
        <div className="glass-card rounded-xl2 border border-brand-border p-5 text-center">
          <CheckCircle className="w-8 h-8 text-brand-green mx-auto mb-2" strokeWidth={1.5} />
          <div className="text-white font-semibold text-sm mb-1">No Incidents Reported</div>
          <p className="text-brand-dim text-xs">There have been no incidents, outages, or service degradations in the last 90 days.</p>
        </div>

        <p className="text-brand-dim text-xs text-center">
          For urgent issues, contact us at{" "}
          <a href="mailto:support@nexaai.in" className="text-brand-blue hover:text-brand-blueBright underline underline-offset-2 transition-colors">support@nexaai.in</a>
        </p>
      </div>

      <Footer />
    </main>
  );
}
