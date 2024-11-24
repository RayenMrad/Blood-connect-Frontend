import React, { useState, useEffect } from "react";
import "../index.css";
import { Link, useLocation } from "react-router-dom";
import {  fetchHospitals, updateHospitalStatus } from "../services/Service";

export default function HospitalDonation() {
  // State for donors
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch donors data on mount
  useEffect(() => {
    const loadDonors = async () => {
      try {
        const data = await fetchHospitals();
        const dataFiltred = data.filter((item) => item.type === "Donation");

        setDonors(dataFiltred);
        console.log("Data : ", dataFiltred);
        setLoading(false);
      } catch (err) {
        setError("Failed to load donors");
        setLoading(false);
      }
    };

    loadDonors();
  }, []);

  const handleAction = (donorId, action) => {
    const updatedDonors = donors.map((donor) =>
      donor._id === donorId
        ? {
            ...donor,
            status: action,
            unitsAdded:
              action === "approved"
                ? donor.unit + " unit Added To Stock"
                : 0 + " unit added to stock",
          }
        : donor
    );
    setDonors(updatedDonors);

    // Update donor status in the backend (optional)
    updateHospitalStatus(donorId, action);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page-container">
      <AdminNav />
      <div className="main-container">
        <AdminSideNav />
        
        <div className="donation-table-container" style={{  position: "relative", left: "20%" }}>
        <table className="donation-table" >
            <thead>
              <tr style={{ padding: "20px"}}>
                <th>Hospital Name</th>
                <th>Blood Type</th>
                <th>Units</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donation) => (
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
                    <td>
                      {donation.status !== "Pending" ? (
                        <span
                          style={{
                            color:
                            donation.status === "approved"
                                ? "#28a745"
                                : "#dc3545",
                            fontWeight: "bold",
                          }}
                        >
                          {donation.status === "approved"
                            ? " Approved"
                            : " Rejected"}
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleAction(donation._id, "approved")}
                            className="approve-btn"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(donation._id, "rejected")}
                            className="reject-btn"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
                    
                  {/* </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-donors-message">
                    No donors found.
                  </td>
                </tr>
              )} */}
            
        </div>
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
