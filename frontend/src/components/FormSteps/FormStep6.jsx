import React from "react";
import { FaPaw, FaHistory, FaHeart } from "react-icons/fa";
import "../FormSteps/FormSteps.css";

const FormStep6 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "petCareKnowledge") {
      const existing = formData.petCareKnowledge || [];
      const updated = checked
        ? [...existing, value]
        : existing.filter(v => v !== value);
      setFormData("petCareKnowledge", updated);
    } else {
      setFormData(name, value);
    }
  };

  return (
    <div className="form-step-container">
      <h2 className="form-title">
        <FaHistory style={{ marginRight: "12px" }} />
        Pet History
      </h2>

      <div className="form-info" style={{ marginBottom: "30px" }}>
        <p style={{ fontSize: "1.1rem", color: "#666", lineHeight: "1.6", textAlign: "center" }}>
          Tell us about your experience with pets and any current or previous pet ownership.
        </p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="required">
            <FaPaw style={{ marginRight: "8px" }} />
            Have you had pets before?
          </label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="hadPetsBefore"
                value="yes"
                checked={formData.hadPetsBefore === "yes"}
                onChange={handleChange}
                required
              />
              <span>Yes</span>
            </label>
            <label>
              <input
                type="radio"
                name="hadPetsBefore"
                value="no"
                checked={formData.hadPetsBefore === "no"}
                onChange={handleChange}
                required
              />
              <span>No</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="required">
            <FaPaw style={{ marginRight: "8px" }} />
            Current Pets
          </label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="currentlyHasPets"
                value="yes"
                checked={formData.currentlyHasPets === "yes"}
                onChange={handleChange}
                required
              />
              <span>Yes</span>
            </label>
            <label>
              <input
                type="radio"
                name="currentlyHasPets"
                value="no"
                checked={formData.currentlyHasPets === "no"}
                onChange={handleChange}
                required
              />
              <span>No</span>
            </label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>
          <FaPaw style={{ marginRight: "8px" }} />
          Current Pet Details
        </label>
        <textarea
          name="currentPets"
          placeholder="If you have current pets, please describe them (species, age, temperament)..."
          rows="3"
          value={formData.currentPets || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>
          <FaHistory style={{ marginRight: "8px" }} />
          Previous Pet Experience
        </label>
        <textarea
          name="previousPets"
          placeholder="Tell us about your previous pets and your experience caring for them..."
          rows="3"
          value={formData.previousPets || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="required">
          <FaHeart style={{ marginRight: "8px" }} />
          Reason for Adoption
        </label>
        <textarea
          name="adoptionReason"
          placeholder="Please share your reasons for wanting to adopt a pet..."
          rows="3"
          value={formData.adoptionReason || ""}
          onChange={handleChange}
          required
          minLength={20}
        />
        <p className="input-helper">Minimum 20 characters required</p>
      </div>

      <div className="form-group">
        <label className="required">
          <FaPaw style={{ marginRight: "8px" }} />
          Pet Care Knowledge
        </label>
        <div className="checkbox-group">
          {["feeding", "exercise", "medical", "training"].map((knowledge) => (
            <label key={knowledge}>
              <input
                type="checkbox"
                value={knowledge}
                checked={formData.petCareKnowledge?.includes(knowledge) || false}
                onChange={handleChange}
                name="petCareKnowledge"
              />
              <span>
                {knowledge === "feeding" && "Feeding & Nutrition"}
                {knowledge === "exercise" && "Exercise & Activity"}
                {knowledge === "medical" && "Basic Medical Care"}
                {knowledge === "training" && "Training & Behavior"}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="info-box">
        <p>
          <FaHeart style={{ marginRight: "10px", color: "#6c63ff" }} />
          Your pet history helps us ensure a successful adoption match.
        </p>
      </div>
    </div>
  );
};

export default FormStep6;