import { Check, Copy } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import { formatMessageTimestamp } from "../utils/formatters";
import BrandMark from "./BrandMark";

function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false);
  const codeText = String(children).replace(/\n$/, "");
  const language = className?.replace("language-", "") || "text";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <div className="code-block">
      <div className="code-block-toolbar">
        <span>{language}</span>
        <button
          className="ghost-icon-button"
          onClick={handleCopy}
          type="button"
          aria-label={copied ? "Code copied" : `Copy ${language} code`}
          title={copied ? "Code copied" : `Copy ${language} code`}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>
        <code className={className}>{codeText}</code>
      </pre>
    </div>
  );
}

export default function ChatMessage({ message, userInitial }) {
  const isUser = message.role === "user";

  return (
    <article className={`message-row ${isUser ? "is-user" : "is-assistant"}`}>
      <div className={`message-avatar ${isUser ? "is-user" : "is-assistant"}`}>
        {isUser ? userInitial : <BrandMark />}
      </div>

      <div className={`message-bubble ${isUser ? "is-user" : "is-assistant"}`}>
        <div className="message-meta">
          <strong>{isUser ? "You" : "Velora"}</strong>
          <span>{formatMessageTimestamp(message.createdAt)}</span>
        </div>

        <div className="message-markdown">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              code({ inline, className, children, ...props }) {
                if (inline) {
                  return (
                    <code className="inline-code" {...props}>
                      {children}
                    </code>
                  );
                }

                return <CodeBlock className={className}>{children}</CodeBlock>;
              },
              a(props) {
                return <a {...props} target="_blank" rel="noreferrer" />;
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
