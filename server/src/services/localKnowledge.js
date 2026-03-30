const normalizeWhitespace = (value = "") => value.replace(/\s+/g, " ").trim();

const normalizeLookup = (value = "") =>
  normalizeWhitespace(
    value
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(
        /\b(the|state|country|nation|city|union territory|ut|province|republic|kingdom)\b/g,
        " "
      )
  );

const toTitleCase = (value = "") =>
  normalizeWhitespace(value)
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const LOCATION_FACTS = [
  {
    name: "Bihar",
    capital: "Patna",
    kind: "state",
    aliases: ["bihar"],
  },
  {
    name: "Uttar Pradesh",
    capital: "Lucknow",
    kind: "state",
    aliases: ["uttar pradesh", "up"],
  },
  {
    name: "Maharashtra",
    capital: "Mumbai",
    kind: "state",
    aliases: ["maharashtra"],
  },
  {
    name: "West Bengal",
    capital: "Kolkata",
    kind: "state",
    aliases: ["west bengal", "bengal"],
  },
  {
    name: "Tamil Nadu",
    capital: "Chennai",
    kind: "state",
    aliases: ["tamil nadu"],
  },
  {
    name: "Karnataka",
    capital: "Bengaluru",
    kind: "state",
    aliases: ["karnataka", "bangalore state"],
  },
  {
    name: "Kerala",
    capital: "Thiruvananthapuram",
    kind: "state",
    aliases: ["kerala"],
  },
  {
    name: "Gujarat",
    capital: "Gandhinagar",
    kind: "state",
    aliases: ["gujarat"],
  },
  {
    name: "Rajasthan",
    capital: "Jaipur",
    kind: "state",
    aliases: ["rajasthan"],
  },
  {
    name: "Punjab",
    capital: "Chandigarh",
    kind: "state",
    aliases: ["punjab"],
  },
  {
    name: "Haryana",
    capital: "Chandigarh",
    kind: "state",
    aliases: ["haryana"],
  },
  {
    name: "Madhya Pradesh",
    capital: "Bhopal",
    kind: "state",
    aliases: ["madhya pradesh", "mp"],
  },
  {
    name: "Odisha",
    capital: "Bhubaneswar",
    kind: "state",
    aliases: ["odisha", "orissa"],
  },
  {
    name: "Assam",
    capital: "Dispur",
    kind: "state",
    aliases: ["assam"],
  },
  {
    name: "Jharkhand",
    capital: "Ranchi",
    kind: "state",
    aliases: ["jharkhand"],
  },
  {
    name: "Telangana",
    capital: "Hyderabad",
    kind: "state",
    aliases: ["telangana"],
  },
  {
    name: "Goa",
    capital: "Panaji",
    kind: "state",
    aliases: ["goa"],
  },
  {
    name: "Chhattisgarh",
    capital: "Raipur",
    kind: "state",
    aliases: ["chhattisgarh"],
  },
  {
    name: "Uttarakhand",
    capital: "Dehradun",
    kind: "state",
    aliases: ["uttarakhand", "uttaranchal"],
  },
  {
    name: "Himachal Pradesh",
    capital: "Shimla",
    kind: "state",
    aliases: ["himachal pradesh"],
  },
  {
    name: "Arunachal Pradesh",
    capital: "Itanagar",
    kind: "state",
    aliases: ["arunachal pradesh"],
  },
  {
    name: "Sikkim",
    capital: "Gangtok",
    kind: "state",
    aliases: ["sikkim"],
  },
  {
    name: "Meghalaya",
    capital: "Shillong",
    kind: "state",
    aliases: ["meghalaya"],
  },
  {
    name: "Nagaland",
    capital: "Kohima",
    kind: "state",
    aliases: ["nagaland"],
  },
  {
    name: "Mizoram",
    capital: "Aizawl",
    kind: "state",
    aliases: ["mizoram"],
  },
  {
    name: "Tripura",
    capital: "Agartala",
    kind: "state",
    aliases: ["tripura"],
  },
  {
    name: "Manipur",
    capital: "Imphal",
    kind: "state",
    aliases: ["manipur"],
  },
  {
    name: "Delhi",
    capital: "New Delhi",
    kind: "union territory",
    aliases: ["delhi", "new delhi", "nct of delhi"],
  },
  {
    name: "India",
    capital: "New Delhi",
    kind: "country",
    aliases: ["india", "bharat", "republic of india"],
  },
  {
    name: "United States",
    capital: "Washington, D.C.",
    kind: "country",
    aliases: ["united states", "united states of america", "usa", "us", "america"],
  },
  {
    name: "United Kingdom",
    capital: "London",
    kind: "country",
    aliases: ["united kingdom", "uk", "great britain", "britain"],
  },
  {
    name: "France",
    capital: "Paris",
    kind: "country",
    aliases: ["france"],
  },
  {
    name: "Germany",
    capital: "Berlin",
    kind: "country",
    aliases: ["germany"],
  },
  {
    name: "Italy",
    capital: "Rome",
    kind: "country",
    aliases: ["italy"],
  },
  {
    name: "Spain",
    capital: "Madrid",
    kind: "country",
    aliases: ["spain"],
  },
  {
    name: "Canada",
    capital: "Ottawa",
    kind: "country",
    aliases: ["canada"],
  },
  {
    name: "Australia",
    capital: "Canberra",
    kind: "country",
    aliases: ["australia"],
  },
  {
    name: "China",
    capital: "Beijing",
    kind: "country",
    aliases: ["china", "people s republic of china", "prc"],
  },
  {
    name: "Japan",
    capital: "Tokyo",
    kind: "country",
    aliases: ["japan"],
  },
  {
    name: "Russia",
    capital: "Moscow",
    kind: "country",
    aliases: ["russia", "russian federation"],
  },
  {
    name: "Brazil",
    capital: "Brasilia",
    kind: "country",
    aliases: ["brazil"],
  },
  {
    name: "Mexico",
    capital: "Mexico City",
    kind: "country",
    aliases: ["mexico"],
  },
  {
    name: "Nepal",
    capital: "Kathmandu",
    kind: "country",
    aliases: ["nepal"],
  },
  {
    name: "Bhutan",
    capital: "Thimphu",
    kind: "country",
    aliases: ["bhutan"],
  },
  {
    name: "Bangladesh",
    capital: "Dhaka",
    kind: "country",
    aliases: ["bangladesh"],
  },
  {
    name: "Pakistan",
    capital: "Islamabad",
    kind: "country",
    aliases: ["pakistan"],
  },
  {
    name: "Afghanistan",
    capital: "Kabul",
    kind: "country",
    aliases: ["afghanistan"],
  },
  {
    name: "United Arab Emirates",
    capital: "Abu Dhabi",
    kind: "country",
    aliases: ["united arab emirates", "uae"],
  },
];

const LOCATION_LOOKUP = new Map();

for (const location of LOCATION_FACTS) {
  for (const alias of location.aliases) {
    LOCATION_LOOKUP.set(normalizeLookup(alias), location);
  }
}

const extractCapitalTarget = (message = "") => {
  const trimmed = normalizeWhitespace(message);
  const patterns = [
    /\bcapital(?:\s+city)?\s+(?:of|for)\s+(.+?)(?:[.?!]|$)/i,
    /^\s*(.+?)\s+capital(?:\s+city)?\s*$/i,
    /^\s*capital(?:\s+city)?\s+(.+?)\s*$/i,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);

    if (!match?.[1]) {
      continue;
    }

    const target = normalizeWhitespace(
      match[1]
        .replace(/\bplease\b/gi, "")
        .replace(/\btell me\b/gi, "")
        .replace(/\bgive me\b/gi, "")
        .replace(/\bthe\b/gi, "")
    );

    if (target) {
      return target;
    }
  }

  return "";
};

const findLocation = (target = "") => {
  const normalizedTarget = normalizeLookup(target);

  if (!normalizedTarget) {
    return null;
  }

  return LOCATION_LOOKUP.get(normalizedTarget) || null;
};

const buildCapitalReply = (location) => {
  const mainLine = `The capital of ${location.name} is ${location.capital}.`;

  if (location.kind === "state" || location.kind === "union territory") {
    return `${mainLine} ${location.name} is in India.`;
  }

  return mainLine;
};

const buildUnknownCapitalReply = (target) =>
  `I'm not fully sure about the capital of ${toTitleCase(target)} in offline mode. Ask a more common country or state, or enable live AI for broader coverage.`;

export const resolveLocalKnowledgeReply = (message = "") => {
  const target = extractCapitalTarget(message);

  if (!target) {
    return null;
  }

  const location = findLocation(target);

  return {
    intent: "local_capital",
    content: location ? buildCapitalReply(location) : buildUnknownCapitalReply(target),
  };
};
