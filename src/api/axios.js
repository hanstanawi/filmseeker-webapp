import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_TMDB_URL,
  headers: {
    Accept: 'application/json',
  },
});

export default apiClient;
