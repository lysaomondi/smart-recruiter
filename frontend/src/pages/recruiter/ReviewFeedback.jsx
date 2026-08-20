const code = `def reverse_list(head):
    previous = None
    current = head

    while current:
        nxt = current.next
        current.next = previous
        previous = current
        current = nxt

    return previous`;

export default function ReviewFeedback() {
  return (
    <section className="mx-auto w-full max-w-4xl">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Amara Kimani — answer review</h1>
        <p className="mt-2 text-sm text-muted-2">Leave feedback under each answer, then release the grade.</p>
      </header>

      <article className="rounded-xl border border-paper-line bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-bold text-ink">Q4 — Kata: Reverse a linked list</h2>
        <pre className="mt-5 overflow-x-auto rounded-lg bg-slate-100 p-4 font-mono text-sm leading-6 text-slate-800">{code}</pre>
        <div className="mt-5 border-l-4 border-brand-crimson bg-orange-50 px-4 py-3">
          <p className="text-[10px] font-extrabold tracking-[0.12em] text-crimson-dim">FEEDBACK FROM YOU</p>
          <p className="mt-1 text-sm leading-6 text-slate-700">
            Clean iterative solution, correct edge-case handling on empty list. Consider naming <code>nxt</code> more descriptively.
          </p>
        </div>
      </article>

      <article className="mt-6 rounded-xl border border-paper-line bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-bold text-ink">Add feedback for this answer</h2>
        <textarea
          className="mt-4 min-h-32 w-full rounded-lg border border-paper-line bg-slate-50 px-3 py-3 text-sm leading-6 text-ink outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
          defaultValue="Nice use of BDD in the pseudocode step before coding — matches the whiteboard flow well."
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Save feedback</button>
          <button type="button" className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700">Release grade →</button>
        </div>
      </article>
    </section>
  );
}
