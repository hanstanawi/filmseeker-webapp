import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "movies" */ '../views/Homepage.vue'),
  },
  {
    path: '/movies/:view?',
    name: 'Movies',
    component: () => import(/* webpackChunkName: "movies" */ '../views/Movies.vue'),
  },
  {
    path: '/series/:view?',
    name: 'TV Series',
    component: () => import(/* webpackChunkName: "movies" */ '../views/TVSeries.vue'),
  },
  {
    path: '/watchlist',
    name: 'Watchlist',
    component: () => import(/* webpackChunkName: "watchlist" */ '../views/Watchlist.vue'),
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: () => import(/* webpackChunkName: "movie-details" */ '../views/MovieDetails.vue'),
    props: true,
    async beforeEnter(routeTo, routeFrom, next) {
      try {
        const movie = await store.dispatch('movies/fetchSingleMovie', routeTo.params.id);
        // eslint-disable-next-line no-param-reassign
        routeTo.params.movie = movie;
        next();
      } catch (err) {
        console.log(err);
        store.commit('ERROR');
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "movies" */ '../components/auth/Login.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "movies" */ '../components/auth/Signup.vue'),
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
