import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import LoginForm from "./AuthComponent/LoginForm";
import RegisterForm from "./AuthComponent/RegisterForm";
import HomePage from "./homeComponents/HomePage";
import AdminUsersPage from "./AdminCompnent/AdminUsersPage";
import ProtectedRoute from "./auth/ProtectedRoutes";
import ForgetPassword from "./AuthComponent/forgetPassword";
import EventDetails from './eventComponents/eventdetails'

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
        </Routes>

      

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;