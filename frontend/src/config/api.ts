const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  endpoints: {
    health: `${API_BASE_URL}/health`,
    courses: {
      search: `${API_BASE_URL}/courses/search`,
      byId: (courseId: string) => `${API_BASE_URL}/courses/${courseId}`,
    },
    plans: `${API_BASE_URL}/plans`,
    majors: `${API_BASE_URL}/majors`,
  }
};

export default API_CONFIG;