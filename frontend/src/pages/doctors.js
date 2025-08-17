import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getBaseURL } from '../apiConfig';
import { useState, useEffect } from 'react';

function Doctors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // System preference detection
    const storedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(storedTheme);
    
    // Watch for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (!('theme' in localStorage)) {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const {
    data: doctors = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['doctors', searchQuery],
    queryFn: async () => {
      const response = await axios.get(
        `${getBaseURL()}/doctors/?search=${searchQuery}`
      );
      return response.data;
    },
    keepPreviousData: true,
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchTerm);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading)
    return (
      <div className="text-center py-20">
        <p>Loading doctors...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 dark:text-red-400">
        Error: {error.message}
      </div>
    );

  return (
    <div className="doctors-page bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <div className="nav">
        <Navbar theme={theme} setTheme={setTheme} />
      </div>

      <section className="doctors-section py-10 my-8 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="custom-container">
          {/* Title */}
          <div className="head max-w-3xl mx-auto text-center mb-8">
            <h1 className="title text-4xl font-bold mb-4 text-primary-600 dark:text-primary-400">
              Our Specialists
            </h1>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Connect with our experienced doctors specialized in various
              medical fields
            </p>
          </div>

          {/* Search Bar */}
          <div className="search-bar relative mb-[60px]">
            <div className="search-logo absolute inset-y-0 left-[25%] flex items-center pl-3 pointer-events-none">
              <img 
                src={theme === 'dark' ? "/images/search-white.png" : "/images/search.png"} 
                alt="search" 
                className="w-4 h-4" 
              />
            </div>
            <input
              className="block w-[50%] m-auto p-3 pl-10 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 transition-colors duration-200"
              placeholder="Search doctors by name or specialty"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                name={doctor.name}
                specialization={doctor.specialization}
                id={doctor.id}
                theme={theme}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="footer">
        <Footer theme={theme} />
      </div>
    </div>
  );
}

function DoctorCard({ name, specialization, id, theme }) {
  return (
    <div className="doctor-card bg-white dark:bg-gray-800 p-10 rounded-lg flex flex-col items-center text-center shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-primary-500 dark:hover:border-primary-400">
      <div className="image-container w-20 h-20 mb-6">
        <img
          src="/images/doctor.png"
          alt={`Dr. ${name}`}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="text-container">
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 capitalize transition-colors duration-300">
          {specialization.toLowerCase()}
        </p>
      </div>

      <div className="social flex space-x-3 mb-6">
        <a
          href="https://facebook.com"
          aria-label="Facebook"
          className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
        >
          <img 
            src={theme === 'dark' ? "/images/facebook-white.png" : "/images/facebook.png"} 
            alt="Facebook" 
            className="w-5 h-5" 
          />
        </a>
        <a
          href="https://linkedin.com"
          aria-label="LinkedIn"
          className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
        >
          <img 
            src={theme === 'dark' ? "/images/linkedin-white.png" : "/images/linkedin.png"} 
            alt="LinkedIn" 
            className="w-5 h-5" 
          />
        </a>
        <a
          href="https://twitter.com"
          aria-label="Twitter"
          className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
        >
          <img 
            src={theme === 'dark' ? "/images/insta-white.png" : "/images/insta.png"} 
            alt="Instagram" 
            className="w-5 h-5" 
          />
        </a>
      </div>

      <span className="appointment text-sm font-bold text-green-600 dark:text-green-400 transition-colors duration-300">
        <Link
          to={`/appointment?doctorId=${id}&doctorName=${name}&doctorSpecialization=${specialization}`}
          className="hover:underline hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
        >
          Appointment
        </Link>
      </span>
    </div>
  );
}

export default Doctors;