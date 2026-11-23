import React, { useState } from "react";
import "./loginModal.css";
import iconimg from "../assets/iconimg.png";

export default function SignupModal({ isOpen, onClose, openLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Enter name, email & password");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("https://wishwell-server-1.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Account created and logged in!");
        onClose();
        // Navigate to home or wishlists
        window.location.href = "/home";
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      setLoading(false);
      alert("Signup error: " + error.message);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <span className="login-close" onClick={onClose}>×</span>
        <img src={iconimg} alt="Logo" className="login-logo" />
        <h2>Create Account</h2>
        <input className="login-input" type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
        <input className="login-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="login-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className="login-btn email" onClick={handleSignup} disabled={loading}>
          {loading ? "CREATING..." : "CREATE ACCOUNT"}
        </button>
      </div>
    </div>
  );
}