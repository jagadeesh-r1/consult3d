// Modified App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import LoginSignup from './pages/LoginSignup';
import Dashboard from './pages/Dashboard';
import NewAppointment from './pages/NewAppointment';
import ProfileCompletion from './pages/ProfileCompletion';
import ProfilePage from './pages/ProfilePage';
import Appointments from './pages/Appointments';
import DisplayDoctors from './pages/DisplayDoctors';

const MainContent = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="main-section">
        <h1 className="consult-3d-text">TeleMedi</h1>
        <div className="content-wrapper">
          <div className="text-section">
            <h1>Hey 👋, Schedule Your Consultation</h1>
            <button className="login-btn" onClick={handleLogin}>Login</button>
          </div>
          <div className="image-section">
            <img src="image.png" alt="Consultation" />
          </div>
          <div className="features">
            <ul>
              <li><strong>Personalized Care:</strong> Get expert advice...</li>
              <li><strong>Timely Insights:</strong> Address your health...</li>
              <li><strong>Prepare for Treatment:</strong> A consultation helps...</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-appointment" element={<NewAppointment />} />
        <Route path="/profile" element={<ProfileCompletion />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/doctors" element={<DisplayDoctors />} />
      </Routes>
    </Router>
  );
};

export default App;