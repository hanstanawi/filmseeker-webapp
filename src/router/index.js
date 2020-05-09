import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Movies',
    component: () => import(/* webpackChunkName: "movies" */'../views/Movies.vue'),
  },
  {
    path: '/watchlist',
    name: 'Watchlist',
    component: () => import(/* webpackChunkName: "watchlist" */'../views/Watchlist.vue'),
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: () => import(/* webpackChunkName: "movie-details" */'../views/MovieDetails.vue'),
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      // Passing props through the params using Route Guards
      store.dispatch('fetchSingleMovie', routeTo.params.id)
        .then((movie) => {
          // eslint-disable-next-line no-param-reassign
          routeTo.params.movie = movie;
          next();
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
