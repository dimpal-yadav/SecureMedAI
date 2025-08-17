import React from 'react';
import DoctorDashboard from '../components/doctor/DoctorDashboard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DoctorPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <Navbar />
      <main className="flex-grow">
        <DoctorDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default DoctorPage;
