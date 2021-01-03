/* eslint-disable no-shadow */
import watchlistService from '@/api/watchlistAPI';

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
  SET_WATCHLIST(state, items) {
    state.watchlist = items;
  },
};

const actions = {
  async removeMovie({ commit }, itemId) {
    try {
      const response = await watchlistService.deleteWatchlist(itemId);
      const { watchlistItem } = response.data;
      commit('REMOVE_MOVIE', watchlistItem);
    } catch (err) {
      console.error(err);
    }
  },
  async addMovie({ commit }, movieItem) {
    try {
      const response = await watchlistService.addWatchlist(movieItem);
      const { watchlistItem } = response.data;
      commit('ADD_MOVIE', watchlistItem);
    } catch (err) {
      console.error(err);
    }
  },
  async fetchWatchlistData({ commit }) {
    try {
      const response = await watchlistService.getWatchlist();
      const { watchlist } = response.data;
      commit('SET_WATCHLIST', watchlist);
    } catch (err) {
      console.error(err);
    }
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
