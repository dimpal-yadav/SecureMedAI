import React from 'react';
import AdminDashboard from '../Components/admin/AdminDashboard';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const AdminPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
