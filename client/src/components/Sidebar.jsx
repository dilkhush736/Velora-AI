import { LogOut, Plus, Trash2, X } from "lucide-react";

import { formatChatTimestamp } from "../utils/formatters";
import BrandMark from "./BrandMark";

export default function Sidebar({
  user,
  chats,
  activeChatId,
  isOpen,
  isCreatingChat,
  isLoadingConversation,
  onClose,
  onDeleteChat,
  onLogout,
  onNewChat,
  onSelectChat,
}) {
  const chatItems = Array.isArray(chats) ? chats : [];

  return (
    <>
      <button
        className={`sidebar-overlay ${isOpen ? "is-visible" : ""}`}
        onClick={onClose}
        aria-label="Close sidebar"
        type="button"
      />

      <aside className={`sidebar ${isOpen ? "is-open" : ""}`}>
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <BrandMark />
            <div>
              <p className="sidebar-brand-name">Velora AI</p>
              <p className="sidebar-brand-copy">Private workspace</p>
            </div>
          </div>

          <button
            className="ghost-icon-button sidebar-mobile-close"
            onClick={onClose}
            type="button"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <button
          className="primary-button sidebar-new-chat"
          onClick={onNewChat}
          disabled={isCreatingChat}
          type="button"
        >
          <Plus size={16} />
          {isCreatingChat ? "Creating..." : "New chat"}
        </button>

        <div className="sidebar-section">
          <div className="sidebar-section-header">
            <span>Recent chats</span>
            <span>{chatItems.length}</span>
          </div>

          <div className="chat-list">
            {chatItems.length === 0 ? (
              <div className="sidebar-empty">
                Your saved conversations will appear here.
              </div>
            ) : (
              chatItems.map((chat) => {
                const chatTitle = chat?.title || "New conversation";
                const isActiveChatLoading = chat.id === activeChatId && isLoadingConversation;

                return (
                  <div
                    key={chat.id}
                    className={`chat-list-row ${activeChatId === chat.id ? "is-active" : ""}`}
                  >
                    <button
                      className="chat-list-item"
                      onClick={() => onSelectChat(chat.id)}
                      disabled={isActiveChatLoading}
                      type="button"
                    >
                      <div className="chat-list-item-top">
                        <strong>{chatTitle}</strong>
                        <span>{formatChatTimestamp(chat.lastMessageAt || chat.updatedAt)}</span>
                      </div>
                      <p>{chat.preview || "Fresh conversation, waiting for the first message."}</p>
                    </button>

                    <button
                      className="ghost-icon-button chat-delete-button"
                      onClick={() => onDeleteChat(chat.id)}
                      type="button"
                      aria-label={`Delete ${chatTitle}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="sidebar-user">
          <div className="sidebar-user-profile">
            <div className="sidebar-user-avatar">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <strong>{user?.name}</strong>
              <p>{user?.email}</p>
            </div>
          </div>

          <button className="ghost-button" onClick={onLogout} type="button">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
