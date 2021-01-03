/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import movieService from '@/api/movieAPI';

const state = {
  topRated: [],
  nowPlaying: [],
  popular: [],
  upcoming: [],
  movie: {},
  searchResult: [],
  loading: false,
  error: false,
};

const mutations = {
  SET_TOP_RATED_MOVIES(state, movies) {
    state.topRated = movies;
    state.loading = false;
    state.error = false;
  },
  SET_NOW_PLAYING(state, movies) {
    state.nowPlaying = movies;
  },
  SET_POPULAR_MOVIES(state, movies) {
    state.popular = movies;
  },
  SET_UPCOMING_MOVIES(state, movies) {
    state.upcoming = movies;
  },
  SET_MOVIE(state, movie) {
    state.movie = movie;
    state.loading = false;
    state.error = false;
  },
  SET_SEARCH_RESULT(state, movies) {
    state.searchResult = movies;
  },
  RESET_SEARCH_RESULT(state) {
    state.searchResult = [];
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
  async fetchTopRatedMovies({ commit }, pageNum = 1) {
    try {
      const results = await movieService.getTopRatedMovies(pageNum);
      const { movies } = results.data;
      commit('SET_TOP_RATED_MOVIES', movies);
    } catch (err) {
      console.error(err);
      commit('ERROR');
    }
  },
  async fetchSingleMovie({ commit, state }, id) {
    if (id === state.movie.id) {
      return state.movie;
    }
    try {
      const result = await movieService.getSingleMovie(id);
      const { movie } = result.data;
      commit('SET_MOVIE', movie);
    } catch (err) {
      console.log(err);
      commit('ERROR');
    }
  },
  async fetchNowPlaying({ commit }, pageNum = 1) {
    try {
      const results = await movieService.getNowPlaying(pageNum);
      const { movies } = results.data;
      commit('SET_NOW_PLAYING', movies);
    } catch (err) {
      console.error(err);
      commit('ERROR');
    }
  },
  async fetchPopularMovies({ commit }, pageNum = 1) {
    try {
      const results = await movieService.getPopularMovies(pageNum);
      const { movies } = results.data;
      commit('SET_POPULAR_MOVIES', movies);
    } catch (err) {
      console.error(err);
      commit('ERROR');
    }
  },
  async fetchUpcomingMovies({ commit }, pageNum = 1) {
    try {
      const results = await movieService.getUpcomingMovies(pageNum);
      const { movies } = results.data;
      commit('SET_UPCOMING_MOVIES', movies);
    } catch (err) {
      console.error(err);
      commit('ERROR');
    }
  },
  async fetchSearchQuery({ commit }, searchQuery) {
    try {
      const results = await movieService.searchMovies(searchQuery);
      const { movies } = results.data;
      commit('RESET_SEARCH_RESULT');
      commit('SET_SEARCH_RESULT', movies);
    } catch (err) {
      console.error(err);
    }
  },
};

const getters = {
  topRatedMovies(state) {
    return state.topRated;
  },
  nowPlayingMovies(state) {
    return state.nowPlaying;
  },
  popularMovies(state) {
    return state.popular;
  },
  upcomingMovies(state) {
    return state.upcoming;
  },
  searchResult(state) {
    return state.searchResult;
  },
  singleMovie(state) {
    return state.movie;
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
