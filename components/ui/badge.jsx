import React from "react";

export function Badge({ className = "", variant = "default", children, ...props }) {
  const styles =
    variant === "secondary"
      ? "inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white"
      : "inline-flex items-center rounded-full border border-transparent bg-emerald-500/20 px-3 py-1 text-[11px] font-semibold text-emerald-50";

  return (
    <span className={`${styles} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}
