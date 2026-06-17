"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MessageCircle,
  Bell,
  User,
  TrendingUp,
  Share2,
  CheckCircle,
} from "lucide-react";

function DashboardMockup() {
  return (
    <div className="relative w-full">
      {/* Browser chrome */}
      <div className="rounded-2xl overflow-hidden shadow-2xl shadow-indigo-100 border border-zinc-200 bg-white">
        {/* Top bar */}
        <div className="h-9 bg-zinc-50 border-b border-zinc-100 flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-zinc-100 rounded-md h-4 w-48 mx-auto text-[10px] text-zinc-400 flex items-center justify-center">
              app.leadorbit.com/dashboard
            </div>
          </div>
        </div>

        {/* App layout */}
        <div className="flex h-[400px]">
          {/* Sidebar */}
          <div className="w-48 border-r border-zinc-100 p-3 flex flex-col gap-1 hidden sm:flex">
            <div className="px-2 py-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider mt-1 mb-1">
              Workspace
            </div>
            {[
              { label: "All Leads", count: 48, active: true },
              { label: "New", count: 12 },
              { label: "Contacted", count: 18 },
              { label: "Follow-up", count: 9 },
              { label: "Won", count: 9 },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer text-xs ${
                  item.active
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-zinc-500 hover:bg-zinc-50"
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    item.active ? "bg-indigo-100 text-indigo-600" : "bg-zinc-100 text-zinc-400"
                  }`}
                >
                  {item.count}
                </span>
              </div>
            ))}

            <div className="mt-auto pt-3 border-t border-zinc-100">
              <div className="flex items-center gap-2 px-2 py-1.5">
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                  JD
                </div>
                <div>
                  <p className="text-[10px] font-medium text-zinc-700">James D.</p>
                  <p className="text-[10px] text-zinc-400">Admin</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">All Leads</h3>
                <p className="text-xs text-zinc-400">48 leads · Updated just now</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Meta connected
                </div>
              </div>
            </div>

            {/* Lead rows */}
            <div className="flex-1 overflow-hidden">
              {[
                {
                  name: "Ahmed Al-Rashid",
                  source: "Meta Ads",
                  status: "New",
                  assigned: "Sarah K.",
                  time: "2m ago",
                  avatar: "AA",
                  color: "bg-orange-100 text-orange-700",
                  statusColor: "bg-amber-50 text-amber-700",
                },
                {
                  name: "Maria Rodriguez",
                  source: "Meta Ads",
                  status: "Contacted",
                  assigned: "James M.",
                  time: "18m ago",
                  avatar: "MR",
                  color: "bg-blue-100 text-blue-700",
                  statusColor: "bg-blue-50 text-blue-700",
                },
                {
                  name: "Lena Fischer",
                  source: "Meta Ads",
                  status: "Follow-up",
                  assigned: "You",
                  time: "1h ago",
                  avatar: "LF",
                  color: "bg-violet-100 text-violet-700",
                  statusColor: "bg-violet-50 text-violet-700",
                },
                {
                  name: "Ravi Sharma",
                  source: "Meta Ads",
                  status: "Won",
                  assigned: "Sarah K.",
                  time: "3h ago",
                  avatar: "RS",
                  color: "bg-emerald-100 text-emerald-700",
                  statusColor: "bg-emerald-50 text-emerald-700",
                },
                {
                  name: "Sophie Laurent",
                  source: "Meta Ads",
                  status: "New",
                  assigned: "Unassigned",
                  time: "5h ago",
                  avatar: "SL",
                  color: "bg-rose-100 text-rose-700",
                  statusColor: "bg-amber-50 text-amber-700",
                },
              ].map((lead) => (
                <div
                  key={lead.name}
                  className="flex items-center gap-3 px-4 py-2.5 border-b border-zinc-50 hover:bg-zinc-50/60 transition-colors"
                >
                  <div
                    className={`w-7 h-7 rounded-full ${lead.color} flex items-center justify-center text-[10px] font-bold flex-shrink-0`}
                  >
                    {lead.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-zinc-800 truncate">{lead.name}</p>
                    <p className="text-[10px] text-zinc-400">{lead.source} · {lead.time}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium hidden sm:block ${lead.statusColor}`}>
                    {lead.status}
                  </span>
                  <span className="text-[10px] text-zinc-400 hidden md:block">{lead.assigned}</span>
                  <div className="flex gap-1">
                    <button className="p-1 rounded-md hover:bg-green-50 text-zinc-300 hover:text-green-600 transition-colors">
                      <MessageCircle className="w-3 h-3" />
                    </button>
                    <button className="p-1 rounded-md hover:bg-indigo-50 text-zinc-300 hover:text-indigo-600 transition-colors">
                      <User className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom stats */}
            <div className="px-4 py-2.5 border-t border-zinc-100 grid grid-cols-3 gap-3">
              {[
                { label: "Response time", value: "4 min", good: true },
                { label: "Follow-up rate", value: "92%", good: true },
                { label: "Converted", value: "29%", good: true },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-xs font-semibold text-zinc-900">{s.value}</p>
                  <p className="text-[10px] text-zinc-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification — WhatsApp */}
      <div className="absolute -left-5 top-16 bg-white rounded-xl border border-zinc-200 shadow-lg px-3.5 py-2.5 flex items-center gap-2.5 max-w-[200px]">
        <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-zinc-800">WhatsApp sent</p>
          <p className="text-[10px] text-zinc-400">Sarah notified · now</p>
        </div>
      </div>

      {/* Floating — new lead */}
      <div className="absolute -right-5 top-24 bg-white rounded-xl border border-zinc-200 shadow-lg px-3.5 py-2.5 flex items-center gap-2.5 max-w-[190px]">
        <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <Bell className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-zinc-800">New lead</p>
          <p className="text-[10px] text-zinc-400">From Meta Ads · now</p>
        </div>
      </div>

      {/* Floating — performance */}
      <div className="absolute -right-3 bottom-20 bg-white rounded-xl border border-zinc-200 shadow-lg px-3.5 py-2.5 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-zinc-800">↑ 34% conversions</p>
          <p className="text-[10px] text-zinc-400">This month</p>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">
        {/* Top label */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-3.5 py-1.5">
            <Share2 className="w-3 h-3" />
            Meta Lead Ads CRM
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-zinc-900 tracking-tight leading-[1.05]">
            Every Meta lead.
            <br />
            <span className="text-indigo-600">Always followed up.</span>
          </h1>
        </div>

        {/* Sub */}
        <p className="text-center text-lg text-zinc-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Connect Meta Lead Ads, auto-assign to your team, and get WhatsApp
          alerts the moment a lead arrives.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <Button
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-7 font-semibold"
          >
            Start for free
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-lg px-7 border-zinc-200 text-zinc-700 hover:bg-zinc-50 font-medium"
          >
            Book a demo
          </Button>
        </div>

        <div className="flex items-center justify-center gap-5 text-xs text-zinc-400 mb-16">
          {["No credit card", "Free 14-day trial", "5-minute setup"].map((t) => (
            <span key={t} className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-500" />
              {t}
            </span>
          ))}
        </div>

        {/* Dashboard */}
        <div className="relative max-w-4xl mx-auto px-8 lg:px-16">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
