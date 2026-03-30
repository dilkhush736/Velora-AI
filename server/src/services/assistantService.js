import { generateDemoReply } from "./demoAssistant.js";
import { generateOpenAIReply, isOpenAIConfigured } from "./openaiService.js";

const DEMO_MODE_LABEL = "Demo mode";
const DEMO_MODE_NOTE = "Using built-in assistant replies";
const LIVE_MODE_LABEL = "OpenAI";
const LIVE_MODE_NOTE = "Live AI replies enabled";

let lastKnownRuntimeStatus = null;

const isDemoForced = (env = process.env) =>
  String(env.FORCE_DEMO_MODE || "").toLowerCase() === "true";

const getConfiguredDemoReason = (env = process.env) => {
  if (isDemoForced(env)) {
    return "forced_demo_mode";
  }

  if (!isOpenAIConfigured(env)) {
    return "missing_api_key";
  }

  return null;
};

const buildAssistantStatus = ({ mode, reason = null }) => ({
  mode,
  isDemo: mode === "demo",
  label: mode === "demo" ? DEMO_MODE_LABEL : LIVE_MODE_LABEL,
  note: mode === "demo" ? DEMO_MODE_NOTE : LIVE_MODE_NOTE,
  reason,
});

const setLastKnownRuntimeStatus = (status) => {
  lastKnownRuntimeStatus = status ? buildAssistantStatus(status) : null;
};

const classifyOpenAIError = (error) => {
  const status = Number(error?.status || error?.statusCode || error?.response?.status);
  const code = String(error?.code || error?.type || "").toLowerCase();
  const name = String(error?.name || "").toLowerCase();
  const message = String(error?.message || "").toLowerCase();
  const haystack = `${code} ${name} ${message}`;

  if ([401, 403].includes(status) || haystack.includes("invalid api key")) {
    return "auth_error";
  }

  if (status === 429 || haystack.includes("insufficient_quota") || haystack.includes("quota")) {
    return "quota_error";
  }

  if (status === 402 || haystack.includes("billing")) {
    return "billing_error";
  }

  if (
    status === 408 ||
    haystack.includes("timeout") ||
    haystack.includes("timed out") ||
    haystack.includes("apitimeouterror")
  ) {
    return "timeout_error";
  }

  if (
    [500, 502, 503, 504].includes(status) ||
    haystack.includes("connection") ||
    haystack.includes("network") ||
    haystack.includes("fetch failed") ||
    haystack.includes("econnreset") ||
    haystack.includes("enotfound") ||
    haystack.includes("socket hang up")
  ) {
    return "network_error";
  }

  return "provider_error";
};

export const getAssistantStatus = (options = {}, env = process.env) => {
  const configuredDemoReason = getConfiguredDemoReason(env);
  const mode =
    options.mode ||
    (configuredDemoReason ? "demo" : lastKnownRuntimeStatus?.mode || "live");
  const reason =
    mode === "demo"
      ? options.reason || configuredDemoReason || lastKnownRuntimeStatus?.reason || "demo_fallback"
      : null;

  return buildAssistantStatus({ mode, reason });
};

export const shouldUseDemoMode = (error, env = process.env) => {
  if (getConfiguredDemoReason(env)) {
    return true;
  }

  if (!error) {
    return false;
  }

  const status = Number(error?.status || error?.statusCode || error?.response?.status);

  if ([401, 402, 403, 408, 429, 500, 502, 503, 504].includes(status)) {
    return true;
  }

  const haystack = [
    error?.name,
    error?.code,
    error?.type,
    error?.message,
    error?.cause?.code,
    error?.cause?.message,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return [
    "invalid api key",
    "billing",
    "quota",
    "insufficient_quota",
    "api connection",
    "network",
    "timeout",
    "timed out",
    "socket hang up",
    "fetch failed",
    "enotfound",
    "econnreset",
    "apierror",
    "apiconnectionerror",
    "apitimeouterror",
  ].some((term) => haystack.includes(term));
};

const logDemoFallback = (reason, error, intent) => {
  console.warn("[assistant] Falling back to demo mode.", {
    reason,
    intent,
    name: error?.name,
    code: error?.code,
    status: error?.status || error?.statusCode || error?.response?.status,
    message: error?.message,
  });
};

export const generateAssistantReply = async ({ messages, email }) => {
  const currentMessage = messages[messages.length - 1]?.content || "";
  const configuredDemoReason = getConfiguredDemoReason();

  if (configuredDemoReason) {
    const demoReply = generateDemoReply(currentMessage, messages);

    return {
      content: demoReply.content,
      assistant: getAssistantStatus({
        mode: "demo",
        reason: configuredDemoReason,
      }),
    };
  }

  try {
    const content = await generateOpenAIReply({ messages, email });
    setLastKnownRuntimeStatus({ mode: "live", reason: null });

    return {
      content,
      assistant: getAssistantStatus({ mode: "live" }),
    };
  } catch (error) {
    if (!shouldUseDemoMode(error)) {
      throw error;
    }

    const fallbackReason = classifyOpenAIError(error);
    const demoReply = generateDemoReply(currentMessage, messages);

    logDemoFallback(fallbackReason, error, demoReply.intent);
    setLastKnownRuntimeStatus({
      mode: "demo",
      reason: fallbackReason,
    });

    return {
      content: demoReply.content,
      assistant: getAssistantStatus({
        mode: "demo",
        reason: fallbackReason,
      }),
    };
  }
};
