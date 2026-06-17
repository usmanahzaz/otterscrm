"use client";

import { useState } from "react";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    desc: "Perfect for individuals getting started.",
    price: { m: 0, a: 0 },
    features: [
      "1 User",
      "1 Meta Page",
      "Meta Lead Sync",
      "Email Notifications",
      "Lead Notes",
      "Basic Lead Management",
    ],
    cta: "Get Started Free",
    ctaStyle: "outline",
    highlight: false,
    badge: null,
  },
  {
    name: "Pro",
    desc: "Everything you need to manage leads efficiently.",
    price: { m: 10, a: 8 },
    features: [
      "5 Users",
      "1 Meta Page",
      "Meta Lead Sync",
      "WhatsApp Alerts",
      "Email Notifications",
      "Follow-up Reminders",
      "Lead Notes",
      "Basic CRM Features",
    ],
    cta: "Start Free Trial",
    ctaStyle: "solid",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Growth",
    desc: "Built for growing teams.",
    price: { m: 25, a: 20 },
    features: [
      "10 Users",
      "2 Meta Pages",
      "Projects & Teams",
      "Reports & Analytics",
      "Lead Assignment",
      "WhatsApp Alerts",
      "Email Notifications",
      "Follow-up Reminders",
      "Activity Timeline",
    ],
    cta: "Start Free Trial",
    ctaStyle: "outline",
    highlight: false,
    badge: null,
  },
  {
    name: "Business",
    desc: "For high-performing organizations.",
    price: { m: 75, a: 60 },
    features: [
      "50 Users",
      "10 Meta Pages",
      "Advanced Reporting",
      "Team Performance Tracking",
      "Advanced Lead Assignment",
      "Priority Support",
      "Projects & Teams",
      "Role-Based Access",
      "Unlimited Activity History",
    ],
    cta: "Contact Sales",
    ctaStyle: "outline",
    highlight: false,
    badge: null,
  },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-28" style={{ background: "#f6f9fc" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
            style={{ color: "#635bff" }}
          >
            Pricing
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
            style={{ color: "#0a2540", letterSpacing: "-0.03em" }}
          >
            Simple pricing that scales
            <br className="hidden sm:block" /> with your team.
          </h2>
          <p className="text-[17px]" style={{ color: "#8898aa" }}>
            Start free, upgrade when your business grows.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center mt-8">
            <div
              className="inline-flex items-center rounded-lg p-1 gap-0.5"
              style={{ background: "#e3e8ee" }}
            >
              {[
                { label: "Monthly", value: false },
                { label: "Annual", value: true },
              ].map(({ label, value }) => {
                const active = annual === value;
                return (
                  <button
                    key={label}
                    onClick={() => setAnnual(value)}
                    className="flex items-center gap-2 text-[13px] font-medium px-5 py-2 rounded-md transition-all duration-200"
                    style={{
                      background: active ? "white" : "transparent",
                      color: active ? "#0a2540" : "#8898aa",
                      boxShadow: active ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                    }}
                  >
                    {label}
                    {value && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: "#d4edda", color: "#0f5132" }}
                      >
                        Save 20%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative flex flex-col rounded-2xl border transition-all duration-300"
              style={
                plan.highlight
                  ? {
                      background: "#0a2540",
                      borderColor: "#635bff",
                      boxShadow: "0 8px 40px rgba(99,91,255,0.2), 0 0 0 1px rgba(99,91,255,0.5)",
                      transform: "translateY(-4px)",
                    }
                  : {
                      background: "white",
                      borderColor: "#e3e8ee",
                    }
              }
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full text-white"
                    style={{
                      background: "linear-gradient(135deg, #635bff, #a78bfa)",
                      boxShadow: "0 2px 8px rgba(99,91,255,0.4)",
                    }}
                  >
                    <Zap className="w-2.5 h-2.5" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                {/* Plan name + desc */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1.5">
                    <p
                      className="text-[14px] font-bold"
                      style={{ color: plan.highlight ? "white" : "#0a2540" }}
                    >
                      {plan.name}
                    </p>
                    {plan.highlight && (
                      <span
                        className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded"
                        style={{ background: "rgba(99,91,255,0.3)", color: "#a9a5ff" }}
                      >
                        Best Value
                      </span>
                    )}
                  </div>
                  <p
                    className="text-[12px] leading-relaxed"
                    style={{ color: plan.highlight ? "rgba(255,255,255,0.4)" : "#8898aa" }}
                  >
                    {plan.desc}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-7">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-[42px] font-bold tabular-nums leading-none"
                      style={{
                        color: plan.highlight ? "white" : "#0a2540",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      ${annual ? plan.price.a : plan.price.m}
                    </span>
                    <span
                      className="text-[13px]"
                      style={{ color: plan.highlight ? "rgba(255,255,255,0.3)" : "#8898aa" }}
                    >
                      /mo
                    </span>
                  </div>
                  {annual && plan.price.m > 0 && (
                    <p
                      className="text-[11px] mt-1.5"
                      style={{ color: plan.highlight ? "rgba(255,255,255,0.3)" : "#8898aa" }}
                    >
                      Billed ${plan.price.a * 12}/year
                    </p>
                  )}
                  {plan.price.m === 0 && (
                    <p
                      className="text-[11px] mt-1.5"
                      style={{ color: plan.highlight ? "rgba(255,255,255,0.3)" : "#8898aa" }}
                    >
                      Free forever
                    </p>
                  )}
                </div>

                {/* CTA */}
                <a
                  href="#"
                  className="block text-center py-2.5 rounded-lg text-[13px] font-semibold mb-7 transition-all duration-200"
                  style={
                    plan.highlight
                      ? {
                          background: "linear-gradient(135deg, #635bff, #7c72ff)",
                          color: "white",
                          boxShadow: "0 4px 15px rgba(99,91,255,0.4)",
                        }
                      : {
                          background: "transparent",
                          color: "#635bff",
                          border: "1.5px solid rgba(99,91,255,0.4)",
                        }
                  }
                >
                  {plan.cta}
                </a>

                {/* Divider */}
                <div
                  className="mb-6 h-px"
                  style={{
                    background: plan.highlight
                      ? "rgba(255,255,255,0.07)"
                      : "#e3e8ee",
                  }}
                />

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-[13px]"
                      style={{
                        color: plan.highlight ? "rgba(255,255,255,0.65)" : "#425466",
                      }}
                    >
                      <span
                        className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
                        style={{
                          background: plan.highlight
                            ? "rgba(99,91,255,0.25)"
                            : "rgba(99,91,255,0.08)",
                        }}
                      >
                        <Check
                          className="w-2.5 h-2.5"
                          style={{ color: plan.highlight ? "#a9a5ff" : "#635bff" }}
                        />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Trust footer */}
        <div className="mt-10 text-center space-y-2">
          <p
            className="text-[13px] font-medium"
            style={{ color: "#425466" }}
          >
            All paid plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-[12px]" style={{ color: "#8898aa" }}>
            Need additional users or Meta Pages?{" "}
            <a
              href="#"
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
              style={{ color: "#635bff" }}
            >
              Contact our team for a custom solution.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
