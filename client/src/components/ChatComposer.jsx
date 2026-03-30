import { SendHorizontal } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ChatComposer({
  disabled,
  isSending,
  onChange,
  onSubmit,
  value,
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
  }, [value]);

  const handleSubmit = () => {
    if (disabled || !value.trim()) {
      return;
    }

    onSubmit(value);
  };

  return (
    <div className="composer-shell">
      <div className="composer">
        <textarea
          ref={textareaRef}
          className="composer-textarea"
          placeholder="Message Velora..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSubmit();
            }
          }}
          disabled={disabled}
          rows={1}
        />

        <button
          className="primary-button composer-submit"
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          type="button"
        >
          <SendHorizontal size={16} />
          {isSending ? "Thinking..." : "Send"}
        </button>
      </div>

      <p className="composer-caption">
        Press Enter to send. Shift + Enter adds a new line.
      </p>
    </div>
  );
}

