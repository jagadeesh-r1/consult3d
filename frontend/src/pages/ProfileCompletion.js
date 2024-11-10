// src/pages/ProfileCompletion.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileCompletion.css';

const ProfileCompletion = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_age: '',
    patient_sex: '',
    patient_gender: '',
    patient_address: '',
    patient_phone: '',
    patient_previous_illness: '',
    patient_previous_surgeries: '',
    patient_allergies: ''
  });

  const validateForm = () => {
    const requiredFields = ['patient_name', 'patient_age', 'patient_sex', 'patient_gender'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/patient_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      navigate('/new-appointment');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  return (
    <div className="profile-completion-container">
      <div className="profile-form-wrapper">
        <h2>Complete Your Profile</h2>
        <p className="subtitle">Please provide your medical information to proceed</p>
        <p className="required-notice">* Required fields</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleInputChange}
              required
              className={!formData.patient_name ? 'invalid' : ''}
            />
          </div>

          <div className="form-group">
            <label>Age *</label>
            <input
              type="number"
              name="patient_age"
              value={formData.patient_age}
              onChange={handleInputChange}
              required
              min="0"
              max="150"
              className={!formData.patient_age ? 'invalid' : ''}
            />
          </div>

          <div className="form-group">
            <label>Sex *</label>
            <select 
              name="patient_sex"
              value={formData.patient_sex}
              onChange={handleInputChange}
              required
              className={!formData.patient_sex ? 'invalid' : ''}
            >
              <option value="">Select sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

        <div className="form-group">
          <label>Gender Identity *</label>
          <select
            name="patient_gender"
            value={formData.patient_gender}
            onChange={handleInputChange}
            required
            className={!formData.patient_gender ? 'invalid' : ''}
          >
            <option value="">Select gender identity</option>
            <option value="cisgender">Cisgender</option>
            <option value="transgender">Transgender</option>
            <option value="non_binary">Non-binary</option>
            <option value="genderqueer">Genderqueer</option>
            <option value="gender_fluid">Gender Fluid</option>
            <option value="agender">Agender</option>
            <option value="bigender">Bigender</option>
            <option value="two_spirit">Two-Spirit</option>
            <option value="gender_nonconforming">Gender Non-conforming</option>
            <option value="other">Other</option>
          </select>
        </div>

          <div className="form-group">
            <label>Address *</label>
            <textarea
              name="patient_address"
              value={formData.patient_address}
              onChange={handleInputChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="patient_phone"
              value={formData.patient_phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Previous Illnesses</label>
            <textarea
              name="patient_previous_illness"
              value={formData.patient_previous_illness}
              onChange={handleInputChange}
              rows="3"
              placeholder="List any previous or ongoing medical conditions..."
            />
          </div>

          <div className="form-group">
            <label>Previous Surgeries</label>
            <textarea
              name="patient_previous_surgeries"
              value={formData.patient_previous_surgeries}
              onChange={handleInputChange}
              rows="3"
              placeholder="List any previous surgeries..."
            />
          </div>

          <div className="form-group">
            <label>Allergies</label>
            <textarea
              name="patient_allergies"
              value={formData.patient_allergies}
              onChange={handleInputChange}
              rows="3"
              placeholder="List any known allergies..."
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileCompletion;