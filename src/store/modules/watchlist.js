/* eslint-disable no-shadow */
const state = {
  watchlist: [],
};

const mutations = {
  ADD_MOVIE(state, movieItem) {
    const record = state.watchlist.find((movie) => movie.id === movieItem.id);
    if (record) {
      return;
    }
    state.watchlist.push(movieItem);
  },
  REMOVE_MOVIE(state, movieItem) {
    const record = state.watchlist.find((movie) => movie.id === movieItem.id);
    if (record) {
      state.watchlist.splice(state.watchlist.indexOf(record), 1);
    }
  },
};

const actions = {
  removeMovie({ commit }, movieItem) {
    commit('REMOVE_MOVIE', movieItem);
  },
  addMovie({ commit }, movieItem) {
    commit('ADD_MOVIE', movieItem);
  },
};

const getters = {
  watchlist(state) {
    return state.watchlist;
  },
  listLength(state) {
    return state.watchlist.length;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
