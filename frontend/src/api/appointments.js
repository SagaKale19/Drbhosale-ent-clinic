import api from "./client.js";

export const createAppointment = (data) => api.post("/appointments", data);
export const getAvailability = (date) => api.get("/appointments/availability", { params: { date } });
export const getAppointments = (params) => api.get("/appointments", { params });
export const updateStatus = (id, status) => api.patch(`/appointments/${id}/status`, { status });
export const login = (credentials) => api.post("/auth/login", credentials);