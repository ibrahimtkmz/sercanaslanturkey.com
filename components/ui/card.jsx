import React from "react";

export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`p-5 sm:p-6 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
