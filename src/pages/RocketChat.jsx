import { useState } from 'react';

export default function RocketChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await response.json();
    setMessages([...newMessages, data.choices[0].message]);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Rocket AI Chat</h1>
      <div className="space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 rounded ${msg.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          className="flex-1 border p-2 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Rocket..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
