import React from 'react';
import DoctorDashboard from '../components/doctor/DoctorDashboard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DoctorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <DoctorDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default DoctorPage;
