import React from "react";

export function Badge({ className = "", variant = "default", children, ...props }) {
  const styles =
    variant === "secondary"
      ? "inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
      : "inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white";

  return (
    <span className={`${styles} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}
