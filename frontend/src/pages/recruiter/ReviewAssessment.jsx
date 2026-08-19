import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { loadAssessmentById, publish, clearActiveAssessment } from "../../store/slices/assessmentSlice";
import QuestionList from "../../components/assessment/QuestionList";
import Button from "../../components/common/Button";
import Loading from "../../components/common/Loading";

export default function ReviewAssessment() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const active = useSelector((s) => s.assessments.active);

  useEffect(() => {
    dispatch(loadAssessmentById(id));
    return () => dispatch(clearActiveAssessment());
  }, [dispatch, id]);

  if (!active) return <Loading label="Loading assessment…" />;

  const handlePublish = async () => {
    await dispatch(publish(id));
    navigate("/recruiter/dashboard");
  };

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-ink">Review before publishing</h1>
      <p className="mb-6 text-sm text-muted-2">
        Double-check everything below — candidates see exactly this once you publish.
      </p>

      <div className="mb-4 rounded-xl border border-paper-line bg-white p-5">
        <div className="text-[15px] font-bold">{active.title}</div>
        <div className="mt-1 font-mono text-xs text-muted-2">
          Time limit: {active.timeLimitMinutes} min · {active.questions.length} questions
        </div>
      </div>

      <div className="rounded-xl border border-paper-line bg-white p-5">
        <div className="mb-2.5 text-xs font-bold">Questions</div>
        <QuestionList questions={active.questions} />
      </div>

      <div className="mt-5 flex gap-2.5">
        <Button variant="outline" onClick={() => navigate(`/recruiter/assessments/${id}/edit`)}>
          ← Back to edit
        </Button>
        <Button onClick={handlePublish} disabled={active.questions.length === 0}>
          Publish & send invitations
        </Button>
      </div>
    </div>
  );
}
