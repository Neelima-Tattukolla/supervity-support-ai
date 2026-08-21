const fs = require("fs");
const path = require("path");

const faqPath = path.join(__dirname, "faq.json");

const faqs = JSON.parse(fs.readFileSync(faqPath, "utf-8"));

function retrieveFAQ(message, category) {
  const text = message.toLowerCase();

  const words = text
    .split(/\s+/)
    .filter((word) => word.length > 3);

  let bestMatch = null;
  let bestScore = 0;

  for (const faq of faqs) {
    if (faq.category !== category) {
      continue;
    }

    const faqText =
      `${faq.question} ${faq.answer}`.toLowerCase();

    let score = 0;

    for (const word of words) {
      if (faqText.includes(word)) {
        score++;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  return {
    match: bestMatch,
    score: bestScore,
  };
}

module.exports = retrieveFAQ;