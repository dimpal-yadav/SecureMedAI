import React from 'react'
import "./Work7.css";

function Work9() {

    const Footer = () => {
        return (
            <>
          <footer className="footer">
            <div className="footer-content">
              <div>
                <h3>MedFund</h3>
                <p>Secure blockchain-powered medical crowdfunding platform.</p>
              </div>
              <div>
                <h4>Quick Links</h4>
                <ul>
                  <li>How It Works</li>
                  <li>Features</li>
                  <li>Partner Hospitals</li>
                  <li>Success Stories</li>
                  <li>Security</li>
                </ul>
              </div>
              <div>
                <h4>Newsletter</h4>
                <input type="email" placeholder="Enter your email" />
                <button>Subscribe</button>
              </div>
            </div>
            <p>© 2024 MedFund. All rights reserved.</p>
          </footer>
          </>
        );
      };
    }
export default Work9