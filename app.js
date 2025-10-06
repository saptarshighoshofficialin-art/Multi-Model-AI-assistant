import React, { useState } from "react";
import "./App.css"; // Create this CSS file for custom styling

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { from: "user", text: input }]);

    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    setMessages((msgs) => [...msgs, { from: "bot", text: data.reply }]);
    setInput("");
  };

  return (
    <div className="app-bg">
      <div className="neo-logo">
        <img src="nyancat.gif" alt="Nyan Cat" className="nyan-cat" /> {/* Add nyan-cat.gif to your public folder */}
      </div>
      <div className="chat-box">
        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className={`bubble ${msg.from}`}>
              <b>{msg.from}:</b> {msg.text}
            </div>
          ))}
        </div>
        <div className="input-row">
          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="arrow-btn" onClick={sendMessage}>
            <span className="arrow"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
