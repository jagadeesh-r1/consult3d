// src/components/dashboard/ConsultationHistory.jsx
import React from 'react';

export const ConsultationHistory = ({ consultations }) => {
  return (
    <div className="space-y-4">
      {consultations.map((consultation, index) => (
        <div key={index} className="border-b pb-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold">{consultation.doctorName}</h4>
              <p className="text-sm text-gray-500">{consultation.date}</p>
            </div>
            <span className="text-sm font-medium text-blue-600">
              {consultation.issue}
            </span>
          </div>
          <p className="text-sm mb-2">{consultation.notes}</p>
          <p className="text-sm font-medium">
            Recommended: {consultation.recommendedActions}
          </p>
        </div>
      ))}
    </div>
  );
};