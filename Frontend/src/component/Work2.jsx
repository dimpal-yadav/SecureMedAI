import { motion } from "framer-motion";
import { FaLock, FaShieldAlt, FaEye, FaBolt, FaComments, FaSlidersH } from "react-icons/fa";

const features = [
  {
    icon: <FaLock className="text-xl" />,
    title: "Blockchain Security",
    description: "Smart contracts ensure secure and transparent transactions with immutable records.",
  },
  {
    icon: <FaShieldAlt className="text-xl" />,
    title: "Hospital Verification",
    description: "All medical cases are verified by authorized hospitals in our network.",
  },
  {
    icon: <FaEye className="text-xl" />,
    title: "Full Transparency",
    description: "Track every donation and its utilization in real-time through blockchain.",
  },
  {
    icon: <FaBolt className="text-xl" />,
    title: "Instant Transfers",
    description: "Quick and efficient fund transfers directly to verified hospital accounts.",
  },
  {
    icon: <FaComments className="text-xl" />,
    title: "Regular Updates",
    description: "Receive verified updates about the treatment progress and fund utilization.",
  },
  {
    icon: <FaSlidersH className="text-xl" />,
    title: "Easy Management",
    description: "Simple dashboard to manage campaigns, donations, and updates.",
  },
];

const WhyChooseMedFund = () => {
  return (
    <div className="bg-black text-white py-16 px-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-3">Why Choose MedFund</h2>
        <p className="text-gray-400 mb-8">Advanced features ensuring security and transparency</p>
      </div>

      {/* Feature Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="bg-gray-900 p-6 rounded-xl shadow-lg flex items-start space-x-4 cursor-pointer"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-blue-500 p-3 rounded-lg text-white">{feature.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default WhyChooseMedFund;
