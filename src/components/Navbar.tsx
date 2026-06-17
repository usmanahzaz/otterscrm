"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Orbit } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-white/90 backdrop-blur border-b border-zinc-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Orbit className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-zinc-900 tracking-tight">
            Lead<span className="text-indigo-600">Orbit</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {["Features", "How It Works", "Pricing"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(" ", "-")}`}
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900">
            Log in
          </a>
          <Button
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm"
          >
            Start free
          </Button>
        </div>

        <button
          className="md:hidden text-zinc-600"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-zinc-100 px-5 py-4 flex flex-col gap-4">
          {["Features", "How It Works", "Pricing"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(" ", "-")}`}
              className="text-sm text-zinc-700"
              onClick={() => setOpen(false)}
            >
              {l}
            </a>
          ))}
          <div className="flex gap-3 pt-1">
            <a href="#" className="text-sm text-zinc-500">Log in</a>
            <Button size="sm" className="bg-indigo-600 text-white rounded-lg">
              Start free
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
