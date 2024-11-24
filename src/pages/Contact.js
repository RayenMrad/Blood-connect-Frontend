import { useState } from "react";
import { Link } from "react-router-dom";
import { Header, Nav } from "../index";
import "../index.css";
import { addContactMsg } from "../services/Service";


export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    addContactMsg(formData); 
    console.log("Data " ,formData);
      setSuccessMessage("Your message has been sent successfully!");
      setFormData({ fullName: "", email: "", message: "" });
      setErrors({});
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Nav />
      <div className="contact-container">
        <h1>Contact Us</h1>
        <div className="contact-info">
          <h2>We’re Here to Help</h2>
          <p>
            Whether you have a question or need assistance, feel free to reach
            out. Let’s connect!
          </p>

          <div className="contact-details">
            <ul>
              <li>
                <strong>Phone:</strong> +216 72 500 500
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:BloodConnect@gmail.com">
                  BloodConnect@gmail.com
                </a>
              </li>
              <li>
                <strong>Address:</strong> 123 BloodConnect Street, Tunis,
                Tunisia
              </li>
            </ul>
          </div>

          <div className="social-media">
            <h3>Follow Us:</h3>
            <ul>
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send Us a Message</h2>
          {successMessage && <p className="success" style={{color : "green"}}>{successMessage}</p>}dfghjk
          {errors.form && <p className="error">{errors.form}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your Name"
              />
              {errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
              ></textarea>
              {errors.message && <p className="error">{errors.message}</p>}
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </>
  );
}
