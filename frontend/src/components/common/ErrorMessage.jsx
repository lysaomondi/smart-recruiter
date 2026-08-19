import React from "react";

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="rounded-r-md border-l-4 border-brand-crimson bg-red-50 px-3.5 py-2.5 text-xs text-crimson-dim">
      {message}
    </div>
  );
}
