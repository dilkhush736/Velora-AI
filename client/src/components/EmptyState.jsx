import { Sparkles } from "lucide-react";

export default function EmptyState({ hasChat, onNewChat }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Sparkles size={24} />
      </div>
      <p className="eyebrow">AI workspace</p>
      <h2>{hasChat ? "This conversation is ready." : "Start a fresh conversation."}</h2>
      <p>
        Ask for research help, planning, debugging, writing, summaries, or code.
        Replies support Markdown and formatted code blocks.
      </p>

      {!hasChat ? (
        <button className="primary-button" onClick={onNewChat} type="button">
          Start a new chat
        </button>
      ) : null}

      <div className="empty-state-suggestions">
        <span>Draft a release note from these commits.</span>
        <span>Explain this error and suggest a fix.</span>
        <span>Turn rough notes into a polished proposal.</span>
      </div>
    </div>
  );
}

