export default function LoadingDots({ label = "Loading" }) {
  return (
    <div className="loading-dots" aria-live="polite" aria-label={label}>
      <span className="sr-only">{label}</span>
      <span />
      <span />
      <span />
    </div>
  );
}

