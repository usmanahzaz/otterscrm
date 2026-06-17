import {
  Share2,
  MessageCircle,
  Users,
  Bell,
  BarChart3,
  Activity,
} from "lucide-react";

const features = [
  {
    icon: Share2,
    title: "Meta Lead Ads sync",
    desc: "Every lead from your Meta campaigns arrives in LeadOrbit instantly. Zero manual work.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp notifications",
    desc: "Reps get a WhatsApp message the moment a lead arrives. No app needed, just their phone.",
  },
  {
    icon: Users,
    title: "Auto team assignment",
    desc: "Leads route to the right rep automatically — round-robin, by area, or custom rules.",
  },
  {
    icon: Bell,
    title: "Follow-up reminders",
    desc: "Automated reminders ensure every lead gets a timely follow-up. Nothing ever slips.",
  },
  {
    icon: BarChart3,
    title: "Team performance",
    desc: "Track response times and conversion rates per rep. Coach with real data, not guesses.",
  },
  {
    icon: Activity,
    title: "Activity timeline",
    desc: "Every call, note, and status change logged per lead. Full context, at a glance.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24" style={{ background: "#f6f9fc" }}>
      <div className="max-w-6xl mx-auto px-6">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
          style={{ color: "#635bff" }}
        >
          Features
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-end mb-14">
          <h2
            className="text-4xl sm:text-5xl font-bold leading-tight"
            style={{ color: "#0a2540", letterSpacing: "-0.03em" }}
          >
            Built for teams
            <br />
            that run Meta ads.
          </h2>
          <p className="text-[17px] leading-relaxed" style={{ color: "#425466" }}>
            Everything your sales team needs — from the moment a lead clicks your
            ad to the moment the deal is closed.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e3e8ee] border border-[#e3e8ee] rounded-2xl overflow-hidden">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="bg-white p-8 group hover:bg-[#f6f9fc] transition-colors"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-6"
                style={{ background: "rgba(99,91,255,0.08)" }}
              >
                <Icon className="w-5 h-5" style={{ color: "#635bff" }} />
              </div>
              <h3
                className="text-[15px] font-semibold mb-2"
                style={{ color: "#0a2540", letterSpacing: "-0.01em" }}
              >
                {title}
              </h3>
              <p className="text-[14px] leading-relaxed" style={{ color: "#8898aa" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
