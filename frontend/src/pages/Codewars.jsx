import { useState } from "react";
import { searchKata } from "../api/codewars";

export default function Codewars() {
  const [query, setQuery] = useState("");
  const [kata, setKata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      setKata((await searchKata(query.trim())).kata);
    } catch (requestError) {
      setKata(null);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="text-sm font-medium text-indigo-600">Codewars</p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
          Kata lookup
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Search kata metadata through the authenticated backend integration.
        </p>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Kata ID or slug"
          className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
        />
        <button
          disabled={loading}
          className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Searching..." : "Search kata"}
        </button>
      </form>
      {error && (
        <p className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}
      {kata && (
        <article className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">{kata.name}</h2>
          <p className="mt-2 text-sm text-gray-500">
            {kata.rank_name || "Rank unavailable"} ·{" "}
            {kata.category || "Category unavailable"}
          </p>
          <p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-gray-700">
            {kata.description || "No description returned."}
          </p>
        </article>
      )}
      {!kata && !loading && !error && (
        <p className="mt-8 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-sm text-gray-500">
          Search for a kata to view backend-cached metadata.
        </p>
      )}
    </main>
  );
}
