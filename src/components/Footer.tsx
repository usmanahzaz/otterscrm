import { Orbit } from "lucide-react";

export default function Footer() {
  const cols: Record<string, string[]> = {
    Product: ["Features", "Pricing", "How It Works", "Sign in"],
    Company: ["About", "Blog", "Careers"],
    Legal: ["Privacy", "Terms", "Cookies"],
  };

  return (
    <footer style={{ background: "#0a2540", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-[#635bff] flex items-center justify-center">
                <Orbit className="w-3.5 h-3.5 text-white" />
              </div>
              <span
                className="font-semibold text-[15px] text-white"
                style={{ letterSpacing: "-0.01em" }}
              >
                LeadOrbit
              </span>
            </div>
            <p
              className="text-[13px] leading-relaxed max-w-[220px]"
              style={{ color: "#6b7c93" }}
            >
              The CRM for sales teams that run Meta Lead Ads. Capture, assign, and convert every lead.
            </p>
          </div>

          {Object.entries(cols).map(([group, items]) => (
            <div key={group}>
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-5"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {group}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[13px] transition-colors"
                      style={{ color: "#6b7c93" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-[12px]" style={{ color: "#425466" }}>
            © {new Date().getFullYear()} LeadOrbit, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[12px]" style={{ color: "#425466" }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
