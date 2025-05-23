// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaDog, FaCat } from 'react-icons/fa';
// import './Card.css';

// const Card = ({ pet }) => {
//   //console.log("Sauanh pet ",pet.images[0].path);
//   const locationString = pet.location ? `${pet.location.city}` : "Location not available";
//   const isPetDog = pet.type?.toLowerCase() === 'dog';
//   const PetIcon = isPetDog ? FaDog : FaCat;

//   const getDefaultImage = () => {
//     return isPetDog ? '/assets/demo-dog.jpg' : '/assets/demo-cat.jpg';
//   };

//   const handleImageError = (e) => {
//     e.target.onerror = null;
//     e.target.src = getDefaultImage();
//   };

//   return (
//     <div className="card bg-background-light hover:shadow-lg transition-all duration-300">
//       <div className="card-header">
//         <div className="card-image-container">
//           <img 
//             src={`http://localhost:8080/Pet/${pet?.images[0]?.path}`}
//             alt={`${pet.type} - ${pet.name}`} 
//             className="card-image" 
//             // onError={handleImageError}
//           />
//         </div>
//         <div className="header-content">
//           <h2 className="pet-name text-primary">{pet.name}</h2>
//           <div className="pet-type bg-secondary-light text-primary">
//             <PetIcon className="pet-icon" />  
//             <span>{pet.type}</span>
//           </div>
//         </div>
//       </div>
//       <div className="card-content">
//         <div className="pet-details">
//           <div className="detail-item border-b border-background-dark">
//             <span className="detail-label text-secondary-dark">Age:</span>
//             <span className="detail-value">{pet.age} years</span>
//           </div>
//           <div className="detail-item border-b border-background-dark">
//             <span className="detail-label text-secondary-dark">Location:</span>
//             <span className="detail-value">{locationString}</span>
//           </div>
//           <div className="detail-item border-b border-background-dark">
//             <span className="detail-label text-secondary-dark">Gender:</span>
//             <span className="detail-value">{pet.gender}</span>
//           </div>
//           <div className="detail-item border-b border-background-dark">
//             <span className="detail-label text-secondary-dark">Breed:</span>
//             <span className="detail-value">{pet.breed}</span>
//           </div>
//           <div className="detail-item border-b border-background-dark">
//             <span className="detail-label text-secondary-dark">Size:</span>
//             <span className="detail-value">{pet.size}</span>
//           </div>

//         </div>
//       </div>
//       <div className="button-container bg-background-light border-t border-background-dark">
//         <Link to={`/petDescription/${pet._id}`} className="more-info-link">
//           <button className="bg-accent hover:bg-accent-light text-white transition-colors duration-300">
//             More Info
//           </button> 
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Card;



// import React from 'react';
// import { FaDog, FaCat } from 'react-icons/fa';
// import './Card.css';

// const Card = ({ pet }) => {
//   const isPetDog = pet.type?.toLowerCase() === 'dog';
//   const PetIcon = isPetDog ? FaDog : FaCat;

//   const getDefaultImage = () => {
//     return isPetDog ? '/assets/demo-dog.jpg' : '/assets/demo-cat.jpg';
//   };

//   const handleImageError = (e) => {
//     e.target.onerror = null;
//     e.target.src = getDefaultImage();
//   };

//   return (
//     <div className="card">
//       <div className="card-image-container">
//         <img 
//           src={`http://localhost:8080/Pet/${pet?.images[0]?.path}`}
//           alt={`${pet.type} - ${pet.name}`}
//           className="card-image"
//           onError={handleImageError}
//         />
//       </div>

//       <div className="card-details-container">
//         <h2 className="pet-name">{pet.name}</h2>
//         <div className="pet-type">
//           <PetIcon className="pet-icon" />
//           <span>{pet.breed}</span>
//         </div>
//         <div className="pet-details">
//           <div className="detail-item">
//           <span className="orange-dot"></span>
//             <span className="detail-value">{pet.gender}</span>
//           </div>
//           <div className="detail-item">
//           <span className="orange-dot"></span>
//             <span className="detail-value">{pet.size}</span>
//           </div>
//           <div className="detail-item"> 
//           <span className="orange-dot"></span>
//             <span className="detail-value">{pet.age} years</span>
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;



import React from 'react';
import { FaDog, FaCat } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ pet }) => {
  const isPetDog = pet.type?.toLowerCase() === 'dog';
  const PetIcon = isPetDog ? FaDog : FaCat;

  const getDefaultImage = () => {
    return isPetDog ? '/assets/demo-dog.jpg' : '/assets/demo-cat.jpg';
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = getDefaultImage();
  };

  return (
    <div className="card">
      <div className="card-image-container">
        <Link to={`/petDescription/${pet._id}`} >
          <img
            src={`http://localhost:8080/${pet?.images[0]?.path.replace('public/', '') || ''}`}
            alt={`${pet.type} - ${pet.name}`}
            className="card-image"
            onError={handleImageError}
          />
        </Link>
      </div>

      <Link to={`/petDescription/${pet._id}`} >
        <div className="card-details-container">
          <h2 className="pet-name">{pet.name}</h2>
          <div className="pet-type">
            <PetIcon className="pet-icon" />
            <span>{pet.breed}</span>
          </div>
          <div className="pet-details">
            <div className="detail-item">
              <span className="orange-dot"></span>
              <span className="detail-value">{pet.gender}</span>
            </div>
            <div className="detail-item">
              <span className="orange-dot"></span>
              <span className="detail-value">{pet.size}</span>
            </div>
            <div className="detail-item">
              <span className="orange-dot"></span>
              <span className="detail-value">{pet.age} years</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
