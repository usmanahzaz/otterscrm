const logos = [
  "Acme Corp",
  "Nexus Digital",
  "BrightScale",
  "SwiftGrow",
  "PeakSales",
  "Orbit Media",
];

export default function SocialProof() {
  return (
    <section className="py-16 bg-[#f6f9fc] border-b border-[#e3e8ee]">
      <div className="max-w-6xl mx-auto px-6">
        <p
          className="text-center text-[11px] font-semibold uppercase tracking-[0.15em] mb-10"
          style={{ color: "#8898aa" }}
        >
          Trusted by sales teams worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
          {logos.map((name) => (
            <span
              key={name}
              className="text-[15px] font-semibold tracking-tight transition-colors cursor-default"
              style={{ color: "#c4cdd8" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
