import BrandMark from "./BrandMark";

export default function AuthLayout({ title, subtitle, footer, children }) {
  return (
    <div className="auth-shell">
      <section className="auth-hero">
        <div className="auth-hero-inner">
          <div className="auth-brand">
            <BrandMark />
            <div>
              <p className="auth-brand-overline">Velora AI</p>
              <h1>Conversational AI with a polished workspace feel.</h1>
            </div>
          </div>

          <p className="auth-hero-copy">
            Persistent chat history, secure authentication, Markdown-ready
            answers, and a premium dark interface tuned for desktop and mobile.
          </p>

          <div className="auth-feature-grid">
            <article>
              <span>01</span>
              <h2>Chat continuity</h2>
              <p>Start new threads, reopen old ones, and keep context in MongoDB.</p>
            </article>
            <article>
              <span>02</span>
              <h2>Built for code</h2>
              <p>Markdown formatting, syntax-highlighted blocks, and one-click copy.</p>
            </article>
            <article>
              <span>03</span>
              <h2>Secure by default</h2>
              <p>JWT auth, protected routes, environment-based configuration.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <div className="auth-card-header">
            <p className="eyebrow">Welcome back</p>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          {children}

          <div className="auth-footer">{footer}</div>
        </div>
      </section>
    </div>
  );
}
