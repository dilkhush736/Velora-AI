const normalizeText = (value = "") => value.replace(/\s+/g, " ").trim();

const formatUnit = (unit = "") => {
  const normalized = unit.toLowerCase();

  if (["m", "meter", "meters"].includes(normalized)) {
    return "m";
  }

  if (["km", "kilometer", "kilometers"].includes(normalized)) {
    return "km";
  }

  if (["cm", "centimeter", "centimeters"].includes(normalized)) {
    return "cm";
  }

  if (["mm", "millimeter", "millimeters"].includes(normalized)) {
    return "mm";
  }

  if (["kg", "kilogram", "kilograms"].includes(normalized)) {
    return "kg";
  }

  if (["g", "gram", "grams"].includes(normalized)) {
    return "g";
  }

  if (["mg", "milligram", "milligrams"].includes(normalized)) {
    return "mg";
  }

  if (["lb", "lbs", "pound", "pounds"].includes(normalized)) {
    return "lb";
  }

  if (["s", "sec", "secs", "second", "seconds"].includes(normalized)) {
    return "s";
  }

  if (["min", "mins", "minute", "minutes"].includes(normalized)) {
    return "min";
  }

  if (["h", "hr", "hrs", "hour", "hours"].includes(normalized)) {
    return "h";
  }

  if (["day", "days"].includes(normalized)) {
    return "day";
  }

  if (["c", "celsius"].includes(normalized)) {
    return "c";
  }

  if (["f", "fahrenheit"].includes(normalized)) {
    return "f";
  }

  return normalized;
};

const UNIT_DEFINITIONS = {
  m: { category: "length", factor: 1 },
  km: { category: "length", factor: 1000 },
  cm: { category: "length", factor: 0.01 },
  mm: { category: "length", factor: 0.001 },
  kg: { category: "weight", factor: 1 },
  g: { category: "weight", factor: 0.001 },
  mg: { category: "weight", factor: 0.000001 },
  lb: { category: "weight", factor: 0.45359237 },
  s: { category: "time", factor: 1 },
  min: { category: "time", factor: 60 },
  h: { category: "time", factor: 3600 },
  day: { category: "time", factor: 86400 },
};

const extractNumbers = (message = "") =>
  (message.match(/-?\d+(?:\.\d+)?/g) || []).map(Number).filter((value) => Number.isFinite(value));

const buildResult = ({ expression, result, formattedResult = null }) => ({
  expression: normalizeText(expression),
  result,
  formattedResult,
});

const convertUnits = (value, fromUnit, toUnit) => {
  if (fromUnit === "c" && toUnit === "f") {
    return (value * 9) / 5 + 32;
  }

  if (fromUnit === "f" && toUnit === "c") {
    return ((value - 32) * 5) / 9;
  }

  const from = UNIT_DEFINITIONS[fromUnit];
  const to = UNIT_DEFINITIONS[toUnit];

  if (!from || !to || from.category !== to.category) {
    return null;
  }

  return (value * from.factor) / to.factor;
};

const evaluateUnitConversion = (message = "") => {
  const match = message.match(
    /\b(?:convert\s+)?(-?\d+(?:\.\d+)?)\s*(km|kilometers?|m|meters?|cm|centimeters?|mm|millimeters?|kg|kilograms?|g|grams?|mg|milligrams?|lb|lbs|pounds?|day|days|hour|hours|hr|hrs|h|minute|minutes|min|mins|second|seconds|sec|secs|s|celsius|fahrenheit|c|f)\s+(?:to|in)\s+(km|kilometers?|m|meters?|cm|centimeters?|mm|millimeters?|kg|kilograms?|g|grams?|mg|milligrams?|lb|lbs|pounds?|day|days|hour|hours|hr|hrs|h|minute|minutes|min|mins|second|seconds|sec|secs|s|celsius|fahrenheit|c|f)\b/i
  );

  if (!match) {
    return null;
  }

  const value = Number(match[1]);
  const fromUnit = formatUnit(match[2]);
  const toUnit = formatUnit(match[3]);
  const converted = convertUnits(value, fromUnit, toUnit);

  if (!Number.isFinite(converted)) {
    return null;
  }

  return buildResult({
    expression: `${value} ${fromUnit} to ${toUnit}`,
    result: converted,
    formattedResult: `${converted} ${toUnit}`,
  });
};

const evaluateWordMath = (message = "") => {
  const numbers = extractNumbers(message);
  const lowerMessage = message.toLowerCase();

  if (numbers.length >= 2 && /\baverage(?:\s+of)?\b/i.test(message)) {
    const total = numbers.reduce((sum, value) => sum + value, 0);
    return buildResult({
      expression: `average of ${numbers.join(", ")}`,
      result: total / numbers.length,
    });
  }

  if (numbers.length >= 2 && /\b(sum|total|add)\b/i.test(message)) {
    return buildResult({
      expression: `sum of ${numbers.join(", ")}`,
      result: numbers.reduce((sum, value) => sum + value, 0),
    });
  }

  if (numbers.length >= 2 && /\b(product|multiply|multiplied|times)\b/i.test(message)) {
    return buildResult({
      expression: `product of ${numbers.join(", ")}`,
      result: numbers.reduce((product, value) => product * value, 1),
    });
  }

  const subtractMatch = lowerMessage.match(
    /\bsubtract\s+(-?\d+(?:\.\d+)?)\s+from\s+(-?\d+(?:\.\d+)?)\b/
  );

  if (subtractMatch) {
    const left = Number(subtractMatch[2]);
    const right = Number(subtractMatch[1]);
    return buildResult({
      expression: `${left} - ${right}`,
      result: left - right,
    });
  }

  const differenceMatch = lowerMessage.match(
    /\bdifference\s+between\s+(-?\d+(?:\.\d+)?)\s+and\s+(-?\d+(?:\.\d+)?)\b/
  );

  if (differenceMatch) {
    const left = Number(differenceMatch[1]);
    const right = Number(differenceMatch[2]);
    return buildResult({
      expression: `${left} - ${right}`,
      result: left - right,
    });
  }

  const divideMatch = lowerMessage.match(/\bdivide\s+(-?\d+(?:\.\d+)?)\s+by\s+(-?\d+(?:\.\d+)?)\b/);

  if (divideMatch) {
    const left = Number(divideMatch[1]);
    const right = Number(divideMatch[2]);

    if (right === 0) {
      return null;
    }

    return buildResult({
      expression: `${left} / ${right}`,
      result: left / right,
    });
  }

  return null;
};

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
      .replace(/\u00f7/g, "/")
      .replace(/\bdivided by\b/g, "/")
      .replace(/\bover\b/g, "/")
      .replace(/\bpower of\b/g, "^")
      .replace(/\bto the power of\b/g, "^")
      .replace(/[=?!]/g, "")
  );

const evaluateArithmeticExpression = (message = "") => {
  const percentageMatch = message.match(
    /(-?\d+(?:\.\d+)?)\s*(?:%|percent)\s+of\s+(-?\d+(?:\.\d+)?)/i
  );

  if (percentageMatch) {
    const value = (Number(percentageMatch[1]) / 100) * Number(percentageMatch[2]);
    return buildResult({
      expression: `${percentageMatch[1]}% of ${percentageMatch[2]}`,
      result: value,
    });
  }

  const expression = normalizeArithmeticExpression(message)
    .replace(/(-?\d+(?:\.\d+)?)%/g, "($1/100)")
    .replace(/\^/g, "**");

  if (!expression || /[^0-9+\-*/().\s*]/.test(expression) || !/\d/.test(expression)) {
    return null;
  }

  try {
    const result = Function(`"use strict"; return (${expression});`)();

    if (!Number.isFinite(result)) {
      return null;
    }

    return buildResult({
      expression,
      result,
    });
  } catch (error) {
    return null;
  }
};

export const evaluateSmartMath = (message = "") =>
  evaluateUnitConversion(message) ||
  evaluateWordMath(message) ||
  evaluateArithmeticExpression(message);
