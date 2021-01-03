import apiClient from './axios';

export default {
  getPopularMovies(pageNum) {
    return apiClient.get(`/movies/popular?page=${pageNum}`);
  },
  getNowPlaying(pageNum) {
    return apiClient.get(`/movies/now-playing?page=${pageNum}`);
  },
  getTopRatedMovies(pageCount) {
    return apiClient.get(`/movies/top-rated?page=${pageCount}`);
  },
  getUpcomingMovies(pageCount) {
    return apiClient.get(`/movies/upcoming?page=${pageCount}`);
  },
  getSingleMovie(movieId) {
    return apiClient.get(`/movies/${movieId}`);
  },
  searchMovies(searchQuery) {
    return apiClient.get(`/movies/search?query=${searchQuery}`);
  },
};
