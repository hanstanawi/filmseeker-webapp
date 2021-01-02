<template>
  <v-row v-if="!loading">
    <v-col cols="12">
      <now-playing-carousel
        :now-playing-movies="nowPlayingMovies"
      />
      <v-container fluid>
        <v-row class="mx-5 mt-10">
          <v-col cols="12">
            <div class="headline font-weight-bold ml-7">Popular Movies</div>
            <movie-group-items
              :movie-items="popularMovies"
            />
          </v-col>
        </v-row>
        <v-row class="mx-5 mt-10">
          <v-col cols="12" lg="12">
            <div class="headline font-weight-bold ml-7">Top Rated Movies</div>
            <movie-group-items
              :movie-items="topRatedMovies"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NowPlayingCarousel from '../components/homepage/NowPlayingCarousel.vue';
import MovieGroupItems from '../components/reusable/MovieGroupItems.vue';

export default {
  name: 'Homepage',
  components: {
    NowPlayingCarousel,
    MovieGroupItems,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      nowPlayingMovies: 'movies/nowPlayingMovies',
      popularMovies: 'movies/popularMovies',
      topRatedMovies: 'movies/topRatedMovies',
    }),
  },
  async created() {
    this.loading = true;
    await this.fetchNowPlaying();
    await this.fetchPopularMovies();
    await this.fetchTopRatedMovies();
    this.loading = false;
  },
  methods: {
    ...mapActions({
      fetchNowPlaying: 'movies/fetchNowPlaying',
      fetchPopularMovies: 'movies/fetchPopularMovies',
      fetchTopRatedMovies: 'movies/fetchTopRatedMovies',
    }),
  },
};
</script>

<style scoped>
.loading-bar {
  transform: translate(0, 250%);
}
</style>
