import React, { useState } from "react";
import "../index.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addHospital } from "../services/Service";

export default function HopitalRequestBlood() {
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
    hospitalName: "",
    requestingDepartment: "",
    patientName: "",
    age: "",
    bloodType: "",
    units: "",
    reason: "",
    date : "",
    requestDate: currentDate,
    type: "Request",
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
    navigate("/HopitalBloodDonationRequestHistory");
  };
  return (
    <div className="form-container">
      <img src="/donation.png" alt="logo" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="hospitalName">Hospital Name:</label>
        <input
          type="text"
          id="hospitalName"
          name="hospitalName"
          value={formData.hospitalName}
          onChange={handleChange}
          placeholder="Enter Hospital Name"
          required
        />

        <label htmlFor="department">Requesting Department:</label>
        <input
          type="text"
          id="requestingDepartment"
          name="requestingDepartment"
          value={formData.requestingDepartment}
          onChange={handleChange}
          placeholder="Enter Requesting Department"
          required
        />

        <label htmlFor="patientName">Patient Name:</label>
        <input
          type="text"
          id="patientName"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          placeholder="Enter Patient Name"
          required
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter Patient's Age"
          required
        />

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

        <label htmlFor="reason">Reason:</label>
        <input
          type="text"
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Enter Reason"
          required
        />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}
