import mongoose from "mongoose";

import Chat from "../models/Chat.js";
import {
  generateAssistantReply,
  getAssistantStatus,
} from "../services/assistantService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const DEFAULT_CHAT_TITLE = "New conversation";

const buildChatTitle = (content) => {
  const trimmed = content.replace(/\s+/g, " ").trim();
  return trimmed.length > 60 ? `${trimmed.slice(0, 57)}...` : trimmed;
};

const getChatTitle = (chat) => chat?.title?.trim() || DEFAULT_CHAT_TITLE;

const getChatMessages = (chat) => (Array.isArray(chat?.messages) ? chat.messages : []);

const serializeMessage = (message) => ({
  id: message._id.toString(),
  role: message.role,
  content: message.content,
  createdAt: message.createdAt,
});

const serializeChatDetail = (chat) => {
  const messages = getChatMessages(chat);

  return {
    id: chat._id.toString(),
    title: getChatTitle(chat),
    createdAt: chat.createdAt,
    updatedAt: chat.updatedAt,
    lastMessageAt: chat.lastMessageAt || chat.updatedAt || chat.createdAt,
    messages: messages.map(serializeMessage),
  };
};

const serializeChatSummary = (chat) => {
  const messages = getChatMessages(chat);
  const lastMessage = messages[messages.length - 1];

  return {
    id: chat._id.toString(),
    title: getChatTitle(chat),
    preview: lastMessage?.content || "",
    lastMessageAt: chat.lastMessageAt || chat.updatedAt || chat.createdAt,
    updatedAt: chat.updatedAt,
    messagesCount: messages.length,
  };
};

const getChatForUser = async (chatId, userId) => {
  if (!mongoose.isValidObjectId(chatId)) {
    const error = new Error("Invalid chat id.");
    error.statusCode = 400;
    throw error;
  }

  const chat = await Chat.findOne({
    _id: chatId,
    user: userId,
  });

  if (!chat) {
    const error = new Error("Chat not found.");
    error.statusCode = 404;
    throw error;
  }

  return chat;
};

export const getChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({ user: req.user._id }).sort({
    lastMessageAt: -1,
    updatedAt: -1,
  });

  res.json({
    assistant: getAssistantStatus(),
    chats: chats.map(serializeChatSummary),
  });
});

export const createChat = asyncHandler(async (req, res) => {
  const requestedTitle = req.body?.title?.trim();

  const chat = await Chat.create({
    user: req.user._id,
    title: requestedTitle || DEFAULT_CHAT_TITLE,
    messages: [],
    lastMessageAt: new Date(),
  });

  res.status(201).json({
    assistant: getAssistantStatus(),
    chat: serializeChatDetail(chat),
  });
});

export const getChatById = asyncHandler(async (req, res) => {
  const chat = await getChatForUser(req.params.chatId, req.user._id);

  res.json({
    assistant: getAssistantStatus(),
    chat: serializeChatDetail(chat),
  });
});

export const sendMessage = asyncHandler(async (req, res) => {
  const content = req.body?.content?.trim();

  if (!content) {
    res.status(400);
    throw new Error("Message content is required.");
  }

  const chat = await getChatForUser(req.params.chatId, req.user._id);
  chat.messages = getChatMessages(chat);
  const isFirstUserMessage = chat.messages.length === 0;

  chat.messages.push({
    role: "user",
    content,
  });
  chat.lastMessageAt = new Date();

  if (isFirstUserMessage || getChatTitle(chat) === DEFAULT_CHAT_TITLE) {
    chat.title = buildChatTitle(content);
  }

  await chat.save();

  try {
    const assistantReply = await generateAssistantReply({
      messages: chat.messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
      email: req.user.email,
    });

    chat.messages.push({
      role: "assistant",
      content: assistantReply.content,
    });
    chat.lastMessageAt = new Date();

    await chat.save();

    res.status(201).json({
      assistant: assistantReply.assistant,
      chat: serializeChatDetail(chat),
    });
  } catch (error) {
    error.statusCode = error.statusCode || 502;
    throw error;
  }
});

export const deleteChat = asyncHandler(async (req, res) => {
  const chat = await getChatForUser(req.params.chatId, req.user._id);

  await chat.deleteOne();

  res.json({
    message: "Chat deleted successfully.",
  });
});
