const express = require("express");
const cors = require("cors");
const retrieveFAQ = require("./knowledge-base/retrieve");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Supervity Support AI Backend is running!"
  });
});

app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  const text = message.toLowerCase();

  let category = "Out of Scope";
  let confidence = 0.30;
  let reply = "I'm not confident that I can answer this question.";

  if (
    text.includes("payment") ||
    text.includes("bill") ||
    text.includes("billing") ||
    text.includes("charged") ||
    text.includes("invoice")
  ) {
    category = "Billing";
    confidence = 0.92;
    reply = "This appears to be a billing-related question.";
  } else if (
    text.includes("error") ||
    text.includes("bug") ||
    text.includes("api") ||
    text.includes("technical") ||
    text.includes("not working")
  ) {
    category = "Technical";
    confidence = 0.90;
    reply = "This appears to be a technical support issue.";
  } else if (
    text.includes("password") ||
    text.includes("login") ||
    text.includes("account") ||
    text.includes("access")
  ) {
    category = "Account Access";
    confidence = 0.90;
    reply = "This appears to be an account access issue.";
  }

  const retrieved = retrieveFAQ(message, category);

  res.json({
    reply: retrieved.match
      ? retrieved.match.answer
      : reply,
    category,
    confidence,
    source: retrieved.match
      ? retrieved.match.question
      : null
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});