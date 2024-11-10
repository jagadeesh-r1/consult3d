import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import telemediLogo from './Medical_Care_1-removebg-preview.png';


const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!isLogin) {
        const response = await fetch('http://127.0.0.1:5000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          })
        });
  
        if (!response.ok) {
          throw new Error('Signup failed');
        }
  
        // Successful signup
        setSignupSuccess(true);
        setIsLogin(true); // Switch to login view
      } else {
          // Handle login
          const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password
            })
          });

          if (!response.ok) {
            throw new Error('Invalid credentials');
          }

          const data = await response.json();
          
          // Store the JWT token
          localStorage.setItem('token', data.access_token);
          
          // Navigate to dashboard
          navigate('/dashboard');
      }
    } catch (err) {
      setError('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-signup-container">
      <img src={telemediLogo} alt="TeleMedi Logo" className="telemedi-logo" />
      <div className="form-box">
        <div className="button-box">
          <div className={`btn-slider ${isLogin ? 'login' : 'signup'}`}></div>
          <button 
            type="button" 
            className={`toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            type="button" 
            className={`toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className={`input-group ${isLogin ? 'login' : 'signup'}`}>
          {error && <div className="error-message">{error}</div>}
          <div className="input-container">
            <i className="fas fa-envelope"></i>
            <input 
              type="email" 
              name="email"
              className="input-field" 
              placeholder="Email" 
              required 
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input 
              type="password" 
              name="password"
              className="input-field" 
              placeholder="Password" 
              required 
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;