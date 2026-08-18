import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadAssessments } from "../../store/slices/assessmentSlice";
import AssessmentCard from "../../components/assessment/AssessmentCard";
import Button from "../../components/common/Button";
import Loading from "../../components/common/Loading";

const FILTERS = ["all", "draft", "open", "closed"];

export default function Assessments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status } = useSelector((s) => s.assessments);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(loadAssessments());
  }, [dispatch]);

  const visible = filter === "all" ? items : items.filter((a) => a.status === filter);

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-ink">All assessments</h1>
      <p className="mb-4.5 text-sm text-muted-2">Filter by status to find what you're looking for.</p>

      <div className="mb-5 flex gap-2">
        {FILTERS.map((f) => (
          <Button
            key={f}
            variant={filter === f ? "teal" : "outline"}
            onClick={() => setFilter(f)}
            className="capitalize"
          >
            {f}
          </Button>
        ))}
      </div>

      {status === "loading" && <Loading label="Loading…" />}

      {visible.map((a) => (
        <AssessmentCard
          key={a.id}
          assessment={a}
          onClick={() =>
            navigate(
              a.status === "draft"
                ? `/recruiter/assessments/${a.id}/edit`
                : `/recruiter/assessments/${a.id}/review`
            )
          }
        />
      ))}

      {status === "succeeded" && visible.length === 0 && (
        <p className="text-sm text-muted-2">No assessments match this filter.</p>
      )}
    </div>
  );
}
