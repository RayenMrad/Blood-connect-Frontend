import { Navlogo } from "../index";
import React, { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

export default function Donneur_form() {
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
        <Donneurphoto />
        <Form />
      </div>
    </div>
  );
}

function Donneurphoto() {
  const [image, setImage] = useState("/user.jpg"); // Default image

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  return (
    <div className="Donneur-photo">
      <img src={image} alt="Donneur_photo" />
      <h2>Donneur</h2>
      <input
        type="file"
        accept="image/*"
        style={{ background: "#198373" }}
        onChange={handleImageUpload}
      />
    </div>
  );
}

function Form() {
  localStorage.removeItem("donorData");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the error dynamically when corrected
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form fields
  const validateFields = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "phone Number is required";
    } else if (!/^\d{8}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "phone Number must be 8 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Confirm button click
  const handleConfirm = () => {
    if (validateFields()) {
      // Retrieve existing donor data from localStorage (or initialize as empty)
      const existingData = JSON.parse(localStorage.getItem("donorData")) || {};

      // Update the existing data (this will overwrite the old data with new)
      const updatedData = { ...existingData, ...formData };

      // Save the updated donor data
      localStorage.setItem("donorData", JSON.stringify(updatedData));

      alert("Donor data saved to local storage!");

      // Navigate to DonarMain
      navigate("/DonateBlood");
    } else {
      alert("Please correct the highlighted errors before proceeding.");
    }
  };

  // Handle Cancel button click
  const handleCancel = () => {
    navigate("/Signup");
  };

  return (
    <div className="form-container">
      <div className="form-row">
        <div className="form-group fl">
          <h4>First Name</h4>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div className="form-group fl">
          <h4>Last Name</h4>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
      </div>
      <div className="form-group">
        <h4>Age</h4>
        <input
          type="text"
          name="age"
          placeholder="Enter your age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>

      <div className="form-group">
        <h4>Email</h4>
        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <h4>phone Number</h4>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Enter your phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
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
