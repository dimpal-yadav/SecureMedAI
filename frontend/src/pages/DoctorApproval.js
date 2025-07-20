import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../utils/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DoctorApproval = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('pending'); // pending, approved, rejected

  // Check if user is admin
  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const {
    data: doctors = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['doctorApprovals'],
    queryFn: async () => {
      const response = await axiosInstance.get('/user/pending-doctors/');
      return response.data;
    },
    enabled: !!token && userRole === 'HOSPITAL_ADMIN',
  });

  // Filter doctors based on approval status
  const filteredDoctors = doctors.filter(doctor => {
    if (filter === 'pending') return doctor.approval_status === 'PENDING';
    if (filter === 'approved') return doctor.approval_status === 'APPROVED';
    if (filter === 'rejected') return doctor.approval_status === 'REJECTED';
    return true;
  });

  // Approve doctor mutation
  const approveMutation = useMutation({
    mutationFn: async (doctorId) => {
      return await axiosInstance.patch(`/user/doctor/${doctorId}/approve/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['doctorApprovals']);
    },
  });

  // Reject doctor mutation
  const rejectMutation = useMutation({
    mutationFn: async ({ doctorId, reason }) => {
      return await axiosInstance.patch(`/user/doctor/${doctorId}/reject/`, {
        rejection_reason: reason
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['doctorApprovals']);
    },
  });

  const handleApprove = (doctorId) => {
    if (window.confirm('Are you sure you want to approve this doctor?')) {
      approveMutation.mutate(doctorId);
    }
  };

  const handleReject = (doctorId) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      rejectMutation.mutate({ doctorId, reason });
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
          <p>Loading doctor approvals...</p>
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
          <p>Error loading doctor approvals: {error.message}</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Doctor Approval Management</h1>
          <p className="mt-2 text-gray-600">
            Review and approve doctor registrations
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { key: 'pending', label: 'Pending', count: doctors.filter(d => d.approval_status === 'PENDING').length },
              { key: 'approved', label: 'Approved', count: doctors.filter(d => d.approval_status === 'APPROVED').length },
              { key: 'rejected', label: 'Rejected', count: doctors.filter(d => d.approval_status === 'REJECTED').length },
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

        {/* Doctors List */}
        <div className="space-y-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-12 w-12">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-lg font-medium text-blue-600">
                            {doctor.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Dr. {doctor.name}
                        </h3>
                        <p className="text-sm text-gray-500">{doctor.email}</p>
                        <p className="text-sm text-gray-600">
                          Specialization: {doctor.specialization || 'Not specified'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Age: {doctor.age || 'Not specified'} | Gender: {doctor.gender === 'M' ? 'Male' : 'Female'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Registered: {new Date(doctor.registered_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Additional Information */}
                    {doctor.qualifications && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Qualifications</h4>
                        <p className="text-sm text-gray-600">{doctor.qualifications}</p>
                      </div>
                    )}

                    {doctor.experience && (
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-gray-900">Experience</h4>
                        <p className="text-sm text-gray-600">{doctor.experience} years</p>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="mt-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        doctor.approval_status === 'APPROVED' 
                          ? 'bg-green-100 text-green-800'
                          : doctor.approval_status === 'REJECTED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doctor.approval_status}
                      </span>
                    </div>

                    {/* Rejection Reason */}
                    {doctor.approval_status === 'REJECTED' && doctor.rejection_reason && (
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-red-900">Rejection Reason</h4>
                        <p className="text-sm text-red-600">{doctor.rejection_reason}</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {doctor.approval_status === 'PENDING' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(doctor.id)}
                        disabled={approveMutation.isLoading}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                      >
                        {approveMutation.isLoading ? 'Approving...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => handleReject(doctor.id)}
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
              No doctors found with {filter} status.
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {doctors.filter(d => d.approval_status === 'PENDING').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Approved Doctors</h3>
            <p className="text-3xl font-bold text-green-600">
              {doctors.filter(d => d.approval_status === 'APPROVED').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Rejected Applications</h3>
            <p className="text-3xl font-bold text-red-600">
              {doctors.filter(d => d.approval_status === 'REJECTED').length}
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DoctorApproval; 