import BrandMark from "./BrandMark";
import LoadingDots from "./LoadingDots";

export default function FullPageLoader({ label }) {
  return (
    <div className="page-loader">
      <div className="page-loader-card">
        <BrandMark />
        <div>
          <p className="page-loader-title">Velora AI</p>
          <p className="page-loader-copy">Secure chat workspace initializing.</p>
        </div>
        <LoadingDots label={label} />
      </div>
    </div>
  );
}

