import { useState, useEffect, useRef } from "react";
import PersonaSelector from "./components/PersonaSelector";
import MessageBubble from "./components/MessageBubble";
import InputBox from "./components/InputBox";
import LoginScreen from "./components/LoginScreen";
import { fetchPersonas, sendMessage } from "./services/api";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!sessionStorage.getItem("app_api_key"));
  const [personas, setPersonas] = useState({});
  const [selectedPersona, setSelectedPersona] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!loggedIn) return;
    fetchPersonas()
      .then((data) => {
        setPersonas(data);
        const firstId = Object.keys(data)[0];
        if (firstId) setSelectedPersona(firstId);
      })
      .catch(() => {
        sessionStorage.removeItem("app_api_key");
        setLoggedIn(false);
        setError("Invalid key or backend unreachable.");
      });
  }, [loggedIn]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handlePersonaChange(id) {
    setSelectedPersona(id);
    setMessages([]);
  }

  async function handleSend(text) {
    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);
    setError("");

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const data = await sendMessage(selectedPersona, text, history);
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      if (err.message === "UNAUTHORIZED") {
        sessionStorage.removeItem("app_api_key");
        setLoggedIn(false);
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="app-container">
      <div className="header">
        <strong>Persona Chat</strong>
        {Object.keys(personas).length > 0 && (
          <PersonaSelector
            personas={personas}
            selected={selectedPersona}
            onChange={handlePersonaChange}
          />
        )}
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="chat-window">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} />
        ))}
        {loading && <div className="loading-dots">Thinking...</div>}
        <div ref={chatEndRef} />
      </div>

      <div className="input-area">
        <InputBox onSend={handleSend} disabled={loading || !selectedPersona} />
      </div>
    </div>
  );
}