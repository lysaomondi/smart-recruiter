import React from "react";

const VARIANTS = {
  primary: "bg-brand-amber text-[#241705] hover:bg-amber-300",
  teal: "bg-brand-teal text-[#04241A] hover:bg-emerald-300",
  outline: "bg-transparent border border-paper-line text-ink hover:bg-gray-100",
  danger: "bg-brand-crimson text-white hover:bg-red-500",
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
