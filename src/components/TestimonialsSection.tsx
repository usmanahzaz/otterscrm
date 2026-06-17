import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Response time dropped from 4 hours to 4 minutes. Our close rate doubled.",
    name: "Daniel C.",
    role: "Sales Director, Nexus Digital",
    avatar: "DC",
  },
  {
    quote: "WhatsApp alerts changed everything. Our reps actually respond now.",
    name: "Aisha T.",
    role: "Head of Marketing, BrightScale",
    avatar: "AT",
  },
  {
    quote: "We stopped losing Meta leads. Setup took 10 minutes.",
    name: "Ravi S.",
    role: "Founder, SwiftGrow",
    avatar: "RS",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-6xl mx-auto px-5">
        <div className="max-w-xl mb-14">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
            Teams that love it.
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-zinc-200 rounded-xl p-7 flex flex-col gap-5"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900">{t.name}</p>
                  <p className="text-xs text-zinc-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
