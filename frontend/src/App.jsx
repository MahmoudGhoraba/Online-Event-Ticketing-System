import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import LoginForm from "./AuthComponent/LoginForm";
import RegisterForm from "./AuthComponent/RegisterForm";
import HomePage from "./homeComponents/HomePage";
import AdminUsersPage from "./AdminCompnent/AdminUsersPage";
import ProtectedRoute from "./auth/ProtectedRoutes";
import ForgetPassword from "./AuthComponent/forgetPassword";
import EventDetails from './eventComponents/eventdetails'
import OrganizerPage from "./OrganizerComponent/Organizer"
import OrganizerEvent from "./eventComponents/eventdetails"
import CreateEvent from './OrganizerComponent/OrganizerCreateEvent'
import UserProfile from "./UserProfileComponent/UserProfile";

function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route
            path="/admin/users" 
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminUsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizer/users" 
            element={
              <ProtectedRoute allowedRoles={["Organizer"]}>
                <OrganizerPage />
              </ProtectedRoute>
            }
          />
          <Route
          path="/profile"
          element={
          <ProtectedRoute allowedRoles={["Admin", "Organizer", "User"]}>
          <UserProfile />
          </ProtectedRoute>
      }
/>
          <Route
            path="/organizer/eventdeatails/:id" 
            element={
              <ProtectedRoute allowedRoles={["Organizer"]}>
                <OrganizerEvent />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/organizer/createvents" 
            element={
              <ProtectedRoute allowedRoles={["Organizer"]}>
                <CreateEvent />
              </ProtectedRoute>
            }
          />
        </Routes>

      

      

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;