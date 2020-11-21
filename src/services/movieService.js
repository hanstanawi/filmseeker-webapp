import axios from 'axios';

// the API_KEY I think should be store in .env file for best practice
// However this is just a demo, this should be fine
const API_KEY = 'c1629140ffee2b30e3762ff495b59343';

// I create a separate axios instance to clean up the code
const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
});

// Exporting the axios instance methods to be called in the store to fetch the data
export default {
  getMovies(language, sortBy, pageCount) {
    return apiClient.get(
      `/discover/movie/?api_key=${API_KEY}&language=${language}&sort_by=${sortBy}&include_adult=false&include_video=false&page=${pageCount}&vote_count.gte=150`,
    );
  },
  getSingleMovie(movieId, language) {
    return apiClient.get(`/movie/${movieId}?api_key=${API_KEY}&language=${language}`);
  },
};
