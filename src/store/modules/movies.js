/* eslint-disable consistent-return */
/* eslint-disable no-shadow */

// I setup a separate module for fetch api service
// because setting up all the axios methods in one vuex file will get messy
import movieService from '@/services/movieService';

const state = {
  movies: [],
  movie: {},
  basePosterURL: 'https://image.tmdb.org/t/p/w500',
  params: {
    language: 'en-US',
    sortBy: 'popularity.desc',
  },
  totalResults: 100,
};

const mutations = {
  SET_MOVIES(state, movies) {
    state.movies = movies;
  },
  SET_MOVIE(state, movie) {
    state.movie = movie;
  },
};

const actions = {
  async fetchMovies({ commit, state }) {
    try {
      const res = await movieService.getMovies(state.params.language, state.params.sortBy);
      commit('SET_MOVIES', res.data.results);
    } catch (err) {
      console.log(err);
    }
  },
  fetchSingleMovie({ commit, state }, id) {
    if (id === state.movie.id) {
      return state.movie;
    }
    return movieService.getSingleMovie(id, state.params.language).then((res) => {
      commit('SET_MOVIE', res.data);
      console.log(res.data);
      return res.data;
    });
  },
  addMovie({ commit }, movieItem) {
    commit('ADD_MOVIE', movieItem);
  },
};

const getters = {
  movies(state) {
    return state.movies;
  },
  moviePoster(state) {
    return state.basePosterURL;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
