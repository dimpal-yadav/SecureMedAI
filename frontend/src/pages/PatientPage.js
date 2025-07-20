import React from 'react';
import PatientDashboard from '../components/patient/PatientDashboard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
