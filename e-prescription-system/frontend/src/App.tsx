import { Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";


import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import DoctorDashboard from "@/pages/doctor/DoctorDashboard";
import WritePrescription from "@/pages/doctor/WritePrescription";
import PatientDashboard from "@/pages/patient/PatientDashboard";
import PharmacyDashboard from "@/pages/pharmacy/PharmacyDashboard";
import CreateDoctorProfile from "@/pages/doctor/CreateDoctorProfile";

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Doctor */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="ROLE_DOCTOR">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/prescribe/:patientId"
          element={
            <ProtectedRoute role="ROLE_DOCTOR">
              <WritePrescription />
            </ProtectedRoute>
          }
        />

        {/* Patient */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute role="ROLE_PATIENT">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        {/* Pharmacy */}
        <Route
          path="/pharmacy"
          element={
            <ProtectedRoute role="ROLE_PHARMACY">
              <PharmacyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/doctor/profile/create"
  element={
    <ProtectedRoute role="DOCTOR">
      <CreateDoctorProfile />
    </ProtectedRoute>
  }
/>


        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
