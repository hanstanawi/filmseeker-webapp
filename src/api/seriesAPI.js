import apiClient from './axios';

export default {
  getPopularSeries(pageNum) {
    return apiClient.get(`/series/popular?page=${pageNum}`);
  },
  getTopRatedSeries(pageNum) {
    return apiClient.get(`/series/top-rated?page=${pageNum}`);
  },
  getOnAirSeries(pageNum) {
    return apiClient.get(`/series/on-air?page=${pageNum}`);
  },
  getSingleSeries(seriesId) {
    return apiClient.get(`/series/${seriesId}`);
  },
  searchSeries(searchQuery) {
    return apiClient.get(`/series/search?query=${searchQuery}`);
  },
};
