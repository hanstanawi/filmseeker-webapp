<template>
  <v-row v-if="!loading">
    <v-col cols="12" class="pt-0 pr-0">
      <now-playing-carousel
        :now-playing-movies="nowPlayingMovies"
      />
      <v-container fluid>
        <v-row class="ml-5 mr-5 mt-5">
          <v-col cols="12">
            <div class="headline font-weight-bold ml-5">Popular Movies</div>
            <movie-group-items
              :movie-items="popularMovies"
            />
          </v-col>
        </v-row>
        <v-row class="ml-5 mr-5 mt-5">
          <v-col cols="12" lg="12">
            <div class="headline font-weight-bold ml-5">Top Rated Movies</div>
            <movie-group-items
              :movie-items="topRatedMovies"
            />
          </v-col>
        </v-row>
        <v-row class="ml-5 mr-5 mt-5">
          <v-col cols="12" lg="12">
            <div class="headline font-weight-bold ml-7">Popular Series</div>
            <series-group-items
              :series-items="popularSeries"
            />
          </v-col>
        </v-row>
        <v-row class="ml-5 mr-5 mt-5">
          <v-col cols="12" lg="12">
            <div class="headline font-weight-bold ml-7">Now Showing Series</div>
            <series-group-items
              :series-items="onAirSeries"
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
import SeriesGroupItems from '../components/reusable/SeriesGroupItems.vue';

export default {
  name: 'Homepage',
  components: {
    NowPlayingCarousel,
    MovieGroupItems,
    SeriesGroupItems,
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
      onAirSeries: 'series/onAirSeries',
      topRatedSeries: 'series/topRatedSeries',
      popularSeries: 'series/popularSeries',
    }),
  },
  async created() {
    this.loading = true;
    await this.fetchNowPlaying();
    await this.fetchPopularMovies();
    await this.fetchTopRatedMovies();
    await this.fetchOnAirSeries();
    await this.fetchPopularSeries();
    await this.fetchTopRatedSeries();
    this.loading = false;
  },
  methods: {
    ...mapActions({
      fetchNowPlaying: 'movies/fetchNowPlaying',
      fetchPopularMovies: 'movies/fetchPopularMovies',
      fetchTopRatedMovies: 'movies/fetchTopRatedMovies',
      fetchOnAirSeries: 'series/fetchOnAirSeries',
      fetchPopularSeries: 'series/fetchPopularSeries',
      fetchTopRatedSeries: 'series/fetchTopRatedSeries',
    }),
  },
};
</script>

<style scoped>
.loading-bar {
  transform: translate(0, 250%);
}
</style>
