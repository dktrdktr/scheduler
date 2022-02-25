export function getAppointmentsForDay(state) {
  //... returns an array of appointments for that day
  const { day, days, appointments } = state;
  if (days.length === 0) {
    return [];
  }
  const dayObj = days.find((item) => item.name === day);

  if (!dayObj) {
    return [];
  }
  const appointmentIds = dayObj.appointments;
  const dayAppointments = appointmentIds.reduce((result, item) => {
    if (appointments[item]) {
      result.push(appointments[item]);
    }
    return result;
  }, []);

  return dayAppointments;
}
