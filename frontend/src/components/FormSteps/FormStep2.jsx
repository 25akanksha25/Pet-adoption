import React from "react";
import { FaHome, FaMapMarkerAlt, FaCity, FaGlobe } from "react-icons/fa";
import "../FormSteps/FormSteps.css";

const FormStep2 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(name, type === "checkbox" ? checked : value);
  };

  return (
    <div className="form-step-container">
      <h2 className="form-title">
        <FaHome style={{ marginRight: "12px" }} />
        Address Information
      </h2>

      <div className="form-info" style={{ marginBottom: "30px" }}>
        <p style={{ fontSize: "1.1rem", color: "#666", lineHeight: "1.6", textAlign: "center" }}>
          Please provide your current residential address details.
        </p>
      </div>

      <div className="form-grid">
        {/* Street Address */}
        <div className="form-group">
          <label className="required">
            <FaHome style={{ marginRight: "8px" }} />
            Street Address
          </label>
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            placeholder="Enter your street address"
            required
          />
        </div>

        {/* Apartment/Unit */}
        <div className="form-group">
          <label>
            <FaHome style={{ marginRight: "8px" }} />
            Apartment/Unit
          </label>
          <input
            type="text"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            placeholder="Apartment, suite, unit (if applicable)"
          />
        </div>

        {/* City */}
        <div className="form-group">
          <label className="required">
            <FaCity style={{ marginRight: "8px" }} />
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
            required
          />
        </div>

        {/* State */}
        <div className="form-group">
          <label className="required">
            <FaMapMarkerAlt style={{ marginRight: "8px" }} />
            State/Province
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter your state"
            required
          />
        </div>

        {/* Country */}
        <div className="form-group">
          <label className="required">
            <FaGlobe style={{ marginRight: "8px" }} />
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter your country"
            required
          />
        </div>

        {/* ZIP Code - Now correctly using `zipcode` */}
        <div className="form-group">
          <label className="required">
            <FaMapMarkerAlt style={{ marginRight: "8px" }} />
            ZIP/Postal Code
          </label>
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            placeholder="Enter your ZIP code"
            required
          />
        </div>
      </div>

      {/* Type of Residence */}
      <div className="form-group" style={{ marginTop: "20px" }}>
        <label className="required">
          <FaHome style={{ marginRight: "8px" }} />
          Type of Residence
        </label>
        <div className="radio-group">
          {["house", "apartment", "condo", "other"].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="residenceType"
                value={type}
                checked={formData.residenceType === type}
                onChange={handleChange}
                required
              />
              <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Housing Status */}
      <div className="form-group">
        <label className="required">
          <FaHome style={{ marginRight: "8px" }} />
          Housing Status
        </label>
        <div className="radio-group">
          {["own", "rent"].map((status) => (
            <label key={status}>
              <input
                type="radio"
                name="housingStatus"
                value={status}
                checked={formData.housingStatus === status}
                onChange={handleChange}
                required
              />
              <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
            </label>
          ))}
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
          <FaHome style={{ marginRight: "10px", color: "#6c63ff" }} />
          If you're renting, you may need to provide landlord approval for pet ownership.
        </p>
      </div>
    </div>
  );
};

export default FormStep2;
