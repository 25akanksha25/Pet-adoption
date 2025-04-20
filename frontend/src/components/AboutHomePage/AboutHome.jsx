import React from "react";
import { Link } from "react-router-dom";
import "./AboutHome.css";

const AboutHome = () => {
  return (
    <section className="about-home">
      <div className="images-section">
        <div className="top-img">
          <img src="/assets/dog3.jpg" alt="Happy couple with dog" />
        </div>
        <div className="bottom-imgs">
          <img src="/assets/dog1.jpg" alt="Dog behind fence" />
          <img src="/assets/dog2.jpg" alt="Dog drinking water" />
        </div>
        <div className="paw-icon">
          <img src="/assets/pawicon.png" alt="Paw Icon" />
        </div>
      </div>

      <div className="text-section">
        <h5 className="subheading">KNOW MORE ABOUT US</h5>
        <h2 className="main-heading">
          Where <span>Friendships</span><br />
          Begin, One Paw at a Time
        </h2>
        <p className="description">
          From spacious accommodations to personalized attention, we go above and beyond to cater to the unique needs of each furry guest.
        <br/>
          Our commitment to excellence extends beyond basic care to enriching experiences that promote physical, mental, and emotional well-being.
        </p>
        <Link to="/about" className="more-info-btn">More Info</Link>
      </div>
    </section>
  );
};

export default AboutHome;
