import React, { useState, useEffect } from "react";
import "../index.css";
import { Link, useLocation } from "react-router-dom";
import { fetchDonors, updateDonorStatus } from "../services/Service";

export default function BloodDonation() {
  // State for donors
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch donors data on mount
  useEffect(() => {
    const loadDonors = async () => {
      try {
        const data = await fetchDonors();
        setDonors(data);
        console.log("Data : ", data);
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
    updateDonorStatus(donorId, action);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page-container">
      <AdminNav />
      <div className="main-container">
        <AdminSideNav />
        <div className="donation-table-container">
          <table className="donation-table">
            <thead>
              <tr>
                <th>Donor Name</th>
                <th>Age</th>
                <th>Blood Group</th>
                <th>Unit</th>
                <th>Request Date</th>
                <th>Governorate</th>
                <th>hospitalName</th>
                <th>DonationType</th>
                <th>PatientName</th>
                <th>Disease</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(donors) && donors.length > 0 ? (
                donors.map((donor) => (
                  <tr key={donor._id}>
                    <td>{donor.firstName + " " + donor.lastName}</td>
                    <td>{donor.age}</td>
                    <td>{donor.bloodGroup}</td>
                    <td>{donor.unit}</td>
                    <td>{new Date(donor.requestDate).toLocaleDateString()}</td>
                    <td>{donor.governorate}</td>
                    <td>{donor.hospitalName}</td>
                    <td>{donor.donationType}</td>
                    <td>
                      {donor.donationType === "For a Patient"
                        ? donor.patientName
                        : "-"}
                    </td>
                    <td>{donor.disease ? donor.disease : "-"}</td>
                    <td>
                      {donor.status !== "Pending" ? (
                        <span
                          style={{
                            color:
                              donor.status === "approved"
                                ? "#28a745"
                                : "#dc3545",
                            fontWeight: "bold",
                          }}
                        >
                          {donor.status === "approved"
                            ? " Approved"
                            : " Rejected"}
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleAction(donor._id, "approved")}
                            className="approve-btn"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(donor._id, "rejected")}
                            className="reject-btn"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-donors-message">
                    No donors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
