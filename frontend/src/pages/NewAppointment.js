import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewAppointment.css';
import BodyModel from './BodyModel';

const NewAppointment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    mainReason: '',
    symptomDescription: '',
    painType: '',
    painLocation: '',
    painScale: '1',
    symptomsStarted: '',
    previouslyExperienced: false,
    medications: '',
    isEmergency: false,
    additionalNotes: '',
    agreementAccepted: false,
    canLocatePain: false,
    selectedDoctor: null,
    selectedSpecialty: null,
    recommendedDoctors: null,
    availableDoctors: null,
  });

  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    console.log("I'm in Useeffect ************", formData);
  }, [formData]);

  useEffect(() => {
    generateAvailableDates();
    generateAvailableTimes();
  }, []);

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    setAvailableDates(dates);
  };

  const generateAvailableTimes = () => {
    const times = [];
    for (let i = 9; i <= 17; i++) {
      times.push(`${i.toString().padStart(2, '0')}:00`);
      times.push(`${i.toString().padStart(2, '0')}:30`);
    }
    setAvailableTimes(times);
  };

  const canProceed = !formData.isEmergency && formData.agreementAccepted && (currentStep < 7 || (formData.selectedDoctor !== null && formData.date && formData.time));

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));

    // Check for emergency conditions
    if (
      (e.target.name === 'painScale' && parseInt(value) >= 9) ||
      (e.target.name === 'isEmergency' && value === true)
    ) {
      setShowEmergencyAlert(true);
    }
  };

  const EmergencyAlert = () => (
    <div className="emergency-alert">
      <h2>⚠️ EMERGENCY MEDICAL ATTENTION NEEDED</h2>
      <p>Based on your responses, you need immediate medical attention.</p>
      <div className="emergency-actions">
        <a href="tel:911" className="emergency-call-btn">Call 911</a>
        <p>Please proceed to your nearest emergency room immediately.</p>
      </div>
    </div>
  );

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <>
            <h3 className="important-notice-heading">Important Notice</h3>
            <div className="disclaimer-section">
              <p className="disclaimer-text">
                This service is not intended for emergency medical situations. 
                If you are experiencing a medical emergency, please call 911 or 
                go to your nearest emergency room immediately.
              </p>
            
              <div className="form-group emergency-radio">
                <p>Is this a medical emergency?</p>
                <div className="radio-options">
                  <label>
                    <input
                      type="radio"
                      name="isEmergency"
                      value="true"
                      checked={formData.isEmergency === true}
                      onChange={(e) => {
                        handleInputChange({
                          target: {
                            name: 'isEmergency',
                            value: true
                          }
                        });
                      }}
                    />
                    Yes, this is an emergency
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="isEmergency"
                      value="false"
                      checked={formData.isEmergency === false}
                      onChange={(e) => {
                        handleInputChange({
                          target: {
                            name: 'isEmergency',
                            value: false
                          }
                        });
                      }}
                    />
                    No, this is not an emergency
                  </label>
                </div>
              </div>
            
              {!formData.isEmergency && (
                <div className="agreement-check">
                  <label>
                    <input
                      type="checkbox"
                      name="agreementAccepted"
                      checked={formData.agreementAccepted}
                      onChange={handleInputChange}
                      required
                    />
                    I understand that this service is for non-emergency medical consultations only
                  </label>
                </div>
              )}
            
              {formData.isEmergency && <EmergencyAlert />}
            </div>
            
            {!formData.isEmergency && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
            </>
        );

      case 2:
        return (
          <>
            <h3>Primary Concern</h3>
            <div className="form-group">
              <label>What is the main reason for this consultation?</label>
              <textarea
                name="mainReason"
                value={formData.mainReason}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Please describe your main symptoms or concerns..."
              />
            </div>

            <div className="form-group">
              <label>When did these symptoms start?</label>
              <input
                type="date"
                name="symptomsStarted"
                value={formData.symptomsStarted}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h3>Pain Assessment</h3>
            <div className="form-group">
              <label>Type of Pain/Discomfort</label>
              <select
                name="painType"
                value={formData.painType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select pain type</option>
                <option value="sharp">Sharp</option>
                <option value="dull">Dull</option>
                <option value="throbbing">Throbbing</option>
                <option value="burning">Burning</option>
                <option value="stabbing">Stabbing</option>
              </select>
            </div>

            <div className="form-group">
              <label>Pain Scale (1-10)</label>
              <input
                type="range"
                name="painScale"
                min="1"
                max="10"
                value={formData.painScale}
                onChange={handleInputChange}
              />
              <div className="pain-scale-labels">
                <span>Mild (1)</span>
                <span>Severe (10)</span>
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <div className="step-container">
            <h3 className="step-heading">Pain Location</h3>
            <div className="form-group">
              <p>Can you locate the specific area of pain?</p>
              <div className="radio-options">
                <label>
                  <input
                    type="radio"
                    name="canLocatePain"
                    value="true"
                    checked={formData.canLocatePain === true}
                    onChange={(e) => {
                      handleInputChange({
                        target: {
                          name: 'canLocatePain',
                          value: true
                        }
                      });
                    }}
                  />
                  Yes, I can point to the specific area
                </label>
                <label>
                  <input
                    type="radio"
                    name="canLocatePain"
                    value="false"
                    checked={formData.canLocatePain === false}
                    onChange={(e) => {
                      handleInputChange({
                        target: {
                          name: 'canLocatePain',
                          value: false
                        }
                      });
                    }}
                  />
                  No, it's a general or diffuse pain
                </label>
              </div>
            </div>

            {formData.canLocatePain && (
              <div className="body-model-container">
                <BodyModel 
                  onRegionSelect={handleRegionSelect}
                  selectedRegion={formData.painLocation}
                  gender={formData.patient_sex}
                />
              </div>
            )}

            {formData.painLocation && (
              <div className="selected-region">
                <p>Selected area: {formData.painLocation}</p>
              </div>
            )}
          </div>
        );

        case 5:
          return (
            <>
              <h3>Recommended Specialists</h3>
              {formData.recommendedDoctors ? (
                <div className="specialties-list">
                  {Object.entries(formData.recommendedDoctors)
                    .filter(([_, specialty]) => {
                      console.log(specialty); // Log the specialty object to see its properties
                      return specialty !== "";
                    })
                    .map(([id, specialty]) => (
                      <button
                        key={id}
                        className={`specialty-btn ${formData.selectedSpecialty === specialty ? 'selected' : ''}`}
                        onClick={() => handleSpecialtySelect(specialty)}
                      >
                        {specialty || 'Unknown Specialist'} {/* Ensure you are rendering a primitive value */}
                      </button>
                    ))}
                </div>
              ) : (
                <p>There is a problem, we are working on it</p>
              )}
            </>
          );

        case 6:
          return (
            <>
              <h3>Available Doctors</h3>
              {formData.availableDoctors ? (
                <div className="doctors-list">
                  {formData.availableDoctors.map(doctor => (
                    <div
                      key={doctor.id}
                      className={`doctor-card ${selectedDoctor === doctor.id ? 'selected' : ''}`}
                      onClick={() => handleDoctorSelect(doctor)}
                    >
                      <p><strong>Name:</strong> {doctor.doctor_name}</p>
                      <p><strong>Specialty:</strong> {doctor.doctor_speciality}</p>
                      <p><strong>Experience:</strong> {doctor.doctor_experience} years</p>
                      <p><strong>Rating:</strong> {doctor.doctor_rating}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No doctors available for the selected specialty.</p>
              )}
            </>
          );

      case 7:
        return (
          <>
            <h3>Schedule Appointment</h3>
            <div className="form-group">
              <label>Select Date</label>
              <select
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a date</option>
                {availableDates.map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Select Time</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a time</option>
                {availableTimes.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const handleDoctorSelect = (doctor) => {
    setFormData(prev => ({
      ...prev,
      selectedDoctor: doctor
    }));
    setSelectedDoctor(doctor.id);
  };

  const handleSpecialtySelect = async (specialty) => {
    setFormData(prev => ({
      ...prev,
      selectedSpecialty: specialty,
      availableDoctors: null,
      selectedDoctor: null
    }));
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/doctors?speciality=${specialty}&limit=10`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
  
      const data = await response.json();
      console.log(data);
      setFormData(prev => ({
        ...prev,
        availableDoctors: data.response
      }));
      setCurrentStep(6);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setError('Failed to get doctors. Please try again.');
    }
  };

  const handleRegionSelect = (region) => {
    setFormData(prev => ({
      ...prev,
      painLocation: region
    }));
  };

  const handleNext = async () => {
    if (currentStep === 4 && formData.painLocation.length > 0) {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch('http://127.0.0.1:5000/suggest_doctors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            name: formData.name,
            mainReason: formData.mainReason,
            symptomDescription: formData.symptomDescription,
            painType: formData.painType,
            painLocation: formData.painLocation,
            painScale: formData.painScale,
            symptomsStarted: formData.symptomsStarted,
            previouslyExperienced: formData.previouslyExperienced,
            medications: formData.medications,
            additionalNotes: formData.additionalNotes,
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch doctor recommendations');
        }

        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          recommendedDoctors: data.response
        }));
        setCurrentStep(5);
      } catch (error) {
        console.error('Error fetching doctor recommendations:', error);
        setError('Failed to get doctor recommendations. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showEmergencyAlert) return;

    if (!formData.selectedDoctor) {
      setError('Please select a doctor.');
      return;
    }

    setIsLoading(true);
    setError('');
    const appointmentData = {
      appointment_date: formData.date,
      appointment_time: formData.time,
      appointment_doctor: formData.selectedDoctor.doctor_name,
      appointment_patient: formData.name,
      appointment_status: 'pending',
      appointment_reason: formData.mainReason
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/book_appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) {
        throw new Error('Failed to schedule appointment');
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      setError('Failed to schedule appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="appointment-container">
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
      <div className="appointment-form-wrapper">
        <h2>Schedule New Consultation</h2>
        {showEmergencyAlert ? (
          <EmergencyAlert />
        ) : (
          <form onSubmit={handleSubmit} className="appointment-form">
            {renderStep()}
            
            <div className="button-group">
              {currentStep > 1 && (
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  disabled={isLoading}
                >
                  Previous
                </button>
              )}
              {currentStep < 7 ? (
                <button 
                  type="button" 
                  onClick={handleNext}
                  disabled={!canProceed || isLoading || (currentStep === 4 && !formData.painLocation)}
                >
                  {isLoading ? 'Loading...' : 'Next'}
                </button>
              ) : (
                <button 
                  type="submit"
                  disabled={!canProceed || isLoading}
                >
                  Schedule Appointment
                </button>
              )}
            </div>

            {!canProceed && !formData.isEmergency && (
              <p className="error-message">
                Please accept the agreement to continue
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default NewAppointment;