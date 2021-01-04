/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import reviewService from '@/api/reviewsAPI';

const state = {
  reviews: [],
};

const getters = {
  reviews(state) {
    return state.reviews;
  },
};

const mutations = {
  ADD_REVIEW(state, review) {
    const record = state.reviews.find((r) => r._id === review._id);
    if (record) {
      return;
    }
    state.reviews.push(review);
  },
  REMOVE_REVIEW(state, review) {
    const record = state.reviews.find((r) => r._id === review._id);
    if (record) {
      state.reviews.splice(state.reviews.indexOf(record), 1);
    }
  },
  SET_REVIEWS(state, items) {
    state.reviews = items;
  },
};

const actions = {
  async removeReview({ commit }, itemId) {
    try {
      const response = await reviewService.deleteReview(itemId);
      const { review } = response.data;
      commit('REMOVE_REVIEW', review);
    } catch (err) {
      console.error(err);
    }
  },
  async addReview({ commit }, movieItem) {
    try {
      const response = await reviewService.addReview(movieItem);
      const { reviewItem } = response.data;
      commit('ADD_REVIEW', reviewItem);
    } catch (err) {
      console.error(err);
    }
  },
  // async updateReview({ commit }, movieItem) {
  //   try {
  //     const response = await reviewService.addReview(movieItem);
  //     const { reviewItem } = response.data;
  //     commit('UPDATE_REVIEW', reviewItem);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },
  async fetchReviews({ commit }) {
    try {
      const response = await reviewService.getReviews();
      const { reviews } = response.data;
      commit('SET_REVIEWS', reviews);
    } catch (err) {
      console.error(err);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
