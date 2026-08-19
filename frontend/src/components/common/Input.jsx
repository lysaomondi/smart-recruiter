import React from "react";

const fieldBase =
  "w-full rounded-lg border border-paper-line bg-white/60 px-3 py-2.5 text-sm text-ink " +
  "focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20";

export default function Input({
  as = "input",
  label,
  error,
  options = [],
  id,
  className = "",
  ...rest
}) {
  const fieldId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  const renderField = () => {
    if (as === "textarea") {
      return (
        <textarea
          id={fieldId}
          className={`${fieldBase} min-h-[70px] font-mono text-xs ${className}`}
          {...rest}
        />
      );
    }
    if (as === "select") {
      return (
        <select id={fieldId} className={`${fieldBase} ${className}`} {...rest}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }
    return <input id={fieldId} className={`${fieldBase} ${className}`} {...rest} />;
  };

  return (
    <div className="mb-3.5">
      {label && (
        <label htmlFor={fieldId} className="mb-1.5 block text-xs font-semibold text-ink">
          {label}
        </label>
      )}
      {renderField()}
      {error && <div className="mt-1 text-xs text-crimson-dim">{error}</div>}
    </div>
  );
}
