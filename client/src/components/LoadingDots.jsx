export default function LoadingDots({ label = "Loading" }) {
  return (
    <div
      className="loading-dots"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      <span />
      <span />
      <span />
    </div>
  );
}
