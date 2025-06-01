import React, { useEffect, useRef } from "react";

function Work6() {
  const countersRef = useRef([]);

  useEffect(() => {
    const counters = countersRef.current;
    const speed = 200;

    const startCounting = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-target"));
          let count = 0;

          const updateCount = () => {
            const increment = target / speed;
            if (count < target) {
              count += increment;
              counter.innerText = Math.floor(count);
              setTimeout(updateCount, 10);
            } else {
              counter.innerText = target;
            }
          };

          updateCount();
          observer.unobserve(counter);
        }
      });
    };

    const observer = new IntersectionObserver(startCounting, {
      threshold: 0.5,
    });

    counters.forEach((counter) => observer.observe(counter));

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  return (
    <section id="statistics" className="py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Impact</h2>
          <p className="text-lg text-gray-300">
            Making a difference through blockchain-powered medical crowdfunding
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { target: 5000, label: "People Helped", suffix: "+" },
            { target: 10, label: "Funds Raised", suffix: "M+" },
            { target: 100, label: "Partner Hospitals", suffix: "+" },
            { target: 1000, label: "Successful Campaigns", suffix: "+" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-neutral-800 rounded-xl p-8 text-center"
            >
              <div className="counter-wrapper">
                <span
                  ref={(el) => (countersRef.current[index] = el)}
                  className="text-4xl font-bold text-white counter"
                  data-target={item.target}
                >
                  0
                </span>
                <span className="text-4xl font-bold text-white">
                  {item.suffix}
                </span>
              </div>
              <p className="text-gray-300 mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Work6;
