import actionTypes from './actionTypes';

export const dateAppointmentFetched = appointmentDate => ({
  type: actionTypes.appointmentFetched,
  appointmentDate,
});

export const startedFetchingAppointment = () => ({
  type: actionTypes.startedFetchingAppointment,
});
