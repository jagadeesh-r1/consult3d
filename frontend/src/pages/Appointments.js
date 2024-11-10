import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Appointments.css';
import { useNavigate } from 'react-router-dom';



const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem('token'); // Adjust based on where you store the token
                const response = await axios.get('http://127.0.0.1:5000/appointments', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAppointments(response.data.response);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="appointments-container">
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
            <h2>Appointments</h2>
            <ul className="appointment-list">
                {appointments.map(appointment => (
                    <li key={appointment.id} className="appointment-item">
                        <div className="appointment-details">
                            <p className="appointment-date">Date: {appointment.appointment_date}</p>
                            <p className="appointment-time">Time: {appointment.appointment_time}</p>
                            <p className="appointment-doctor">Doctor: {appointment.appointment_doctor}</p>
                            <p className="appointment-reason">Reason: {appointment.appointment_reason}</p>
                            <p className="appointment-status">Status: {appointment.appointment_status}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Appointments;