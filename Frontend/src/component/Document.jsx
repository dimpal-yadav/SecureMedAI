import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

function Document() {
    const [documentId, setDocumentId] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [address, setAddress] = useState("");
  const [established, setEstablished] = useState("");
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerify = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerificationResult("Soon");
    }, 2000);
  };

  const handleFileUpload = (event) => {
    setDocument(event.target.files[0]);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-blue-800">
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        <div className="p-6 w-96 text-white shadow-2xl rounded-2xl bg-white">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center text-black">Hospital Document Verification</h2>
            <input
              type="text"
              placeholder="Enter Hospital Name"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              className="mb-4 p-2 border-black border-1  bg-gray-200 rounded w-full  "
            />
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mb-4 p-2 border-black border-1  bg-gray-200  rounded w-full"
            />
            <input
              type="text"
              placeholder="Established Year"
              value={established}
              onChange={(e) => setEstablished(e.target.value)}
              className="mb-4 p-2 border-black border-1  bg-gray-200  rounded w-full"
            />
            <input
              type="text"
              placeholder="Enter Document ID"
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
              className="mb-4 p-2 border-black border-1  bg-gray-200  rounded w-full"
            />
            <input
              type="file"
              onChange={handleFileUpload}
              className="mb-4 p-2 border-black border-1  bg-gray-200 text-black  rounded w-full"
            />
            <motion.div whileHover={{ scale: 1.1 }}>
              <button onClick={handleVerify} className="w-full bg-blue-500 text-white p-2 rounded">
                {loading ? <Loader2 className="animate-spin" /> : "Verify"}
              </button>
            </motion.div>
            {verificationResult && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="mt-4 text-lg font-semibold text-white"
              >
                {verificationResult}
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export default Document;