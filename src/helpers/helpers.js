/**
 * Update Spots for current day.
 *
 * @param {Object}   state           State object
 * @param {Array}   appointments    New appointments array
 * @param {Number}   id              Appointment id
 * @return {Array}   A Days array we can save back into state.
 */

export function updateSpots(state, appointments, id) {
  // return an updated days array
  const updatedDays = state.days.map((day) => {
    if (day.appointments.includes(id)) {
      const updatedDay = {
        ...day,
        // calculate spots based on the number of null interview values in the new appointments object
        spots: day.appointments.filter(
          (slotId) => !appointments[slotId].interview
        ).length,
      };
      return updatedDay;
    }
    return day;
  });
  return updatedDays;
}
