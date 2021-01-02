<template>
  <div class="movies">
    <v-container class="my-5">
      <div v-if="!loading">
        <now-playing
          v-if="isNowPlayingMovies"
          :movies-list="nowPlayingMovies"
        />

        <popular
          v-if="isPopularMovies"
          :movies-list="popularMovies"
        />

        <top-rated
          v-if="isTopRatedMovies"
          :movies-list="topRatedMovies"
        />

        <upcoming
          v-if="isUpcomingMovies"
          :movies-list="upcomingMovies"
        />
      </div>

      <v-row v-else justify="center">
        <v-col cols="12" align="center">
          <v-progress-circular
            class="loading-bar"
            indeterminate
            color="amber"
            size="100"
            width="10"
          />
        </v-col>
      </v-row>
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
    this.loading = true;
    await this.fetchTopRatedMovies(true);
    await this.fetchPopularMovies();
    await this.fetchNowPlayingMovies();
    await this.fetchUpcomingMovies();
    this.loading = false;
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
  transform: translate(0, 250%);
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
