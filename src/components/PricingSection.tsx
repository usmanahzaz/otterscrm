"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    desc: "Get started with the basics.",
    features: [
      "1 User",
      "1 Facebook Page",
      "Manual Lead Entry",
      "Email Notifications",
    ],
    cta: "Start Free",
    highlight: false,
    badge: null,
  },
  {
    name: "Starter",
    price: { monthly: 10, annual: 8 },
    desc: "Perfect for small sales teams.",
    features: [
      "5 Users",
      "1 Facebook Page",
      "Facebook Lead Sync",
      "WhatsApp Alerts",
      "Follow-Up Reminders",
    ],
    cta: "Get Started",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Growth",
    price: { monthly: 25, annual: 20 },
    desc: "Scale your lead operations.",
    features: [
      "10 Users",
      "2 Facebook Pages",
      "Projects & Teams",
      "Reports & Analytics",
      "Advanced Assignments",
    ],
    cta: "Choose Growth",
    highlight: false,
    badge: null,
  },
  {
    name: "Business",
    price: { monthly: 75, annual: 62 },
    desc: "For high-volume sales organizations.",
    features: [
      "50 Users",
      "10 Facebook Pages",
      "Advanced Reporting",
      "Team Performance",
      "Priority Support",
    ],
    cta: "Contact Sales",
    highlight: false,
    badge: null,
  },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight">
            Simple, Transparent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Pricing.
            </span>
          </h2>
          <p className="mt-4 text-lg text-zinc-500 max-w-xl mx-auto">
            Start free. Upgrade when you're ready. No hidden fees.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 mt-8 bg-white border border-zinc-200 rounded-full p-1 shadow-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`text-sm font-medium px-5 py-1.5 rounded-full transition-all ${
                !annual
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`text-sm font-medium px-5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                annual
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              Annual
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${annual ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"}`}>
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-7 flex flex-col transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-b from-indigo-600 to-indigo-700 border-indigo-500 shadow-2xl shadow-indigo-200 scale-105"
                  : "bg-white border-zinc-200 hover:shadow-lg hover:border-zinc-300"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <h3 className={`font-bold text-lg mb-1 ${plan.highlight ? "text-white" : "text-zinc-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlight ? "text-indigo-200" : "text-zinc-500"}`}>
                  {plan.desc}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-zinc-900"}`}>
                    ${annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className={`text-sm ${plan.highlight ? "text-indigo-200" : "text-zinc-400"}`}>
                    /month
                  </span>
                </div>
                {annual && plan.price.monthly > 0 && (
                  <p className={`text-xs mt-1 ${plan.highlight ? "text-indigo-200" : "text-zinc-400"}`}>
                    Billed annually
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-7 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-center gap-2.5 text-sm ${plan.highlight ? "text-indigo-100" : "text-zinc-600"}`}>
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-indigo-200" : "text-indigo-600"}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-full font-semibold ${
                  plan.highlight
                    ? "bg-white text-indigo-700 hover:bg-indigo-50"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-zinc-400 mt-8">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
