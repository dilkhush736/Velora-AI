import { useId } from "react";

export default function BrandMark() {
  const gradientId = useId().replace(/:/g, "");

  return (
    <div className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 64 64" role="img">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7ce7c4" />
            <stop offset="100%" stopColor="#ffb86b" />
          </linearGradient>
        </defs>
        <rect x="6" y="6" width="52" height="52" rx="18" fill="#0e1d33" />
        <path
          d="M20 40 32 17l12 23-12-7-12 7Z"
          fill={`url(#${gradientId})`}
          stroke="#f2f6fb"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
