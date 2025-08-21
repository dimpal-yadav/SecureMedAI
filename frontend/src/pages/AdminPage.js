import React from 'react';
import AdminDashboard from '../components/admin/AdminDashboard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <Navbar />
      <main className="flex-grow">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
