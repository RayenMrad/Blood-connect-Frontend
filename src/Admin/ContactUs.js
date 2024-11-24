import React, { useEffect, useState } from "react";
import "../index.css";
import { Link, useLocation } from "react-router-dom";
import {
  fetchContacts,
  updateContactStatus,
  addReplyMessage,
} from "../services/Service";
import ReplyModal from "./ReplyModal"; // Import the modal

export default function ContactUs() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedContact, setSelectedContact] = useState(null); // Store selected contact data

  // Fetch contact requests
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await fetchContacts();
        setRequests(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load contact requests");
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  const handleAction = (contactId, action) => {
    const updatedContacts = requests.map((contact) =>
      contact._id === contactId ? { ...contact, replied: action } : contact
    );
    setRequests(updatedContacts);
    updateContactStatus(contactId, action);
  };

  const openReplyModal = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleSendReply = async (contactId, reply) => {
    try {
      await addReplyMessage({ contactId, replyMessage: reply });
      handleAction(contactId, "Replied");
    } catch (error) {
      setError("Failed to send reply");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page-container">
      <AdminNav />
      <div className="main-container">
        <AdminSideNav />

        <div
          className="donation-table-container"
          style={{ position: "relative", left: "20%" }}
        >
          <ReplyModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSendReply={handleSendReply}
            contact={selectedContact}
          />
          <h2>Contact Requests</h2>
          <table className="donation-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Reply</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id}>
                  <td>{request.fullName}</td>
                  <td>{request.email}</td>
                  <td>{request.message}</td>
                  <td>
                    <span>
                      {request.replied === "Replied"
                        ? request.replyMessage
                        : "-"}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        color:
                          request.replied === "Replied"
                            ? "#28a745"
                            : request.replied === "Rejected"
                            ? "#dc3545"
                            : "#6c757d",
                        fontWeight: "bold",
                      }}
                    >
                      {request.replied}
                    </span>
                  </td>
                  <td>
                    {request.replied !== "Pending" ? (
                      <span
                        style={{
                          color:
                            request.replied === "Replied"
                              ? "#28a745"
                              : "#dc3545",
                          fontWeight: "bold",
                        }}
                      >
                        {request.replied === "Replied"
                          ? " Replied"
                          : " Rejected"}
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleAction(request._id, "Rejected")}
                          className="reject-btn"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => openReplyModal(request)}
                          className="approve-btn"
                        >
                          Reply
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
        <h2>Admin Dashboard</h2>
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
