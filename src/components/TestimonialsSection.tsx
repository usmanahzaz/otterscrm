import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "We reduced our lead response time from hours to minutes. Our sales team now gets WhatsApp alerts the moment a lead comes in.",
    name: "Daniel Carvalho",
    role: "Sales Director",
    company: "Nexus Digital",
    avatar: "DC",
    color: "bg-indigo-100 text-indigo-700",
    stars: 5,
  },
  {
    quote:
      "LeadOrbit helped our team stay accountable. Managers can now see exactly what every rep is doing with each lead.",
    name: "Aisha Thompson",
    role: "Head of Marketing",
    company: "BrightScale",
    avatar: "AT",
    color: "bg-violet-100 text-violet-700",
    stars: 5,
  },
  {
    quote:
      "Our Facebook campaigns finally became profitable because no lead was missed. Setup took less than 10 minutes.",
    name: "Ravi Sharma",
    role: "Founder & CEO",
    company: "SwiftGrow",
    avatar: "RS",
    color: "bg-emerald-100 text-emerald-700",
    stars: 5,
  },
  {
    quote:
      "The follow-up reminders alone changed our business. We went from 30% follow-up rate to over 90% in two weeks.",
    name: "Sophie Laurent",
    role: "VP of Sales",
    company: "Orbit Media",
    avatar: "SL",
    color: "bg-orange-100 text-orange-700",
    stars: 5,
  },
  {
    quote:
      "Simple, clean, and exactly what a small business needs. We don't need a complex CRM — we need LeadOrbit.",
    name: "Marco Bianchi",
    role: "Business Owner",
    company: "PeakSales",
    avatar: "MB",
    color: "bg-rose-100 text-rose-700",
    stars: 5,
  },
  {
    quote:
      "The reporting dashboard gives us clarity on which Facebook campaigns actually generate revenue. Game changer.",
    name: "Fatima Al-Hassan",
    role: "Digital Marketer",
    company: "Acme Corp",
    avatar: "FA",
    color: "bg-teal-100 text-teal-700",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight">
            Teams That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Love LeadOrbit.
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border border-zinc-200 p-7 hover:shadow-lg hover:border-indigo-100 transition-all duration-300 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="text-zinc-700 leading-relaxed text-[15px] mb-6 flex-1">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 text-sm">{t.name}</p>
                  <p className="text-xs text-zinc-500">
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
