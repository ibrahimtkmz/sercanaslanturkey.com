import React from "react";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/70";

const variants = {
  default: baseClasses,
  outline:
    "inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-transparent px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/70",
};

export const Button = React.forwardRef(function Button(
  { className = "", variant = "default", size = "md", children, ...props },
  ref
) {
  const sizeClasses = size === "lg" ? "px-5 py-3 text-base" : "px-4 py-2 text-sm";
  const classes = `${variants[variant] || variants.default} ${sizeClasses} ${className}`.trim();
  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});
