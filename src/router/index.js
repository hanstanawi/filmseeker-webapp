import Vue from 'vue';
import VueRouter from 'vue-router';

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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: () => import(/* webpackChunkName: "movie-details" */ '../views/MovieDetails.vue'),
    props: true,
  },
  {
    path: '/series/:id',
    name: 'SeriesDetails',
    component: () => import(/* webpackChunkName: "movie-details" */ '../components/series/SeriesDetails.vue'),
    props: true,
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

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/');
  }
  next();
});

export default router;
