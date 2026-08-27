import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadResult,
  releaseResult,
  saveFeedback,
} from "../../store/slices/resultSlice";

export default function ReviewFeedback() {
  const [searchParams] = useSearchParams();
  const resultId = searchParams.get("resultId");
  const dispatch = useDispatch();
  const { currentResult, loading, error } = useSelector(
    (state) => state.results,
  );
  const [feedback, setFeedback] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (resultId) dispatch(loadResult(resultId));
  }, [dispatch, resultId]);
  if (!resultId)
    return (
      <Message text="Select a result to review by opening this page with a resultId query parameter." />
    );
  if (loading) return <Message text="Loading result..." />;
  if (error) return <Message text={`Unable to load result: ${error}`} />;
  if (!currentResult) return <Message text="Result not found." />;

  async function handleSave() {
    await dispatch(saveFeedback({ resultId, feedbackText: feedback })).unwrap();
    setSaved(true);
  }
  async function handleRelease() {
    await dispatch(releaseResult(resultId)).unwrap();
  }

  return (
    <section className="mx-auto w-full max-w-4xl">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Result #{currentResult.id} review
        </h1>
        <p className="mt-2 text-sm text-muted-2">
          Review and release the backend result.
        </p>
      </header>
      <article className="rounded-xl border border-paper-line bg-white p-5 shadow-sm sm:p-6">
        <dl className="grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-muted-2">Score</dt>
            <dd className="font-semibold text-ink">{currentResult.score}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-2">Percentage</dt>
            <dd className="font-semibold text-ink">
              {currentResult.percentage}%
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-2">Status</dt>
            <dd className="font-semibold text-ink">{currentResult.status}</dd>
          </div>
        </dl>
        <textarea
          className="mt-6 min-h-32 w-full rounded-lg border border-paper-line bg-slate-50 px-3 py-3 text-sm text-ink outline-none focus:border-brand-teal"
          value={feedback}
          onChange={(event) => {
            setFeedback(event.target.value);
            setSaved(false);
          }}
          placeholder="Feedback text"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={!feedback.trim()}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-50"
          >
            {saved ? "Feedback saved" : "Save feedback"}
          </button>
          <button
            type="button"
            onClick={handleRelease}
            disabled={currentResult.status === "released"}
            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {currentResult.status === "released"
              ? "Grade released"
              : "Release grade"}
          </button>
        </div>
      </article>
    </section>
  );
}
+(+function Message({ text }) {
  return (
    <section className="mx-auto w-full max-w-4xl p-10 text-center text-sm text-muted-2">
      {text}
    </section>
  );
});
