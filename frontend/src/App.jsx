import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { ThemeProvider } from "./theme/ThemeContext";
import LoginForm from "./AuthComponent/LoginForm";
import RegisterForm from "./AuthComponent/RegisterForm";
import HomePage from "./HomePageComponents/HomePage";
import AdminUsersPage from "./AdminCompnent/AdminUsersPage";
import AdminEvents from "./AdminCompnent/AdminEventsPage.jsx";  
import ProtectedRoute from "./auth/ProtectedRoutes";
import ForgetPassword from "./AuthComponent/ForgetPassword";
import EventDetails from './eventComponents/eventdetails.jsx'
import OrganizerPage from "./OrganizerComponent/MyEventsPage.jsx"
import OrganizerEvent from "./eventComponents/eventdetails.jsx"
import CreateEvent from './OrganizerComponent/EventForm.jsx'
import ProfilePage from "./UserProfileComponent/ProfilePage";
import UpdateProfileForm from "./UserProfileComponent/UpdateProfileForm";
import BookTicketForm from "./BookingComponent/BookTicketForm";
import UserBookingsPage from "./BookingComponent/UserBookingsPage";
import BookingDetails from "./BookingComponent/BookingDetails";
import ChartComponent from "./OrganizerComponent/EventAnalytics.jsx";
import SearchedEvents from './sharedComponents/searchedevents';
import Unauthorized from "./auth/Unauthorized.jsx";
import Footer from "./sharedComponents/Footer.jsx";
import UserEventList from "./UserProfileComponent/UserEventList.jsx";
function App() {


  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/unauthorized" element={<Unauthorized/>} />
            <Route
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminUsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users" 
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminUsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/events" 
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/BookTicketForm/:eventId"
              element={
               <ProtectedRoute allowedRoles={["User"]}>
                    <BookTicketForm />
                </ProtectedRoute>
                }
            />
            <Route
              path="/bookings"
              element={
               <ProtectedRoute allowedRoles={["User"]}>
                    <UserBookingsPage />
                </ProtectedRoute>
                }
            />
             <Route
              path="/bookings/:id"
              element={
               <ProtectedRoute allowedRoles={["User"]}>
                    <BookingDetails />
                </ProtectedRoute>
                }
            />
            <Route
              path="/my-events" 
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
            <ProfilePage />
            </ProtectedRoute>
          }
/>
            <Route
              path="/events/:id" 
              element={
                <ProtectedRoute allowedRoles={["Organizer"]}>
                  <OrganizerEvent />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/my-events/new" 
              element={
                <ProtectedRoute allowedRoles={["Organizer"]}>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user-events"
              element={
                <ProtectedRoute allowedRoles={["User"]}>
                  <UserEventList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-events/analytics" 
              element={
                <ProtectedRoute allowedRoles={["Organizer"]}>
                  <ChartComponent />
                </ProtectedRoute>
              }
            />
            

            <Route path="/search" element={<SearchedEvents />} />
            <Route
            path="*"
            element={<Navigate to={"/login"} replace />}
          />

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;