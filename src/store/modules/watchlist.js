/* eslint-disable no-shadow */
const state = {
  watchlist: [],
};

const mutations = {
  ADD_MOVIE(state, movie) {
    state.watchlist.push(movie);
  },
  REMOVE_MOVIE(state, movieId) {
    state.watchlist.filter((movie) => movie.id !== movieId);
  },
};

const actions = {};

const getters = {
  watchlist(state) {
    return state.watchlist;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
