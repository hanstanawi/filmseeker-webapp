import apiClient from './axios';

export default {
  getWatchlist() {
    return apiClient.get('/watchlist');
  },
  addWatchlist(item) {
    return apiClient.post('/watchlist', item);
  },
  deleteWatchlist(itemId) {
    return apiClient.delete(`/watchlist/${itemId}`);
  },
};
