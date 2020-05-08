/* eslint-disable no-shadow */
import data from '../../data/mockData';

const state = {
  movies: [],
};

const mutations = {
  SET_MOVIES: (state, movies) => {
    state.movies = movies;
  },
};

const actions = {
  initMovies({ commit }) {
    commit('SET_MOVIES', data);
  },
};

const getters = {
  movies(state) {
    return state.movies;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
