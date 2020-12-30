<template>
  <div class="movies">
    <v-container class="my-5">
      <now-playing
        v-if="isNowPlayingMovies"
        :movies-list="nowPlayingMovies"
        :is-loading="loadingMovies"
      />

      <popular
        v-if="isPopularMovies"
        :movies-list="popularMovies"
        :is-loading="loadingMovies"
      />

      <top-rated
        v-if="isTopRatedMovies"
        :movies-list="topRatedMovies"
        :is-loading="loadingMovies"
      />

      <upcoming
        v-if="isUpcomingMovies"
        :movies-list="upcomingMovies"
        :is-loading="loadingMovies"
      />
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NowPlaying from '../components/movies/NowPlaying.vue';
import Popular from '../components/movies/Popular.vue';
import TopRated from '../components/movies/TopRated.vue';
import Upcoming from '../components/movies/Upcoming.vue';

export default {
  name: 'Home',
  data() {
    return {
      searchTerm: '',
      searchNotFound: false,
      loading: false,
    };
  },
  components: {
    NowPlaying,
    Popular,
    TopRated,
    Upcoming,
  },
  computed: {
    ...mapGetters({
      topRatedMovies: 'movies/topRatedMovies',
      popularMovies: 'movies/popularMovies',
      nowPlayingMovies: 'movies/nowPlayingMovies',
      upcomingMovies: 'movies/upcomingMovies',
      loadingMovies: 'movies/loadingMovies',
      errorHandler: 'movies/errorHandler',
    }),
    isNowPlayingMovies() {
      return this.$route.path.includes('now-playing');
    },
    isPopularMovies() {
      return this.$route.path.includes('popular');
    },
    isTopRatedMovies() {
      return this.$route.path.includes('top-rated');
    },
    isUpcomingMovies() {
      return this.$route.path.includes('upcoming');
    },
  },
  async mounted() {
    await this.fetchTopRatedMovies(true);
    await this.fetchPopularMovies();
    await this.fetchNowPlayingMovies();
    await this.fetchUpcomingMovies();
  },
  methods: {
    ...mapActions({
      fetchTopRatedMovies: 'movies/fetchTopRatedMovies',
      fetchPopularMovies: 'movies/fetchPopularMovies',
      fetchNowPlayingMovies: 'movies/fetchNowPlaying',
      fetchUpcomingMovies: 'movies/fetchUpcomingMovies',
    }),
  },
};
</script>

<style scoped>
.loading-bar {
  margin-top: 10px;
  top: 20%;
  left: 37%;
}

.no-result {
  text-align: center;
  color: #757575;
}

.error-handler {
  text-align: center;
  color: #757575;
}
</style>
