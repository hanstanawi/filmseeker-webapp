<template>
  <v-row>
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
  computed: {
    ...mapGetters({
      nowPlayingMovies: 'movies/nowPlayingMovies',
      popularMovies: 'movies/popularMovies',
      topRatedMovies: 'movies/topRatedMovies',
    }),
  },
  async created() {
    await this.fetchNowPlaying();
    await this.fetchPopularMovies();
    await this.fetchTopRatedMovies();
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

<style>

</style>
