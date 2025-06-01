import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, description, buttonText, onDonate }) => {
  return (
    <div className="bg-[rgba(0,183,194,0.1)] shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">


      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-white">{description}</p>
      <button
       className="mt-4 bg-gradient-to-r from-[#00fff5] to-[#00b7c2] text-black px-4 py-2 rounded hover:opacity-80"
        onClick={() => onDonate({ title, description })}
      >
        {buttonText}
      </button>
    </div>
  );
};

const Section = ({ title, data, onDonate }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {data.map((item, index) => (
          <Card key={index} {...item} onDonate={onDonate} />
        ))}
      </div>
    </div>
  );
};

const DonationCard = () => {
  const navigate = useNavigate();

  const patientStories = [
    { title: "Cancer Treatment", description: "Help us reach the $50,000 goal", buttonText: "Donate Now" },
    { title: "Emergency Surgery", description: "Help us reach the $30,000 goal", buttonText: "Donate Now" },
    { title: "Child Healthcare", description: "Help us reach the $25,000 goal", buttonText: "Donate Now" },
  ];

  const trendingFundraisers = [
    { title: "New ICU Wing", description: "75% funded • 15 days remaining", buttonText: "Support Now" },
    { title: "Medical Equipment", description: "60% funded • 10 days remaining", buttonText: "Support Now" },
    { title: "Research Program", description: "45% funded • 20 days remaining", buttonText: "Support Now" },
  ];

  const handleDonate = (donation) => {
    navigate("/donation", { state: { donation } });
  };

  return (
    <div
    className="min-h-screen p-6"
    style={{ background: "linear-gradient(135deg, #0f4c75 0%, #1b262c 100%)" }}
  >
    {/* Added rgba(255, 255, 255, 0.05) background here */}
    <div className="container mx-auto text-center text-white p-6 rounded-lg" style={{ background: "rgba(255, 255, 255, 0.05)" }}>
        <h1 className="text-4xl font-bold">Healing Horizon</h1>
        <p className="text-gray-300">Support healthcare initiatives that matter</p>
      </div>

      <Section title="Active Patient Stories" data={patientStories} onDonate={handleDonate} />
      <Section title="Trending Fundraisers" data={trendingFundraisers} onDonate={handleDonate} />
    </div>
  );
};

export default DonationCard;
