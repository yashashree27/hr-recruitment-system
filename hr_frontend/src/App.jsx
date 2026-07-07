import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Candidates from "./pages/Candidates";
import CandidateProfile from "./pages/CandidateProfile";
import CandidateForm from "./pages/CandidateForm";
import Interviews from "./pages/Interviews";
import Offer from "./pages/Offer";
import ProtectedRoute from "./components/ProtectedRoute";
import InterviewDetails from "./pages/InterviewDetails";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidates"
        element={
          <ProtectedRoute>
            <Candidates />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidates/:id"
        element={
          <ProtectedRoute>
            <CandidateProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/interviews"
        element={
          <ProtectedRoute>
            <Interviews />
          </ProtectedRoute>
        }
      />
<Route
  path="/interviews/:id"
  element={
    <ProtectedRoute>
      <InterviewDetails />
    </ProtectedRoute>
  }
/>

      <Route
        path="/offer"
        element={
          <ProtectedRoute>
            <Offer />
          </ProtectedRoute>
        }
      />

      <Route 
      path="/candidate-form/:token" 
      element={<CandidateForm />} />
    </Routes>
  );
}

export default App;