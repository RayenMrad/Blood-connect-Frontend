import React, { useEffect, useState } from "react";
import "../index.css";
import { Link, useLocation } from "react-router-dom";
import { fetchDonors, fetchHospitals, updateHospitalStatus } from "../services/Service";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch donors data on mount
  useEffect(() => {
    const loadDonors = async () => {
      try {
        const data = await fetchHospitals();
        const dataFiltred = data.filter((item) => item.type === "Request");
        setRequests(dataFiltred);
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
    const updatedDonors = requests.map((donor) =>
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
    setRequests(updatedDonors);
    updateHospitalStatus(donorId, action);

  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page-container">
      <AdminNav />
      <div className="main-container">
        <AdminSideNav />
        <div className="requests-table-container">
          <table className="requests-table">
            <thead>
              <tr>
              <th>Hospital Name</th>
                <th>Department</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Blood Type</th>
                <th>Units</th>
                <th>Reason</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id}>
                <td>{request.hospitalName}</td>
                <td>{request.requestingDepartment}</td>
                <td>{request.patientName}</td>
                <td>{request.age}</td>
                <td>{request.bloodType}</td>
                <td>{request.units}</td>
                <td>{request.reason}</td>
                <td>{request.date}</td>
                <td>
                  <span
                    style={{
                      color:
                        request.status === "approved"
                          ? "#28a745"
                          : request.status === "rejected"
                          ? "#dc3545"
                          : "#6c757d",
                      fontWeight: "bold",
                    }}
                  >
                    {request.status}
                  </span>
                </td>
              
                  <td>
                      {request.status !== "Pending" ? (
                        <span
                          style={{
                            color:
                            request.status === "approved"
                                ? "#28a745"
                                : "#dc3545",
                            fontWeight: "bold",
                          }}
                        >
                          {request.status === "approved"
                            ? " Approved"
                            : " Rejected"}
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleAction(request._id, "approved")}
                            className="approve-btn"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(request._id, "rejected")}
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
