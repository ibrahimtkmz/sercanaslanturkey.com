export function Button({ className="", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 font-semibold transition ${className}`}
      {...props}
    />
  );
}
