import { useState } from "react";
import "../styles/pages.css";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: ""
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setErrorMsg(""); // clear previous errors
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert("Account created successfully!");
        window.location.href = "/login";
      } else {
        // read backend message
        const data = await res.text();
        setErrorMsg(data);  // show in <P></P>
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Server error");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <h2 className="register-title">Create Account</h2>
        <p className="register-sub">Join us and start booking your perfect stay</p>

        {/* Error display */}
        <p style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</p>

        {/* First name */}
        <div className="input-group">
          <label>First Name</label>
          <input
            name="firstName"
            type="text"
            placeholder="Enter first name"
            onChange={handleChange}
          />
        </div>

        {/* Last name */}
        <div className="input-group">
          <label>Last Name</label>
          <input
            name="lastName"
            type="text"
            placeholder="Enter last name"
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="input-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            onChange={handleChange}
          />
        </div>

        {/* Mobile */}
        <div className="input-group">
          <label>Mobile</label>
          <input
            name="mobile"
            type="mobile"
            placeholder="Enter mobile number"
            onChange={handleChange}
          />
        </div>

        <button className="register-btn" onClick={handleRegister}>
          Register
        </button>

        <p className="register-login-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
