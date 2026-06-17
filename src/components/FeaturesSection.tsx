import {
  Share2,
  MessageCircle,
  Users,
  Bell,
  BarChart3,
  RefreshCw,
} from "lucide-react";

const features = [
  {
    icon: Share2,
    title: "Meta Lead Ads sync",
    desc: "Every lead from your Meta campaigns lands in LeadOrbit automatically — no manual work.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp notifications",
    desc: "Your sales reps get a WhatsApp message the moment a new lead arrives. No app needed.",
  },
  {
    icon: Users,
    title: "Auto team assignment",
    desc: "Leads are routed to the right rep based on your rules. Round-robin, by location, or custom.",
  },
  {
    icon: Bell,
    title: "Follow-up reminders",
    desc: "Automated reminders so every prospect gets a timely follow-up. Nothing slips.",
  },
  {
    icon: BarChart3,
    title: "Team performance",
    desc: "See response times, conversion rates, and activity for each rep in real time.",
  },
  {
    icon: RefreshCw,
    title: "Full activity timeline",
    desc: "Every call, note, and status change logged on the lead. Full context, always.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="max-w-xl mb-14">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-4">
            Features
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
            Built for teams that run Meta ads.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-100 border border-zinc-100 rounded-2xl overflow-hidden">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white p-8 hover:bg-indigo-50/40 transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center mb-5 group-hover:bg-indigo-100 transition-colors">
                <Icon className="w-4 h-4 text-indigo-600" />
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
