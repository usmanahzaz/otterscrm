const logos = ["Acme Corp", "Nexus Digital", "BrightScale", "SwiftGrow", "PeakSales", "Orbit Media"];

export default function SocialProof() {
  return (
    <section className="py-14 border-y border-zinc-100">
      <div className="max-w-6xl mx-auto px-5">
        <p className="text-center text-xs font-medium text-zinc-400 uppercase tracking-widest mb-8">
          Trusted by sales teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
          {logos.map((name) => (
            <span
              key={name}
              className="text-zinc-300 font-semibold text-base tracking-tight hover:text-zinc-400 transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
