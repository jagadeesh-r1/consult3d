import React, { useState, useEffect } from 'react';
import './DisplayDoctors.css';
import { useNavigate } from 'react-router-dom';

const DisplayDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of doctors from the API

    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/doctors');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Doctors:', data.response);
        setDoctors(data.response);
        setFilteredDoctors(data.response);

        // Extract unique specialties
        const uniqueSpecialties = [...new Set(data.response.map(doctor => doctor.doctor_speciality))];
        setSpecialties(uniqueSpecialties);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    // Filter doctors based on the selected filters
    const filterDoctors = () => {
      let filtered = doctors;

      if (specialtyFilter) {
        filtered = filtered.filter(doctor => doctor.doctor_speciality === specialtyFilter);
      }

      if (experienceFilter) {
        filtered = filtered.filter(doctor => doctor.doctor_experience >= parseInt(experienceFilter));
      }

      if (ratingFilter) {
        filtered = filtered.filter(doctor => doctor.doctor_rating >= parseFloat(ratingFilter));
      }

      setFilteredDoctors(filtered);
    };

    filterDoctors();
  }, [specialtyFilter, experienceFilter, ratingFilter, doctors]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    };

  return (
    <div className="display-doctors-container">
        <nav className="navbar">
        <div className="nav-brand">TeleMedi</div>
        <ul className="nav-links">
            <li>
                <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            </li>
            <li>
                <button onClick={() => navigate('/appointments')}>Appointments</button>
            </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
            Logout
        </button>
        </nav>

      <h2>Doctors</h2>
      <div className="filters">
        <select value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)}>
          <option value="">Filter by specialty</option>
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>
        <select value={experienceFilter} onChange={(e) => setExperienceFilter(e.target.value)}>
          <option value="">Filter by experience (years)</option>
          <option value="0">0+ years</option>
          <option value="5">5+ years</option>
          <option value="10">10+ years</option>
          <option value="15">15+ years</option>
          <option value="20">20+ years</option>
          <option value="25">25+ years</option>
          <option value="30">30+ years</option>
        </select>
        <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
          <option value="">Filter by rating</option>
          <option value="1">1+ stars</option>
          <option value="2">2+ stars</option>
          <option value="3">3+ stars</option>
          <option value="4">4+ stars</option>
          <option value="5">5 stars</option>
        </select>
      </div>
      <div className="doctors-list">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="doctor-card">
            <h3>{doctor.doctor_name}</h3>
            <p><strong>Specialty:</strong> {doctor.doctor_speciality}</p>
            <p><strong>Experience:</strong> {doctor.doctor_experience} years</p>
            <p><strong>Rating:</strong> {doctor.doctor_rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayDoctors;