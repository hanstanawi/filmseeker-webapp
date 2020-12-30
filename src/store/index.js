import Vue from 'vue';
import Vuex from 'vuex';
import movies from './modules/movies';
import series from './modules/series';
import watchlist from './modules/watchlist';
import reviews from './modules/reviews';
import auth from './modules/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    movies,
    watchlist,
    series,
    reviews,
    auth,
  },
});

export default store;
