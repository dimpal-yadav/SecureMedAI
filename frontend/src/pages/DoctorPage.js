import React from 'react';
import DoctorDashboard from '../Components/doctor/DoctorDashboard';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

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
