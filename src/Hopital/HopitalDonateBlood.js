import React, { useState } from "react";
import "../index.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { addHospital } from "../services/Service";

export default function HopitalDonateBlood() {
  return (
    <div className="page-container">
      <DonorNav />
      <div className="main-container">
        <AdminSideNav />
        <HopitalMain />
      </div>
    </div>
  );
}

function DonorNav() {
  const hospitalData = JSON.parse(localStorage.getItem("hospitalFormData")) || {};
  return (
    <div className="AdminNav">
      <div className="left-section">
        <h2>Hospital</h2>
        <h6>{hospitalData.email ? hospitalData.email : "rayenmrad11@gmail.com"}</h6>
      </div>
      <Link to="/Login" className="AdminLogOut-btn">
        LogOut <img src="/logout.png" alt="logout" />
      </Link>
    </div>
  );
}

function AdminSideNav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="side-nav">
      <div className="Adminlinks">
        <Link
          className={`l ${
            isActive("/HopitalDonateBlood") ? "active-link" : ""
          }`}
          to="/HopitalDonateBlood"
        >
          Donate Blood
        </Link>
        <br />
        <Link
          className={`l ${
            isActive("/HopitalRequestBlood") ? "active-link" : ""
          }`}
          to="/HopitalRequestBlood"
        >
          Request Blood
        </Link>
        <br />
        <Link
          className={`l ${
            isActive("/HopitalBloodDonationHistory") ? "active-link" : ""
          }`}
          to="/HopitalBloodDonationHistory"
        >
          Donation history
        </Link>
        <Link
          className={`l ${
            isActive("/HopitalBloodDonationRequestHistory") ? "active-link" : ""
          }`}
          to="/HopitalBloodDonationRequestHistory"
        >
          Request history
        </Link>
        <br />
      </div>
    </div>
  );
}

function HopitalMain() {
  const currentDate = new Date();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bloodType: "",
    units: "",
    requestDate: currentDate,
    type: "Donation",
  });
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.bloodType || !formData.units) {
      alert("Please fill all the fields before submitting.");
      return;
    }
    if (formData.units <= 0) {
      alert("Units must be greater than 0.");
      return;
    }
    console.log("Validated Form Data:", formData);
    // Proceed with form submission logic (e.g., API call)
    const hospitalData =
      JSON.parse(localStorage.getItem("hospitalFormData")) || {};
    const updatedHospitalData = { ...hospitalData, ...formData };

    // Save the updated donor data to localStorage
    localStorage.setItem(
      "hospitalFormData",
      JSON.stringify(updatedHospitalData)
    );

    // Send data to backend (you can replace `addDonor` with your actual function)
    console.log("Final Data: ", updatedHospitalData);
    addHospital(updatedHospitalData);

    // Clear data in localStorage and reset form
    //localStorage.removeItem("hospitalFormData");
    setFormData({});
    navigate("/HopitalBloodDonationHistory");
  };

  return (
    <div className="form-container">
      <img src="/donation.png" alt="logo" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="bloodType">Blood Type:</label>
        <select
          id="bloodType"
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
          required
        >
          <option value="">Select Blood Type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <label htmlFor="units">Units:</label>
        <input
          type="number"
          id="units"
          name="units"
          value={formData.units}
          onChange={handleChange}
          required
          min="1"
          placeholder="Enter unit quantity"
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}
