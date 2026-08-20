import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadAssessments } from "../../store/slices/assessmentSlice";
import AssessmentCard from "../../components/assessment/AssessmentCard";
import Button from "../../components/common/Button";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

export default function RecruiterDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((s) => s.assessment);

  useEffect(() => {
    dispatch(loadAssessments());
  }, [dispatch]);

  const invitedTotal = items.reduce((sum, a) => sum + (a.invitedCount || 0), 0);
  const submittedTotal = items.reduce((sum, a) => sum + (a.submittedCount || 0), 0);
  const completionRate = invitedTotal ? Math.round((submittedTotal / invitedTotal) * 100) : 0;

  return (
    <div>
      <div className="mb-5.5 flex items-start justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-extrabold text-ink">Assessments</h1>
          <p className="text-sm text-muted-2">
            Every technical screen you've built, sent, or graded — in one place.
          </p>
        </div>
        <Button onClick={() => navigate("/recruiter/assessments/create")}>+ New assessment</Button>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-paper-line bg-white p-4">
          <div className="font-mono text-2xl font-bold">{invitedTotal}</div>
          <div className="mt-1 text-xs text-muted-2">Invitations sent</div>
        </div>
        <div className="rounded-xl border border-paper-line bg-white p-4">
          <div className="font-mono text-2xl font-bold">{completionRate}%</div>
          <div className="mt-1 text-xs text-muted-2">Completion rate</div>
        </div>
        <div className="rounded-xl border border-paper-line bg-white p-4">
          <div className="font-mono text-2xl font-bold">{items.length}</div>
          <div className="mt-1 text-xs text-muted-2">Total assessments</div>
        </div>
      </div>

      {status === "loading" && <Loading label="Loading assessments…" />}
      {status === "failed" && <ErrorMessage message={error} />}

      {status === "succeeded" && items.length === 0 && (
        <div className="rounded-xl border border-paper-line bg-white p-10 text-center">
          <p className="text-sm text-muted-2">No assessments yet. Create your first one to get started.</p>
        </div>
      )}

      {items.map((a) => (
        <AssessmentCard
          key={a.id}
          assessment={a}
          onClick={() => navigate(`/recruiter/assessments/${a.id}/edit`)}
        />
      ))}
    </div>
  );
}
