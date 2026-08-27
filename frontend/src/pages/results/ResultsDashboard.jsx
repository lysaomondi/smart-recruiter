import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadResults } from "../../store/slices/resultSlice";

export default function ResultsDashboard() {
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector((state) => state.results);

  useEffect(() => {
    dispatch(loadResults());
  }, [dispatch]);

  if (loading) return <Message text="Loading results..." />;
  if (error) return <Message text={`Unable to load results: ${error}`} />;

  const average = results.length
    ? Math.round(
        results.reduce((sum, item) => sum + Number(item.percentage || 0), 0) /
          results.length,
      )
    : 0;
  const highest = results.length
    ? Math.max(...results.map((item) => Number(item.percentage || 0)))
    : 0;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="text-sm font-medium text-indigo-600">Results</p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
          Results Dashboard
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Results returned by the backend.
        </p>
      </header>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Summary label="Total results" value={results.length} />
        <Summary label="Average score" value={`${average}%`} />
        <Summary label="Highest score" value={`${highest}%`} />
      </div>
      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Candidate Results
          </h2>
        </div>
        {results.length === 0 ? (
          <Message text="No results available." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                    Result
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                    Score
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {results.map((result) => (
                  <tr key={result.id}>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Result #{result.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {result.percentage}%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {result.status}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        className="text-sm font-medium text-indigo-600"
                        to={`/recruiter/results/candidates/${result.id}`}
                      >
                        View result
                      </Link>
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
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
function Message({ text }) {
  return (
    <div className="mx-auto w-full max-w-7xl p-10 text-center text-sm text-gray-500">
      {text}
    </div>
  );
}
