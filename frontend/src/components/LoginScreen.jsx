import { useState } from "react";

export default function LoginScreen({ onLogin }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!key.trim()) {
      setError("Enter an access key");
      return;
    }
    sessionStorage.setItem("app_api_key", key.trim());
    onLogin(key.trim());
  }

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Enter Access Key</h2>
        <input
          type="password"
          placeholder="Type 'Access' here"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        {error && <p className="login-error">{error}</p>}
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}