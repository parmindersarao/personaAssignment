import { useEffect, useRef, useState } from "react";

export default function InputBox({ onSend, disabled }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);


  function handleSend() {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="input-box">
      <textarea
        ref={inputRef}
        rows={1}
        placeholder="Message the persona..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button className="send-btn" onClick={handleSend} disabled={disabled}>
        Send
      </button>
    </div>
  );
}