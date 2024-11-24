import React, { useState, useEffect } from "react";
import "../index.css";
import { Link, useLocation } from "react-router-dom";
import { fetchBloodTypes } from "../services/Service";

export default function BloodStock() {
  return (
    <div className="page-container">
      <AdminNav />
      <div className="main-container">
        <AdminSideNav />
        <AdminMain />
      </div>
    </div>
  );
}

function AdminNav() {
  return (
    <div className="AdminNav">
      <div className="left-section">
        <h2>Admin</h2>
        <h6>BloodConnect@gmail.com</h6>
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
        className={isActive("/BloodStock") ? "active-link" : ""}
        to="/BloodStock"
      >
        Blood Stock
      </Link>
      <br />
      <Link
        className={isActive("/BloodDonation") ? "active-link" : ""}
        to="/BloodDonation"
      >
        Blood Donation
      </Link>
      <br />
      <Link
        className={isActive("/HospitalDonation") ? "active-link" : ""}
        to="/HospitalDonation"
      >
        Hospital Donation
      </Link>
      <br />
      <Link
        className={isActive("/Requests") ? "active-link" : ""}
        to="/Requests"
      >
        Hospital Requests
      </Link>
      <br />
      <Link
        className={isActive("/ContactUs") ? "active-link" : ""}
        to="/ContactUs"
      >
        ContactUs
      </Link>
    </div>
  </div>
  );
}

function AdminMain() {
  return (
    <div className="blood-cards-groups">
      <BloodTypeCards />
    </div>
  );
}

function BloodTypeCard({ type, count }) {
  return (
    <div className="card">
      <div className="type">
        {type}
        <img src="/blood.png" alt="blood.png" />
      </div>
      <div className="count">{count}</div>
    </div>
  );
}

const BloodTypeCards = () => {
  const [bloodTypes, setBloodTypes] = useState([]);

  // Mock database fetch
  useEffect(() => {
    const loadBloodTypes = async () => {
      try {
        const data = await fetchBloodTypes();
        setBloodTypes(data);
        console.log(data);
      } catch (err) {}
    };

    loadBloodTypes();
  }, []);

  return (
    <div className="blood-type-cards">
      {bloodTypes.map((bloodType) => (
        <BloodTypeCard
          key={bloodType.type}
          type={bloodType.type}
          count={bloodType.totalUnits}
        />
      ))}
    </div>
  );
};
