import { Link } from "react-router-dom";
import { mockResults } from "../../utils/mockResults";

function ResultsDashboard() {
  const totalResults = mockResults.length;

  const averageScore =
    totalResults > 0
      ? Math.round(
          mockResults.reduce(
            (total, result) => total + result.percentage,
            0
          ) / totalResults
        )
      : 0;

  const highestScore =
    totalResults > 0
      ? Math.max(
          ...mockResults.map(
            (result) => result.percentage
          )
        )
      : 0;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-indigo-600">
          Results
        </p>

        <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
          Results Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          View candidate assessment results, performance,
          grades, and rankings.
        </p>
      </div>

      {/* Summary statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total results */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Results
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {totalResults}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Completed assessments
          </p>
        </div>

        {/* Average score */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Average Score
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {averageScore}%
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Across all candidates
          </p>
        </div>

        {/* Highest score */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Highest Score
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {highestScore}%
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Best candidate performance
          </p>
        </div>

        {/* Completed */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Completed
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {totalResults}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Results available
          </p>
        </div>
      </div>

      {/* Results section */}
      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Section header */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Candidate Results
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Assessment performance across candidates.
          </p>
        </div>

        {/* Empty state */}
        {mockResults.length === 0 ? (
          <div className="p-10 text-center">
            <h3 className="text-base font-semibold text-gray-900">
              No results available
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Completed candidate assessments will appear
              here.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Candidate
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Assessment
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Score
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Grade
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Completed
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {mockResults.map((result) => (
                    <tr
                      key={result.id}
                      className="transition hover:bg-gray-50"
                    >
                      {/* Candidate */}
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">
                          {result.candidateName}
                        </p>
                      </td>

                      {/* Assessment */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {result.assessmentTitle}
                      </td>

                      {/* Score */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">
                          {result.percentage}%
                        </span>
                      </td>

                      {/* Grade */}
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                          {result.grade}
                        </span>
                      </td>

                      {/* Completed */}
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(
                          result.completedAt
                        ).toLocaleDateString()}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4">
                        <Link
                          to={`/recruiter/results/candidates/${result.id}`}
                          className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
                        >
                          View Result
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="space-y-4 p-4 md:hidden">
              {mockResults.map((result) => (
                <div
                  key={result.id}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  {/* Candidate and grade */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900">
                        {result.candidateName}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {result.assessmentTitle}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {result.grade}
                    </span>
                  </div>

                  {/* Score and date */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">
                        Score
                      </p>

                      <p className="mt-1 font-semibold text-gray-900">
                        {result.percentage}%
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">
                        Completed
                      </p>

                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {new Date(
                          result.completedAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Action */}
                  <Link
                    to={`/recruiter/results/candidates/${result.id}`}
                    className="mt-4 block w-full rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    View Result
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default ResultsDashboard;