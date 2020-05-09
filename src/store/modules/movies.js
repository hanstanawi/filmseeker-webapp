/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import movieService from '@/services/movieService';
// import data from '../../data/mockData';


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
  fetchSingleMovie({ commit, getters }, id) {
    if (id === state.movie.id) {
      return state.movie;
    }
    const movie = getters.getMovieById(id);
    if (movie) {
      commit('SET_MOVIE', movie);
    }
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
