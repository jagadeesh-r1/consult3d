import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/patient_data', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch patient data');
        }

        const data = await response.json();
        setPatientData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-page">
      <nav className="navbar">
        <div className="nav-brand">TeleMedi</div>
        <ul className="nav-links">
          <li>
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          </li>
          <li>
            <button className="active">Profile</button>
          </li>
          <li>
            <button onClick={() => navigate('/appointments')}>Appointments</button>
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className="profile-header">
        <h1>Patient Profile</h1>
      </div>

      <div className="profile-content">
        <section className="profile-section">
          <h2>Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Name</label>
              <p>{patientData.patient_name}</p>
            </div>
            <div className="info-item">
              <label>Age</label>
              <p>{patientData.patient_age}</p>
            </div>
            <div className="info-item">
              <label>Sex</label>
              <p>{patientData.patient_sex}</p>
            </div>
            <div className="info-item">
              <label>Gender Identity</label>
              <p>{patientData.patient_gender}</p>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <h2>Contact Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Phone</label>
              <p>{patientData.patient_phone}</p>
            </div>
            <div className="info-item">
              <label>Address</label>
              <p>{patientData.patient_address}</p>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <h2>Medical History</h2>
          <div className="medical-info">
            <div className="info-item">
              <label>Previous Illnesses</label>
              <p>{patientData.patient_previous_illness || 'None reported'}</p>
            </div>
            <div className="info-item">
              <label>Previous Surgeries</label>
              <p>{patientData.patient_previous_surgeries || 'None reported'}</p>
            </div>
            <div className="info-item">
              <label>Allergies</label>
              <p>{patientData.patient_allergies || 'None reported'}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;