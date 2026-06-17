"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: { m: 0, a: 0 },
    desc: "Try it out.",
    features: ["1 user", "Manual lead entry", "Email notifications"],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Starter",
    price: { m: 10, a: 8 },
    desc: "For small teams.",
    features: [
      "5 users",
      "1 Meta page",
      "Meta lead sync",
      "WhatsApp alerts",
      "Follow-up reminders",
    ],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Growth",
    price: { m: 25, a: 20 },
    desc: "For growing teams.",
    features: [
      "10 users",
      "2 Meta pages",
      "Projects & teams",
      "Reports",
      "Advanced assignments",
    ],
    cta: "Start free trial",
    highlight: false,
  },
  {
    name: "Business",
    price: { m: 75, a: 60 },
    desc: "For large operations.",
    features: [
      "50 users",
      "10 Meta pages",
      "Advanced reporting",
      "Team performance",
      "Priority support",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-4">
              Pricing
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
              Simple pricing.
            </h2>
          </div>
          <div className="inline-flex items-center gap-1 bg-zinc-100 rounded-lg p-1 self-start sm:self-auto">
            <button
              onClick={() => setAnnual(false)}
              className={`text-xs font-medium px-4 py-1.5 rounded-md transition-all ${
                !annual ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`text-xs font-medium px-4 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                annual ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
              }`}
            >
              Annual
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                −20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-6 flex flex-col relative ${
                plan.highlight
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100"
                  : "bg-white border-zinc-200"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-zinc-900 text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                  Most popular
                </div>
              )}
              <div className="mb-5">
                <p className={`text-sm font-semibold mb-0.5 ${plan.highlight ? "text-indigo-200" : "text-zinc-900"}`}>
                  {plan.name}
                </p>
                <p className={`text-xs mb-4 ${plan.highlight ? "text-indigo-300" : "text-zinc-400"}`}>
                  {plan.desc}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold tabular-nums ${plan.highlight ? "text-white" : "text-zinc-900"}`}>
                    ${annual ? plan.price.a : plan.price.m}
                  </span>
                  <span className={`text-sm ${plan.highlight ? "text-indigo-300" : "text-zinc-400"}`}>
                    /mo
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? "text-indigo-100" : "text-zinc-600"}`}>
                    <Check className={`w-3.5 h-3.5 flex-shrink-0 ${plan.highlight ? "text-indigo-300" : "text-indigo-500"}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-lg text-sm font-semibold ${
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

        <p className="text-center text-xs text-zinc-400 mt-8">
          All plans include a 14-day free trial · No credit card required
        </p>
      </div>
    </section>
  );
}
