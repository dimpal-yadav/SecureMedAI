import { useState, useEffect } from "react";
import { connectWallet, donate, getTotalDonations } from "../blockchain";
import { useNavigate } from "react-router-dom"; 

function Donation({ selectedDonation, onClose }) {
    const [walletAddress, setWalletAddress] = useState(null);
    const [donationAmount, setDonationAmount] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [totalDonations, setTotalDonations] = useState("0");
    const [donationHistory, setDonationHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
     
    const navigate = useNavigate(); //link to button

    useEffect(() => {
        fetchTotalDonations();
    }, []);

    
    const handleConnectWallet = async () => {
        setIsLoading(true);
        setError("");
        try {
            const address = await connectWallet();
            if (address) setWalletAddress(address);
        } catch (error) {
            console.error("Wallet connection error:", error);
            setError("Failed to connect wallet. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDonate = async () => {
        if (!walletAddress) {
            alert("Please connect your wallet first!");
            return;
        }
        if (!recipientName.trim()) {
            alert("Enter the recipient's name.");
            return;
        }
        if (!donationAmount || isNaN(donationAmount) || Number(donationAmount) <= 0) {
            alert("Enter a valid donation amount.");
            return;
        }

        setIsLoading(true);
        setError("");
        try {
            await donate(donationAmount);
            alert("Donation Successful!");

            // Update donation history
            setDonationHistory(prevHistory => [
                ...prevHistory, 
                { 
                    name: recipientName, 
                    amount: donationAmount, 
                    date: new Date().toLocaleString() 
                }
            ]);
            setDonationAmount("");
            setRecipientName("");
            await fetchTotalDonations();
        } catch (error) {
            console.error("Donation error:", error);
            setError("Failed to donate. Please check your balance and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTotalDonations = async () => {
        try {
            const total = await getTotalDonations();
            setTotalDonations(total);
        } catch (error) {
            console.error("Error fetching total donations:", error);
            setError("Failed to fetch total donations.");
        }
    };
    const handleClose = () => {
        navigate("/"); // ✅ Navigate to Home Page when closing
    };

    return (
        <div className="min-w-[100vw] h-[90vw] max-w-xl mx-auto bg-white shadow-lg rounded-lg p-4 ">

          <div className="flex fixed w-full items-center justify-between  mt-0 mb-10 "> 

                <h1 className="text-2xl font-bold text-gray-800">🌍 Blockchain Donation Platform</h1>
                {selectedDonation && (
                <h2 className="mt-2 text-lg text-gray-600">🙏 Donating to: <span className="font-semibold">{selectedDonation.title}</span></h2>
            )}

            
               
            
                <button onClick={handleClose} className="bg-red-500 p-2 pt-0 pb-0  size-8   object-contain mr-12 mt-0 mb-10  text-white flex items-center justify-center rounded-full  hover:bg-red-600 ">x</button>
                
            </div>

          
        <div className="flex flex-col justify-center items-center mt-10">

        <button 
                    onClick={handleConnectWallet} 
                    className="px-2 py-2 mt-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 "
                    disabled={isLoading}
                >
                    {isLoading ? "Connecting..." : walletAddress ? `✅ Connected: ${walletAddress.substring(0, 6)}...` : "🔗 Connect Wallet"}
                </button>
            <div className="mt-10 p-4 border w-[500px] rounded-md ">
                <input 
                    type="text" 
                    placeholder="Enter recipient name" 
                    value={recipientName} 
                    onChange={(e) => setRecipientName(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    disabled={isLoading}
                />
                <input 
                    type="number" 
                    placeholder="Enter donation amount (ETH)" 
                    value={donationAmount} 
                    onChange={(e) => setDonationAmount(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 mt-2"
                    disabled={isLoading}
                />
                <button 
                    onClick={handleDonate} 
                    className="mt-2 px-4 py-2 w-full bg-green-500 text-white rounded-md hover:bg-green-600"
                    disabled={isLoading || !walletAddress}
                >
                    {isLoading ? "Processing..." : "💰 Confirm Donation"}
                </button>
            </div>
            </div>
        <div className="flex flex-col justify-center items-center">
                
            {error && <p className="mt-3 text-red-500">{error}</p>}

         { /*  <h2 className="mt-6 text-xl font-semibold text-gray-700">💰 Total Donations: {totalDonations} ETH</h2>
*/}
            {/* Donation History Cards */}
            <h3 className="mt-6 text-lg font-semibold text-gray-700">📜 Donation History</h3>
            {donationHistory.length === 0 ? (
                <p className="mt-2 text-gray-500">No donations yet. Be the first to contribute! 🚀</p>
            ) : (
                <div className="mt-3 space-y-3">
                    {donationHistory.map((donation, index) => (
                        <div key={index} className="p-3 border rounded-lg shadow-sm bg-gray-50">
                            <p className="text-gray-700"><strong>Recipient:</strong> {donation.name}</p>
                            <p className="text-green-600 font-semibold">💸 {donation.amount} ETH</p>
                            <p className="text-gray-500">📅 {donation.date}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
    );
}

export default Donation;
