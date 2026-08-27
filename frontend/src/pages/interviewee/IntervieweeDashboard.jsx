import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loadAssessments } from "../../store/slices/assessmentSlice";

import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";
import Button from "../../components/common/Button";

const IntervieweeDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items: assessments,
    status,
    error,
  } = useSelector((state) => state.assessment);

  useEffect(() => {
    dispatch(loadAssessments());
  }, [dispatch]);

  const handleTakeAssessment = (assessmentId) => {
    if (!assessmentId) {
      console.error("Cannot open assessment: missing assessment ID");
      return;
    }

    navigate(
      `/interviewee/assessment/${assessmentId}/instructions`
    );
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="mx-auto w-full max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          My assessments
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Invitations, upcoming assessments, and available
          assessments from your recruiters.
        </p>
      </header>

      {assessments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <h2 className="text-lg font-semibold text-slate-700">
            No assessments available
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            You currently have no assessments available to take.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {assessments.map((assessment) => (
            <div
              key={assessment.id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4">
                <h2 className="text-lg font-bold text-slate-900">
                  {assessment.title}
                </h2>

                <span className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase text-slate-600">
                  {assessment.status}
                </span>
              </div>

              <div className="mb-5 space-y-2 text-sm text-slate-500">
                <p>
                  <strong className="text-slate-700">
                    Time:
                  </strong>{" "}
                  {assessment.timeLimitMinutes || 0} minutes
                </p>

                <p>
                  <strong className="text-slate-700">
                    Questions:
                  </strong>{" "}
                  {assessment.questions?.length || 0}
                </p>
              </div>

              <Button
                variant="primary"
                onClick={() =>
                  handleTakeAssessment(assessment.id)
                }
                disabled={!assessment.id}
              >
                Take Assessment
              </Button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default IntervieweeDashboard;
