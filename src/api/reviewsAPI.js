import apiClient from './axios';

export default {
  getReviews() {
    return apiClient.get('/reviews');
  },
  addReview(item) {
    return apiClient.post('/reviews', item);
  },
  updateReview(item) {
    return apiClient.put('/reviews', item);
  },
  deleteReview(itemId) {
    return apiClient.delete(`/reviews/${itemId}`);
  },
};
