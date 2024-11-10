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
    availableDoctors: null,
});

  useEffect(() => {
    console.log("I'm in Useeffect ************", formData);
  }, [formData]);


  const canProceed = !formData.isEmergency && formData.agreementAccepted;

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
                    .filter(([_, specialty]) => specialty !== "")
                    .map(([id, specialty]) => (
                        <button
                        key={id}
                        className={`specialty-btn ${formData.selectedSpecialty === specialty ? 'selected' : ''}`}
                        onClick={() => handleSpecialtySelect(specialty)}
                        >
                        {specialty}
                        </button>
                    ))}
                </div>
                ) : (
                <p>There is a problem, we are working on it</p>
                )}
                console.log("I'm here1 ************")

                {formData.selectedSpecialty && (
                <div className="doctors-section">
                console.log("I'm here ************")
                <button 
                    className="check-doctors-btn"
                    onClick={handleCheckDoctors}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Check Available Doctors'}
                </button>

                {formData.availableDoctors && (
                    <div className="doctors-list">
                    {formData.availableDoctors.map(doctor => (
                        <div 
                        key={doctor.id}
                        className={`doctor-card ${formData.selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
                        onClick={() => handleDoctorSelect(doctor)}
                        >
                        <h4>{doctor.name}</h4>
                        <p>{doctor.specialty}</p>
                        <p>Experience: {doctor.experience} years</p>
                        </div>
                    ))}
                    </div>
                )}
                </div>
            )}
            
            {formData.selectedDoctor && (
                <div className="appointment-booking">
                <h4>Select Appointment Time</h4>
                <div className="calendar-section">
                    {/* Add your calendar component here */}
                    <input 
                    type="date" 
                    value={formData.appointment_date}
                    onChange={(e) => handleInputChange({
                        target: { name: 'appointment_date', value: e.target.value }
                    })}
                    min={new Date().toISOString().split('T')[0]}
                    max={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    />
                </div>

                {formData.appointment_date && (
                    <div className="time-slots">
                    {generateTimeSlots().map(slot => (
                        <button
                        key={slot}
                        className={`time-slot ${formData.appointment_time === slot ? 'selected' : ''}`}
                        onClick={() => handleTimeSelect(slot)}
                        >
                        {slot}
                        </button>
                    ))}
                    </div>
                )}

                {formData.appointment_time && (
                    <button 
                    className="book-appointment-btn"
                    onClick={handleBookAppointment}
                    disabled={isLoading}
                    >
                    {isLoading ? 'Booking...' : 'Book Appointment'}
                    </button>
                )}
                </div>
            )}
                </>
            );
            
    }
  };

  const handleSpecialtySelect = (specialty) => {
    setFormData(prev => ({
      ...prev,
      selectedSpecialty: specialty,
      availableDoctors: null,
      selectedDoctor: null
    }));
    console.log("I'm here ************");
    console.log(specialty);
    console.log(formData.selectedSpecialty);
  };

  const handleCheckDoctors = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/doctors?speciality=${formData.selectedSpecialty}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch doctors');
      
      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        availableDoctors: data
      }));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateTimeSlots = () => {
    // Generate random time slots for the selected date
    const slots = [];
    for (let i = 9; i <= 17; i++) {
      if (Math.random() > 0.5) {
        slots.push(`${i}:00`);
      }
      if (Math.random() > 0.5) {
        slots.push(`${i}:30`);
      }
    }
    return slots;
  };

  const handleTimeSelect = (time) => {
    setFormData(prev => ({
      ...prev,
      appointment_time: time
    }));
  };

  const handleBookAppointment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/book_appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          appointment_date: formData.appointment_date,
          appointment_time: formData.appointment_time,
          appointment_doctor: formData.selectedDoctor.name,
          appointment_status: 'scheduled',
          appointment_reason: formData.mainReason
        })
      });
  
      if (!response.ok) throw new Error('Failed to book appointment');
  
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoctorSelect = (doctor) => {
    setFormData(prev => ({
      ...prev,
      selectedDoctor: doctor
    }));
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
            console.error('Failed to fetch doctor recommendations:', response);
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
  
    
  const handleSubmit = (e) => {
    e.preventDefault();
    if (showEmergencyAlert) return;
    // Add API call here
    console.log('Appointment data:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="appointment-container">
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
                {currentStep < 6 ? (
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
                </p>)}
          </form>

        )}
      </div>
    </div>
  );
};

export default NewAppointment;