import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import LoginForm from "./AuthComponent/LoginForm";
import RegisterForm from "./AuthComponent/RegisterForm";
import HomePage from "./homeComponents/HomePage";
function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>

      

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;