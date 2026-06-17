const problems = [
  { emoji: "⏳", text: "Leads sit for hours before anyone sees them." },
  { emoji: "🔕", text: "Sales reps aren't notified in time." },
  { emoji: "😶", text: "Managers can't see what the team is doing." },
  { emoji: "💸", text: "Revenue walks out the door, silently." },
];

export default function ProblemSection() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-5">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">
            The problem
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            Your Meta leads are falling through the cracks.
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Running ads without a proper follow-up system means you're paying for leads that never convert.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {problems.map(({ emoji, text }) => (
            <div key={text} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <span className="text-2xl mb-4 block">{emoji}</span>
              <p className="text-sm text-zinc-300 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
