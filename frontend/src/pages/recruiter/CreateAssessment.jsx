import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewAssessment, publish } from "../../store/slices/assessmentSlice";
import QuestionBuilder from "../../components/assessment/QuestionBuilder";
import QuestionList from "../../components/assessment/QuestionList";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

export default function CreateAssessment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const active = useSelector((s) => s.assessments.active);

  const [title, setTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState(60);
  const [saving, setSaving] = useState(false);

  const handleCreateDraft = async () => {
    if (!title.trim()) return;
    setSaving(true);
    await dispatch(createNewAssessment({ title, timeLimitMinutes: Number(timeLimit) }));
    setSaving(false);
  };

  const handlePublish = async () => {
    if (!active) return;
    await dispatch(publish(active.id));
    navigate("/recruiter/dashboard");
  };

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-ink">Create assessment</h1>
      <p className="mb-6 text-sm text-muted-2">
        Mix multiple-choice, free-text, and coding katas into one timed test.
      </p>

      <div className="grid grid-cols-[1.4fr_1fr] items-start gap-4">
        <div className="rounded-xl border border-paper-line bg-white p-5">
          {!active ? (
            <>
              <Input
                label="Assessment title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Backend Engineer — Katas Round"
              />
              <Input
                label="Overall time limit (auto-submits on expiry, minutes)"
                type="number"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                className="w-36"
              />
              <Button variant="teal" onClick={handleCreateDraft} disabled={saving || !title.trim()}>
                {saving ? "Creating…" : "Save & add questions →"}
              </Button>
            </>
          ) : (
            <QuestionBuilder assessmentId={active.id} />
          )}
        </div>

        <div className="rounded-xl border border-paper-line bg-white p-5">
          <div className="mb-2.5 text-xs font-bold">
            Question list {active ? `(${active.questions.length})` : ""}
          </div>
          <QuestionList questions={active?.questions} />
          <Button
            className="mt-4 w-full justify-center"
            onClick={handlePublish}
            disabled={!active || active.questions.length === 0}
          >
            Publish & send invitations
          </Button>
        </div>
      </div>
    </div>
  );
}
