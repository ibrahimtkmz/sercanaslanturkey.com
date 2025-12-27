import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Input({ className = "", ...props }) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm " +
          "text-slate-900 placeholder:text-slate-400 " +
          "focus:outline-none focus:ring-2 focus:ring-[#D28FB0]/40",
        className
      )}
      {...props}
    />
  );
}
