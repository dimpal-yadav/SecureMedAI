import React from "react";
import { motion } from "framer-motion";
import { FaHospital, FaCheckCircle } from "react-icons/fa";
import "./Work3.css"; // Importing custom CSS

const hospitals = [
  {
    name: "City General Hospital",
    description: "Premier healthcare institution",
  },
  {
    name: "Metro Medical Center",
    description: "Specialized care facility",
  },
  {
    name: "Life Care Hospital",
    description: "Multi-specialty hospital",
  },
];

const PartnerHospitals = () => {
  return (
    <div className="partner-hospitals">
      <div className="title-section">
        <h2>Partner Hospitals</h2>
        <p>Trusted medical institutions working together for verified medical fundraising</p>
      </div>

      {/* Hospital Cards */}
      <motion.div 
        className="hospital-grid"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {hospitals.map((hospital, index) => (
          <motion.div 
            key={index} 
            className="hospital-card"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="icon">
              <FaHospital />
            </div>
            <h3>{hospital.name}</h3>
            <p>{hospital.description}</p>
            <div className="verified">
              Verified Partner <FaCheckCircle className="check-icon" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Link */}
      <motion.a 
        href="#" 
        className="view-all"
        whileHover={{ scale: 1.1 }}
      >
        View all partner hospitals →
      </motion.a>

      {/* Call to Action */}
      <motion.div 
        className="cta-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h3>Want to Partner With Us?</h3>
        <p>Join our network of verified hospitals and help make healthcare accessible to everyone</p>
        <motion.button 
          className="cta-button"
          whileHover={{ scale: 1.1 }}
        >
          Become a Partner Hospital
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PartnerHospitals;
