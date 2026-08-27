import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadResult } from "../../store/slices/resultSlice";

export default function CandidateResults() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentResult, loading, error } = useSelector(
    (state) => state.results,
  );
  useEffect(() => {
    dispatch(loadResult(id));
  }, [dispatch, id]);

  if (loading) return <Message text="Loading result..." />;
  if (error) return <Message text={`Unable to load result: ${error}`} />;
  if (!currentResult) return <Message text="Result not found." />;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="text-sm font-medium text-indigo-600">
          Assessment Results
        </p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
          Result #{currentResult.id}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Data returned by the backend.
        </p>
      </header>
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <dl className="grid gap-6 sm:grid-cols-3">
          <Field label="Score" value={currentResult.score} />
          <Field label="Total points" value={currentResult.total_points} />
          <Field label="Percentage" value={`${currentResult.percentage}%`} />
          <Field label="Status" value={currentResult.status} />
          <Field label="Attempt" value={currentResult.attempt} />
          <Field
            label="Released"
            value={currentResult.released_at || "Not released"}
          />
        </dl>
      </section>
      {currentResult.feedback?.length > 0 && (
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Feedback</h2>
          {currentResult.feedback.map((item) => (
            <p className="mt-3 text-sm leading-6 text-gray-600" key={item.id}>
              {item.feedback_text}
            </p>
          ))}
        </section>
      )}
    </main>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="mt-1 font-semibold text-gray-900">
        {value ?? "Unavailable"}
      </dd>
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
