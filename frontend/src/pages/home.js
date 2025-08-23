import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useEffect, lazy, Suspense, useRef, useState } from 'react';

const Features = lazy(() => import('../components/Features'));
const Banner = lazy(() => import('../components/Banner'));
const About = lazy(() => import('../components/About'));
const TestimonialsSection = lazy(() => import('../components/testimonial'));

function Home() {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showAbout, setShowAbout] = useState(false);  
  const [showBanner, setShowBanner] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const featuresRef = useRef();
  const bannerRef = useRef();
  const aboutRef = useRef();
  const testimonialRef = useRef();

  function observeSection(ref, setShow) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShow(true);
        observer.disconnect();
      }
    },
    { rootMargin: '200px' }
  );

  if (ref.current) observer.observe(ref.current);

  return () => observer.disconnect();
  }

  useEffect(() => {
  const disconnects = [
    observeSection(bannerRef, setShowBanner),
    observeSection(featuresRef, setShowFeatures),
    observeSection(aboutRef, setShowAbout),
    observeSection(testimonialRef, setShowTestimonials),
  ];

  return () => disconnects.forEach(disconnect => disconnect());
  }, []);

  return (
    <div className="home-page bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
      {/* Navbar */}
      <div className="nav mb-8 md:mb-16 lg:mb-[120px]">
        <Navbar />
      </div>

      {/* Banner Text */}
      <div
        ref={bannerRef}
        className={`min-h-[10px] transition-opacity duration-500 ${
          showBanner ? 'animate-slideUp' : 'opacity-0'
        }`}
      >
        {showBanner && (
          <Suspense fallback={<div className="text-center py-10">Loading Banner...</div>}>
            <Banner />
          </Suspense>
        )}
      </div>


      {/* Banner Image */}
      <section className="banner-section px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="image-container mt-10 md:mt-[40px] lg:mt-[70px] mb-16 md:mb-24 lg:mb-[160px]">
            <img 
              src="/images/banner.jpg"
              alt="banner"
              loading="lazy"
              className="w-full h-auto md:h-[400px] lg:h-[570px] object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      
      <div
        ref={featuresRef}
        className={`min-h-[10px] transition-opacity duration-500 ${
          showFeatures ? 'animate-slideUp' : 'opacity-0'
        }`}
      >
        {showFeatures && (
          <Suspense fallback={<div className="text-center py-10">Loading Features...</div>}>
            <Features />
          </Suspense>
        )}
      </div>

      {/* About */}
      <div
        ref={aboutRef}
        className={`min-h-[10px] transition-opacity duration-500 ${
          showAbout ? 'animate-slideUp' : 'opacity-0'
        }`}
      >
        {showAbout && (
          <Suspense fallback={<div className="text-center py-10">Loading About...</div>}>
            <About />
          </Suspense>
        )}
      </div>

      {/* Testimonials */}
      <div
        ref={testimonialRef}
        className={`min-h-[10px] transition-opacity duration-500 ${
          showTestimonials ? 'animate-slideUp' : 'opacity-0'
        }`}
      >
        {showTestimonials && (
          <Suspense fallback={<div className="text-center py-10">Loading Testimonials...</div>}>
            <TestimonialsSection />
          </Suspense>
        )}
      </div>

      {/* Footer */}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
