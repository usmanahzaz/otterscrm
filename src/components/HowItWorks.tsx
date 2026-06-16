import { Link, UserPlus, GitBranch, Trophy } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Link,
    title: "Connect Facebook Pages",
    desc: "Link your Facebook Business Pages in seconds. LeadOrbit instantly starts pulling in every lead from your active ad campaigns.",
    color: "bg-indigo-600",
    ring: "ring-indigo-100",
  },
  {
    number: "02",
    icon: UserPlus,
    title: "Invite Your Team",
    desc: "Add your sales reps, set their roles, and configure assignment rules. Your team is ready to go in minutes.",
    color: "bg-violet-600",
    ring: "ring-violet-100",
  },
  {
    number: "03",
    icon: GitBranch,
    title: "Assign and Follow Up",
    desc: "Leads get routed to the right person automatically. Built-in reminders ensure every prospect gets followed up.",
    color: "bg-orange-500",
    ring: "ring-orange-100",
  },
  {
    number: "04",
    icon: Trophy,
    title: "Close More Deals",
    desc: "With full visibility into your pipeline and team performance, your conversion rates will soar.",
    color: "bg-emerald-500",
    ring: "ring-emerald-100",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight">
            Up and Running{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              in Minutes.
            </span>
          </h2>
          <p className="mt-4 text-lg text-zinc-500 max-w-2xl mx-auto">
            No lengthy onboarding. No technical setup. Just connect, invite, and
            start converting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* connector line desktop */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-indigo-200 via-violet-200 to-emerald-200" />

          {steps.map(({ number, icon: Icon, title, desc, color, ring }) => (
            <div key={number} className="flex flex-col items-center text-center relative">
              <div className={`w-20 h-20 rounded-2xl ${color} ring-4 ${ring} flex flex-col items-center justify-center mb-5 shadow-lg relative z-10`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs font-bold text-zinc-300 mb-2 tracking-widest">{number}</span>
              <h3 className="font-bold text-zinc-900 text-lg mb-2">{title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
