import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const checkPatientData = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/check_patient_data', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.status === 200;
  } catch (error) {
    console.error('Error checking patient data:', error);
    return false;
  }
};




const Dashboard = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const checkAndNavigateProfile = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/check_patient_data', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.status === 200) {
        navigate('/profile-page');
      } else if (response.status === 404) {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error checking patient data:', error);
    }
  };

  const handleAppointmentClick = async () => {
    setIsLoading(true);
    try {
      const hasProfile = await checkPatientData();
      if (hasProfile) {
        navigate('/new-appointment');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="nav-brand">TeleMedi</div>
        <ul className="nav-links">
        <li>
          <button 
            onClick={checkAndNavigateProfile} 
          >
            Profile
          </button>
        </li>
          <li>
            <button onClick={() => navigate('/appointments')}>Appointments</button>
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      
      <main className="dashboard-content">
        <header className="welcome-section">
          <h1>Welcome to your Dashboard</h1>
          <p>Manage your consultations and appointments</p>
        </header>
        
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Upcoming Appointments</h3>
            <p>You have no upcoming appointments</p>
          </div>
          <div className="dashboard-card">
            <h3>Recent Consultations</h3>
            <p>No recent consultations</p>
          </div>
          <div className="dashboard-card">
            <h3>Quick Actions</h3>
            <button 
              className="action-btn"
              onClick={handleAppointmentClick}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Schedule Consultation'}
            </button>
            <button className="action-btn">Look Up Experts in Specialities</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;