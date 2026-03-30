import { Sparkles } from "lucide-react";

const SUGGESTIONS = [
  "Draft a release note from these commits.",
  "Explain this error and suggest a fix.",
  "Turn rough notes into a polished proposal.",
];

export default function EmptyState({ hasChat, onNewChat, onSuggestion }) {
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
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className="ghost-button empty-state-suggestion"
            onClick={() => onSuggestion?.(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
