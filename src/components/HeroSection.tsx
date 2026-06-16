"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  ArrowRight,
  Bell,
  MessageCircle,
  User,
  TrendingUp,
  Share2,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react";

function DashboardMockup() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main dashboard card */}
      <div className="bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden">
        {/* Top bar */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white/30" />
            <div className="w-3 h-3 rounded-full bg-white/30" />
            <div className="w-3 h-3 rounded-full bg-white/30" />
          </div>
          <span className="text-white/90 text-xs font-medium">LeadOrbit Dashboard</span>
          <div className="w-16" />
        </div>

        <div className="p-5 space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "New Leads", value: "48", delta: "+12%", color: "text-indigo-600", bg: "bg-indigo-50" },
              { label: "Followed Up", value: "31", delta: "+8%", color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Converted", value: "14", delta: "+22%", color: "text-violet-600", bg: "bg-violet-50" },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} rounded-xl p-3`}>
                <p className="text-xs text-zinc-500 mb-1">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-zinc-400">{s.delta} this week</p>
              </div>
            ))}
          </div>

          {/* Leads list */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-zinc-700">Recent Leads</p>
              <span className="text-xs text-indigo-600 font-medium">View all</span>
            </div>
            <div className="space-y-2">
              {[
                { name: "Ahmed Al-Rashid", time: "2 min ago", status: "New", avatar: "AA", color: "bg-orange-100 text-orange-700", assigned: "Sarah K." },
                { name: "Maria Rodriguez", time: "15 min ago", status: "Assigned", avatar: "MR", color: "bg-blue-100 text-blue-700", assigned: "James M." },
                { name: "Lena Fischer", time: "1 hr ago", status: "Contacted", avatar: "LF", color: "bg-green-100 text-green-700", assigned: "You" },
              ].map((lead) => (
                <div key={lead.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-zinc-50 transition-colors">
                  <div className={`w-7 h-7 rounded-full ${lead.color} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                    {lead.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-zinc-800 truncate">{lead.name}</p>
                    <p className="text-xs text-zinc-400">{lead.time} · {lead.assigned}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    lead.status === "New" ? "bg-amber-100 text-amber-700" :
                    lead.status === "Assigned" ? "bg-blue-100 text-blue-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* FB Integration */}
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <Share2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-zinc-800">Facebook Integration</p>
              <p className="text-xs text-zinc-500">3 pages connected · Syncing live</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-emerald-600 font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -top-4 -left-6 bg-white border border-zinc-200 rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 animate-bounce-slow">
        <Bell className="w-4 h-4 text-indigo-500" />
        <div>
          <p className="text-xs font-semibold text-zinc-800">New Lead Received</p>
          <p className="text-xs text-zinc-400">From Facebook Ads</p>
        </div>
      </div>

      <div className="absolute -bottom-4 -right-6 bg-white border border-zinc-200 rounded-xl shadow-lg px-3 py-2 flex items-center gap-2">
        <MessageCircle className="w-4 h-4 text-green-500" />
        <div>
          <p className="text-xs font-semibold text-zinc-800">WhatsApp Sent</p>
          <p className="text-xs text-zinc-400">Notification delivered</p>
        </div>
      </div>

      <div className="absolute top-1/2 -right-8 -translate-y-1/2 bg-white border border-zinc-200 rounded-xl shadow-lg px-3 py-2 flex items-center gap-2">
        <User className="w-4 h-4 text-violet-500" />
        <div>
          <p className="text-xs font-semibold text-zinc-800">Assigned to Sarah</p>
          <p className="text-xs text-zinc-400">Auto-assigned</p>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/30 to-white">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-6">
              <Zap className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                Facebook Lead Ads CRM
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 leading-[1.1] tracking-tight mb-6">
              Never Miss Another{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Facebook Lead
              </span>{" "}
              Again.
            </h1>

            <p className="text-lg sm:text-xl text-zinc-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Connect your Facebook Lead Ads, instantly assign leads to your
              team, automate follow-ups, and turn more prospects into customers
              from one simple CRM.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 shadow-lg shadow-indigo-200 text-base font-semibold"
              >
                Start Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-base font-semibold border-zinc-200 hover:bg-zinc-50 gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 justify-center lg:justify-start">
              {[
                { icon: CheckCircle2, text: "No credit card required" },
                { icon: Clock, text: "Set up in 5 minutes" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-sm text-zinc-500">
                  <Icon className="w-4 h-4 text-emerald-500" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — dashboard */}
          <div className="hidden lg:block">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
