import React from 'react';
import { AppointmentCard } from '../components/dashboard/AppointmentCard';
import { ConsultationHistory } from '../components/dashboard/ConsultationHistory';
import { ActivityCard } from '../components/dashboard/ActivityCard';
import { ScheduleConsultation } from '../components/dashboard/ScheduleConsultation';

export const DashboardPage = () => {
  const consultations = [
    // Consultation data as in the previous example
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        <AppointmentCard />
        <ActivityCard />
      </div>

      <ConsultationHistory consultations={consultations} />
      <ScheduleConsultation />
    </div>
  );
};