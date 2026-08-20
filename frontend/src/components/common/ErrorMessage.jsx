import React from "react";

export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null;
  return (
    <div className="rounded-r-md border-l-4 border-brand-crimson bg-brand-crimson/10 px-3.5 py-2.5 text-xs text-crimson-dim">
      {message}
      {onRetry && <button type="button" onClick={onRetry} className="ml-3 underline">Retry</button>}
    </div>
  );
}
