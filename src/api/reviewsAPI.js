import apiClient from './axios';

export default {
  getReviews() {
    return apiClient.get('/reviews');
  },
  addReview(item) {
    return apiClient.post('/reviews', item);
  },
  updateReview(reviewId, item) {
    return apiClient.put(`/reviews/${reviewId}`, item);
  },
  deleteReview(itemId) {
    return apiClient.delete(`/reviews/${itemId}`);
  },
};
