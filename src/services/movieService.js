import axios from 'axios';

const API_KEY = 'c1629140ffee2b30e3762ff495b59343';

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
});

export default {
  getMovies(language, sortBy) {
    return apiClient.get(`/discover/movie/?api_key=${API_KEY}&language=${language}&sort_by=${sortBy}&include_adult=false&include_video=false&page=1`);
  },
  getSingleMovie(movieId, language) {
    return apiClient.get(`/movie/${movieId}?api_key=${API_KEY}&language=${language}`);
  },
};
