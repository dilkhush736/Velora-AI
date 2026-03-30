import { apiClient } from "./apiClient";

const DEFAULT_CHAT_TITLE = "New conversation";

const normalizeAssistantStatus = (assistant) => {
  const mode = assistant?.mode === "demo" ? "demo" : "live";

  return {
    mode,
    isDemo: mode === "demo",
    label: assistant?.label || (mode === "demo" ? "Demo mode" : "OpenAI"),
    note:
      assistant?.note ||
      (mode === "demo" ? "Using built-in assistant replies" : "Live AI replies enabled"),
    reason: assistant?.reason || null,
  };
};

const normalizeChat = (chat) => {
  if (!chat || typeof chat !== "object") {
    return null;
  }

  return {
    ...chat,
    title:
      typeof chat.title === "string" && chat.title.trim()
        ? chat.title
        : DEFAULT_CHAT_TITLE,
    messages: Array.isArray(chat.messages) ? chat.messages : [],
    lastMessageAt: chat.lastMessageAt || chat.updatedAt || chat.createdAt || null,
  };
};

const normalizeChatSummary = (chat) => {
  const normalizedChat = normalizeChat(chat);

  if (!normalizedChat?.id) {
    return null;
  }

  const lastMessage =
    normalizedChat.messages[normalizedChat.messages.length - 1];

  return {
    ...normalizedChat,
    preview:
      typeof chat.preview === "string" ? chat.preview : lastMessage?.content || "",
    messagesCount:
      typeof chat.messagesCount === "number"
        ? chat.messagesCount
        : normalizedChat.messages.length,
  };
};

const normalizeChatResponse = (data) => ({
  ...data,
  assistant: normalizeAssistantStatus(data?.assistant),
  chat: normalizeChat(data?.chat),
});

const normalizeChatsResponse = (data) => ({
  ...data,
  assistant: normalizeAssistantStatus(data?.assistant),
  chats: Array.isArray(data?.chats)
    ? data.chats.map(normalizeChatSummary).filter(Boolean)
    : [],
});

export const fetchChatsRequest = async () => {
  const response = await apiClient.get("/chats");
  return normalizeChatsResponse(response.data);
};

export const fetchChatByIdRequest = async (chatId) => {
  const response = await apiClient.get(`/chats/${chatId}`);
  return normalizeChatResponse(response.data);
};

export const createChatRequest = async () => {
  const response = await apiClient.post("/chats", {});
  return normalizeChatResponse(response.data);
};

export const sendMessageRequest = async (chatId, content) => {
  const response = await apiClient.post(`/chats/${chatId}/messages`, {
    content,
  });
  return normalizeChatResponse(response.data);
};

export const deleteChatRequest = async (chatId) => {
  const response = await apiClient.delete(`/chats/${chatId}`);
  return response.data;
};
