import Vue from 'vue';
import Vuex from 'vuex';
import movies from './modules/movies';
import watchlist from './modules/watchlist';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    movies,
    watchlist,
  },
});
