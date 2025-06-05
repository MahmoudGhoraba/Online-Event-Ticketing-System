import React from 'react';
import Navbar from '../sharedComponents/navBar';
import EventList from '../eventComponents/EventList';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useTheme } from '../theme/ThemeContext';

export default function UserEventList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();

  return (
    <div>
      <Navbar />
      <EventList/>
    </div>
  );
}
