import React from "react";
import "./Work17.css";

const Work7= () => {
  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <p>Get answers to common questions about our medical crowdfunding platform</p>
      <div className="faq">
        <details>
          <summary>How does blockchain ensure the security of donations?</summary>
          <p>Blockchain ensures transparency and security through decentralized ledgers.</p>
        </details>
        <details>
          <summary>How are hospitals verified on the platform?</summary>
          <p>Hospitals undergo a rigorous verification process before approval.</p>
        </details>
        <details>
          <summary>How can I start a medical fundraising campaign?</summary>
          <p>Submit a request with hospital details, and our team will guide you.</p>
        </details>
        <details>
          <summary>How are the funds transferred to the hospital?</summary>
          <p>Funds are securely transferred directly to the verified hospital.</p>
        </details>
      </div>
    </section>
  );
};



export default Work7
