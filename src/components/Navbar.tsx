"use client";

import { useState, useEffect } from "react";
import { Menu, X, Orbit } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Features", "How It Works", "Pricing"];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a2540]/95 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-[#635bff] flex items-center justify-center">
            <Orbit className="w-4 h-4 text-white" />
          </div>
          <span
            className="font-semibold text-[15px] tracking-tight text-white"
            style={{ letterSpacing: "-0.01em" }}
          >
            LeadOrbit
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-[14px] font-medium text-white/70 hover:text-white transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="#"
            className="text-[14px] font-medium text-white/70 hover:text-white transition-colors"
          >
            Sign in
          </a>
          <a
            href="#"
            className="text-[14px] font-semibold text-white bg-[#635bff] hover:bg-[#5851ea] px-4 py-2 rounded-md transition-colors"
          >
            Start now →
          </a>
        </div>

        <button
          className="md:hidden text-white/80 hover:text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0a2540] border-t border-white/10 px-6 py-5 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-white/70"
              onClick={() => setOpen(false)}
            >
              {l}
            </a>
          ))}
          <div className="flex gap-4 pt-2">
            <a href="#" className="text-sm text-white/60">Sign in</a>
            <a href="#" className="text-sm font-semibold text-white bg-[#635bff] px-4 py-1.5 rounded-md">
              Start now →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
