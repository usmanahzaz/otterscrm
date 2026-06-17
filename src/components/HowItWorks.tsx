const steps = [
  {
    n: "01",
    title: "Connect your Meta pages",
    desc: "Link your Meta Business pages in seconds. Leads start flowing in immediately.",
  },
  {
    n: "02",
    title: "Invite your sales team",
    desc: "Add reps, set roles, and configure assignment rules. Done in under 5 minutes.",
  },
  {
    n: "03",
    title: "Alerts go out on WhatsApp",
    desc: "Every rep gets a WhatsApp notification the moment a lead is assigned to them.",
  },
  {
    n: "04",
    title: "Follow up and close",
    desc: "Automatic reminders, full lead history, and performance reports keep your team sharp.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
          style={{ color: "#635bff" }}
        >
          How it works
        </p>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <h2
            className="text-4xl sm:text-5xl font-bold leading-tight"
            style={{ color: "#0a2540", letterSpacing: "-0.03em" }}
          >
            Up and running
            <br />
            in minutes.
          </h2>

          <div className="space-y-8">
            {steps.map(({ n, title, desc }, i) => (
              <div key={n} className="flex gap-6 items-start">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold"
                    style={{ background: "rgba(99,91,255,0.1)", color: "#635bff" }}
                  >
                    {n}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px h-8 mt-2" style={{ background: "#e3e8ee" }} />
                  )}
                </div>
                <div className="pt-1.5">
                  <p
                    className="text-[15px] font-semibold mb-1"
                    style={{ color: "#0a2540", letterSpacing: "-0.01em" }}
                  >
                    {title}
                  </p>
                  <p className="text-[14px] leading-relaxed" style={{ color: "#8898aa" }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
