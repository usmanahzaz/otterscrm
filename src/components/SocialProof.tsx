export default function SocialProof() {
  const stats = [
    { value: "10x", label: "Faster Lead Response" },
    { value: "50%", label: "More Follow-Ups Completed" },
    { value: "25k+", label: "Leads Managed" },
    { value: "98%", label: "Customer Satisfaction" },
  ];

  const logos = [
    "Acme Corp",
    "Nexus Digital",
    "BrightScale",
    "Orbit Media",
    "SwiftGrow",
    "PeakSales",
  ];

  return (
    <section className="py-16 bg-white border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl lg:text-5xl font-bold bg-gradient-to-br from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-1">
                {s.value}
              </p>
              <p className="text-sm text-zinc-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Logos */}
        <p className="text-center text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-8">
          Trusted by teams at
        </p>
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {logos.map((name) => (
            <div
              key={name}
              className="text-zinc-300 font-bold text-lg lg:text-xl tracking-tight hover:text-zinc-400 transition-colors cursor-default"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
