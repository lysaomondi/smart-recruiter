import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMyResults } from "../../store/slices/resultSlice";

export default function MyResults() {
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector((state) => state.results);
  useEffect(() => {
    dispatch(loadMyResults());
  }, [dispatch]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="text-sm font-medium text-indigo-600">My Results</p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
          Released results
        </h1>
      </header>
      {loading && <Message text="Loading results..." />}
      {error && <Message text={`Unable to load results: ${error}`} />}
      {!loading && !error && results.length === 0 && (
        <Message text="No released results are available." />
      )}
      {!loading && !error && results.length > 0 && (
        <div className="space-y-4">
          {results.map((result) => (
            <article
              key={result.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-semibold text-gray-900">
                  Result #{result.id}
                </h2>
                <span className="text-lg font-bold text-indigo-600">
                  {result.percentage}%
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Score {result.score} of {result.total_points} · {result.status}
              </p>
              {result.feedback?.map((item) => (
                <p className="mt-3 text-sm text-gray-600" key={item.id}>
                  {item.feedback_text}
                </p>
              ))}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

function Message({ text }) {
  return <p className="text-center text-sm text-gray-500">{text}</p>;
}
