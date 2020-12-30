/* eslint-disable no-shadow */
import seriesAPI from '@/api/seriesAPI';

const state = {
  latest: [],
  popular: [],
  topRated: [],
  nowAiring: [],
  series: {},
};

const getters = {
  latestSeries(state) {
    return state.latest;
  },
  popularSeries(state) {
    return state.popular;
  },
  topRatedSeries(state) {
    return state.topRated;
  },
  nowAiringSeries(state) {
    return state.nowAiring;
  },
};

const mutations = {
  SET_LATEST_SERIES(state, series) {
    state.latest = series;
  },
  SET_POPULAR_SERIES(state, series) {
    state.popular = series;
  },
  SET_TOP_RATED_SERIES(state, series) {
    state.topRated = series;
  },
  SET_SINGLE_SERIES(state, series) {
    state.series = series;
  },
};

const actions = {
  async fetchLatestSeries({ commit }, pageNum = 1) {
    try {
      const results = await seriesAPI.getLatestSeries(pageNum);
      const { series } = results;
      commit('SET_LATEST_SERIES', series);
    } catch (err) {
      console.error(err);
    }
  },
  async fetchPopularSeries({ commit }, pageNum = 1) {
    try {
      const results = await seriesAPI.getPopularSeries(pageNum);
      const { series } = results;
      commit('SET_POPULAR_SERIES', series);
    } catch (err) {
      console.error(err);
    }
  },
  async fetchTopRatedSeries({ commit }, pageNum = 1) {
    try {
      const results = await seriesAPI.getTopRatedSeries(pageNum);
      const { series } = results;
      commit('SET_TOP_RATED_SERIES', series);
    } catch (err) {
      console.error(err);
    }
  },
  async fetchSingleSeries({ commit }, seriesId) {
    try {
      const result = await seriesAPI.getSingleSeries(seriesId);
      const { data } = result;
      commit('SET_SINGLE_SERIES', data);
    } catch (err) {
      console.error(err);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
