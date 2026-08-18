import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  loadAssessmentById,
  publish,
  clearActiveAssessment,
} from "../../store/slices/assessmentSlice";
import QuestionBuilder from "../../components/assessment/QuestionBuilder";
import QuestionList from "../../components/assessment/QuestionList";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Loading from "../../components/common/Loading";

export default function EditAssessment() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const active = useSelector((s) => s.assessments.active);

  const [title, setTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState(60);

  useEffect(() => {
    dispatch(loadAssessmentById(id));
    return () => dispatch(clearActiveAssessment());
  }, [dispatch, id]);

  useEffect(() => {
    if (active) {
      setTitle(active.title);
      setTimeLimit(active.timeLimitMinutes);
    }
  }, [active]);

  const handlePublish = async () => {
    await dispatch(publish(id));
    navigate("/recruiter/dashboard");
  };

  if (!active) return <Loading label="Loading assessment…" />;

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-ink">Edit assessment</h1>
      <p className="mb-6 text-sm text-muted-2">
        {active.status === "draft" ? "Still a draft — not visible to candidates." : `Status: ${active.status}`}
      </p>

      <div className="grid grid-cols-[1.4fr_1fr] items-start gap-4">
        <div className="rounded-xl border border-paper-line bg-white p-5">
          <Input label="Assessment title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input
            label="Overall time limit (minutes)"
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
            className="w-36"
          />

          <div className="mt-2.5 border-t border-paper-line pt-4">
            <QuestionBuilder assessmentId={active.id} />
          </div>
        </div>

        <div className="rounded-xl border border-paper-line bg-white p-5">
          <div className="mb-2.5 text-xs font-bold">Question list ({active.questions.length})</div>
          <QuestionList questions={active.questions} />
          <Button
            className="mt-4 w-full justify-center"
            onClick={handlePublish}
            disabled={active.status !== "draft" || active.questions.length === 0}
          >
            {active.status === "draft" ? "Publish & send invitations" : "Already published"}
          </Button>
        </div>
      </div>
    </div>
  );
}
