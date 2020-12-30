import apiClient from './axios';

export default {
  getPopularSeries(pageNum) {
    return apiClient.get(`/series/popular?page=${pageNum}`);
  },
  getTopRatedSeries(pageNum) {
    return apiClient.get(`/series/top-rated?page=${pageNum}`);
  },
  getLatestSeries(pageNum) {
    return apiClient.get(`/series/latest?page=${pageNum}`);
  },
  getSingleSeries(seriesId) {
    return apiClient.get(`/series/${seriesId}`);
  },
};
