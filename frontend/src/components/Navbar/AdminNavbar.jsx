// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import "./Navbar.css"; 
// import UserMenu from "./UserMenu";

// const AdminNavbar = ({ handleLoginPopup, user, setUser }) => {
//   const location = useLocation();
//   const isUpdateProfilePage = location.pathname === "/update-profile";
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className={`navbar ${isUpdateProfilePage ? "transparent-nav" : ""}`}>
//       <div className="navbar-container">
//         {/* Logo */}
//         <Link to="/admin">
//           <div className="logo">
//             <img src="/assets/paws4home_logo.png" alt="Logo" className="logo-image" />
//             <span>Admin Panel</span>
//           </div>
//         </Link>

//         {/* Mobile Menu Button */}
//         <button className="mobile-menu-btn" onClick={toggleMenu}>
//           <i className={`fas fa-${isMenuOpen ? "times" : "bars"}`}></i>
//         </button>

//         {/* Navigation Links */}
//         <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
//           <li><Link to="/admin/pets" onClick={() => setIsMenuOpen(false)}>All Pets</Link></li>
//           <li><Link to="/admin/users" onClick={() => setIsMenuOpen(false)}>All Users</Link></li>
//           <li><Link to="/admin/store-inventory" onClick={() => setIsMenuOpen(false)}>Store Inventory</Link></li>
//         </ul>

//         {/* Right Section */}
//         <div className="nav-right">
//           {user ? (
//             <UserMenu user={user} setUser={setUser} />
//           ) : (
//             <button
//               className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
//               onClick={handleLoginPopup}
//             >
//               Login
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default AdminNavbar;



import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css"; 
import UserMenu from "./UserMenu";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Ensures FontAwesome icons work

const AdminNavbar = ({ handleLoginPopup, user, setUser }) => {
  const location = useLocation();
  const isUpdateProfilePage = location.pathname === "/update-profile";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`navbar ${isUpdateProfilePage ? "transparent-nav" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/admin" className="logo">
          <img src="/assets/paws4home_logo.png" alt="Logo" className="logo-image" />
          <span>Admin Panel</span>
        </Link>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={`fas fa-${isMenuOpen ? "times" : "bars"}`}></i>
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li><Link to="/admin/pets">All Pets</Link></li>
          <li><Link to="/admin/users">All Users</Link></li>
          <li><Link to="/admin/adoption-requests">Adoption Requests</Link></li>
        </ul>

        {/* Right Section */}
        <div className="nav-right">
          {user ? (
            <UserMenu user={user} setUser={setUser} />
          ) : (
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
              onClick={handleLoginPopup}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
