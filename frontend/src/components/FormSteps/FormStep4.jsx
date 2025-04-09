import React from "react";
import { FaHome, FaUpload, FaTrash, FaImage, FaInfoCircle } from "react-icons/fa";
import "../FormSteps/FormSteps.css"; // Make sure this is where the styles are added

const FormStep4 = ({ image, setImage }) => {
  const [dragActive, setDragActive] = React.useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage({ url: e.target.result, name: file.name });
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image under 5MB.");
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="form-step-container">
      <h2 className="form-title">
        <FaHome style={{ marginRight: "12px" }} />
        Home Photo
      </h2>

      <div className="form-info" style={{ marginBottom: "30px" }}>
        <p style={{ fontSize: "1.1rem", color: "#666", lineHeight: "1.6", textAlign: "center" }}>
          Please provide a photo of your home environment to help us understand the living space for the pet.
        </p>
      </div>

      <div
        className={`upload-area ${dragActive ? "drag-active" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: "2px dashed #6c63ff",
          borderRadius: "12px",
          padding: "40px 20px",
          textAlign: "center",
          background: dragActive ? "rgba(108, 99, 255, 0.05)" : "white",
          transition: "all 0.3s ease",
        }}
      >
        <FaUpload style={{ fontSize: "2rem", color: "#6c63ff", marginBottom: "16px" }} />
        <p style={{ margin: "0 0 16px 0", color: "#666" }}>
          Drag and drop your home photo here, or
        </p>
        <label className="upload-button">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
          Browse File
        </label>
        <p style={{ margin: "16px 0 0 0", fontSize: "0.9rem", color: "#888" }}>
          Maximum 1 photo, up to 5MB
        </p>
      </div>

      {image && (
        <div className="uploaded-image" style={{ marginTop: "30px" }}>
          <h3 style={{ color: "#333", marginBottom: "16px", display: "flex", alignItems: "center" }}>
            <FaImage style={{ marginRight: "8px" }} />
            Uploaded Photo
          </h3>
          <div
            className="image-item"
            style={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              maxWidth: "300px",
            }}
          >
            <img
              src={image.url}
              alt="Home"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
            <FaTrash
              onClick={removeImage}
              className="trash-icon"
            />
            <div
              style={{
                padding: "8px",
                background: "white",
                fontSize: "0.9rem",
                color: "#666",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {image.name}
            </div>
          </div>
        </div>
      )}

      <div className="photo-guidelines" style={{ marginTop: "30px" }}>
        <h3 style={{ color: "#333", marginBottom: "16px", display: "flex", alignItems: "center" }}>
          <FaInfoCircle style={{ marginRight: "8px" }} />
          Photo Guidelines
        </h3>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gap: "12px",
            color: "#666",
          }}
        >
          <li style={{ display: "flex", alignItems: "center" }}>
            <FaHome style={{ marginRight: "8px", color: "#6c63ff" }} />
            Include the main living area where the pet will spend time
          </li>
          <li style={{ display: "flex", alignItems: "center" }}>
            <FaHome style={{ marginRight: "8px", color: "#6c63ff" }} />
            Show any outdoor spaces, yard, or fenced areas
          </li>
        </ul>
      </div>

      <style jsx>{`
        .upload-button {
          background: #6c63ff;
          color: white;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          display: inline-block;
          font-weight: 500;
          transition: background 0.3s ease;
        }

        .upload-button:hover {
          background: #5b52ff;
        }

        .drag-active {
          border-color: #5b52ff !important;
          background: rgba(108, 99, 255, 0.1) !important;
        }

        .trash-icon {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
          color: black;
          font-size: 18px;
          z-index: 10;
          transition: color 0.2s ease;
        }

        .trash-icon:hover {
          color: #e63946;
        }
      `}</style>
    </div>
  );
};

export default FormStep4;
