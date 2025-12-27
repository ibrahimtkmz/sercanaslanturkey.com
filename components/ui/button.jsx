import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  className = "",
  variant = "default",
  size = "default",
  type = "button",
  disabled,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D28FB0]/50 " +
    "disabled:opacity-60 disabled:pointer-events-none";

  const variants = {
    default: "",
    outline:
      "border border-slate-200 bg-transparent text-slate-900 hover:bg-slate-50",
    ghost: "bg-transparent hover:bg-white/10",
  };

  const sizes = {
    default: "h-10 px-4 py-2 rounded-full",
    sm: "h-9 px-3 rounded-full",
    lg: "h-11 px-6 rounded-full text-base",
    icon: "h-10 w-10 rounded-full",
  };

  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    />
  );
}
