import React from "react";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2";

const variants = {
  default: baseClasses,
  outline:
    "inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
};

export const Button = React.forwardRef(function Button(
  { className = "", variant = "default", size = "md", children, ...props },
  ref
) {
  const sizeClasses = size === "lg" ? "px-4 py-3 text-base" : "px-3 py-2 text-sm";
  const classes = `${variants[variant] || variants.default} ${sizeClasses} ${className}`.trim();
  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});
