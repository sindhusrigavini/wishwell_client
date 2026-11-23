import React, { useState } from "react";
import "./loginModal.css";
import iconimg from "../assets/iconimg.png";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email & password");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("https://wishwell-server-1.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        onClose();
        navigate("/home");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      alert("Login error: " + error.message);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <span className="login-close" onClick={onClose}>×</span>
        <img src={iconimg} alt="Logo" className="login-logo" />
        <h2>Log In</h2>
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn email" onClick={handleLogin} disabled={loading}>
          {loading ? "LOGGING IN..." : "LOG IN"}
        </button>
      </div>
    </div>
  );
}
