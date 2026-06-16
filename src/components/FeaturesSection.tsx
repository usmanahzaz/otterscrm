import {
  Share2,
  Users,
  MessageCircle,
  Mail,
  FolderKanban,
  Bell,
  Activity,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Share2,
    title: "Facebook Lead Ads Integration",
    desc: "Automatically import every lead from your Facebook campaigns the moment they're submitted.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: Users,
    title: "Team Assignment",
    desc: "Distribute leads to your sales reps automatically based on custom rules, round-robin, or location.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Alerts",
    desc: "Notify your sales team the instant a new lead arrives so they can respond in minutes, not hours.",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: Mail,
    title: "Email Notifications",
    desc: "Keep everyone in the loop with automated email alerts for new leads, assignments, and updates.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    icon: FolderKanban,
    title: "Projects & Teams",
    desc: "Organize leads by campaign, product, or region. Create unlimited projects with dedicated teams.",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    icon: Bell,
    title: "Follow-Up Reminders",
    desc: "Never let a lead go cold. Set automated follow-up reminders so no opportunity gets missed.",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  {
    icon: Activity,
    title: "Activity Timeline",
    desc: "Track every call, note, message, and interaction in a clear chronological timeline per lead.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
  {
    icon: BarChart3,
    title: "Reports & Insights",
    desc: "Measure team performance, conversion rates, and campaign ROI with beautiful real-time reports.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight">
            Everything Your Sales Team{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Actually Needs.
            </span>
          </h2>
          <p className="mt-4 text-lg text-zinc-500 max-w-2xl mx-auto">
            Powerful enough for growing businesses, simple enough for teams to
            actually use every day.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, desc, color, bg, border }) => (
            <div
              key={title}
              className={`group rounded-2xl border ${border} p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white relative overflow-hidden`}
            >
              <div className={`absolute inset-0 ${bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
              <div className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2 text-[15px] leading-snug">{title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
