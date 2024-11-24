import { Nav } from "../index";
import "../index.css";
// import logo from "../photos/login.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  return (
    <>
      <Nav></Nav>
      <Body />
    </>
  );
}

function Body() {
  const [role, setRole] = useState("donneur");
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleConfirm = () => {
    if (role === "donneur") {
      navigate("/Donneur_form");
    } else if (role === "hopital") {
      navigate("/hospital_form");
    }
  };

  return (
    <div className="sign-body">
      <div className="signup-card">
        <img src="/signup.png" alt="signup" />
        <h2>Sign up</h2>
        <p>Join us in making a difference</p>

        <div className="options">
          <input
            type="radio"
            id="donneur"
            name="role"
            value="donneur"
            checked={role === "donneur"}
            onChange={handleRoleChange}
          />
          <label htmlFor="donneur" className="option1">
            Donneur
          </label>

          <input
            type="radio"
            id="hopital"
            name="role"
            value="hopital"
            checked={role === "hopital"}
            onChange={handleRoleChange}
          />
          <label htmlFor="hopital" className="option2">
            Hopital
          </label>
        </div>

        <div className="buttons">
          <button className="cancel">Cancel</button>
          <button className="confirm" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
