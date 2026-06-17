import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-24 bg-indigo-600">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
          Ready to convert more leads?
        </h2>
        <p className="text-indigo-200 text-lg max-w-xl mx-auto mb-10">
          Join thousands of sales teams using LeadOrbit to capture every Meta lead and follow up faster.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="lg"
            className="bg-white text-indigo-700 hover:bg-indigo-50 rounded-lg px-8 font-semibold"
          >
            Start for free
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-indigo-400 text-white hover:bg-indigo-500 rounded-lg px-8"
          >
            Book a demo
          </Button>
        </div>
        <p className="text-indigo-300 text-xs mt-6">
          No credit card · Free 14-day trial · Setup in 5 minutes
        </p>
      </div>
    </section>
  );
}
