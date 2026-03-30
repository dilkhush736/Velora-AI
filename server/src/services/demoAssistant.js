const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "please",
  "the",
  "this",
  "to",
  "we",
  "what",
  "when",
  "why",
  "with",
  "you",
  "your",
]);

const TOPIC_LIBRARY = [
  {
    key: "dbms",
    aliases: ["dbms", "database management system", "database"],
    summary:
      "A DBMS is software that stores, organizes, updates, and retrieves data efficiently while keeping it consistent and secure.",
    points: [
      "It lets multiple users or applications work with the same data in a structured way.",
      "Common features include queries, indexing, security, backup, and concurrency control.",
      "Examples include MySQL, PostgreSQL, MongoDB, and SQL Server.",
    ],
    example: "A college portal uses a DBMS to manage students, courses, marks, and attendance.",
  },
  {
    key: "os",
    aliases: ["os", "operating system", "operating systems"],
    summary:
      "An operating system manages hardware resources and provides services so applications can run safely and efficiently.",
    points: [
      "It handles memory, processes, files, devices, and scheduling.",
      "It acts as a bridge between the user, the software, and the hardware.",
      "Examples include Windows, Linux, macOS, Android, and iOS.",
    ],
    example: "When you open a browser, the OS allocates memory, CPU time, and access to files and networking.",
  },
  {
    key: "oop",
    aliases: ["oop", "oops", "object oriented programming", "object-oriented programming"],
    summary:
      "Object-oriented programming organizes code around objects that combine data and behavior.",
    points: [
      "The main ideas are encapsulation, inheritance, polymorphism, and abstraction.",
      "It helps model real-world entities and keeps larger codebases easier to manage.",
      "Languages like Java, C++, Python, and JavaScript support OOP concepts.",
    ],
    example: "A `User` object can store name and email and also expose methods like `login()`.",
  },
  {
    key: "dsa",
    aliases: ["dsa", "data structures and algorithms", "algorithm", "algorithms"],
    summary:
      "DSA is about choosing the right way to store data and the right steps to process it efficiently.",
    points: [
      "Data structures include arrays, linked lists, stacks, queues, trees, and hash maps.",
      "Algorithms describe how to search, sort, update, or transform data.",
      "Time and space complexity matter because they affect performance.",
    ],
    example: "A hash map is useful when you need fast lookups by key.",
  },
  {
    key: "computer networks",
    aliases: ["computer networks", "networking", "networks", "tcp ip", "tcp/ip", "http"],
    summary:
      "Computer networks let devices communicate by following agreed rules called protocols.",
    points: [
      "Important ideas include IP addressing, routing, transport, and application protocols.",
      "HTTP is used for web communication, while TCP focuses on reliable data delivery.",
      "Networking is the foundation for web apps, cloud systems, and distributed services.",
    ],
    example: "When a browser loads a page, DNS, TCP, and HTTP all work together.",
  },
  {
    key: "html",
    aliases: ["html", "hypertext markup language"],
    summary:
      "HTML gives a webpage its structure by defining elements such as headings, paragraphs, images, links, and forms.",
    points: [
      "Think of HTML as the skeleton of a webpage.",
      "Semantic tags like `header`, `main`, and `section` improve accessibility and clarity.",
      "HTML works together with CSS for styling and JavaScript for behavior.",
    ],
    example: "`<button>Send</button>` creates a clickable button.",
  },
  {
    key: "css",
    aliases: ["css", "cascading style sheets"],
    summary:
      "CSS controls how HTML looks by handling layout, color, spacing, animation, and responsive design.",
    points: [
      "Selectors choose which elements to style.",
      "Box model, flexbox, and grid are core layout tools.",
      "Media queries help designs adapt to mobile and desktop screens.",
    ],
    example: "`display: flex` is commonly used to align items in a row or column.",
  },
  {
    key: "javascript",
    aliases: ["javascript", "js", "ecmascript"],
    summary:
      "JavaScript adds logic and interactivity to websites and is also widely used on the server with Node.js.",
    points: [
      "It supports variables, functions, objects, arrays, async code, and DOM updates.",
      "Modern JavaScript uses features like `let`, `const`, arrow functions, and async/await.",
      "It is a core language for frontend, backend, and full-stack development.",
    ],
    example: "`document.querySelector('button')` can select a button and attach a click handler.",
  },
  {
    key: "react",
    aliases: ["react", "reactjs", "react.js"],
    summary:
      "React is a JavaScript library for building user interfaces from reusable components.",
    points: [
      "Components return UI and can manage data with props and state.",
      "React updates the UI efficiently when state changes.",
      "It is commonly used for single-page applications and dashboards.",
    ],
    example: "A `Counter` component can store a number in state and update it when a button is clicked.",
  },
  {
    key: "node",
    aliases: ["node", "node.js", "nodejs"],
    summary:
      "Node.js is a JavaScript runtime that lets you run JavaScript outside the browser, especially for backend services.",
    points: [
      "It is well suited for APIs, real-time apps, and tooling.",
      "It uses an event-driven, non-blocking model that handles I/O efficiently.",
      "It often works with Express for web servers and APIs.",
    ],
    example: "A Node server can accept HTTP requests and return JSON responses.",
  },
  {
    key: "express",
    aliases: ["express", "express.js", "expressjs"],
    summary:
      "Express is a lightweight Node.js framework for building web servers and APIs.",
    points: [
      "It helps define routes, middleware, and request handlers clearly.",
      "It is commonly used in MERN apps to power backend APIs.",
      "Middleware handles tasks like auth, logging, and validation.",
    ],
    example: "`app.get('/api/users', handler)` creates a route that returns user data.",
  },
  {
    key: "mongodb",
    aliases: ["mongodb", "mongo", "mongoose"],
    summary:
      "MongoDB is a NoSQL database that stores data in flexible JSON-like documents.",
    points: [
      "It is useful when your data structure may evolve over time.",
      "Collections are similar to tables, and documents are similar to rows.",
      "Mongoose is a popular ODM used with Node.js to define schemas and models.",
    ],
    example: "A chat app can store each conversation as a document with a list of messages.",
  },
  {
    key: "mern",
    aliases: ["mern", "mern stack"],
    summary:
      "MERN stands for MongoDB, Express, React, and Node.js, a common full-stack JavaScript setup.",
    points: [
      "React handles the frontend UI.",
      "Node and Express handle the backend API.",
      "MongoDB stores application data.",
    ],
    example: "A task app can use React for the dashboard, Express for routes, and MongoDB for task storage.",
  },
  {
    key: "api",
    aliases: ["api", "apis", "application programming interface", "rest api"],
    summary:
      "An API is a defined way for one software system to communicate with another.",
    points: [
      "In web development, APIs usually send and receive JSON over HTTP.",
      "Common methods include GET, POST, PUT, PATCH, and DELETE.",
      "A good API has clear routes, predictable responses, and proper error handling.",
    ],
    example: "A frontend app can call `/api/chats` to fetch saved conversations.",
  },
  {
    key: "json",
    aliases: ["json"],
    summary:
      "JSON is a text format used to store and exchange structured data in key-value form.",
    points: [
      "It is easy for humans to read and easy for machines to parse.",
      "Strings use double quotes, and values can be objects, arrays, numbers, booleans, or null.",
      "JSON is the standard format for many APIs.",
    ],
    example: '`{"name":"Ava","role":"student"}` is valid JSON.',
  },
  {
    key: "dom",
    aliases: ["dom", "document object model"],
    summary:
      "The DOM is the browser's object representation of an HTML page, which JavaScript can read and update.",
    points: [
      "Each HTML element becomes a node in the DOM tree.",
      "JavaScript can change text, styles, and attributes by targeting nodes.",
      "Events like clicks and keypresses are handled through the DOM.",
    ],
    example: "Changing a heading's text with JavaScript updates the DOM.",
  },
  {
    key: "async await",
    aliases: ["async await", "async/await", "await", "promise", "promises"],
    summary:
      "Async/await is a cleaner way to work with asynchronous code built on top of promises.",
    points: [
      "`async` makes a function return a promise.",
      "`await` pauses inside an async function until the promise settles.",
      "It usually makes API and database code easier to read than chained `.then()` calls.",
    ],
    example: "`const data = await fetch('/api/items')` waits for the response before continuing.",
  },
  {
    key: "closure",
    aliases: ["closure", "closures"],
    summary:
      "A closure happens when a function remembers variables from the place where it was created.",
    points: [
      "It lets inner functions keep access to outer variables even after the outer function finishes.",
      "Closures are useful for private state, callbacks, and function factories.",
      "They are common in JavaScript interviews and real applications.",
    ],
    example: "A counter function can keep track of its own count without using a global variable.",
  },
  {
    key: "hoisting",
    aliases: ["hoisting"],
    summary:
      "Hoisting is JavaScript's behavior of processing declarations before code execution in their scope.",
    points: [
      "Function declarations are fully hoisted.",
      "`var` is hoisted but initialized as `undefined`.",
      "`let` and `const` are hoisted too, but cannot be used before initialization because of the temporal dead zone.",
    ],
    example: "Calling a function declaration before it appears in the file still works.",
  },
  {
    key: "git",
    aliases: ["git", "version control", "github"],
    summary:
      "Git is a version control system that tracks changes in code and makes collaboration safer.",
    points: [
      "It lets you create branches, review changes, and restore older versions.",
      "Commits capture meaningful checkpoints in a project.",
      "GitHub hosts repositories and adds pull requests, issues, and team workflows.",
    ],
    example: "You can build a feature on a branch and merge it only after review.",
  },
];

const LIVE_DATA_PATTERNS = [
  /\bweather\b/i,
  /\bnews\b/i,
  /\bscore\b/i,
  /\bstock price\b/i,
  /\bcrypto price\b/i,
  /\bexchange rate\b/i,
  /\blive\b/i,
  /\bright now\b/i,
  /\btoday'?s\b/i,
  /\blatest\b/i,
  /\bcurrent price\b/i,
];

const ERROR_GUIDES = [
  {
    name: "Cannot read properties of undefined",
    patterns: [/cannot read (properties|property) of undefined/i, /undefined.*reading/i],
    causes: [
      "A variable or API response is missing the object you expected.",
      "The value exists later, but your code is reading it too early.",
      "A prop, function argument, or state field is undefined in one code path.",
    ],
    steps: [
      "Log the value just before the failing line.",
      "Add optional chaining or a guard clause if the value can be missing.",
      "Trace where that value is supposed to be created or passed in.",
    ],
  },
  {
    name: "is not defined",
    patterns: [/is not defined/i, /referenceerror/i],
    causes: [
      "The variable name is misspelled.",
      "The variable is outside the current scope.",
      "The import, declaration, or script load is missing.",
    ],
    steps: [
      "Check spelling and letter casing carefully.",
      "Confirm the variable is declared before use.",
      "If it comes from another file, verify the import/export path.",
    ],
  },
  {
    name: "Module not found",
    patterns: [/module not found/i, /cannot find module/i, /failed to resolve import/i],
    causes: [
      "The file path is wrong or uses the wrong letter casing.",
      "The package is not installed.",
      "The export name or file extension does not match what you imported.",
    ],
    steps: [
      "Recheck the import path from the current file's location.",
      "Verify the package exists in `package.json` and `node_modules`.",
      "Confirm the target file exports what you are importing.",
    ],
  },
  {
    name: "CORS",
    patterns: [/\bcors\b/i, /cross-origin/i],
    causes: [
      "The backend is not allowing the frontend origin.",
      "Credentials or headers are blocked by the server's CORS config.",
      "The request method is not included in allowed methods.",
    ],
    steps: [
      "Check the server's `origin`, `credentials`, and allowed headers.",
      "Make sure the frontend URL matches the backend allowlist exactly.",
      "Inspect the browser network panel for the preflight request result.",
    ],
  },
  {
    name: "EADDRINUSE",
    patterns: [/eaddrinuse/i, /address already in use/i],
    causes: [
      "Another process is already using that port.",
      "A previous dev server did not shut down cleanly.",
    ],
    steps: [
      "Stop the old server process or change the port.",
      "Restart the app after freeing the port.",
      "If it keeps happening, check for duplicate start commands.",
    ],
  },
  {
    name: "Unexpected token",
    patterns: [/unexpected token/i, /syntaxerror/i],
    causes: [
      "There is a missing comma, bracket, parenthesis, or quote.",
      "A file is being parsed as the wrong format.",
      "Template string or JSX syntax is malformed.",
    ],
    steps: [
      "Look at the exact line and the line just above it.",
      "Check opening and closing brackets in pairs.",
      "Reduce the block to a smaller example until the syntax issue becomes obvious.",
    ],
  },
  {
    name: "MongoDB validation",
    patterns: [/validation failed/i, /cast to objectid failed/i, /mongooseerror/i],
    causes: [
      "A required field is missing or has the wrong type.",
      "An ID value is not in a valid MongoDB ObjectId format.",
      "The request body does not match the schema definition.",
    ],
    steps: [
      "Log the request payload before saving.",
      "Compare it against the Mongoose schema field by field.",
      "Validate IDs before querying and return a clear 400 response for bad input.",
    ],
  },
];

const normalizeText = (value = "") => value.replace(/\s+/g, " ").trim();

const toLower = (value = "") => normalizeText(value).toLowerCase();

const hashText = (value = "") => {
  let hash = 0;

  for (const character of value) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }

  return hash;
};

const pickVariant = (variants, seed) => variants[hashText(seed) % variants.length];

const sentenceCase = (value = "") => {
  const trimmed = normalizeText(value);

  if (!trimmed) {
    return "";
  }

  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

const getRecentMessages = (chatHistory = [], limit = 6) =>
  Array.isArray(chatHistory) ? chatHistory.slice(-limit) : [];

const getPreviousUserMessage = (chatHistory = []) => {
  const userMessages = (Array.isArray(chatHistory) ? chatHistory : []).filter(
    (message) => message?.role === "user" && typeof message?.content === "string"
  );

  return userMessages.length > 1 ? userMessages[userMessages.length - 2].content : "";
};

const getLastAssistantMessage = (chatHistory = []) => {
  const assistantMessages = (Array.isArray(chatHistory) ? chatHistory : []).filter(
    (message) => message?.role === "assistant" && typeof message?.content === "string"
  );

  return assistantMessages.length > 0
    ? assistantMessages[assistantMessages.length - 1].content
    : "";
};

const splitSentences = (text = "") =>
  normalizeText(text)
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

const shortenText = (text = "", maxLength = 180) => {
  const trimmed = normalizeText(text);

  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`;
};

const wantsDetailedAnswer = (message = "") =>
  /\b(detail|detailed|deep dive|deeply|elaborate|thorough|advanced)\b/i.test(message);

const wantsBriefAnswer = (message = "") =>
  /\b(short|brief|quick|simple|one line|few lines|summary|concise)\b/i.test(message);

const detectTopic = (text = "") => {
  const lowerText = toLower(text);
  let bestMatch = null;

  for (const topic of TOPIC_LIBRARY) {
    const matches = topic.aliases.reduce((count, alias) => {
      const aliasPattern = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`\\b${aliasPattern}\\b`, "gi");
      const occurrences = lowerText.match(pattern);
      return count + (occurrences ? occurrences.length : 0);
    }, 0);

    if (!matches) {
      continue;
    }

    if (!bestMatch || matches > bestMatch.score) {
      bestMatch = {
        topic,
        score: matches,
      };
    }
  }

  return bestMatch?.topic || null;
};

const detectComparisonTopics = (message = "") => {
  const lowerMessage = toLower(message);
  const matchedTopics = TOPIC_LIBRARY.filter((topic) =>
    topic.aliases.some((alias) => lowerMessage.includes(alias))
  );

  if (matchedTopics.length < 2) {
    return [];
  }

  return matchedTopics.slice(0, 2);
};

const isGreeting = (message = "") =>
  /^(hi|hello|hey|good morning|good afternoon|good evening)\b/i.test(normalizeText(message));

const isIntroductionRequest = (message = "") =>
  /\b(who are you|introduce yourself|what can you do|tell me about yourself)\b/i.test(message);

const isCasualChat = (message = "") =>
  /\b(how are you|how's it going|what's up|thank you|thanks|nice|cool)\b/i.test(message);

const isSummaryRequest = (message = "") =>
  /\b(summarize|summarise|summary of|tl;dr|shorten this|brief this)\b/i.test(message);

const isWritingRequest = (message = "") =>
  /\b(write|draft|rephrase|rewrite|improve this|professional message|email|resume|cover letter|application)\b/i.test(
    message
  );

const isProjectIdeasRequest = (message = "") =>
  /\b(project idea|project ideas|mini project|portfolio project|app idea|startup idea)\b/i.test(
    message
  );

const isInterviewRequest = (message = "") =>
  /\b(interview question|interview prep|mock interview|hr question|technical question)\b/i.test(
    message
  );

const isPlanningRequest = (message = "") =>
  /\b(plan|roadmap|step by step|steps|how to start|study plan|productivity|schedule|timeline)\b/i.test(
    message
  );

const isStudyRequest = (message = "") =>
  /\b(study|exam|notes|revision|short notes|dbms|operating system|oops|dsa|computer network)\b/i.test(
    message
  );

const isCodingRequest = (message = "") =>
  /\b(code|coding|program|function|script|algorithm|react|node|express|mongodb|html|css|javascript|js|mern|api)\b/i.test(
    message
  );

const isDebugRequest = (message = "") =>
  /\b(error|bug|debug|not working|issue|exception|stack trace|fails|failing)\b/i.test(message) ||
  /```/.test(message);

const isMathRequest = (message = "") => {
  if (
    /\b(calculate|solve|what is|evaluate|percentage|percent)\b/i.test(message) &&
    /\d/.test(message)
  ) {
    return true;
  }

  return /^\s*[-+()0-9/*x÷^%. ]+\s*$/.test(normalizeText(message));
};

const asksForRealTimeData = (message = "") =>
  LIVE_DATA_PATTERNS.some((pattern) => pattern.test(message));

const extractTopicPhrase = (message = "") => {
  const trimmed = normalizeText(
    message
      .replace(/\b(explain|what is|define|tell me about|how does|difference between)\b/gi, "")
      .replace(/\b(in simple words|for beginners|briefly|in short)\b/gi, "")
      .replace(/[?]/g, "")
  );

  return shortenText(trimmed, 72);
};

const extractRequestBody = (message = "") => {
  const colonMatch = message.match(/:\s*([\s\S]+)/);

  if (colonMatch?.[1] && normalizeText(colonMatch[1]).length >= 12) {
    return normalizeText(colonMatch[1]);
  }

  const lineParts = message.split(/\r?\n/).slice(1).join(" ").trim();

  if (lineParts.length >= 12) {
    return normalizeText(lineParts);
  }

  const quoteMatch = message.match(/["“'`](.{12,})["”'`]/);

  if (quoteMatch?.[1]) {
    return normalizeText(quoteMatch[1]);
  }

  return "";
};

const buildWordFrequency = (text = "") => {
  const words = toLower(text)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word && !STOP_WORDS.has(word));

  return words.reduce((accumulator, word) => {
    accumulator[word] = (accumulator[word] || 0) + 1;
    return accumulator;
  }, {});
};

const summarizeText = (text = "", maxSentences = 3) => {
  const sentences = splitSentences(text);

  if (sentences.length <= maxSentences) {
    return sentences;
  }

  const frequencies = buildWordFrequency(text);
  const scored = sentences.map((sentence, index) => {
    const words = toLower(sentence)
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word && !STOP_WORDS.has(word));

    const score = words.reduce((total, word) => total + (frequencies[word] || 0), 0);

    return {
      sentence,
      index,
      score,
    };
  });

  return scored
    .sort((left, right) => right.score - left.score)
    .slice(0, maxSentences)
    .sort((left, right) => left.index - right.index)
    .map((item) => item.sentence);
};

const buildList = (items = [], ordered = false) =>
  items
    .filter(Boolean)
    .map((item, index) => `${ordered ? `${index + 1}.` : "-"} ${item}`)
    .join("\n");

const normalizeArithmeticExpression = (message = "") =>
  normalizeText(
    message
      .toLowerCase()
      .replace(/\bwhat is\b/g, "")
      .replace(/\bcalculate\b/g, "")
      .replace(/\bevaluate\b/g, "")
      .replace(/\bsolve\b/g, "")
      .replace(/\bplus\b/g, "+")
      .replace(/\bminus\b/g, "-")
      .replace(/\bmultiplied by\b/g, "*")
      .replace(/\btimes\b/g, "*")
      .replace(/\bx\b/g, "*")
      .replace(/÷/g, "/")
      .replace(/\bdivided by\b/g, "/")
      .replace(/\bover\b/g, "/")
      .replace(/\bpower of\b/g, "^")
      .replace(/\bto the power of\b/g, "^")
      .replace(/[=?!]/g, "")
  );

const evaluateMath = (message = "") => {
  const percentageMatch = message.match(/(\d+(?:\.\d+)?)\s*%\s*of\s*(\d+(?:\.\d+)?)/i);

  if (percentageMatch) {
    const value = (Number(percentageMatch[1]) / 100) * Number(percentageMatch[2]);
    return {
      expression: `${percentageMatch[1]}% of ${percentageMatch[2]}`,
      result: value,
    };
  }

  const expression = normalizeArithmeticExpression(message)
    .replace(/(\d+(?:\.\d+)?)%/g, "($1/100)")
    .replace(/\^/g, "**");

  if (!expression || /[^0-9+\-*/().\s*]/.test(expression) || !/\d/.test(expression)) {
    return null;
  }

  try {
    const result = Function(`"use strict"; return (${expression});`)();

    if (!Number.isFinite(result)) {
      return null;
    }

    return {
      expression: shortenText(expression, 48),
      result,
    };
  } catch (error) {
    return null;
  }
};

const explainTopic = (topic, message) => {
  if (!topic) {
    return "";
  }

  const wantsBrief = wantsBriefAnswer(message);
  const wantsDetail = wantsDetailedAnswer(message);
  const pointCount = wantsBrief ? 2 : wantsDetail ? 3 : 3;

  return [
    topic.summary,
    "",
    buildList(topic.points.slice(0, pointCount)),
    "",
    `Example: ${topic.example}`,
  ]
    .filter(Boolean)
    .join("\n");
};

const buildComparisonReply = (topics, message) => {
  if (topics.length < 2) {
    return "";
  }

  const [left, right] = topics;

  return [
    `${left.aliases[0].toUpperCase()} and ${right.aliases[0].toUpperCase()} solve different problems:`,
    "",
    buildList([
      `${left.aliases[0].toUpperCase()}: ${left.summary}`,
      `${right.aliases[0].toUpperCase()}: ${right.summary}`,
      `Use ${left.aliases[0].toUpperCase()} when the task is closer to ${shortenText(
        left.example.replace(/^.*?uses?/i, "").replace(/^.*?can/i, ""),
        56
      )}.`,
      `Use ${right.aliases[0].toUpperCase()} when the task is closer to ${shortenText(
        right.example.replace(/^.*?uses?/i, "").replace(/^.*?can/i, ""),
        56
      )}.`,
    ]),
    wantsDetailedAnswer(message)
      ? ""
      : "If you want, I can also give you a simple interview-style difference table.",
  ]
    .filter(Boolean)
    .join("\n");
};

const extractTopicFromRecentContext = (message, chatHistory) => {
  const recentText = getRecentMessages(chatHistory)
    .map((item) => item?.content || "")
    .join(" ");

  return detectTopic(`${message} ${recentText}`);
};

const buildContext = (message, chatHistory) => {
  const previousUserMessage = getPreviousUserMessage(chatHistory);
  const previousAssistantMessage = getLastAssistantMessage(chatHistory);
  const topic = extractTopicFromRecentContext(message, chatHistory);
  const comparisonTopics = detectComparisonTopics(message);

  return {
    message: normalizeText(message),
    previousUserMessage,
    previousAssistantMessage,
    recentMessages: getRecentMessages(chatHistory),
    topic,
    comparisonTopics,
    wantsBrief: wantsBriefAnswer(message),
    wantsDetail: wantsDetailedAnswer(message),
  };
};

const detectIntent = (context) => {
  const { message, previousAssistantMessage, topic } = context;

  if (asksForRealTimeData(message)) {
    return "live_data";
  }

  if (
    /\b(shorter|make it short|brief version|simplify that|simple words)\b/i.test(message) &&
    previousAssistantMessage
  ) {
    return "follow_up_transform";
  }

  if (isMathRequest(message)) {
    return "math";
  }

  if (isSummaryRequest(message)) {
    return "summary";
  }

  if (isGreeting(message)) {
    return "greeting";
  }

  if (isIntroductionRequest(message)) {
    return "introduction";
  }

  if (isProjectIdeasRequest(message)) {
    return "project_ideas";
  }

  if (isInterviewRequest(message)) {
    return "interview";
  }

  if (isWritingRequest(message)) {
    return "writing";
  }

  if (isCasualChat(message)) {
    return "casual_chat";
  }

  if (isDebugRequest(message)) {
    return "debugging";
  }

  if (isPlanningRequest(message)) {
    return "planning";
  }

  if (isStudyRequest(message)) {
    return "study";
  }

  if (isCodingRequest(message) || topic?.key) {
    return topic?.key === "html" ||
      topic?.key === "css" ||
      topic?.key === "javascript" ||
      topic?.key === "react" ||
      topic?.key === "node" ||
      topic?.key === "express" ||
      topic?.key === "mongodb" ||
      topic?.key === "mern"
      ? "web_dev"
      : "coding";
  }

  if (/\b(what is|define|meaning of|explain|difference between|tell me about)\b/i.test(message)) {
    return "definition";
  }

  return "general";
};

const generateGreetingReply = (context) =>
  pickVariant(
    [
      "Hi. What do you want help with right now?",
      "Hello. I can help with study topics, coding basics, writing, summaries, and planning.",
      context.topic
        ? `Hey. If you want, we can continue with ${context.topic.aliases[0].toUpperCase()} or switch to something else.`
        : "Hey. Send a question, a bug, or some text to work on.",
    ],
    context.message
  );

const generateIntroductionReply = () =>
  [
    "I'm Velora's built-in demo assistant.",
    "I can still help with coding basics, debugging steps, study notes, writing, summaries, project ideas, and simple math.",
    "I do not have live web or real-time account access in demo mode.",
  ].join(" ");

const generateCasualReply = (context) => {
  if (/\bthank/i.test(context.message)) {
    return pickVariant(
      [
        "You're welcome. If you want, I can also make the answer shorter or turn it into steps.",
        "You're welcome. Send the next question whenever you're ready.",
        "Happy to help. I can also turn it into notes, bullets, or an example if that would be useful.",
      ],
      context.message
    );
  }

  if (/\bhow are you|how's it going/i.test(context.message)) {
    return "Doing well and ready to help. What are you working on?";
  }

  return "I'm here. Tell me the task or question and I'll work through it with you.";
};

const generateLiveDataReply = (context) => {
  const topicPhrase = extractTopicPhrase(context.message);

  return [
    "The app is currently in demo mode, so I can't check live or real-time data.",
    topicPhrase
      ? `If you paste the latest details about ${topicPhrase}, I can still explain them or help you decide what to do next.`
      : "If you paste the latest details, I can still explain them or help you decide what to do next.",
  ].join(" ");
};

const generateFollowUpTransformReply = (context) => {
  const previousReply = context.previousAssistantMessage;
  const maxSentences = /\b(shorter|brief)\b/i.test(context.message) ? 2 : 3;
  const summary = summarizeText(previousReply, maxSentences);

  if (/\b(simple|simplify|easy words)\b/i.test(context.message)) {
    return [
      "Here is the simpler version:",
      "",
      buildList(summary.map((sentence) => sentenceCase(shortenText(sentence, 140)))),
    ].join("\n");
  }

  return [
    "Short version:",
    "",
    buildList(summary.map((sentence) => sentenceCase(shortenText(sentence, 140)))),
  ].join("\n");
};

const generateMathReply = (context) => {
  const solved = evaluateMath(context.message);

  if (!solved) {
    return "I can handle basic arithmetic and percentages in demo mode. Try something like `245 / 5`, `18% of 250`, or `(12 + 8) * 3`.";
  }

  const result =
    Number.isInteger(solved.result) || Math.abs(solved.result) >= 100
      ? solved.result.toString()
      : solved.result.toFixed(4).replace(/\.?0+$/, "");

  return [
    `Result: **${result}**`,
    "",
    `Expression: \`${solved.expression}\``,
  ].join("\n");
};

const generateSummaryReply = (context) => {
  const requestedText = extractRequestBody(context.message) || context.previousAssistantMessage;

  if (!requestedText) {
    return "Paste the text you want summarized, and I will compress it into a short paragraph or bullets.";
  }

  const summary = summarizeText(requestedText, context.wantsBrief ? 2 : 3);

  return [
    "Summary:",
    "",
    buildList(summary.map((sentence) => sentenceCase(shortenText(sentence, 160)))),
  ].join("\n");
};

const buildResumeSummary = (context, details) => {
  const topic = context.topic?.aliases[0] || "web development";
  const detailHint = details ? shortenText(details, 120) : `student or early-career candidate with interest in ${topic}`;

  return [
    "Resume summary:",
    "",
    `${sentenceCase(
      `motivated ${detailHint} focused on building practical projects, learning quickly, and contributing with clear communication and problem-solving`
    )}.`,
  ].join("\n");
};

const buildEmailDraft = (message, details) => {
  const isLeave = /\bleave|day off|absence\b/i.test(message);
  const isApplication = /\bapplication|apply|job\b/i.test(message);
  const subject = isLeave
    ? "Subject: Leave Request"
    : isApplication
      ? "Subject: Application Follow-Up"
      : "Subject: Quick Update";

  const body = isLeave
    ? [
        "Hi [Name],",
        "",
        "I would like to request leave for [date or dates]. Please let me know if you need any additional information from me.",
        "",
        "Thank you,",
        "[Your Name]",
      ]
    : isApplication
      ? [
          "Hi [Name],",
          "",
          "I hope you are doing well. I am writing to follow up on my application and to express my continued interest in the opportunity.",
          details ? sentenceCase(details) : "Please let me know if any further information would be helpful.",
          "",
          "Best regards,",
          "[Your Name]",
        ]
      : [
          "Hi [Name],",
          "",
          details
            ? sentenceCase(details)
            : "I wanted to share a quick update and keep you in the loop.",
          "",
          "Best,",
          "[Your Name]",
        ];

  return [subject, "", ...body].join("\n");
};

const buildProfessionalMessage = (details) =>
  [
    "Professional message:",
    "",
    details
      ? sentenceCase(details)
      : "Hi, I wanted to check in and share a quick update. Please let me know if you need anything else from me.",
  ].join("\n");

const buildRewriteReply = (details) => {
  if (!details) {
    return "Paste the text you want rewritten, and I will make it cleaner and more professional.";
  }

  const summary = summarizeText(details, 2).join(" ");

  return [
    "Polished rewrite:",
    "",
    sentenceCase(summary || details),
  ].join("\n");
};

const generateWritingReply = (context) => {
  const details = extractRequestBody(context.message);

  if (/\bresume summary\b/i.test(context.message)) {
    return buildResumeSummary(context, details);
  }

  if (/\bemail|mail\b/i.test(context.message)) {
    return buildEmailDraft(context.message, details);
  }

  if (/\brewrite|rephrase|improve this\b/i.test(context.message)) {
    return buildRewriteReply(details || context.previousAssistantMessage);
  }

  if (/\bmessage|application|letter\b/i.test(context.message)) {
    return buildProfessionalMessage(details);
  }

  return [
    "Writing draft:",
    "",
    details
      ? sentenceCase(details)
      : "Tell me the goal, tone, and audience, and I can draft the message for you.",
  ].join("\n");
};

const buildMongoConnectionReply = () =>
  [
    "To connect MongoDB in a Node app, the usual flow is:",
    "",
    buildList(
      [
        "Install `mongoose`.",
        "Store your connection string in an environment variable like `MONGODB_URI`.",
        "Call `mongoose.connect(process.env.MONGODB_URI)` when the server starts.",
        "Handle connection errors clearly so the app does not fail silently.",
      ],
      true
    ),
    "",
    "Example:",
    "",
    "```js",
    'import mongoose from "mongoose";',
    "",
    "await mongoose.connect(process.env.MONGODB_URI);",
    'console.log("MongoDB connected");',
    "```",
  ].join("\n");

const buildReactVsNodeReply = () =>
  [
    "React and Node.js are not competitors. They usually work together.",
    "",
    buildList([
      "React: builds the frontend UI in the browser.",
      "Node.js: runs JavaScript on the server.",
      "In a MERN app, React handles screens and interactions, while Node handles APIs and backend logic.",
    ]),
  ].join("\n");

const buildSimpleCodeExample = (topic) => {
  if (!topic) {
    return "";
  }

  if (topic.key === "react") {
    return [
      "Example:",
      "",
      "```jsx",
      "import { useState } from \"react\";",
      "",
      "export default function Counter() {",
      "  const [count, setCount] = useState(0);",
      "",
      "  return (",
      "    <button onClick={() => setCount(count + 1)}>",
      "      Count: {count}",
      "    </button>",
      "  );",
      "}",
      "```",
    ].join("\n");
  }

  if (topic.key === "node" || topic.key === "express") {
    return [
      "Example:",
      "",
      "```js",
      "import express from \"express\";",
      "",
      "const app = express();",
      "",
      "app.get(\"/api/hello\", (req, res) => {",
      "  res.json({ message: \"Hello from the server\" });",
      "});",
      "",
      "app.listen(5000);",
      "```",
    ].join("\n");
  }

  if (topic.key === "html" || topic.key === "css") {
    return [
      "Example:",
      "",
      "```html",
      '<button class="cta-button">Send</button>',
      "```",
      "",
      "```css",
      ".cta-button {",
      "  padding: 12px 18px;",
      "  border-radius: 999px;",
      "  background: #3cc39e;",
      "  color: #08111f;",
      "}",
      "```",
    ].join("\n");
  }

  if (topic.key === "javascript") {
    return [
      "Example:",
      "",
      "```js",
      "const numbers = [1, 2, 3];",
      "const doubled = numbers.map((number) => number * 2);",
      "",
      "console.log(doubled); // [2, 4, 6]",
      "```",
    ].join("\n");
  }

  return "";
};

const generateStudyReply = (context) => {
  if (context.comparisonTopics.length >= 2) {
    return buildComparisonReply(context.comparisonTopics, context.message);
  }

  if (context.topic) {
    return explainTopic(context.topic, context.message);
  }

  const topicPhrase = extractTopicPhrase(context.message);

  return [
    topicPhrase
      ? `Here are beginner-friendly notes on ${topicPhrase}:`
      : "Here is a simple way to study the topic:",
    "",
    buildList([
      "Start with the definition in one line.",
      "List 3 to 5 core points.",
      "Add one real example or use case.",
      "Finish with why it matters in practice or in exams.",
    ]),
  ].join("\n");
};

const generateWebDevReply = (context) => {
  if (/react\s+vs\s+node|difference between react and node/i.test(context.message)) {
    return buildReactVsNodeReply();
  }

  if (/connect mongodb|mongodb connection|mongoose connect/i.test(context.message)) {
    return buildMongoConnectionReply();
  }

  if (context.comparisonTopics.length >= 2) {
    return buildComparisonReply(context.comparisonTopics, context.message);
  }

  if (context.topic) {
    const explanation = explainTopic(context.topic, context.message);
    const example = buildSimpleCodeExample(context.topic);

    return [explanation, example].filter(Boolean).join("\n\n");
  }

  return [
    "For beginner web development, focus on this order:",
    "",
    buildList(
      [
        "HTML for structure.",
        "CSS for styling and layout.",
        "JavaScript for logic and interaction.",
        "React for reusable UI components.",
        "Node, Express, and MongoDB for backend work.",
      ],
      true
    ),
  ].join("\n");
};

const generateCodingReply = (context) => {
  if (context.topic) {
    const explanation = explainTopic(context.topic, context.message);
    const example = buildSimpleCodeExample(context.topic);

    return [explanation, example].filter(Boolean).join("\n\n");
  }

  if (/\bwrite code|sample code|example code\b/i.test(context.message)) {
    return [
      "I can help with that. In demo mode, the best next step is to tell me:",
      "",
      buildList([
        "the language or stack",
        "what the code should do",
        "any input/output example",
      ]),
      "",
      "Then I can draft a cleaner example instead of guessing the requirements.",
    ].join("\n");
  }

  return [
    "A practical coding workflow is:",
    "",
    buildList(
      [
        "Understand the exact input and output.",
        "Write the smallest working version first.",
        "Test one example by hand.",
        "Only then refactor for readability.",
      ],
      true
    ),
  ].join("\n");
};

const generateDebuggingReply = (context) => {
  const guide = ERROR_GUIDES.find((item) =>
    item.patterns.some((pattern) => pattern.test(context.message))
  );

  if (guide) {
    return [
      `This looks like **${guide.name}**.`,
      "",
      "Likely causes:",
      buildList(guide.causes),
      "",
      "Next steps:",
      buildList(guide.steps, true),
    ].join("\n");
  }

  return [
    "A solid way to debug this is:",
    "",
    buildList(
      [
        "Read the exact error line and file first.",
        "Log the values going into the failing code path.",
        "Check whether the failure started after a recent code change.",
        "Reduce the problem to the smallest reproducible example.",
        "Fix the root cause, then retest the original scenario.",
      ],
      true
    ),
    "",
    "If you paste the error text or code snippet, I can narrow it down further.",
  ].join("\n");
};

const generateProjectIdeasReply = (context) => {
  const topic = context.topic?.key || "";
  const wantsBeginner = /\bbeginner|simple|easy|student\b/i.test(context.message);
  const ideas =
    topic === "react" || topic === "mern" || topic === "node"
      ? [
          "Task tracker with login, filters, and due dates.",
          "Expense tracker with charts and monthly summaries.",
          "Study planner with goals, revision sessions, and reminders.",
          "Portfolio blog with an admin panel to add projects.",
        ]
      : [
          "Smart study planner for students.",
          "Resume builder with downloadable sections.",
          "Habit tracker with streaks and weekly review.",
          "Simple help-desk ticket system for small teams.",
        ];

  const selectedIdeas = wantsBeginner ? ideas.slice(0, 3) : ideas;

  return [
    "Project ideas:",
    "",
    buildList(
      selectedIdeas.map((idea) => sentenceCase(idea)),
      true
    ),
    "",
    "If you want, I can turn one of these into features, a database schema, and a build roadmap.",
  ].join("\n");
};

const generateInterviewReply = (context) => {
  const topicName = context.topic?.aliases[0] || "web development";
  const questions =
    context.topic?.key === "react"
      ? [
          "What is the difference between props and state?",
          "Why does React use components?",
          "What happens when state changes?",
          "When would you use `useEffect`?",
          "What is the purpose of keys in lists?",
        ]
      : context.topic?.key === "mongodb"
        ? [
            "What is a document in MongoDB?",
            "How is MongoDB different from a relational database?",
            "What is the role of Mongoose in a Node app?",
            "When would you use indexing?",
            "Why do schema validations matter?",
          ]
        : [
            `What is ${topicName.toUpperCase()} in simple terms?`,
            `Why is ${topicName.toUpperCase()} useful?`,
            `What are the core concepts of ${topicName.toUpperCase()}?`,
            `Can you give one real example related to ${topicName.toUpperCase()}?`,
            `What mistakes do beginners often make with ${topicName.toUpperCase()}?`,
          ];

  return [
    `Interview questions for ${topicName.toUpperCase()}:`,
    "",
    buildList(questions, true),
    "",
    "If you want, I can also give short model answers for each one.",
  ].join("\n");
};

const generatePlanningReply = (context) => {
  const topicName = context.topic?.aliases[0] || extractTopicPhrase(context.message) || "your goal";

  if (/\bproductivity|schedule|time table|study plan\b/i.test(context.message)) {
    return [
      "A simple productivity plan:",
      "",
      buildList(
        [
          "Pick one clear outcome for the day.",
          "Break it into 2 or 3 focused work blocks.",
          "Start with the hardest task before small admin work.",
          "Review what was finished and prepare the next step before stopping.",
        ],
        true
      ),
    ].join("\n");
  }

  return [
    `Step-by-step roadmap for ${sentenceCase(topicName)}:`,
    "",
    buildList(
      [
        "Learn the basic concepts and vocabulary first.",
        "Build one very small example from scratch.",
        "Practice with one slightly more realistic project.",
        "Review mistakes, refactor, and repeat.",
        "Create a final project you can explain confidently.",
      ],
      true
    ),
  ].join("\n");
};

const generateDefinitionReply = (context) => {
  if (context.comparisonTopics.length >= 2) {
    return buildComparisonReply(context.comparisonTopics, context.message);
  }

  if (context.topic) {
    return explainTopic(context.topic, context.message);
  }

  const phrase = extractTopicPhrase(context.message);

  return phrase
    ? [
        `A simple way to think about ${phrase}:`,
        "",
        buildList([
          "What it is",
          "Why it matters",
          "Where it is used",
          "One small example",
        ]),
        "",
        "If you want, I can turn that into a beginner-friendly explanation or short notes.",
      ].join("\n")
    : "Tell me the exact topic or term, and I will explain it in simple words.";
};

const generateGeneralReply = (context) => {
  const phrase = extractTopicPhrase(context.message);

  return pickVariant(
    [
      phrase
        ? `I can help with that. A useful next step is to break **${phrase}** into the definition, the main idea, and one practical example. If you want, I can do that for you.`
        : "I can help with that. If you share a little more detail, I can turn it into an explanation, plan, summary, draft, or debugging checklist.",
      phrase
        ? `I may not have live external data in demo mode, but I can still give you an offline-style explanation of **${phrase}** or help you work through it step by step.`
        : "In demo mode I do best with explanations, writing, study help, coding basics, and structured plans.",
      "If the request needs live web data, I will say so. Otherwise, I can usually still help with a practical answer.",
    ],
    context.message
  );
};

export const generateDemoReply = (message, chatHistory = []) => {
  const context = buildContext(message, chatHistory);
  const intent = detectIntent(context);

  const generators = {
    greeting: generateGreetingReply,
    introduction: generateIntroductionReply,
    casual_chat: generateCasualReply,
    live_data: generateLiveDataReply,
    follow_up_transform: generateFollowUpTransformReply,
    math: generateMathReply,
    summary: generateSummaryReply,
    writing: generateWritingReply,
    project_ideas: generateProjectIdeasReply,
    interview: generateInterviewReply,
    planning: generatePlanningReply,
    study: generateStudyReply,
    web_dev: generateWebDevReply,
    coding: generateCodingReply,
    debugging: generateDebuggingReply,
    definition: generateDefinitionReply,
    general: generateGeneralReply,
  };

  const generator = generators[intent] || generateGeneralReply;
  const content = generator(context);

  return {
    intent,
    content,
  };
};
