import React from "react";

export function Label({ className = "", children, ...props }) {
  return (
    <label className={`text-sm font-semibold text-slate-800 ${className}`.trim()} {...props}>
      {children}
    </label>
  );
}
