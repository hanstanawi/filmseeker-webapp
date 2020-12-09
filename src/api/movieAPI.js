import apiClient from './axios';

export default {
  getPopularMovies() {
    return apiClient.get(`/movie/popular?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`);
  },
  getNowPlaying() {
    return apiClient.get(`/movie/now_playing?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`);
  },
  getMovies(language, sortBy, pageCount) {
    return apiClient.get(
      `/discover/movie/?api_key=${process.env.VUE_APP_API_KEY}&language=${language}&sort_by=${sortBy}&include_adult=false&include_video=false&page=${pageCount}&vote_count.gte=150`,
    );
  },
  getSingleMovie(movieId, language) {
    return apiClient.get(`/movie/${movieId}?api_key=${process.env.VUE_APP_API_KEY}&language=${language}`);
  },
};
