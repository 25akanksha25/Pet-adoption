import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";
import "../FormSteps/FormSteps.css";

const FormStep1 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(name, type === "checkbox" ? checked : value);
  };

  return (
    <div className="form-step-container">
      <h2 className="form-title">Personal Information</h2>

      <div className="form-info" style={{ marginBottom: "30px" }}>
        <p style={{ fontSize: "1.1rem", color: "#666", lineHeight: "1.6", textAlign: "center" }}>
          Please provide your contact information. This will help us process your adoption application.
        </p>
      </div>

      <div className="form-grid">
        {/* Full Name */}
        <div className="form-group">
          <label className="required">
            <FaUser style={{ marginRight: "8px" }} />
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            aria-label="Full Name"
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="required">
            <FaEnvelope style={{ marginRight: "8px" }} />
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            aria-label="Email Address"
          />
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label className="required">
            <FaPhone style={{ marginRight: "8px" }} />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            aria-label="Phone Number"
          />
        </div>

        {/* Government ID */}
        <div className="form-group">
          <label className="required">
            <FaIdCard style={{ marginRight: "8px" }} />
            Government ID
          </label>
          <input
            type="text"
            name="govtId"
            value={formData.govtId}
            onChange={handleChange}
            placeholder="Enter your ID number"
            required
            aria-label="Government ID"
          />
          <p className="input-helper">Provide any valid government-issued ID number</p>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="terms-section">
        <div className="checkbox-group">
          <label className="terms-text">
            <input
              type="checkbox"
              name="agreedToTerms"
              checked={formData.agreedToTerms}
              onChange={handleChange}
              required
            />
            <span>
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </span>
          </label>
        </div>
      </div>

      {/* Info Box */}
      <div
        className="info-box"
        style={{
          background: "rgba(108, 99, 255, 0.05)",
          padding: "20px",
          borderRadius: "15px",
          marginTop: "30px",
        }}
      >
        <p
          style={{
            color: "#666",
            fontSize: "0.95rem",
            margin: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaIdCard style={{ marginRight: "10px", color: "#6c63ff" }} />
          Your information will be kept confidential and used only for the adoption process.
        </p>
      </div>
    </div>
  );
};

export default FormStep1;
