import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);

  useEffect(() => {
      const fetchAppointments = async () => {
          try {
              const token = localStorage.getItem('token'); // Adjust based on where you store the token
              const response = await axios.get('http://127.0.0.1:5000/appointments', {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              });
              console.log('API response:', response.data); // Log the response data
  
              const appointments = response.data.response;
              // console.log('Appointments:', appointments.response);
              if (!Array.isArray(appointments)) {
                  throw new Error('API response is not an array');
              }
              console.log('Appointments:', appointments);
              const now = new Date();
              const upcoming = appointments.filter(appointment => new Date(appointment.appointment_date) > now);
              const past = appointments.filter(appointment => new Date(appointment.appointment_date) <= now);
              console.log('Upcoming appointments:', upcoming);
              console.log('Past appointments:', past);
              setUpcomingAppointments(upcoming);
              setPastAppointments(past);
          } catch (error) {
              console.error('Error fetching appointments:', error);
          }
      };
  
      fetchAppointments();
  }, []);

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
            {upcomingAppointments.length > 0 ? (
                <ul className="appointment-list">
                    {upcomingAppointments.map(appointment => (
                        <li key={appointment.id}>
                            <p className="appointment-date">Date: {appointment.appointment_date}</p>
                            <p className="appointment-time">Time: {appointment.appointment_time}</p>
                            <p className="appointment-doctor">Doctor: {appointment.appointment_doctor}</p>
                            <p className="appointment-reason">Reason: {appointment.appointment_reason}</p>
                            <p className="appointment-status">Status: {appointment.appointment_status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no upcoming appointments</p>
            )}
        </div>
        <div className="dashboard-card">
            <h3>Recent Consultations</h3>
            {pastAppointments.length > 0 ? (
              <ul className="appointment-list">
                        {pastAppointments.map(appointment => (
                            <li key={appointment.id}>
                                <p className="appointment-date">Date: {appointment.appointment_date}</p>
                                <p className="appointment-time">Time: {appointment.appointment_time}</p>
                                <p className="appointment-doctor">Doctor: {appointment.appointment_doctor}</p>
                                <p className="appointment-reason">Reason: {appointment.appointment_reason}</p>
                                <p className="appointment-status">Status: {appointment.appointment_status}</p>
                            </li>
                        ))}
                    </ul>
            ) : (
                <p>No recent consultations</p>
            )}
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
            <button className="action-btn" onClick={() => navigate('/doctors')}>
              Look Up Experts in Specialities
            </button>          
            </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;