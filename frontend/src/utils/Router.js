import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/home';
import Contact from '../Pages/contact';
import Prediction from '../Pages/prediction';
import Doctors from '../Pages/doctors';
import Appointment from '../Pages/appointment';
import Login from '../Pages/login';
import Signup from '../Pages/signup';
import PatientProfle from '../Pages/patient-profile';
import MedicalHistory from '../Pages/medical-history';
import AppointmentHistory from '../Pages/appoint-history';
import PatientPage from '../Pages/PatientPage';
import DoctorPage from '../Pages/DoctorPage';
import AdminPage from '../Pages/AdminPage';
import UserManagement from '../Pages/UserManagement';
import DoctorApproval from '../Pages/DoctorApproval';
import PatientApproval from '../Pages/PatientApproval';
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
