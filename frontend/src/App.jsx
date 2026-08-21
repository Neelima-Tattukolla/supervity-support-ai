import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
  if (!message.trim()) return;

  try {
  const response = await fetch("https://supervity-support-ai.onrender.com/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });

    const data = await response.json();
    setMessages((prev) => [
  ...prev,
  {
    sender: "user",
    text: message,
  },
  {
    sender: "ai",
    text: data.reply,
    category: data.category,
    confidence: data.confidence,
    source: data.source,
  },
]);

    console.log("Backend response:", data);

    setMessage("");
  } catch (error) {
    console.error("Error:", error);
  }
};
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-gray-900 text-white p-6">
          <h1 className="text-2xl font-bold">
            Supervity Support AI
          </h1>

          <p className="text-gray-300 mt-1">
            Customer Support AI Employee
          </p>
        </div>
        {/* Chat Area */}
<div className="h-[500px] p-6 overflow-y-auto">

  {/* Welcome Message */}
  <div className="bg-gray-100 rounded-xl p-4 max-w-2xl">
    <p className="font-semibold text-gray-800">
      AI Support Agent
    </p>

    <p className="text-gray-600 mt-2">
      Hello! I can help you with billing, technical issues,
      and account access questions.
    </p>
  </div>

  {/* Conversation History */}
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`mt-4 p-4 rounded-xl max-w-2xl ${
        msg.sender === "user"
          ? "ml-auto bg-blue-600 text-white"
          : "bg-gray-900 text-white"
      }`}
    >

      {/* Sender */}
      <p className="font-semibold">
        {msg.sender === "user"
          ? "You"
          : "AI Support Agent"}
      </p>

      {/* Message */}
      <p className="mt-2">
        {msg.text}
      </p>

      {/* AI Details */}
      {msg.sender === "ai" && (
        <div className="mt-3 text-sm text-gray-300">

          <p>
            Category: {msg.category}
          </p>

          <p>
            Confidence: {Math.round(msg.confidence * 100)}%
          </p>

          {/* Source */}
          {msg.source && (
            <p className="mt-2">
              Source: {msg.source}
            </p>
          )}

          {/* Human Escalation */}
          {msg.confidence < 0.7 && (
            <div className="mt-4 border border-red-400 rounded-lg p-3">

              <p className="font-semibold text-red-300">
                ⚠️ Human Escalation Required
              </p>

              <p className="text-sm text-gray-300 mt-1">
                I couldn't find enough information to answer
                this question confidently.
              </p>

              <p className="text-sm text-gray-300 mt-1">
                Reason: Confidence is below the 70% threshold.
              </p>

            </div>
          )}

        </div>
      )}

    </div>
  ))}

</div>

        {/* Input Area */}
        <div className="border-t p-4 flex gap-3">

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a support question..."
            className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-400"
          />

          <button
            onClick={handleSend}
            className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-700"
          >
            Send
          </button>

        </div>

      </div>
    </div>
  );
}

export default App;