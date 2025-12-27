export function Card({ className="", ...props }) {
  return <div className={`rounded-2xl ${className}`} {...props} />;
}

export function CardContent({ className="", ...props }) {
  return <div className={className} {...props} />;
}
