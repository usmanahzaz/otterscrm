"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: { m: 0, a: 0 },
    desc: "Get started at no cost.",
    features: ["1 user", "Manual lead entry", "Email notifications"],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Starter",
    price: { m: 10, a: 8 },
    desc: "For small sales teams.",
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
      "Reports & analytics",
      "Advanced assignments",
    ],
    cta: "Start free trial",
    highlight: false,
  },
  {
    name: "Business",
    price: { m: 75, a: 60 },
    desc: "For high-volume teams.",
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
    <section id="pricing" className="py-24" style={{ background: "#f6f9fc" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-14">
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: "#635bff" }}
            >
              Pricing
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold leading-tight"
              style={{ color: "#0a2540", letterSpacing: "-0.03em" }}
            >
              Simple,
              <br />
              transparent pricing.
            </h2>
          </div>

          {/* Toggle */}
          <div
            className="inline-flex items-center self-start sm:self-auto rounded-lg p-1"
            style={{ background: "#e3e8ee" }}
          >
            {["Monthly", "Annual"].map((label) => {
              const isAnnual = label === "Annual";
              const active = annual === isAnnual;
              return (
                <button
                  key={label}
                  onClick={() => setAnnual(isAnnual)}
                  className={`flex items-center gap-2 text-[13px] font-medium px-4 py-2 rounded-md transition-all ${
                    active ? "bg-white shadow-sm text-[#0a2540]" : "text-[#8898aa]"
                  }`}
                >
                  {label}
                  {isAnnual && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ background: "#d4edda", color: "#0f5132" }}
                    >
                      −20%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-6 flex flex-col border transition-all ${
                plan.highlight
                  ? "border-[#635bff] shadow-lg shadow-[#635bff]/10"
                  : "border-[#e3e8ee] bg-white hover:border-[#635bff]/30 hover:shadow-sm"
              }`}
              style={plan.highlight ? { background: "#0a2540" } : {}}
            >
              {plan.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full text-white"
                  style={{ background: "#635bff" }}
                >
                  Most popular
                </div>
              )}

              <div className="mb-6">
                <p
                  className="text-[13px] font-semibold mb-0.5"
                  style={{ color: plan.highlight ? "rgba(255,255,255,0.9)" : "#0a2540" }}
                >
                  {plan.name}
                </p>
                <p
                  className="text-[12px] mb-4"
                  style={{ color: plan.highlight ? "rgba(255,255,255,0.4)" : "#8898aa" }}
                >
                  {plan.desc}
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-[40px] font-bold tabular-nums leading-none"
                    style={{
                      color: plan.highlight ? "white" : "#0a2540",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    ${annual ? plan.price.a : plan.price.m}
                  </span>
                  <span
                    className="text-[13px]"
                    style={{ color: plan.highlight ? "rgba(255,255,255,0.35)" : "#8898aa" }}
                  >
                    /mo
                  </span>
                </div>
                {annual && plan.price.m > 0 && (
                  <p
                    className="text-[11px] mt-1"
                    style={{ color: plan.highlight ? "rgba(255,255,255,0.3)" : "#8898aa" }}
                  >
                    Billed annually
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-7 flex-1">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-[13px]"
                    style={{ color: plan.highlight ? "rgba(255,255,255,0.65)" : "#425466" }}
                  >
                    <Check
                      className="w-3.5 h-3.5 flex-shrink-0"
                      style={{ color: plan.highlight ? "#a9a5ff" : "#635bff" }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="block text-center py-2.5 rounded-md text-[13px] font-semibold transition-all"
                style={
                  plan.highlight
                    ? { background: "#635bff", color: "white" }
                    : {
                        background: "transparent",
                        color: "#635bff",
                        border: "1px solid #635bff",
                      }
                }
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p
          className="text-center text-[12px] mt-8"
          style={{ color: "#8898aa" }}
        >
          All plans include a 14-day free trial · No credit card required
        </p>
      </div>
    </section>
  );
}
