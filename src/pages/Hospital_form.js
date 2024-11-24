import { Navlogo } from "../index";
import "../index.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HospitalForm() {
  return (
    <>
      <Navlogo />
      <Body />
    </>
  );
}

function Body() {
  return (
    <div className="hospital-body">
      <div className="hospital-form">
        <HopitalPhoto />
        <Form />
      </div>
    </div>
  );
}

function HopitalPhoto() {
  return (
    <div className="hopital-photo">
      <img src="/hp.png" alt="hopital_photo" />
      <h2>Hopital</h2>
    </div>
  );
}

function Form() {
  const navigate = useNavigate();
  localStorage.removeItem("hospitalFormData");
  const [governorate, setGovernorate] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errors, setErrors] = useState({
    governorate: "",
    hospitalName: "",
    email: "",
    adresse: "",
    phoneNumber: "",
  });

  // Map of governorates and their respective hospitals
  const hospitalsByGovernorate = {
    Nabeul: ["Nabeul Regional Hospital", "Nabeul Clinic"],
    Tunis: ["Charles Nicolle Hospital", "Tunis Clinic"],
    Sousse: ["Sahloul Hospital", "Sousse Medical Center"],
  };

  const handleConfirm = () => {
    let formErrors = {};

    // Validate fields
    if (!governorate) formErrors.governorate = "Governorate is required.";
    if (!hospitalName) formErrors.hospitalName = "Hospital Name is required.";
    if (!email) formErrors.email = "Email is required.";
    if (!adresse) formErrors.adresse = "Adresse is required.";
    if (!phoneNumber) formErrors.phoneNumber = "Phone Number is required.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Save data to localStorage
    const formData = {
      governorate,
      hospitalName,
      email,
      adresse,
      phoneNumber,
    };
    localStorage.setItem("hospitalFormData", JSON.stringify(formData));

    // Navigate to the next page
    navigate("/HopitalDonateBlood");
  };

  const handleCancel = () => {
    navigate("/Signup");
  };

  return (
    <div className="form-container">
      <div className="form-row">
        <div className="form-group fl">
          <h4>Governorate</h4>
          <select
            name="governorate"
            value={governorate}
            onChange={(e) => setGovernorate(e.target.value)}
          >
            <option value="" disabled>
              Select your governorate
            </option>
            <option value="Nabeul">Nabeul</option>
            <option value="Tunis">Tunis</option>
            <option value="Sousse">Sousse</option>
          </select>
          {errors.governorate && (
            <div className="error">{errors.governorate}</div>
          )}
        </div>

        <div className="form-group">
          <h4>Hopital Name</h4>
          <select
            name="hospitalName"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            disabled={!governorate}
          >
            <option value="" disabled>
              Select Hopital Name
            </option>
            {governorate &&
              hospitalsByGovernorate[governorate]?.map((hospital) => (
                <option key={hospital} value={hospital}>
                  {hospital}
                </option>
              ))}
          </select>
          {errors.hospitalName && (
            <div className="error">{errors.hospitalName}</div>
          )}
        </div>
      </div>

      <div className="form-group">
        <h4>Email</h4>
        <input
          type="email"
          name="emailhop"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div className="form-group">
        <h4>Adresse</h4>
        <input
          type="text"
          name="adresse"
          placeholder="Enter your Adresse"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
        />
        {errors.adresse && (
          <div className="error">{errors.adresse}</div>
        )}
      </div>

      <div className="form-group">
        <h4>Phone Number</h4>
        <input
          type="text"
          name="tel"
          placeholder="Enter your Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {errors.phoneNumber && (
          <div className="error">{errors.phoneNumber}</div>
        )}
      </div>

      <div className="form-buttons">
        <button
          type="button"
          className="confirm-button"
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
