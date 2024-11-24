import React, { useEffect, useState } from "react";
import "../index.css";
import { Link, useLocation } from "react-router-dom";
import { fetchHospitals } from "../services/Service";

export default function HopitalBloodDonationHistory() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDonors = async () => {
      try {
        const data = await fetchHospitals();
        const dataFiltred = data.filter((item) => item.type === "Donation");
        setDonations(dataFiltred);
        console.log("Data: ", dataFiltred);
        setLoading(false);
      } catch (err) {
        setError("Failed to load donors");
        setLoading(false);
      }
    };
    loadDonors();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="page-container">
      <HopitalNav />
      <div className="main-container">
        <AdminSideNav />
        <div
          className="donation-table-container"
          style={{  position: "relative", left: "20%" }}
        >
          <table className="donation-table" >
            <thead>
              <tr style={{ padding: "20px"}}>
                <th>Hospital Name</th>
                <th>Blood Type</th>
                <th>Units</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.hospitalName}</td>
                  <td>{donation.bloodType}</td>
                  <td>{donation.units}</td>
                  <td>{new Date(donation.requestDate).toLocaleDateString()}</td>
                  <td><span
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

function HopitalNav() {
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
        <br />
        <Link
          className={`l ${
            isActive("/HopitalBloodDonationRequestHistory")
              ? "active-link"
              : ""
          }`}
          to="/HopitalBloodDonationRequestHistory"
        >
          Request history
        </Link>
      </div>
    </div>
  );
}
