import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "../index";
import "../index.css";

export default function Login() {
  return (
    <>
      <Nav />
      <Body />
    </>
  );
}

function Body() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to store error message
  const navigate = useNavigate();

  const handleLogin = () => {
    // Reset the error message on each attempt
    setError("");

    // Mock data to simulate role-based routing (Replace with actual API logic)
    const users = [
      { email: "admin@example.com", password: "admin123", role: "admin" },
      {
        email: "hospital@example.com",
        password: "hospital123",
        role: "hospital",
      },
      { email: "donor@example.com", password: "donor123", role: "donor" },
    ];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Route based on role
      if (user.role === "admin") navigate("/BloodStock");
      else if (user.role === "hospital") navigate("/HopitalRequestBlood");
      else if (user.role === "donor") navigate("/DonateBlood");
    } else {
      // Set an error message if login fails
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-body">
      <div className="login-form">
        <img src="/login.png" alt="login" />
        <p>Log in to your account</p>
        <h6>Welcome back! Please enter your details</h6>

        {error && (
          <div className="error-alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        <label>Email</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <label>Password</label>
        <br />
        <input
          type="password"
          id="pd"
          name="password"
          placeholder=".............."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <span>
          <input type="checkbox" /> <h6 id="remember">Remember for 30 days</h6>{" "}
          <Link to="/Forget" id="forget">
            Forgot Password
          </Link>
        </span>
        <br />

        <button type="button" className="confirm-button" onClick={handleLogin}>
          Confirm
        </button>
        <button type="button" className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
}
