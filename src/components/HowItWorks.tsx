const steps = [
  {
    n: "01",
    title: "Connect Meta pages",
    desc: "Link your Meta Business pages. Leads start syncing instantly.",
  },
  {
    n: "02",
    title: "Invite your team",
    desc: "Add reps, set assignment rules, done in under 5 minutes.",
  },
  {
    n: "03",
    title: "Get WhatsApp alerts",
    desc: "Every rep is notified on WhatsApp the moment a lead comes in.",
  },
  {
    n: "04",
    title: "Close more deals",
    desc: "Track every lead, follow-up automatically, watch conversions rise.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-zinc-50">
      <div className="max-w-6xl mx-auto px-5">
        <div className="max-w-xl mb-14">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-4">
            How it works
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
            Up and running in minutes.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ n, title, desc }) => (
            <div key={n}>
              <p className="text-3xl font-bold text-zinc-100 mb-4 tabular-nums">{n}</p>
              <h3 className="font-semibold text-zinc-900 mb-2">{title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
