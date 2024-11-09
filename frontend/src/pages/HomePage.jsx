import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';

export const HomePage = () => {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">
          Schedule Your 3D Consultation
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Connect with doctors worldwide using our innovative 3D body mapping technology
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/login" className="btn-primary">Login</Link>
          <Link to="/signup" className="btn-outline">Sign Up</Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {/* Feature cards as in the previous example */}
      </section>
    </div>
  );
};