const problems = [
  {
    n: "01",
    title: "Leads sit unnoticed for hours.",
    desc: "Meta sends you the lead but nobody sees it until it's too late.",
  },
  {
    n: "02",
    title: "Reps don't get notified in time.",
    desc: "Without instant alerts, the first call never happens. Leads go cold.",
  },
  {
    n: "03",
    title: "No visibility for managers.",
    desc: "Nobody knows who followed up, when, or with what result.",
  },
  {
    n: "04",
    title: "Revenue slips away silently.",
    desc: "Every missed lead is real money your competitor is closing instead.",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
          style={{ color: "#635bff" }}
        >
          The problem
        </p>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — headline */}
          <div>
            <h2
              className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
              style={{ color: "#0a2540", letterSpacing: "-0.03em" }}
            >
              Your Meta leads are
              <br />
              falling through
              <br />
              the cracks.
            </h2>
            <p className="text-[17px] leading-relaxed" style={{ color: "#425466" }}>
              Running ads without a follow-up system means you're paying for
              leads that never convert. Here's why.
            </p>
          </div>

          {/* Right — problems */}
          <div className="grid grid-cols-1 gap-5">
            {problems.map(({ n, title, desc }) => (
              <div
                key={n}
                className="flex gap-5 p-5 rounded-xl border border-[#e3e8ee] hover:border-[#635bff]/30 hover:shadow-sm transition-all"
              >
                <span
                  className="text-[13px] font-bold tabular-nums mt-0.5 flex-shrink-0 w-6"
                  style={{ color: "#c4cdd8" }}
                >
                  {n}
                </span>
                <div>
                  <p className="text-[14px] font-semibold mb-1" style={{ color: "#0a2540" }}>
                    {title}
                  </p>
                  <p className="text-[13px] leading-relaxed" style={{ color: "#8898aa" }}>
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
