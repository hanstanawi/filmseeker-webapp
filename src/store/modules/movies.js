/* eslint-disable consistent-return */
/* eslint-disable no-shadow */

import movieService from '@/api/movieAPI';

const state = {
  movies: [],
  movie: {},
  basePosterURL: 'https://image.tmdb.org/t/p/w500',
  params: {
    language: 'en-US',
    sortBy: 'vote_average.desc',
  },
  totalResults: 100,
  loading: false,
  error: false,
};

const mutations = {
  SET_MOVIES(state, movies) {
    state.movies = movies;
    state.loading = false;
    state.error = false;
  },
  SET_MOVIE(state, movie) {
    state.movie = movie;
    state.loading = false;
    state.error = false;
  },
  LOADING(state) {
    state.loading = true;
  },
  ERROR(state) {
    state.error = true;
    state.loading = false;
  },
};

const actions = {
  // actions to fetch the 100 movies
  fetchMovies({ commit, state }, loadingBar) {
    if (loadingBar) {
      commit('LOADING');
    }
    const pageCount = (state.totalResults / 20) + 1;
    const responseArray = [];
    for (let i = 1; i < pageCount; i += 1) {
      const res = movieService.getMovies(state.params.language, state.params.sortBy, i);
      responseArray.push(res);
    }
    Promise.all(responseArray)
      .then((res) => {
        const results = [];
        res.map((item) => item.data.results.forEach((movie) => results.push(movie)));
        commit('SET_MOVIES', results);
      })
      .catch((err) => {
        console.log(err);
        commit('ERROR');
      });
  },
  fetchSingleMovie({ commit, state }, id, loadingBar) {
    if (loadingBar) {
      commit('LOADING');
    }
    if (id === state.movie.id) {
      return state.movie;
    }
    // this method actually returns a promise, which will be resolved in the route guards
    // to pass the movie.id as a props for the routes
    return movieService.getSingleMovie(id, state.params.language)
      .then((res) => {
        commit('SET_MOVIE', res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        commit('ERROR');
      });
  },
};

const getters = {
  movies(state) {
    return state.movies;
  },
  moviePoster(state) {
    return state.basePosterURL;
  },
  loadingMovies(state) {
    return state.loading;
  },
  errorHandler(state) {
    return state.error;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
