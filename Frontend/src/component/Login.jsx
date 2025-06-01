import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../config/firebase.confg";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom"; // 🔹 Import useNavigate

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "error" or "success"

  const navigate = useNavigate(); // 🔹 Initialize navigation

  const signUpAction = async () => {
    setMessage(""); // Clear messages

    // Email & Password Validation
    if (!email.includes("@") || !email.includes(".")) {
      setMessage("❌ Invalid Email Format!");
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage("❌ Password must be at least 6 characters!");
      setMessageType("error");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      await sendEmailVerification(user);
      setMessage("📩 Verification email sent! Please check your inbox.");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        setUser({ email: userCred.email, emailVerified: userCred.emailVerified });

        if (userCred.emailVerified) {
          setMessage("✅ Your email is verified!");
          setMessageType("success");
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500  to-white">
      <motion.div
        className="backdrop-blur-md bg-white/10 p-8 rounded-lg shadow-lg w-96 border border-white/20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">Sign Up</h2>

        {/* Alert Message */}
        {message && (
          <motion.p
            className={`text-center px-4 py-2 rounded-md mb-4 ${
              messageType === "error"
                ? "bg-gradient-to-r from-red-500 to-white text-red-900"
                : "bg-gradient-to-r from-green-400 to-white text-green-900"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {message}
          </motion.p>
        )}
        <div className="flex  flex-col gap-5 mt-7 text-black">
        <InputField type="email" placeholder="Email here"  handleChange={setEmail} />
        <InputField type="password" placeholder="Password Here" handleChange={setPassword} />
        </div>
        <motion.button
          type="button"
          onClick={() => {
            if (user?.emailVerified) {
              navigate("/"); // 🔹 Redirect when email is verified
            } else {
              signUpAction();
            }
          }}
          className="w-full bg-gradient-to-r from-blue-400 mt-9 to-purple-600 hover:from-blue-500 hover:to-purple-700 text-white font-semibold py-2 rounded-md transition duration-300 shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {user?.emailVerified ? "✅ Your Email is Verified - Go to Home" : "Sign Up"}
        </motion.button>
      </motion.div>

      {user && (
        <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-md p-3 rounded-md text-white">
          <p>{user?.email}</p>
          <p>{user?.emailVerified ? "✅ Verified" : "❌ Not Verified"}</p>
        </div>
      )}
    </main>
  );
}

const InputField = ({ placeholder, handleChange, type }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChangeEvent = (e) => {
    setInputValue(e.target.value);
    handleChange(e.target.value);
  };

  return (
    <motion.input
      value={inputValue}
      type={type}
      placeholder={placeholder}
      onChange={handleChangeEvent}
      className="w-full px-4 py-2 border rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 shadow-sm"
      whileFocus={{ scale: 1.02 }}
    />
  );
};

export default Login;