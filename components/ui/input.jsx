import React from "react";

export const Input = React.forwardRef(function Input({ className = "", ...props }, ref) {
  return (
    <input
      ref={ref}
      className={`w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white shadow-sm placeholder:text-slate-300 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/60 ${className}`.trim()}
      {...props}
    />
  );
});
