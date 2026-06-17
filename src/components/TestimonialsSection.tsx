import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Response time dropped from 4 hours to 4 minutes. Our close rate doubled within the first month.",
    name: "Daniel C.",
    role: "Sales Director",
    company: "Nexus Digital",
    avatar: "DC",
  },
  {
    quote:
      "WhatsApp alerts changed everything. Our reps actually respond now — sometimes before I even refresh.",
    name: "Aisha T.",
    role: "Head of Marketing",
    company: "BrightScale",
    avatar: "AT",
  },
  {
    quote:
      "We stopped losing Meta leads. Setup took 10 minutes and we've been on it ever since.",
    name: "Ravi S.",
    role: "Founder",
    company: "SwiftGrow",
    avatar: "RS",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
          style={{ color: "#635bff" }}
        >
          Testimonials
        </p>

        <h2
          className="text-4xl sm:text-5xl font-bold mb-14 leading-tight"
          style={{ color: "#0a2540", letterSpacing: "-0.03em" }}
        >
          Teams that love it.
        </h2>

        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-[#e3e8ee] p-8 flex flex-col gap-6 hover:border-[#635bff]/30 hover:shadow-sm transition-all"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#f6a723] text-[#f6a723]" />
                ))}
              </div>
              <p
                className="text-[15px] leading-relaxed flex-1"
                style={{ color: "#425466" }}
              >
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#f6f9fc]">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                  style={{ background: "rgba(99,91,255,0.1)", color: "#635bff" }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p
                    className="text-[13px] font-semibold"
                    style={{ color: "#0a2540" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-[12px]" style={{ color: "#8898aa" }}>
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
