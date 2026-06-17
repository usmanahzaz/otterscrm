import { Orbit } from "lucide-react";

export default function Footer() {
  const cols = {
    Product: ["Features", "Pricing", "How It Works", "Login"],
    Legal: ["Privacy Policy", "Terms of Service"],
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
                <Orbit className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-semibold text-white">
                Lead<span className="text-indigo-400">Orbit</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
              The CRM for teams that run Meta Lead Ads. Capture, assign, and convert every lead.
            </p>
          </div>

          {Object.entries(cols).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                {group}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} LeadOrbit. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-zinc-600">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
