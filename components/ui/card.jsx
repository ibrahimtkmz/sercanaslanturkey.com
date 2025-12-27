import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Card({ className = "", ...props }) {
  return <div className={cn("rounded-2xl", className)} {...props} />;
}

export function CardContent({ className = "", ...props }) {
  return <div className={cn("", className)} {...props} />;
}
