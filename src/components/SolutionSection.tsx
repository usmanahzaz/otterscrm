import {
  Share2,
  Database,
  Users,
  Bell,
  RefreshCw,
  Trophy,
  ArrowDown,
} from "lucide-react";

const steps = [
  { icon: Share2, label: "Facebook Lead Ads", color: "bg-blue-500", desc: "Lead submitted" },
  { icon: Database, label: "LeadOrbit CRM", color: "bg-indigo-600", desc: "Instantly captured" },
  { icon: Users, label: "Auto Assignment", color: "bg-violet-600", desc: "Right rep, right now" },
  { icon: Bell, label: "Instant Notifications", color: "bg-orange-500", desc: "WhatsApp & Email" },
  { icon: RefreshCw, label: "Follow-Ups", color: "bg-emerald-500", desc: "Automated reminders" },
  { icon: Trophy, label: "Won Deals", color: "bg-amber-500", desc: "Revenue generated" },
];

export default function SolutionSection() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            The Solution
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight">
            LeadOrbit Fixes the Entire{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Lead Journey.
            </span>
          </h2>
          <p className="mt-4 text-lg text-zinc-500 max-w-2xl mx-auto">
            From the moment a lead clicks your ad to the moment the deal is
            closed, every step is automated and tracked.
          </p>
        </div>

        {/* Flow */}
        <div className="flex flex-col items-center gap-0">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center">
              <div className="flex items-center gap-5 bg-white rounded-2xl border border-zinc-200 shadow-sm px-8 py-5 w-full max-w-md hover:shadow-md hover:border-indigo-200 transition-all duration-300 group">
                <div className={`${step.color} w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                  <step.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900">{step.label}</p>
                  <p className="text-sm text-zinc-500">{step.desc}</p>
                </div>
                <div className="ml-auto text-xs font-bold text-zinc-300">0{i + 1}</div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex flex-col items-center py-1">
                  <div className="w-0.5 h-5 bg-gradient-to-b from-zinc-200 to-indigo-300" />
                  <ArrowDown className="w-4 h-4 text-indigo-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
