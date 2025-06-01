import React from "react";
import "./Work4.css";
import StoryCard from "./StoryCard";

const stories = [
  {
    title: "Sarah's Heart Surgery",
    description: "Raised $25,000 for critical cardiac",
    status: "100% Funded",
    donors: "150 Donors",
    outcome: "Successfully Treated",
  },
  {
    title: "Mike's Cancer Treatment",
    description: "Raised $50,000 for chemotherapy",
    status: "100% Funded",
    donors: "200 Donors",
    outcome: "in Recovery",
  },
  {
    title: "Baby Alex's Surgery",
    description: "Raised $35,000 for pediatric surgery",
    status: "Successfully Treated",
    donors: "100 Donors",
    outcome: "Fully Recovered",
  },
];

function Work4() {
  return (
    <div className="app">
      <h1>Success Stories</h1>
      <p>Real stories of hope, healing, and community support</p>
      <div className="stories-container">
        {stories.map((story, index) => (
          <StoryCard key={index} story={story} />
        ))}
      </div>
    </div>
  );
}

export default Work4;