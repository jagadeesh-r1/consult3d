// src/components/auth/LoginForm.jsx
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';

export const LoginForm = () => {
  const { login } = useAuth();
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: { email: '', password: '' },
    onSubmit: values => login(values),
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          required
        />
      </div>
      <button type="submit" className="w-full btn-primary">
        Login
      </button>
    </form>
  );
};

// src/components/survey/BasicInfo.jsx
import React from 'react';
import { useForm } from '../../hooks/useForm';

export const BasicInfo = ({ onComplete }) => {
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      name: '',
      age: '',
      sex: '',
      gender: '',
    },
    onSubmit: onComplete,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form fields as in the previous example */}
    </form>
  );
};