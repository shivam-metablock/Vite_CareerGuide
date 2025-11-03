import axios from 'axios';

//@ts-ignore
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Career APIs
export const getClass10Careers = () => api.get('/careers/class10');
export const getCareerDetails = (id: string) => api.get(`/careers/${id}`);
export const getCareerSalaryInsights = (id: string) => api.get(`/careers/${id}/salary-insights`);

// Stream APIs
export const getStreamDetails = (stream: string) => api.get(`/streams/${stream}`);
export const getStreamCareers = (stream: string) => api.get(`/streams/${stream}/careers`);
export const getStreamCareerDetails = (stream: string, careerId: string) => 
  api.get(`/streams/${stream}/careers/${careerId}`);
export const getStreamCareerSalaryInsights = (stream: string, careerId: string) => 
  api.get(`/streams/${stream}/careers/${careerId}/salary-insights`);

// Coaching APIs
export const getCoachingForCareer = (careerId: string) => api.get(`/coaching/career/${careerId}`);
export const getCoachingDetails = (id: string) => api.get(`/coaching/${id}`);
export const getNearbyPGs = (coachingId: string) => api.get(`/coaching/${coachingId}/pgs`);

// Budget APIs
export const calculateBudget = (data: any) => api.post('/budget/calculate', data);
export const getBudgetRecommendations = (data: any) => api.post('/budget/recommendations', data);

// AI APIs
export const getAIGuidance = (data: any) => api.post('/ai/guidance', data);
export const getAISalaryInsights = (careerId: string) => api.get(`/ai/salary-insights/${careerId}`);

export default api;

