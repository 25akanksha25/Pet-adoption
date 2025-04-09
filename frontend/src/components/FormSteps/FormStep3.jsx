import React from "react";
import { FaHome, FaTree, FaPaw, FaRuler } from "react-icons/fa";
import "../FormSteps/FormSteps.css";

const FormStep3 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(name, type === "checkbox" ? checked : value);
  };

  return (
    <div className="form-step-container">
      <h2 className="form-title">
        <FaHome style={{ marginRight: "12px" }} />
        Home Environment
      </h2>

      <div className="form-info" style={{ marginBottom: "30px" }}>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#666",
            lineHeight: "1.6",
            textAlign: "center",
          }}
        >
          Tell us about your home environment and neighborhood to help us
          understand the living space for the pet.
        </p>
      </div>

      <div className="form-grid">
        {/* Living Space Size */}
        <div className="form-group">
          <label className="required">
            <FaRuler style={{ marginRight: "8px" }} />
            Living Space Size
          </label>
          <select
            name="spaceSize"
            value={formData.spaceSize}
            onChange={handleChange}
            required
          >
            <option value="">Select size</option>
            <option value="small">Small (500 sq ft)</option>
            <option value="medium">Medium (500-1000 sq ft)</option>
            <option value="large">Large (1000-2000 sq ft)</option>
            <option value="xlarge">Extra Large (2000+ sq ft)</option>
          </select>
        </div>

        {/* Outdoor Space */}
        <div className="form-group">
          <label className="required">
            <FaTree style={{ marginRight: "8px" }} />
            Outdoor Space
          </label>
          <div className="radio-group">
            {["yes", "no"].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="hasYard"
                  value={type}
                  checked={formData.hasYard === type}
                  onChange={handleChange}
                  required
                />
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Is your yard fenced? */}
        <div className="form-group">
          <label className="required">
            <FaPaw style={{ marginRight: "8px" }} />
            Is your yard fenced?
          </label>
          <div className="radio-group">
            {["yes", "no", "na"].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="hasFence"
                  value={type}
                  checked={formData.hasFence === type}
                  onChange={handleChange}
                  required
                />
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Neighborhood Type */}
        <div className="form-group">
          <label className="required">
            <FaHome style={{ marginRight: "8px" }} />
            Neighborhood Type
          </label>
          <select
            name="neighborhoodType"
            value={formData.neighborhoodType}
            onChange={handleChange}
            required
          >
            <option value="">Select type</option>
            <option value="urban">Urban</option>
            <option value="suburban">Suburban</option>
            <option value="rural">Rural</option>
          </select>
        </div>
      </div>

      {/* Nearby Parks or Pet-Friendly Areas */}
      <div className="form-group">
        <label>
          <FaTree style={{ marginRight: "8px" }} />
          Nearby Parks or Pet-Friendly Areas
        </label>
        <textarea
          name="nearbyAreas"
          value={formData.nearbyAreas}
          onChange={handleChange}
          placeholder="Describe any nearby parks, walking trails, or pet-friendly areas..."
          rows="3"
        />
      </div>

      {/* Daily Schedule */}
      <div className="form-group">
        <label className="required">
          <FaHome style={{ marginRight: "8px" }} />
          Daily Schedule
        </label>
        <select
          name="timeAtHome"
          value={formData.timeAtHome}
          onChange={handleChange}
          required
        >
          <option value="">Select typical time at home</option>
          <option value="allday">Home all day</option>
          <option value="parttime">
            Part-time work/school (4-6 hours away)
          </option>
          <option value="fulltime">
            Full-time work/school (8+ hours away)
          </option>
          <option value="variable">Variable schedule</option>
        </select>
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
          <FaPaw
            style={{
              marginRight: "10px",
              color: "#6c63ff",
            }}
          />
          Having a suitable living environment is crucial for a pet's well-being
          and happiness.
        </p>
      </div>
    </div>
  );
};

export default FormStep3;
