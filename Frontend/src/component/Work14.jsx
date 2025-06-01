import React, { useEffect } from "react";
import "./Work14.css";

const StatBox = ({ number, label }) => (
  <div className="stat-box">
    <div className="stat-number">{number}</div>
    <div>{label}</div>
  </div>
);

const ProjectItem = ({ title, description }) => {
  const handleSupport = () => {
    console.log("Supporting:", title);
  };

  return (
    <div className="project-item" onClick={handleSupport}>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="support-btn">SUPPORT NOW</button>
    </div>
  );
};

const DonationCube = () => {
  useEffect(() => {
    const cube = document.querySelector(".donation-cube");
    document.addEventListener("mousemove", (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 30;
      const y = (window.innerHeight / 2 - e.clientY) / 30;
      cube.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });
  }, []);

  return (
    <div className="tracker-3d">
      <div className="donation-cube">
        {[
          "DONATION",
          "DOJERT",
          "DONALORTS",
          "DOSPITAL NOS",
          "PREMIUM",
          "SUPPORT",
        ].map((text, index) => (
          <div key={index} className="cube-face">
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

const Work14 = () => {
  const stats = [
    { number: 30, label: "DONATORS" },
    { number: 20, label: "PROJECTS" },
    { number: 3, label: "ACTIVE" },
  ];

  const projects = [
    { title: "Dooling Bontol", description: "Doling nonlal bedos" },
    { title: "Hotnioli gopelajrojfoda", description: "Restoal dolition o'oncaga" },
    { title: "tucnicant gorobi carotora", description: "acatling pontol foutonka" },
    { title: "noektora montuai automata", description: "Rozpalatinloricxel ckronfla" },
  ];

  return (
    <div className="container">
      <header className="header">
        <div className="brand">HOSPITAL CRONDP</div>
        <div className="stats">
          {stats.map((stat, index) => (
            <StatBox key={index} {...stat} />
          ))}
        </div>
      </header>
      <main className="main-grid">
        <DonationCube />
        <div className="projects-panel">
          {projects.map((project, index) => (
            <ProjectItem key={index} {...project} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Work14;
