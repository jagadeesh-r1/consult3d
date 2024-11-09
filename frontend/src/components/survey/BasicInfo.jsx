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