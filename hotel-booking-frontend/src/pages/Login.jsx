import { useState } from "react";
import "../styles/pages.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setErrorMessage(""); // clear old errors

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        const data = await res.json();

        // store token and userId
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);

        window.location.href = "/";
      } else {
        const msg = await res.text();
        setErrorMessage(msg);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Server error. Try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-sub">Login to continue your booking</p>

        {errorMessage && (
          <p className="error-text" style={{ color: "red", marginBottom: "10px" }}>
            {errorMessage}
          </p>
        )}

        <div className="input-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="login-register-text">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}
