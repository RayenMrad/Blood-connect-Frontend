import React, { useEffect, useState } from "react";
import "../index.css";
import { Link, useLocation } from "react-router-dom";
import { fetchDonors } from "../services/Service";

export default function DonorBloodDonation() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Fetch donations when the component mounts
    const getDonations = async () => {
      const donationList = await fetchDonors();
      setDonations(donationList);
    };

    getDonations();
  }, []);

  // Function to render dynamic table headers
  const renderTableHeaders = () => {
    const keys = [
      "Name", "email", "phoneNumber",  
      "bloodGroup", "unit", "requestDate", "governorate", 
      "hospitalName", "donationType", "patientName", "disease","status"
    ];
    
    return keys.map((key, index) => (
      <th key={index}>{key.replace(/([A-Z])/g, ' $1').trim()}</th>
    ));
  };

  return (
    <div className="page-container">
      <DonorNav />
      <div className="main-container">
        <AdminSideNav />
        <div className="donation-table-container">
          <table className="donation-table">
            <thead>
              <tr>
                {renderTableHeaders()}
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={index}>
                  <td>{donation.lastName +" "+donation.firstName}</td>
                  <td>{donation.email}</td>
                  <td>{donation.phoneNumber}</td>
                  <td>{donation.bloodGroup}</td>
                  <td>{donation.unit}</td>
                  <td>{new Date(donation.requestDate).toLocaleDateString()}</td>
                  <td>{donation.governorate}</td>
                  <td>{donation.hospitalName}</td>
                  <td>{donation.donationType}</td>
                  <td>
                    {donation.donationType === "For a Patient"
                      ? donation.patientName
                      : "-"}
                  </td>
                  <td>{donation.disease ? donation.disease: "-"}</td>
                  <td>
                  <span
                      style={{
                        color:
                          donation.status === "approved"
                            ? "#28a745"
                            : donation.status === "rejected"
                            ? "#dc3545"
                            : "#6c757d",
                        fontWeight: "bold",
                      }}
                    >
                      {donation.status}
                    </span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DonorNav() {
  return (
    <div className="AdminNav">
      <div className="left-section">
        <h2>Donor</h2>
        <h6>rayenmrad11@gmail.com</h6>
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
          Blood Stock
        </Link>
        <br />
        <Link
          className={`l ${isActive("/DonorBloodDonation") ? "active-link" : ""}`}
          to="/DonorBloodDonation"
        >
          Blood Donation
        </Link>
        <br />
      </div>
    </div>
  );
}
