import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function Banner(){
  const typewriterRef = useRef(null);

  useEffect(() => {
    const element = typewriterRef.current;
    if (!element) return;

    const fullText = element.textContent;
    element.textContent = "";

    let index = 0;

    function type() {
      if (index < fullText.length) {
        element.textContent += fullText.charAt(index);
        index++;
        setTimeout(type, 100);
      }
    }

    type();
  }, []);

  return (
    <section className="head-section px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-[120px]">
          <div className="title w-full lg:w-2/5">
            <h1
              ref={typewriterRef}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-0"
            >
              Discover Your Health with Our Smart App
            </h1>
          </div>
          <div className="text w-full lg:w-1/2">
            <p className="mb-6 md:mb-[30px] text-gray-700 dark:text-gray-300">
              Our innovative application helps you identify potential diseases
              based on your symptoms. Connect with specialized doctors and
              manage your health seamlessly.
            </p>
            <div className="buttons flex flex-wrap gap-4">
              <button className="bg-[#2563EB] text-white px-6 py-2 text-[14px] font-bold hover:shadow-md transition-all duration-300">
                <Link to="/prediction" className="nav-link">
                  Get Started
                </Link>
              </button>
              <button className="border border-gray-800 text-gray-800 dark:border-blue-400 dark:text-blue-400 px-6 py-2 text-[14px] font-bold rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900">
                <a href="#about-us">Learn More</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
