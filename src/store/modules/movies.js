/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import movieService from '@/api/movieAPI';

const state = {
  topRated: [],
  nowPlaying: [],
  popular: [],
  upcoming: [],
  movie: {},
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
    // if (loadingBar) {
    //   commit('LOADING');
    // }
    try {
      const results = await movieService.getTopRatedMovies(pageNum);
      const { movies } = results.data;
      commit('SET_TOP_RATED_MOVIES', movies);
    } catch (err) {
      console.error(err);
      commit('ERROR');
    }
    // const pageCount = state.totalResults / 20 + 1;
    // const responseArray = [];
    // for (let i = 1; i < pageCount; i += 1) {
    //   const res = movieService.getTopRatedMovies(state.params.language, state.params.sortBy, i);
    //   responseArray.push(res);
    // }
    // Promise.all(responseArray)
    //   .then((res) => {
    //     const results = [];
    //     res.map((item) => item.data.results.forEach((movie) => results.push(movie)));
    //     commit('SET_TOP_RATED_MOVIES', results);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     commit('ERROR');
    //   });
  },
  fetchSingleMovie({ commit, state }, id, loadingBar) {
    if (loadingBar) {
      commit('LOADING');
    }
    if (id === state.movie.id) {
      return state.movie;
    }
    return movieService
      .getSingleMovie(id)
      .then((res) => {
        commit('SET_MOVIE', res.data.movie);
        return res.data.movie;
      })
      .catch((err) => {
        console.log(err);
        commit('ERROR');
      });
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
