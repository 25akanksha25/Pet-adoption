import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './petDescription.css';
import { 
  FaPaw, FaBirthdayCake, FaVenus, FaMars, FaMapMarkerAlt, 
  FaSyringe, FaHome, FaClinicMedical, FaRuler, FaWeight,
  FaPalette, FaGlobe, FaCut, FaSearch
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PetDescription = () => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const userInfo = localStorage.getItem('userInfo');
  const user = userInfo ? JSON.parse(userInfo) : null;


  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/pets/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched pet data:", data);
        console.log("Pet images:", JSON.stringify(data.images, null, 2));
        if (data.images && data.images.length > 0) {
          console.log("First image path:", data.images[0].path);
          console.log("Full image URL:", `http://localhost:8080/${data.images[0].path}`);
        }
        setPet(data);
      } catch (err) {
        console.error("Error fetching pet data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  const handleImageSelect = (index) => {
    setActiveImage(index);
  };

  const handleImageError = (e) => {
    console.log("Image failed to load:", e.target.src);
    console.log("Image error details:", e.target);
    e.target.onerror = null;
    e.target.src = '/assets/demo-dog.jpg';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div
          className="loading-paw"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <FaPaw />
        </motion.div>
        <p>Finding your future friend...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <FaPaw className="error-icon" />
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/adopt')}>Back to Adoption Page</button>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="not-found-container">
        <FaPaw className="not-found-icon" />
        <h2>Pet Not Found</h2>
        <p>We couldn't find the pet you're looking for.</p>
        <button onClick={() => navigate('/adopt')}>Discover Other Pets</button>
      </div>
    );
  }

  const getGenderIcon = (gender) => {
    return gender.toLowerCase() === 'male' ? <FaMars className="gender-icon male" /> : <FaVenus className="gender-icon female" />;
  };

  return (
    <motion.div 
      className="pet-description-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pet-gallery-section">
        <motion.div 
          className="main-image-container"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {pet.images && pet.images.length > 0 ? (
            <>
              {console.log("Rendering image with path:", pet.images[activeImage]?.path)}
              <img 
                src={`http://localhost:8080/${pet.images[activeImage]?.path.replace('public/', '') || ''}`}
                alt={pet.images[activeImage]?.path || 'Pet image'} 
                className="main-image" 
                onError={handleImageError}
              />
              <div className="image-navigation">
                {pet.images.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`nav-dot ${index === activeImage ? 'active' : ''}`}
                    onClick={() => handleImageSelect(index)}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="no-image-placeholder">
              <FaPaw className="placeholder-icon" />
              <p>No images available</p>
            </div>
          )}
        </motion.div>
        
        {pet.images && pet.images.length > 0 && (
          <div className="thumbnails-container">
            {pet.images.map((image, index) => (
              <motion.div
                key={index}
                className={`thumbnail-wrapper ${index === activeImage ? 'active' : ''}`}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleImageSelect(index)}
              >
                <img 
                  src={`http://localhost:8080/${image?.path.replace('public/', '') || ''}`}
                  alt={`Thumbnail ${index + 1}`}
                  onError={handleImageError}
                />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div 
          className="location-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FaGlobe className="location-icon" />
          <div className="location-details">
            <h3>Location</h3>
            {/* <p>{pet.location.country}</p> */}
            <p>{`${pet.location.city}`}</p>
            {/* <p>{pet.location.pincode}</p> */}
          </div>
        </motion.div>
      </div>

      <div className="pet-info-section">
        <div className="pet-header">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {pet.name} {getGenderIcon(pet.gender)}
          </motion.h1>
          <div className="type-badge">
            <FaPaw />
            <span>{pet.type}</span>
          </div>
        </div>

        <div className="info-grid">
          <motion.div className="info-card" whileHover={{ scale: 1.05 }}>
            <FaPaw />
            <h3>Breed</h3>
            <p>{pet.breed}</p>
          </motion.div>
          
          <motion.div className="info-card" whileHover={{ scale: 1.05 }}>
            <FaBirthdayCake />
            <h3>Age</h3>
            <p>{pet.age} years</p>
          </motion.div>

          <motion.div className="info-card" whileHover={{ scale: 1.05 }}>
            <FaRuler />
            <h3>Size</h3>
            <p>{pet.size}</p>
          </motion.div>

          <motion.div className="info-card" whileHover={{ scale: 1.05 }}>
            <FaPalette />
            <h3>Color</h3>
            <p>{pet.color}</p>
          </motion.div>
        </div>

        <div className="pet-story-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>My Story</h2>
            <p>{pet.story}</p>
          </motion.div>
        </div>

        <div className="health-training-section">
          <h2>Health & Training</h2>
          <div className="status-grid">
            <motion.div 
              className={`status-card ${pet.vaccinated ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
            >
              <FaSyringe />
              <h3>Vaccinated</h3>
              <p>{pet.vaccinated ? 'Yes' : 'No'}</p>
            </motion.div>

            <motion.div 
              className={`status-card ${pet.houseTrained ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
            >
              <FaHome />
              <h3>House Trained</h3>
              <p>{pet.houseTrained ? 'Yes' : 'No'}</p>
            </motion.div>

            <motion.div 
              className={`status-card ${pet.neutered ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
            >
              <FaCut />
              <h3>Neutered/Spayed</h3>
              <p>{pet.neutered ? 'Yes' : 'No'}</p>
            </motion.div>

            <motion.div 
              className={`status-card ${pet.microchipped ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
            >
              <FaSearch />
              <h3>Microchipped</h3>
              <p>{pet.microchipped ? 'Yes' : 'No'}</p>
            </motion.div>
          </div>
        </div>

        {pet.medicalHistory && (
          <div className="medical-history-section">
            <h2>Medical History</h2>
            <motion.div 
              className="medical-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FaClinicMedical />
              <p>{pet.medicalHistory}</p>
            </motion.div>
          </div>
        )}

        {/* <motion.div 
          className="adoption-cta"
          whileHover={{ scale: 1.02 }}
        >
          <h2>Ready to Welcome {pet.name} Home?</h2>
          <p>Start your adoption journey today!</p>
          <motion.button
            className="adopt-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/choose-to-adopt', { state: { petId: id } })}
          >
            Start Adoption Process
          </motion.button>
        </motion.div> */}

        {user?.role !== 'admin' && (
  <motion.div 
    className="adoption-cta"
    whileHover={{ scale: 1.02 }}
  >
    <h2>Ready to Welcome {pet.name} Home?</h2>
    <p>Start your adoption journey today!</p>
    <motion.button
      className="adopt-button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (!user) {
          toast.error("Please login to continue with adoption");
          return;
        }
        navigate('/choose-to-adopt', { state: { petId: id } });
      }}
    >
      Start Adoption Process
    </motion.button>
  </motion.div>
)}

      </div>
    </motion.div>
  );
};

export default PetDescription;