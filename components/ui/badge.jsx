export function Badge({ className="", ...props }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs ${className}`} {...props} />
  );
}
