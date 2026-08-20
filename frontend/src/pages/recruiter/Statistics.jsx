const distribution = [
  { label: "0-2", height: "20%", color: "bg-slate-300" },
  { label: "2-4", height: "35%", color: "bg-slate-300" },
  { label: "4-6", height: "52%", color: "bg-orange-400" },
  { label: "6-8", height: "76%", color: "bg-emerald-500" },
  { label: "8-10", height: "93%", color: "bg-emerald-500" },
];

const accuracy = [
  ["Q1 · Hash table lookup", "92%", "text-emerald-600"],
  ["Q2 · REST vs RPC", "64%", "text-orange-500"],
  ["Q3 · Binary search Big-O", "88%", "text-emerald-600"],
  ["Q4 · Reverse linked list", "41%", "text-orange-700"],
];

export default function Statistics() {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Statistics — Backend Engineer, Katas Round
        </h1>
        <p className="mt-2 text-sm text-muted-2">Auto-generated from all submitted attempts.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-xl border border-paper-line bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-ink">Score distribution</h2>
          <div className="mt-8 flex h-64 items-end justify-between gap-3 border-b border-paper-line px-2 sm:gap-5">
            {distribution.map((bar) => (
              <div key={bar.label} className="flex h-full flex-1 flex-col justify-end">
                <div className={`min-h-3 rounded-t-md ${bar.color}`} style={{ height: bar.height }} />
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between gap-3 px-2 text-center text-xs font-medium text-muted-2 sm:gap-5">
            {distribution.map((bar) => <span key={bar.label} className="flex-1">{bar.label}</span>)}
          </div>
        </article>

        <article className="rounded-xl border border-paper-line bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-ink">Per-question accuracy</h2>
          <div className="mt-4">
            {accuracy.map(([question, score, color]) => (
              <div key={question} className="flex items-center justify-between border-b border-paper-line py-4 last:border-b-0">
                <span className="text-sm font-medium text-ink">{question}</span>
                <span className={`text-sm font-extrabold ${color}`}>{score}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
