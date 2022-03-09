export function getAppointmentsForDay(state, day) {
  // returns an array of appointments for a given day
  const { days, appointments } = state;
  if (days.length === 0) {
    return [];
  }
  const dayObj = days.find((item) => item.name === day);

  if (!dayObj) {
    return [];
  }
  const appointmentIds = dayObj.appointments;
  const appointmentsForDay = appointmentIds.reduce((result, item) => {
    if (appointments[item]) {
      result.push(appointments[item]);
    }
    return result;
  }, []);
  return appointmentsForDay;
}

export function getInterview(state, interview) {
  // returns an interview object with full data of the interviewer
  if (!interview) {
    return null;
  }
  const interviewerId = interview.interviewer;
  const result = {
    student: interview.student,
    interviewer: state.interviewers[interviewerId],
  };
  return result;
}

export function getInterviewersForDay(state, day) {
  // returns an array of interviewers for a given day
  const { days, interviewers } = state;
  if (days.length === 0) {
    return [];
  }
  const dayObj = days.find((item) => item.name === day);

  if (!dayObj) {
    return [];
  }
  const interviewerIds = dayObj.interviewers.map((id) => interviewers[id]);
  return interviewerIds;
}
