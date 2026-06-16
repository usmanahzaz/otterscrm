import { AlertCircle, Clock, EyeOff, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Facebook leads sit unnoticed.",
    desc: "Leads from your ad campaigns wait hours before anyone sees them, giving competitors the advantage.",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    icon: AlertCircle,
    title: "Sales teams forget follow-ups.",
    desc: "Without reminders, valuable prospects slip through the cracks and deals are lost.",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  {
    icon: EyeOff,
    title: "Managers have no visibility.",
    desc: "No clear view of team activity means no way to coach, correct, or improve performance.",
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    icon: TrendingDown,
    title: "Revenue opportunities get lost.",
    desc: "Every missed lead and forgotten follow-up is money walking out the door, permanently.",
    color: "text-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            The Problem
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight">
            Your Leads Are Falling{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Through the Cracks.
            </span>
          </h2>
          <p className="mt-4 text-lg text-zinc-500 max-w-2xl mx-auto">
            Without the right system, even the best Facebook ad campaigns fail to
            deliver results. Here's what's going wrong.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map(({ icon: Icon, title, desc, color, bg, border }) => (
            <div
              key={title}
              className={`group relative rounded-2xl border ${border} ${bg} p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center mb-4 shadow-sm`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2 text-[15px]">{title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
