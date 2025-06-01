import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Work10.css"; // Import styles

const faqs = [
  {
    question: "How does blockchain ensure the security of donations?",
    answer:
      "Our platform uses smart contracts on the blockchain to create an immutable record of all transactions. This ensures complete transparency and security, as every donation is tracked and verified through the blockchain network.",
  },
  {
    question: "How are hospitals verified on the platform?",
    answer:
      "We have a rigorous verification process for hospitals, including document verification, license checks, and physical verification. Only authorized hospitals can create and verify medical campaigns on our platform.",
  },
  {
    question: "How can I start a medical fundraising campaign?",
    answer:
      "To start a campaign, connect with one of our verified partner hospitals. They will verify your medical condition and help create a campaign. Once verified, your campaign will be live for receiving donations.",
  },
  {
    question: "How are the funds transferred to the hospital?",
    answer:
      "Funds are directly transferred to the hospital's account through smart contracts when specific treatment milestones are met. This ensures proper utilization of funds for the intended medical treatment.",
  },
];

const Work10= () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container ">
        <h2 className="faq-heading">Frequently Asked Questions</h2>
        <p className="faq-description">
          Get answers to common questions about our medical crowdfunding platform
        </p>

        <div className="bg-black rounded-lg">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>
                <motion.svg
                  className="faq-arrow"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </motion.svg>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work10;
