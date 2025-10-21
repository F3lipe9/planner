const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  endpoints: {
    health: `${API_BASE_URL}/health`,
    courses: `${API_BASE_URL}/courses`,
    // Add more endpoints as we build them
  }
};