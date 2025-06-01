import React from "react";
import "./Work.css";
import { FaCheckCircle, FaVideo, FaDollarSign } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaCheckCircle className="icon" />,
      title: "Hospital Verification",
      description: "Get your medical case verified by our network of authorized hospitals to ensure authenticity.",
      step: "Step 1",
    },
    {
      icon: <FaVideo className="icon" />,
      title: "Create Campaign",
      description: "Share your story and medical requirements through our blockchain-secured platform.",
      step: "Step 2",
    },
    {
      icon: <FaDollarSign className="icon" />,
      title: "Receive Donations",
      description: "Get transparent, secure donations directly through blockchain smart contracts.",
      step: "Step 3",
    },
  ];

  return (
    <div className="how-it-works">
      <h2 className="section-title">How MedFund Works</h2>
      <p className="section-subtitle">A simple and transparent process to help those in need</p>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <div className="step-icon">{step.icon}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
            <span className="step-number">{step.step}</span>
          </div>
        ))}
      </div>
      <button className="start-btn">Start Your Campaign →</button>
    </div>
  );
}
