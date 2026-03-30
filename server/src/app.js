import "dotenv/config";

import cors from "cors";
import express from "express";
import morgan from "morgan";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { getAssistantStatus } from "./services/assistantService.js";

export const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Velora API is running.",
    assistant: getAssistantStatus(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);

app.use(notFound);
app.use(errorHandler);
