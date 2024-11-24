import React, { useState } from "react";
import "../index.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";
import { addDonor } from "../services/Service";

export default function DonateBlood() {
  return (
    <div className="page-container">
      <DonorNav />
      <div className="main-container">
        <AdminSideNav />
        <DonarMain />
      </div>
    </div>
  );
}

function DonorNav() {
  const donorData = JSON.parse(localStorage.getItem("donorData")) || {};
  return (
    <div className="AdminNav">
      <div className="left-section">
        <h2>Donor</h2>
        <h6>{donorData.email ? donorData.email : "rayenmrad11@gmail.com"}</h6>
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
          className={`l ${isActive("/DonateBlood") ? "active-link" : ""}`}
          to="/DonateBlood"
        >
          Donate Blood
        </Link>
        <br />
        <Link
          className={`l ${isActive("/DonorBloodDonation") ? "active-link" : ""}`}
          to="/DonorBloodDonation"
        >
          Blood Donation
        </Link>
      </div>
    </div>
  );
}

function DonarMain() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem("donorData")) || {}); 
  const [governorate, setGovernorate] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [disease, setDiseaseName] = useState("");
  const [showPatientField, setShowPatientField] = useState(false);
  const [errors, setErrors] = useState({});

  const hospitalsByGovernorate = {
    Nabeul: ["Nabeul Regional Hospital", "Nabeul Clinic"],
    Tunis: ["Charles Nicolle Hospital", "Tunis Clinic"],
    Sousse: ["Sahloul Hospital", "Sousse Medical Center"],
  };

  // Function to validate the form
  const validateForm = () => {
    const newErrors = {};
    
    if (!governorate) newErrors.governorate = "Governorate is required.";
    if (!hospitalName) newErrors.hospitalName = "Hospital name is required.";
    if (!formData.disease) newErrors.disease = "Disease name is required.";  // Fixed: checking formData.disease
    if (!formData.donationType) newErrors.donationType = "Donation type is required.";
    if (formData.donationType === "For a Patient" && !formData.patientName) newErrors.patientName = "Patient name is required.";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required.";
    if (!formData.unit || formData.unit <= 0) newErrors.unit = "Unit must be greater than 0.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === "donationType") {
      setShowPatientField(value === "For a Patient");
    }
  };
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  const year = currentDate.getFullYear();
  
  const formattedDate = `${day}/${month}/${year}`;
  
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const newDonation = {
      ...formData,
      governorate,
      hospitalName,
      formattedDate,
    };

    // Retrieve the donor data from localStorage and update it
    const donorData = JSON.parse(localStorage.getItem("donorData")) || {};
    const updatedDonorData = { ...donorData, ...newDonation };
  
    // Save the updated donor data to localStorage
    localStorage.setItem("donorData", JSON.stringify(updatedDonorData));
  
    // Send data to backend (you can replace `addDonor` with your actual function)
    console.log("Final Data: ", updatedDonorData);
    addDonor(updatedDonorData);

    // Clear data in localStorage and reset form
    localStorage.removeItem('donorData');
    setGovernorate("");
    setHospitalName("");
    setFormData({});
    navigate('/DonorBloodDonation');
  };

  return (
    <div className="form-container">
      <img src="/donation.png" alt="logo" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="governorate">Governorate:</label>
        <select
          name="governorate"
          value={governorate}
          onChange={(e) => setGovernorate(e.target.value)}
        >
          <option value="" disabled>Select your governorate</option>
          <option value="Nabeul">Nabeul</option>
          <option value="Tunis">Tunis</option>
          <option value="Sousse">Sousse</option>
        </select>
        {errors.governorate && <p className="error">{errors.governorate}</p>}

        <label htmlFor="hospitalName">Hospital Name:</label>
        <select
          name="hospitalName"
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
          disabled={!governorate}
        >
          <option value="" disabled>Select Hospital Name</option>
          {governorate && hospitalsByGovernorate[governorate]?.map((hospital) => (
            <option key={hospital} value={hospital}>
              {hospital}
            </option>
          ))}
        </select>
        {errors.hospitalName && <p className="error">{errors.hospitalName}</p>}

   

        <label htmlFor="donationType">Donation Type:</label>
        <select
          name="donationType"
          value={formData.donationType || ""}
          onChange={handleChange}
        >
          <option value="" disabled>Select Donation Type</option>
          <option value="Free Donation">Free Donation</option>
          <option value="For a Patient">For a Patient</option>
        </select>
        {errors.donationType && <p className="error">{errors.donationType}</p>}

        {showPatientField && (
          <div>
            <label htmlFor="patientName">Patient Name:</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName || ""}
              onChange={handleChange}
              placeholder="Enter Patient Name"
            />
            {errors.patientName && <p className="error">{errors.patientName}</p>}
          </div>
        )}
          <div>
          <label htmlFor="disease">Disease Name:</label>
          <input
            type="text"
            id="disease"
            name="disease"
            value={formData.disease || ""}
            onChange={handleChange}
            placeholder="Enter disease Name"
          />
          {errors.disease && <p className="error">{errors.disease}</p>}
        </div>

        <label htmlFor="bloodGroup">Blood Group:</label>
        <select
          id="bloodGroup"
          name="bloodGroup"
          value={formData.bloodGroup || ""}
          onChange={handleChange}
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        {errors.bloodGroup && <p className="error">{errors.bloodGroup}</p>}

        <label htmlFor="unit">Unit Quantity:</label>
        <input
          type="number"
          id="unit"
          name="unit"
          value={formData.unit || ""}
          onChange={handleChange}
          placeholder="Enter unit quantity"
        />
        {errors.unit && <p className="error">{errors.unit}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
