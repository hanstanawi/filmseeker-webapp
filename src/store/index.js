import Vue from 'vue';
import Vuex from 'vuex';
import movies from './modules/movies';
import watchlist from './modules/watchlist';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    movies,
    watchlist,
  },
});

export default store;
