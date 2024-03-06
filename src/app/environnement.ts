const backendUrl = 'http://127.0.0.1:8000/';
//const backendUrl = 'https://endeavor.pythonanywhere.com/';


export let id: string = '';

export const environment = {

  patients: `${backendUrl}patients`,
  patientInscription: `${backendUrl}patients/inscription`,
  nonValidatedPatients: `${backendUrl}patients/non_validated_patients`,
  validatedPatients: `${backendUrl}patients/validated_patients`,
  patientValidation: `${backendUrl}patients/${id}/validation`,
  updatePatientInformations: `${backendUrl}patients/${id}/update_patient_informations`,
  attributeDoctorToPatient: `${backendUrl}patients/${id}/doctor_attribution`,
  attributePatientToDoctor: `${backendUrl}doctors/${id}/patient_attribution`,
  getPatientServices: `${backendUrl}patients/${id}/get_patient_services`,
  doctors: `${backendUrl}doctors`,
  doctorInscription: `${backendUrl}doctors/inscription`,
  nonValidatedDoctors: `${backendUrl}doctors/non_validated_doctors`,
  validatedDoctors: `${backendUrl}doctors/validated_doctors`,
  doctorValidation: `${backendUrl}doctors/${id}/validation`,
  sendMessage: `${backendUrl}send_message`,
  getMessage: `${backendUrl}get_messages`,
  prestations: `${backendUrl}prestations`,
  services: `${backendUrl}services`,
  appointment: `${backendUrl}appointments`,
  token: `${backendUrl}token/`,
  refreshToken: `${backendUrl}token/refresh/`,
  getDoctorFromToken: `${backendUrl}doctors/get_doctor_from_token`,
  getPatientsOfDoctor: `${backendUrl}doctors/patients_of_doctor`,
};
