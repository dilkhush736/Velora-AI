import express from "express";

import {
  createChat,
  deleteChat,
  getChatById,
  getChats,
  sendMessage,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getChats).post(createChat);
router.route("/:chatId").get(getChatById).delete(deleteChat);
router.post("/:chatId/messages", sendMessage);

export default router;

