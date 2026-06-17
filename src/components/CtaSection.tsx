export default function CtaSection() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "#0a2540" }}
    >
      {/* Aurora */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 120%, rgba(99,91,255,0.4) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-6"
          style={{ color: "#635bff" }}
        >
          Get started
        </p>
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
          style={{ letterSpacing: "-0.035em" }}
        >
          Ready to convert
          <br />
          more leads?
        </h2>
        <p
          className="text-[17px] leading-relaxed max-w-xl mx-auto mb-10"
          style={{ color: "#8898aa" }}
        >
          Join thousands of sales teams using LeadOrbit to follow up
          faster and close more deals from Meta ads.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-md text-[14px] font-semibold text-white transition-all"
            style={{
              background: "#635bff",
              boxShadow: "0 4px 20px rgba(99,91,255,0.5)",
            }}
          >
            Start for free →
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-md text-[14px] font-medium border border-white/20 text-white/70 hover:text-white hover:bg-white/5 transition-all"
          >
            Book a demo
          </a>
        </div>

        <p
          className="text-[12px] mt-6"
          style={{ color: "#6b7c93" }}
        >
          No credit card · Free 14-day trial · Setup in 5 minutes
        </p>
      </div>
    </section>
  );
}
