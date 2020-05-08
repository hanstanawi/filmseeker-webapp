import data from '@/data/mockData';

const state = {
  movies: [],
};

const mutations = {
  SET_MOVIES: (movies) => {
    state.movies = movies;
    return state.movies;
  },
};

const actions = {
  initMovies({ commit }) {
    commit('SET_MOVIES', data);
  },
};

const getters = {
  movies: () => state.movies,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
