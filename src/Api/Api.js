
// Main Base URL 
export const baseURL = "http://localhost:8000/api";

// Auth URLs
export const loginURL = "/auth/login";
export const verifyOTPURL = "/auth/verify-otp";

// Attendance URLs
export const attendanceMark = "/attendance/mark"
export const getAllSubjectsOfInstructor = "/subject/instructor"
export const generateSession = "/attendance/generate-session"
export const getAllReports = "/reports"
export const leave = "/leave"
export const usersURL = "/users"
export const getAllInstructors = `${usersURL}/instructors`
export const getAllStudents = `${usersURL}/students`
export const subject = "/subject"