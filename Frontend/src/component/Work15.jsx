import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function BlockchainHealthcare() {
  const [donationAmount, setDonationAmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState(null);

  const handleDonate = () => {
    setTransactionStatus("Processing transaction...");
    setTimeout(() => {
      setTransactionStatus("Transaction Successful! Blockchain Verified ✔");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <motion.h1 className="text-3xl font-bold mb-6" animate={{ scale: 1.1 }}>
        Global HealthAid Blockchain Platform
      </motion.h1>

      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Support a Patient in Need</h2>
          <Input
            type="number"
            placeholder="Enter donation amount (ETH)"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleDonate} className="w-full bg-green-500 hover:bg-green-600 text-white">
            Donate Securely
          </Button>
          {transactionStatus && (
            <p className="mt-4 text-center text-sm text-gray-700">{transactionStatus}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
