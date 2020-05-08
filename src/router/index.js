import Vue from 'vue';
import VueRouter from 'vue-router';
import Movies from '../views/Movies.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Movies',
    component: Movies,
  },
  {
    path: '/watchlist',
    name: 'Watchlist',
    component: () => import('../views/Watchlist.vue'),
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: () => import('../views/MovieDetails.vue'),
    props: true,
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
