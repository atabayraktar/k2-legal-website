import { createContext, useContext } from 'react';

// Opens the "Randevu talep formu" dialog. openAppointment(triggerEl) remembers the trigger so focus returns to it on close.
export const AppointmentContext = createContext({ openAppointment: () => {} });

export const useAppointment = () => useContext(AppointmentContext);

// Click handler for a CTA that is also a plain link (no-JS and modified clicks keep the link behaviour).
export function appointmentClick(openAppointment) {
  return (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    openAppointment(e.currentTarget);
  };
}
