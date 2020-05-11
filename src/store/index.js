import Vue from 'vue';
import Vuex from 'vuex';
import movies from './modules/movies';
import watchlist from './modules/watchlist';

Vue.use(Vuex);

// Divided into two separate modules to avoid any confusion of each module's state
const store = new Vuex.Store({
  modules: {
    movies,
    watchlist,
  },
});

export default store;
