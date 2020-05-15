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
  },
  SET_MOVIE(state, movie) {
    state.movie = movie;
  },
  LOADING(state) {
    state.loading = true;
  },
};

const actions = {
  fetchMovies({ commit, state }, loadingBar) {
    if (loadingBar) {
      commit('LOADING');
    }

    // Because every page has 20 movies, so we need to divide it by 20
    // in order to get the number of page
    const pageCount = (state.totalResults / 20) + 1;
    const responseArray = [];
    for (let i = 1; i < pageCount; i += 1) {
      const res = movieService.getMovies(state.params.language, state.params.sortBy, i);
      responseArray.push(res);
    }
    // Promises can't be resolved during the loop,
    // So, we need to create an array of promises from the api call
    // and resolve them all then it returns a single promise
    Promise.all(responseArray)
      .then((res) => {
        const results = [];
        res.map((item) => item.data.results.forEach((movie) => results.push(movie)));
        console.log(results);
        commit('SET_MOVIES', results);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  fetchSingleMovie({ commit, state }, id) {
    if (id === state.movie.id) {
      return state.movie;
    }
    return movieService.getSingleMovie(id, state.params.language)
      .then((res) => {
        commit('SET_MOVIE', res.data);
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
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
  loadingMovies(state) {
    return state.loading;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
