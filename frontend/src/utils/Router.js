import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Contact from '../pages/contact';
import Prediction from '../pages/prediction';
import Doctors from '../pages/doctors';
import Appointment from '../pages/appointment';
import Login from '../pages/login';
import Signup from '../pages/signup';
import PatientProfle from '../pages/patient-profile';
import MedicalHistory from '../pages/medical-history';
import AppointmentHistory from '../pages/appoint-history';
import PatientPage from '../pages/PatientPage';
import DoctorPage from '../pages/DoctorPage';
import AdminPage from '../pages/AdminPage';
import UserManagement from '../pages/UserManagement';
import DoctorApproval from '../pages/DoctorApproval';
import PatientApproval from '../pages/PatientApproval';
import ProtectedRoute from './ProtectedRoute';

const Router=()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/patient-profile" element={<PatientProfle />} />
          <Route path="/medical-history" element={<MedicalHistory />} />
          <Route path="/appoint-history" element={<AppointmentHistory />} />
          <Route path="/appointment" element={<Appointment />} />
          
          {/* Role-based dashboard routes */}
          <Route path="/patient-dashboard" element={<PatientPage />} />
          <Route path="/doctor-dashboard" element={<DoctorPage />} />
          <Route path="/admin-dashboard" element={<AdminPage />} />
          
          {/* Admin management routes */}
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/doctor-approval" element={<DoctorApproval />} />
          <Route path="/patient-approval" element={<PatientApproval />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
