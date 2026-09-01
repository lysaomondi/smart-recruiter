import React, { useState } from "react";

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

export default function AssessmentCard({ assessment, onClick, onDelete }) {
  const { title, status, invitedCount, submittedCount, closesAt, tags } = assessment;
  const [confirming, setConfirming] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");

  const meta = [
    invitedCount ? `${invitedCount} invited` : null,
    status === "draft"
      ? "not yet published"
      : closesAt
      ? `closes ${new Date(closesAt).toLocaleDateString()}`
      : "no closing date set",
    tags?.length ? tags.join(" / ") : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const hasResults = submittedCount > 0;

  function openConfirm(e) {
    e.stopPropagation();
    setConfirming(true);
  }

  function cancelConfirm(e) {
    e.stopPropagation();
    setConfirming(false);
    setTypedTitle("");
  }

  function confirmDelete(e) {
    e.stopPropagation();
    onDelete(assessment.id);
    setConfirming(false);
    setTypedTitle("");
  }

  return (
    <div
      onClick={onClick}
      className="group relative mb-3 flex cursor-pointer overflow-hidden rounded-xl border border-paper-line bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
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

      <button
        type="button"
        onClick={openConfirm}
        title="Delete assessment"
        className="absolute right-2 top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-transparent bg-white/80 text-sm leading-none text-muted-2 opacity-0 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-crimson-dim group-hover:opacity-100"
      >
        ×
      </button>

      {confirming && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 z-30 flex flex-col justify-center gap-2 bg-white/97 px-4.5 py-3.5"
        >
          {hasResults ? (
            <>
              <div className="text-xs font-semibold text-crimson-dim">
                This will permanently delete {submittedCount} candidate
                {submittedCount === 1 ? " result" : " results"} for "{title}".
                This cannot be undone.
              </div>
              <div className="text-[11px] text-muted-2">
                Type the assessment title to confirm:
              </div>
              <input
                autoFocus
                value={typedTitle}
                onChange={(e) => setTypedTitle(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="rounded border border-paper-line px-2 py-1 text-xs font-mono"
                placeholder={title}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={cancelConfirm}
                  className="flex-1 rounded border border-paper-line py-1 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={typedTitle !== title}
                  className="flex-1 rounded bg-crimson-dim py-1 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Delete permanently
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-xs font-semibold text-ink">
                Delete "{title}"? This can't be undone.
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={cancelConfirm}
                  className="flex-1 rounded border border-paper-line py-1 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="flex-1 rounded bg-crimson-dim py-1 text-xs font-semibold text-white"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
