import React, { useState } from "react";
import "./modal.css";
export default function ReplyModal({ isOpen, onClose, onSendReply, contact }) {
  const [reply, setReply] = useState("");

  if (!isOpen || !contact) return null; // Don't render if the modal is not open or contact is not available

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reply.trim()) {
      onSendReply(contact._id, reply);
      onClose(); // Close the modal after sending the reply
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Reply to {contact.fullName}</h2>
        <p>
          <strong>Email:</strong> {contact.email}
        </p>
        <p>
          <strong>Message:</strong> {contact.message}
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type your reply here"
            rows="4"
            required
          />
          <div className="modal-actions">
            <button type="submit" className="btn-send">
              Send
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
