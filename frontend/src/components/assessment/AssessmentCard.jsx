import React from "react";

const TAG_CLASS = {
  open: "bg-emerald-50 text-teal-dim",
  draft: "bg-amber-50 text-amber-dim",
  closed: "bg-red-50 text-crimson-dim",
};

const SCORE_COLOR = {
  open: "text-teal-dim",
  closed: "text-crimson-dim",
  draft: "text-muted-2",
};

export default function AssessmentCard({ assessment, onClick }) {
  const { title, status, invitedCount, submittedCount, closesAt, tags } = assessment;

  const meta = [
    invitedCount ? `${invitedCount} invited` : null,
    closesAt ? `closes ${new Date(closesAt).toLocaleDateString()}` : "not yet published",
    tags?.length ? tags.join(" / ") : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div
      onClick={onClick}
      className="mb-3 flex cursor-pointer overflow-hidden rounded-xl border border-paper-line bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex-1 px-4.5 py-3.5">
        <div className="text-sm font-bold text-ink">
          {title}
          <span
            className={`ml-2 rounded px-2 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-wide ${TAG_CLASS[status]}`}
          >
            {status}
          </span>
        </div>
        <div className="mt-1 font-mono text-xs text-muted-2">{meta}</div>
      </div>
      <div className="flex w-[108px] flex-shrink-0 flex-col items-center justify-center border-l border-dashed border-paper-line bg-gray-50">
        <div className={`font-mono text-xl font-bold ${SCORE_COLOR[status]}`}>
          {status === "draft" ? "—" : submittedCount}
        </div>
        <div className="mt-0.5 text-[9.5px] uppercase tracking-wide text-muted-2">
          {status === "draft" ? "not sent" : "submitted"}
        </div>
      </div>
    </div>
  );
}
