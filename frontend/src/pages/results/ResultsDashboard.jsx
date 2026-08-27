import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadResults } from "../../store/slices/resultSlice";

export default function ResultsDashboard() {
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector(
    (state) => state.results,
  );

  useEffect(() => {
    dispatch(loadResults());
  }, [dispatch]);

  if (loading) {
    return <Message text="Loading results..." />;
  }

  if (error) {
    return (
      <Message
        text={`Unable to load results: ${error}`}
      />
    );
  }

  const average = results.length
    ? Math.round(
        results.reduce(
          (sum, item) =>
            sum + Number(item.percentage || 0),
          0,
        ) / results.length,
      )
    : 0;

  const highest = results.length
    ? Math.max(
        ...results.map((item) =>
          Number(item.percentage || 0),
        ),
      )
    : 0;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8">
        <p className="text-sm font-medium text-brand-teal">
          Results
        </p>

        <h1 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">
          Results Dashboard
        </h1>

        <p className="mt-2 text-sm text-muted-2">
          Review candidate assessment performance, scores,
          feedback, and grades.
        </p>
      </header>

      {/* Summary */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Summary
          label="Total results"
          value={results.length}
        />

        <Summary
          label="Average score"
          value={`${average}%`}
        />

        <Summary
          label="Highest score"
          value={`${highest}%`}
        />
      </div>

      {/* Results table */}
      <section className="rounded-2xl border border-paper-line bg-white shadow-sm">
        <div className="border-b border-paper-line p-6">
          <h2 className="text-lg font-semibold text-ink">
            Candidate Results
          </h2>

          <p className="mt-1 text-sm text-muted-2">
            Select a candidate to view their assessment
            result or provide feedback.
          </p>
        </div>

        {results.length === 0 ? (
          <Message text="No results available." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-paper-line bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-2">
                    Result
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-2">
                    Score
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-2">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-2">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-paper-line">
                {results.map((result) => (
                  <tr
                    key={result.id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* Result */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-ink">
                        {result.candidate_name}
                      </p>

                      <p className="mt-1 text-xs text-muted-2">
                        Attempt #{result.attempt}
                      </p>
                    </td>

                    {/* Score */}
                    <td className="px-6 py-4">
                      <span className="font-semibold text-ink">
                        {result.percentage}%
                      </span>

                      <p className="mt-1 text-xs text-muted-2">
                        {result.score} /{" "}
                        {result.total_points}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          result.status === "released"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {result.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-3">
                        <Link
                          className="rounded-lg border border-paper-line bg-white px-3 py-2 text-sm font-medium text-ink transition hover:bg-slate-50"
                          to={`/recruiter/results/candidates/${result.id}`}
                        >
                          View result
                        </Link>

                        <Link
                          className="rounded-lg bg-brand-teal px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                          to={`/recruiter/review-feedback?resultId=${result.id}`}
                        >
                          Review & feedback
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function Summary({ label, value }) {
  return (
    <div className="rounded-xl border border-paper-line bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-muted-2">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-ink">
        {value}
      </p>
    </div>
  );
}

function Message({ text }) {
  return (
    <div className="mx-auto w-full max-w-7xl p-10 text-center text-sm text-muted-2">
      {text}
    </div>
  );
}
