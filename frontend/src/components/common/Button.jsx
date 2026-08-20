import React from "react";

const VARIANTS = {
  primary: "bg-brand-amber text-ink hover:opacity-90",
  teal: "bg-brand-teal text-ink hover:opacity-90",
  secondary: "bg-paper text-ink hover:bg-panel/10",
  success: "bg-brand-teal text-ink hover:opacity-90",
  outline: "bg-transparent border border-panel/30 text-ink hover:bg-panel/10",
  danger: "bg-brand-crimson text-paper hover:opacity-90",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  onClick,
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant] || VARIANTS.primary} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
