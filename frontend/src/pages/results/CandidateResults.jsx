import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadResult,
  saveFeedback,
  releaseResult,
} from "../../store/slices/resultSlice";

export default function CandidateResults() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentResult, loading, error } = useSelector(
    (state) => state.results,
  );

  const [feedback, setFeedback] = useState("");
  const [savingFeedback, setSavingFeedback] = useState(false);
  const [releasing, setReleasing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(loadResult(id));
    }
  }, [dispatch, id]);

  const handleSaveFeedback = async () => {
    if (!feedback.trim()) {
      return;
    }

    try {
      setSavingFeedback(true);
      setMessage("");

      await dispatch(
        saveFeedback({
          resultId: id,
          feedbackText: feedback.trim(),
        }),
      ).unwrap();

      setFeedback("");
      setMessage("Feedback saved successfully.");

      // Reload the result so the new feedback appears immediately.
      dispatch(loadResult(id));
    } catch (err) {
      setMessage(
        typeof err === "string"
          ? err
          : "Unable to save feedback.",
      );
    } finally {
      setSavingFeedback(false);
    }
  };

  const handleReleaseGrade = async () => {
    if (!currentResult || currentResult.status === "released") {
      return;
    }

    try {
      setReleasing(true);
      setMessage("");

      await dispatch(releaseResult(id)).unwrap();

      setMessage("Grade released successfully.");

      // Reload the result to update the displayed status.
      dispatch(loadResult(id));
    } catch (err) {
      setMessage(
        typeof err === "string"
          ? err
          : "Unable to release the grade.",
      );
    } finally {
      setReleasing(false);
    }
  };

  if (loading && !currentResult) {
    return <Message text="Loading result..." />;
  }

  if (error) {
    return (
      <Message
        text={`Unable to load result: ${
          typeof error === "string"
            ? error
            : "Something went wrong."
        }`}
      />
    );
  }

  if (!currentResult) {
    return <Message text="Result not found." />;
  }

  const isReleased = currentResult.status === "released";

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8">
        <p className="text-sm font-medium text-brand-teal">
          Assessment Results
        </p>

        <h1 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">
          Result #{currentResult.id}
        </h1>

        <p className="mt-2 text-sm text-muted-2">
          Review the candidate's assessment performance, provide
          feedback, and release the grade.
        </p>
      </header>

      {/* Result summary */}
      <section className="rounded-2xl border border-paper-line bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-ink">
              Candidate Assessment
            </h2>

            <p className="mt-1 text-sm text-muted-2">
              Review the assessment result below.
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isReleased
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {isReleased ? "Released" : "Pending"}
          </span>
        </div>

        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Field
            label="Score"
            value={currentResult.score}
          />

          <Field
            label="Total points"
            value={currentResult.total_points}
          />

          <Field
            label="Percentage"
            value={`${currentResult.percentage}%`}
          />

          <Field
            label="Status"
            value={currentResult.status}
          />

          <Field
            label="Attempt"
            value={currentResult.attempt}
          />

          <Field
            label="Released"
            value={
              currentResult.released_at
                ? currentResult.released_at
                : "Not released"
            }
          />
        </dl>
      </section>

      {/* Feedback */}
      <section className="mt-6 rounded-2xl border border-paper-line bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-ink">
            Recruiter Feedback
          </h2>

          <p className="mt-1 text-sm text-muted-2">
            Provide constructive feedback about the candidate's
            assessment performance.
          </p>
        </div>

        <textarea
          value={feedback}
          onChange={(event) => {
            setFeedback(event.target.value);
            setMessage("");
          }}
          placeholder="Write your feedback here..."
          rows={6}
          className="mt-5 w-full rounded-xl border border-paper-line bg-slate-50 px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
        />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSaveFeedback}
            disabled={
              savingFeedback || !feedback.trim()
            }
            className="rounded-lg bg-brand-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {savingFeedback
              ? "Saving..."
              : "Save Feedback"}
          </button>

          {message && (
            <p className="text-sm font-medium text-emerald-600">
              {message}
            </p>
          )}
        </div>
      </section>

      {/* Existing feedback */}
      {currentResult.feedback?.length > 0 && (
        <section className="mt-6 rounded-2xl border border-paper-line bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-ink">
            Previous Feedback
          </h2>

          <div className="mt-4 space-y-4">
            {currentResult.feedback.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-slate-50 p-4"
              >
                <p className="text-sm leading-6 text-ink">
                  {item.feedback_text}
                </p>

                {item.created_at && (
                  <p className="mt-2 text-xs text-muted-2">
                    {new Date(
                      item.created_at,
                    ).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Release grade */}
      <section className="mt-6 rounded-2xl border border-paper-line bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-ink">
            Release Grade
          </h2>

          <p className="mt-1 text-sm text-muted-2">
            Release the candidate's grade after reviewing the
            assessment and feedback.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={handleReleaseGrade}
            disabled={releasing || isReleased}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {releasing
              ? "Releasing..."
              : isReleased
                ? "Grade Released"
                : "Release Grade"}
          </button>

          {isReleased && (
            <p className="text-sm font-medium text-emerald-600">
              This candidate's grade has been released.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <dt className="text-sm text-muted-2">
        {label}
      </dt>

      <dd className="mt-1 font-semibold text-ink">
        {value ?? "Unavailable"}
      </dd>
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
