import React from 'react';
import PatientDashboard from '../Components/patient/PatientDashboard';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const PatientPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <PatientDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default PatientPage;
