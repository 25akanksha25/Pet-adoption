import React from "react";
import { FaUsers, FaChild, FaUserFriends, FaInfoCircle } from "react-icons/fa";
import "../FormSteps/FormSteps.css";

const FormStep5 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const existing = formData[name] || [];
      if (checked) {
        setFormData(name, [...existing, value]);
      } else {
        setFormData(name, existing.filter((v) => v !== value));
      }
    } else {
      setFormData(name, value);
    }
  };

  return (
    <div className="form-step-container">
      <h2 className="form-title">
        <FaUsers style={{ marginRight: "12px" }} />
        Household Members
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
          Tell us about the people who live in your home to help us ensure a good fit for everyone.
        </p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="required">
            <FaUsers style={{ marginRight: "8px" }} />
            Total Household Members
          </label>
          <select
            name="totalMembers"
            value={formData.totalMembers || 0}
            onChange={handleChange}
            required
          >
            <option value="">Select number of people</option>
            <option value="1">1 (Just me)</option>
            <option value="2">2 people</option>
            <option value="3">3 people</option>
            <option value="4">4 people</option>
            <option value="5+">5+ people</option>
          </select>
        </div>

        <div className="form-group">
          <label className="required">
            <FaChild style={{ marginRight: "8px" }} />
            Children in Household
          </label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="hasChildren"
                value="yes"
                checked={formData.hasChildren === "yes"}
                onChange={handleChange}
                required
              />
              <span>Yes</span>
            </label>
            <label>
              <input
                type="radio"
                name="hasChildren"
                value="no"
                checked={formData.hasChildren === "no"}
                onChange={handleChange}
                required
              />
              <span>No</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>
            <FaChild style={{ marginRight: "8px" }} />
            Ages of Children
          </label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="childrenAges"
                value="0-5"
                checked={formData.childrenAges?.includes("0-5") || false}
                onChange={handleChange}
              />
              <span>0-5 years</span>
            </label>
            <label>
              <input
                type="checkbox"
                name="childrenAges"
                value="6-12"
                checked={formData.childrenAges?.includes("6-12") || false}
                onChange={handleChange}
              />
              <span>6-12 years</span>
            </label>
            <label>
              <input
                type="checkbox"
                name="childrenAges"
                value="13-17"
                checked={formData.childrenAges?.includes("13-17") || false}
                onChange={handleChange}
              />
              <span>13-17 years</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="required">
            <FaUserFriends style={{ marginRight: "8px" }} />
            All Members Agree to Adoption
          </label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="allAgree"
                value="yes"
                checked={formData.allAgree === "yes"}
                onChange={handleChange}
                required
              />
              <span>Yes</span>
            </label>
            <label>
              <input
                type="radio"
                name="allAgree"
                value="no"
                checked={formData.allAgree === "no"}
                onChange={handleChange}
                required
              />
              <span>No</span>
            </label>
            <label>
              <input
                type="radio"
                name="allAgree"
                value="notAll"
                checked={formData.allAgree === "notAll"}
                onChange={handleChange}
                required
              />
              <span>Not everyone consulted yet</span>
            </label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>
          <FaUsers style={{ marginRight: "8px" }} />
          Household Member Experience
        </label>
        <textarea
          name="memberExperience"
          placeholder="Describe your household members' experience with pets (if any)..."
          rows="3"
          value={formData.memberExperience || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>
          <FaInfoCircle style={{ marginRight: "8px" }} />
          Special Considerations
        </label>
        <textarea
          name="specialConsiderations"
          placeholder="Any allergies, special needs, or other considerations we should know about..."
          rows="3"
          value={formData.specialConsiderations || ""}
          onChange={handleChange}
        />
      </div>

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
          <FaUsers style={{ marginRight: "10px", color: "#6c63ff" }} />
          It's important that all household members are comfortable with and prepared for a new pet.
        </p>
      </div>
    </div>
  );
};

export default FormStep5;
