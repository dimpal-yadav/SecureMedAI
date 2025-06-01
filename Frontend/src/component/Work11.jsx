import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Work11.css"; // External CSS for styling

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hospital: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message. We will get back to you soon!");
    setFormData({ name: "", email: "", hospital: "", message: "" });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Heading Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          <h2 className="title">Start Your Journey</h2>
          <p className="subtitle">Get in touch with us to start your medical fundraising campaign</p>
        </motion.div>

        <div className="content">
          {/* Left Form Section */}
          <motion.div 
            className="form-container"
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1.2 }}
          >
            <form onSubmit={handleSubmit}>
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />

              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />

              <label>Select Hospital</label>
              <select name="hospital" value={formData.hospital} onChange={handleChange} required>
                <option value="">Choose a hospital</option>
                <option value="hospital1">City General Hospital</option>
                <option value="hospital2">Metro Medical Center</option>
                <option value="hospital3">Life Care Hospital</option>
              </select>

              <label>Your Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required />

              <button type="submit">Submit Request</button>
            </form>
          </motion.div>

          {/* Right Contact Info Section */}
          <motion.div 
            className="info-container"
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1.2 }}
          >
            <h3>Contact Information</h3>
            <p>📞 +1 (555) 123-4567 <span>(Mon-Fri 9am-6pm)</span></p>
            <p>📧 support@medfund.com <span>(We respond within 24 hours)</span></p>

            <div className="partnership-box">
              <h3>For Hospitals</h3>
              <p>Interested in becoming a partner hospital? Contact our partnership team for verification and onboarding.</p>
              <a href="#">Learn more about partnership →</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
