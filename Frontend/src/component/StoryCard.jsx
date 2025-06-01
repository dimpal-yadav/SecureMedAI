import React from 'react';
import './StoryCard.css';

function StoryCard({ story = {} }) {
  const { title = "No Title", description = "No Description", status = "No Status", donors = "No Donors", outcome = "No Outcome" } = story;

  return (
    <>
    <div className="story-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="status">{status}</div>
      <div className="donors">{donors}</div>
      <div className="outcome">{outcome}</div>
    </div>
    </>
  );
}

export default StoryCard;