import apiClient from './axios';

export default {
  signup(userData) {
    return apiClient.put('/auth/signup', userData);
  },
  login(userData) {
    return apiClient.post('/auth/login', userData);
  },
};
