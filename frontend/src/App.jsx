// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';
import { SurveyPage } from './pages/SurveyPage';
import { BackgroundPage } from './pages/BackgroundPage';
import { DashboardPage } from './pages/DashboardPage';
import './styles/globals.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-7xl mx-auto p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/survey" element={<SurveyPage />} />
              <Route path="/background" element={<BackgroundPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
