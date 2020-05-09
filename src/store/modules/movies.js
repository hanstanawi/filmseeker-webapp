/* eslint-disable consistent-return */
/* eslint-disable no-shadow */

// I setup a separate module of fetch api service
// because setting up all the axios methods in one vuex file will get messy
import movieService from '@/services/movieService';

const state = {
  movies: [],
  movie: {},
  language: 'en-US',
  sortBy: 'popularity.desc',
};

const mutations = {
  SET_MOVIES: (state, movies) => {
    state.movies = movies;
  },
  SET_MOVIE: (state, movie) => {
    state.movie = movie;
  },
};

const actions = {
  async fetchMovies({ commit, state }) {
    try {
      const res = await movieService.getMovies(state.language, state.sortBy);
      console.log(res.data);
      commit('SET_MOVIES', res.data.results);
    } catch (err) {
      console.log(err);
    }
  },
  fetchSingleMovie({ commit, state }, id) {
    if (id === state.movie.id) {
      return state.movie;
    }
    return movieService.getSingleMovie(id, state.language).then((res) => {
      commit('SET_MOVIE', res.data);
      console.log(res.data);
      return res.data;
    });
  },
};

const getters = {
  movies(state) {
    return state.movies;
  },
  getMovieById(state) {
    return (id) => state.movies.find((movie) => movie.id === id);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
