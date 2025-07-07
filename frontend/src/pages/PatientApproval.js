import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../Utils/axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const PatientApproval = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('pending'); // pending, approved, rejected

  // Check if user is admin
  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const {
    data: patients = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['patientApprovals'],
    queryFn: async () => {
      const response = await axiosInstance.get('/user/pending-patients/');
      return response.data;
    },
    enabled: !!token && userRole === 'HOSPITAL_ADMIN',
  });

  // Filter patients based on approval status
  const filteredPatients = patients.filter(patient => {
    if (filter === 'pending') return patient.approval_status === 'PENDING';
    if (filter === 'approved') return patient.approval_status === 'APPROVED';
    if (filter === 'rejected') return patient.approval_status === 'REJECTED';
    return true;
  });

  // Approve patient mutation
  const approveMutation = useMutation({
    mutationFn: async (patientId) => {
      return await axiosInstance.patch(`/user/patient/${patientId}/approve/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['patientApprovals']);
    },
  });

  // Reject patient mutation
  const rejectMutation = useMutation({
    mutationFn: async ({ patientId, reason }) => {
      return await axiosInstance.patch(`/user/patient/${patientId}/reject/`, {
        rejection_reason: reason
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['patientApprovals']);
    },
  });

  const handleApprove = (patientId) => {
    if (window.confirm('Are you sure you want to approve this patient?')) {
      approveMutation.mutate(patientId);
    }
  };

  const handleReject = (patientId) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      rejectMutation.mutate({ patientId, reason });
    }
  };

  // If not admin, show access denied
  if (userRole !== 'HOSPITAL_ADMIN') {
    return (
      <div>
        <Navbar />
        <div className="text-center py-10">
          <p className="text-red-500">Access denied. Only hospital administrators can view this page.</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="text-center py-10">
          <p>Loading patient approvals...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="text-center py-10 text-red-500">
          <p>Error loading patient approvals: {error.message}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Patient Approval Management</h1>
          <p className="mt-2 text-gray-600">
            Review and approve patient registrations
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { key: 'pending', label: 'Pending', count: patients.filter(p => p.approval_status === 'PENDING').length },
              { key: 'approved', label: 'Approved', count: patients.filter(p => p.approval_status === 'APPROVED').length },
              { key: 'rejected', label: 'Rejected', count: patients.filter(p => p.approval_status === 'REJECTED').length },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Patients List */}
        <div className="space-y-6">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <div key={patient.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-12 w-12">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-lg font-medium text-green-600">
                            {patient.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {patient.name}
                        </h3>
                        <p className="text-sm text-gray-500">{patient.email}</p>
                        <p className="text-sm text-gray-600">
                          Age: {patient.age || 'Not specified'} | Gender: {patient.gender === 'M' ? 'Male' : 'Female'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Blood Group: {patient.blood_group || 'Not specified'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Registered: {new Date(patient.registered_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        patient.approval_status === 'APPROVED' 
                          ? 'bg-green-100 text-green-800'
                          : patient.approval_status === 'REJECTED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {patient.approval_status}
                      </span>
                    </div>

                    {/* Rejection Reason */}
                    {patient.approval_status === 'REJECTED' && patient.rejection_reason && (
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-red-900">Rejection Reason</h4>
                        <p className="text-sm text-red-600">{patient.rejection_reason}</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {patient.approval_status === 'PENDING' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(patient.id)}
                        disabled={approveMutation.isLoading}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                      >
                        {approveMutation.isLoading ? 'Approving...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => handleReject(patient.id)}
                        disabled={rejectMutation.isLoading}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
                      >
                        {rejectMutation.isLoading ? 'Rejecting...' : 'Reject'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              No patients found with {filter} status.
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {patients.filter(p => p.approval_status === 'PENDING').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Approved Patients</h3>
            <p className="text-3xl font-bold text-green-600">
              {patients.filter(p => p.approval_status === 'APPROVED').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Rejected Applications</h3>
            <p className="text-3xl font-bold text-red-600">
              {patients.filter(p => p.approval_status === 'REJECTED').length}
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PatientApproval; 