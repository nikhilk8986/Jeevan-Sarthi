// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// API Endpoints
export const API_ENDPOINTS = {
  // User endpoints
  USER_SIGNUP: `${API_BASE_URL}/user/signup`,
  USER_SIGNIN: `${API_BASE_URL}/user/signin`,
  USER_FEED: `${API_BASE_URL}/user/feed`,
  USER_FILL_DATA: `${API_BASE_URL}/user/fillData`,
  USER_ME: `${API_BASE_URL}/user/me`,
  USER_BOOK_APPOINTMENT: `${API_BASE_URL}/user/bookAppointments`,
  USER_CANCEL_APPOINTMENT: `${API_BASE_URL}/user/cancelAppointment`,
  USER_MY_APPOINTMENTS: `${API_BASE_URL}/user/myAppointments`,
  
  // Hospital endpoints
  HOSPITAL_SIGNUP: `${API_BASE_URL}/hospital/signup`,
  HOSPITAL_SIGNIN: `${API_BASE_URL}/hospital/signin`,
  HOSPITAL_FILL_DATA: `${API_BASE_URL}/hospital/fillData`,
  HOSPITAL_ME: `${API_BASE_URL}/hospital/me`,
  HOSPITAL_DONATE: `${API_BASE_URL}/hospital/donate`,
  HOSPITAL_GET_DONORS: `${API_BASE_URL}/hospital/getDonors`,
  HOSPITAL_BLOOD_LEVELS: `${API_BASE_URL}/hospital/bloodLevels`,
  HOSPITAL_BLOOD_UPDATE: `${API_BASE_URL}/hospital/bloodUpdate`,
  HOSPITAL_REQUEST: `${API_BASE_URL}/hospital/request`,
  HOSPITAL_REQUEST_BLOOD: `${API_BASE_URL}/hospital/request`,
}; 