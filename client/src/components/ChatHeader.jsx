import { Menu } from "lucide-react";

export default function ChatHeader({ assistant, onToggleSidebar, title, subtitle }) {
  return (
    <header className="chat-header">
      <div className="chat-header-left">
        <button
          className="ghost-icon-button chat-header-menu"
          onClick={onToggleSidebar}
          type="button"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>

        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="chat-header-meta">
        {assistant?.isDemo ? (
          <div className="assistant-mode-badge" role="status" aria-live="polite">
            <span className="assistant-mode-dot" />
            <div>
              <strong>{assistant.label}</strong>
              <small>{assistant.note}</small>
            </div>
          </div>
        ) : null}

        <div className="chat-header-status">
          <span className="status-indicator" />
          Synced
        </div>
      </div>
    </header>
  );
}
