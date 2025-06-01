import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./full.css";

function Full() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 500);
  }, []);

  // Function to navigate to campaign page
  const handleStartCampaign = () => {
    navigate("/Work8"); // Ensure this route is defined in your Router
  };
  const handleStartCampaign2 = () => {
    navigate("/Login"); // Ensure this route is defined in your Router
  };

  return (
    <div className="container2 bg-[#0a0a0a] ">
      {/* Navbar */}
      <nav className={`navbar ${isVisible ? "fade-in-top" : ""}`}>
        <h1 className="logo mb-0">MedFund</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="#">How It Works</Link></li>
          <li><Link to="/Work3">Hospitals</Link></li>
          <li><Link to="/DonationCard">Donation</Link></li>
          <li><Link to="/Document">Verification</Link></li>
          <li><Link to="#">Security</Link></li>
          <li>
            {/* Fixed button with proper text */}
            <button className="btn primary" onClick={handleStartCampaign}>
              Start Campaign
            </button> 
            <button className="btn primary1 bg-blue-600 text-white my-2 mx-4" onClick={handleStartCampaign2}>
              Sign Up
            </button>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="nikal bg-gradient-to-b from-blue-400  to-white">
        <section className={`hero ${isVisible ? "fade-in-scale" : ""}`}>
          <div className="hero-content2">
            <h1 className="hero-title">
              Secure Blockchain <span className="highlight font-semibold">Medical Crowdfunding</span> Platform
            </h1>
            <p className="hero-text ">
              Connect directly with verified hospitals and help those in need with secure, transparent blockchain-powered donations. Every contribution makes a difference.
            </p>
            <div className="button-group">
              {/* Fixed button to navigate when clicked */}
              <button className="btn primary" onClick={handleStartCampaign}>
                Start a Campaign
              </button>
              <button className="btn secondary">Learn More</button>
            </div>
          </div>

          {/* Security Box */}
          <div className={`security-box ${isVisible ? "fade-in-blur" : ""}`}>
            <div className="secure-icon">
              <img src="/herosection.jpeg" alt="Secure Icon" />
            </div>
           
          </div>
        </section>
      </div>

      {/* Stats Section */}
      <section className={`stats ${isVisible ? "fade-in-bottom" : ""} `}>
        <div className="stat-item ">
          <h2>100+</h2>
          <p>Verified Hospitals</p>
        </div>
        <div className="stat-item">
          <h2>$2M+</h2>
          <p>Funds Raised</p>
        </div>
        <div className="stat-item">
          <h2>1000+</h2>
          <p>Lives Impacted</p>
        </div>
      </section>
    </div>
  );
}

export default Full;
