import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  loadAssessments,
  loadAssessmentById,
} from "../../store/slices/assessmentSlice";

import Loading from "../../components/common/Loading";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";

const TrialAssessment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    items = [],
    active: assessment,
    status,
    error,
  } = useSelector((state) => state.assessment);

  const [agreed, setAgreed] = useState(false);

  /*
   * Load assessments available to the logged-in interviewee.
   */
  useEffect(() => {
    dispatch(loadAssessments());
  }, [dispatch]);

  /*
   * Select the trial assessment.
   *
   * If an assessment is explicitly named "trial" or "katas",
   * use that one.
   *
   * Otherwise, use the first assessment available to the
   * interviewee. This supports the current MVP where the
   * interviewee receives the assessment assigned to them.
   */
  useEffect(() => {
    if (!items.length || assessment) {
      return;
    }

    const trialAssessment =
      items.find(
        (item) =>
          item.title?.toLowerCase().includes("trial") ||
          item.title?.toLowerCase().includes("katas")
      ) || items[0];

    if (trialAssessment?.id) {
      dispatch(loadAssessmentById(trialAssessment.id));
    }
  }, [dispatch, items, assessment]);

  /*
   * Start the assessment.
   */
  const handleStartAssessment = () => {
    if (!agreed || !assessment?.id) {
      return;
    }

    navigate(
      `/interviewee/assessment/${assessment.id}/take`
    );
  };

  /*
   * Loading state.
   */
  if (status === "loading" && !assessment) {
    return <Loading />;
  }

  /*
   * API error state.
   */
  if (error) {
    return <ErrorMessage message={error} />;
  }

  /*
   * No assessment available.
   */
  if (!assessment) {
    return (
      <section className="mx-auto w-full max-w-4xl">
        <div className="rounded-xl border border-paper-line bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-extrabold text-ink">
            Trial Assessment
          </h1>

          <p className="mt-3 text-sm text-muted-2">
            No assessment is currently available.
          </p>

          <p className="mt-2 text-sm text-muted-2">
            Please check back later or continue to your dashboard.
          </p>

          <div className="mt-6">
            <Button
              variant="secondary"
              onClick={() =>
                navigate("/interviewee/dashboard")
              }
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const questions = assessment.questions || [];

  return (
    <section className="mx-auto w-full max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">
          Trial Assessment
        </h1>

        <p className="mt-2 text-sm text-muted-2">
          Practice the assessment experience before completing
          a real technical assessment.
        </p>
      </header>

      <article className="rounded-xl border border-paper-line bg-white p-6 shadow-sm">

        {/* Assessment information */}
        <div className="border-b border-paper-line pb-5">
          <h2 className="text-xl font-bold text-ink">
            {assessment.title}
          </h2>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-2">
            <span>
              {assessment.timeLimitMinutes || 0} minutes
            </span>

            <span>
              {questions.length} questions
            </span>

            <span>
              {questions.length} points
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-ink">
            Instructions
          </h3>

          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-muted-2">
            <li>
              You have{" "}
              <strong>
                {assessment.timeLimitMinutes || 0} minutes
              </strong>{" "}
              to complete the assessment.
            </li>

            <li>
              The timer starts when you begin the assessment.
            </li>

            <li>
              You cannot pause the timer once the assessment
              has started.
            </li>

            <li>
              Save your answers as you progress.
            </li>

            <li>
              Your answers are submitted when you finish.
            </li>

            <li>
              Make sure you have a stable internet connection.
            </li>
          </ul>
        </div>

        {/* Question types */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-ink">
            Question Types
          </h3>

          <ul className="mt-4 space-y-3 text-sm text-muted-2">
            <li>
              <strong>Multiple Choice:</strong>{" "}
              Select an answer.
            </li>

            <li>
              <strong>Free Text:</strong>{" "}
              Provide a written response.
            </li>

            <li>
              <strong>Coding Kata:</strong>{" "}
              Complete the coding challenge.
            </li>
          </ul>
        </div>

        {/* Agreement */}
        <div className="mt-6 rounded-lg bg-slate-50 p-4">
          <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) =>
                setAgreed(event.target.checked)
              }
              className="mt-1"
            />

            <span>
              I have read and understand the instructions.
            </span>
          </label>
        </div>

        {/* Start button */}
        <div className="mt-6 flex justify-end">
          <Button
            variant="primary"
            onClick={handleStartAssessment}
            disabled={!agreed || !assessment?.id}
            size="large"
          >
            Start Trial Assessment
          </Button>
        </div>
      </article>
    </section>
  );
};

export default TrialAssessment;
