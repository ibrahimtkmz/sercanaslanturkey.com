import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Badge({ className = "", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        className
      )}
      {...props}
    />
  );
}
