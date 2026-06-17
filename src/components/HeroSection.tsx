"use client";

import { MessageCircle, Bell, TrendingUp, Share2, CheckCircle } from "lucide-react";

function DashboardMockup() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Glow underneath */}
      <div className="absolute inset-x-10 -bottom-8 h-20 bg-[#635bff]/30 blur-2xl rounded-full" />

      {/* Browser chrome */}
      <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d1f38]">
        {/* Titlebar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0a1929]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white/5 rounded-md px-3 py-1 text-[11px] text-white/30 font-mono">
              app.leadorbit.com/dashboard
            </div>
          </div>
          <div className="w-16" />
        </div>

        <div className="flex" style={{ height: "420px" }}>
          {/* Sidebar */}
          <div className="w-44 border-r border-white/5 p-3 flex-col gap-0.5 hidden sm:flex bg-[#0a1929]">
            <div className="px-2 py-2 mb-1">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#635bff] flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white">LO</span>
                </div>
                <span className="text-[11px] font-semibold text-white/80">LeadOrbit</span>
              </div>
            </div>

            <p className="text-[9px] font-semibold text-white/25 uppercase tracking-widest px-2 pt-2 pb-1">
              Pipeline
            </p>
            {[
              { label: "All Leads", count: 48, active: true },
              { label: "New", count: 12 },
              { label: "Contacted", count: 18 },
              { label: "Follow-up", count: 9 },
              { label: "Won", count: 9 },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center justify-between px-2 py-1.5 rounded-md text-[11px] cursor-pointer ${
                  item.active
                    ? "bg-[#635bff]/20 text-[#635bff]"
                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                }`}
              >
                <span>{item.label}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded ${item.active ? "bg-[#635bff]/30 text-[#a9a5ff]" : "bg-white/5 text-white/30"}`}>
                  {item.count}
                </span>
              </div>
            ))}

            <div className="mt-auto pt-3 border-t border-white/5">
              <div className="flex items-center gap-2 px-2 py-1.5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#635bff] to-[#00d4ff] flex items-center justify-center text-[8px] font-bold text-white">
                  J
                </div>
                <div>
                  <p className="text-[10px] font-medium text-white/60">James D.</p>
                  <p className="text-[9px] text-white/25">Admin</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Topbar */}
            <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between bg-[#0d1f38]">
              <div>
                <h3 className="text-[13px] font-semibold text-white">All Leads</h3>
                <p className="text-[10px] text-white/35">48 leads · syncing live</p>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-medium text-emerald-400">Meta connected</span>
              </div>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-4 gap-3 px-5 py-2 border-b border-white/5">
              {["Lead", "Status", "Assigned", "Time"].map((h) => (
                <p key={h} className="text-[9px] font-semibold text-white/25 uppercase tracking-widest">
                  {h}
                </p>
              ))}
            </div>

            {/* Rows */}
            <div className="flex-1 overflow-hidden divide-y divide-white/[0.04]">
              {[
                { name: "Ahmed Al-Rashid", status: "New", assigned: "Sarah K.", time: "2m", color: "bg-amber-400/20 text-amber-300" },
                { name: "Maria Rodriguez", status: "Contacted", assigned: "James M.", time: "18m", color: "bg-blue-400/20 text-blue-300" },
                { name: "Lena Fischer", status: "Follow-up", assigned: "You", time: "1h", color: "bg-violet-400/20 text-violet-300" },
                { name: "Ravi Sharma", status: "Won", assigned: "Sarah K.", time: "3h", color: "bg-emerald-400/20 text-emerald-300" },
                { name: "Sophie Laurent", status: "New", assigned: "—", time: "5h", color: "bg-amber-400/20 text-amber-300" },
              ].map((row) => (
                <div
                  key={row.name}
                  className="grid grid-cols-4 gap-3 px-5 py-2.5 hover:bg-white/[0.03] transition-colors"
                >
                  <p className="text-[11px] font-medium text-white/70 truncate">{row.name}</p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full self-center w-fit ${row.color}`}>
                    {row.status}
                  </span>
                  <p className="text-[11px] text-white/40">{row.assigned}</p>
                  <p className="text-[11px] text-white/30">{row.time} ago</p>
                </div>
              ))}
            </div>

            {/* Bottom metrics */}
            <div className="border-t border-white/5 px-5 py-3 grid grid-cols-3 gap-4 bg-[#0a1929]">
              {[
                { label: "Avg response", value: "4 min" },
                { label: "Follow-up rate", value: "92%" },
                { label: "Conversion", value: "29%" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-[12px] font-semibold text-white">{s.value}</p>
                  <p className="text-[9px] text-white/30 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating: WhatsApp */}
      <div className="absolute -left-4 lg:-left-12 top-20 bg-white rounded-xl shadow-xl border border-[#e3e8ee] px-3.5 py-2.5 flex items-center gap-3 max-w-[200px]">
        <div className="w-8 h-8 rounded-full bg-[#25d366] flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-[#0a2540]">WhatsApp sent</p>
          <p className="text-[10px] text-[#425466]">Sarah notified · now</p>
        </div>
      </div>

      {/* Floating: New lead */}
      <div className="absolute -right-4 lg:-right-12 top-28 bg-white rounded-xl shadow-xl border border-[#e3e8ee] px-3.5 py-2.5 flex items-center gap-3 max-w-[190px]">
        <div className="w-8 h-8 rounded-full bg-[#635bff] flex items-center justify-center flex-shrink-0">
          <Bell className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-[#0a2540]">New lead</p>
          <p className="text-[10px] text-[#425466]">From Meta Ads · now</p>
        </div>
      </div>

      {/* Floating: Conversions */}
      <div className="absolute -right-2 lg:-right-10 bottom-24 bg-white rounded-xl shadow-xl border border-[#e3e8ee] px-3.5 py-2.5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-[#0a2540]">↑ 34% conversions</p>
          <p className="text-[10px] text-[#425466]">This month</p>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden"
      style={{ background: "#0a2540" }}
    >
      {/* Aurora mesh gradient — Stripe-style */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,91,255,0.35) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 40%, rgba(0,212,255,0.15) 0%, transparent 55%),
            radial-gradient(ellipse 50% 60% at 10% 60%, rgba(99,91,255,0.2) 0%, transparent 60%)
          `,
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28 w-full">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 border border-[#635bff]/40 rounded-full px-4 py-1.5 bg-[#635bff]/10">
            <Share2 className="w-3.5 h-3.5 text-[#a9a5ff]" />
            <span className="text-[12px] font-medium text-[#a9a5ff] tracking-wide">
              Meta Lead Ads CRM
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-7">
          <h1
            className="text-5xl sm:text-6xl lg:text-[72px] font-bold text-white leading-[1.05]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Every Meta lead.
            <br />
            <span
              className="text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #a9a5ff 0%, #635bff 40%, #00d4ff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Always followed up.
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          className="text-center text-[18px] leading-relaxed max-w-lg mx-auto mb-10"
          style={{ color: "#8898aa" }}
        >
          Connect Meta Lead Ads, auto-assign to your team, and get WhatsApp
          alerts the moment a lead arrives.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-[14px] font-semibold text-white transition-all"
            style={{ background: "#635bff", boxShadow: "0 4px 15px rgba(99,91,255,0.4)" }}
          >
            Start for free
            <span>→</span>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-[14px] font-semibold transition-all border border-white/20 text-white/80 hover:bg-white/5 hover:text-white"
          >
            Book a demo
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex items-center justify-center gap-6 mb-16">
          {["No credit card", "Free 14-day trial", "5-min setup"].map((t) => (
            <span
              key={t}
              className="flex items-center gap-1.5 text-[12px]"
              style={{ color: "#6b7c93" }}
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              {t}
            </span>
          ))}
        </div>

        {/* Dashboard */}
        <div className="px-4 lg:px-10">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
