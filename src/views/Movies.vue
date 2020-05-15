/* eslint-disable max-len */
<template>
  <div class="movies">
    <v-container class="my-5">
      <h1 class="title grey--text">Top 100 Movies</h1>
      <!-- Search Bar -->
      <v-row class="justify-center">
        <v-col cols="12" sm="8" md="6" class="align-center">
          <v-text-field
          v-model="searchTerm"
          label="Search"
          outlined
          clearable
          prepend-inner-icon="mdi-movie-search"
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- Movies List -->
      <v-row v-if="loadingMovies === false">
        <v-col cols="12" sm="6" md="4" lg="3" xl="2"
        v-for="movie in filteredResults"
        :key="movie.id">
          <MovieCard :movie="movie" />
        </v-col>
      </v-row>

      <!-- Loading Bar -->
      <v-row v-if="loadingMovies === true" justify-center align-center>
        <v-col cols="12" justify-center align-center>
          <v-progress-circular class="loading" indeterminate color="amber" size="100" width="10"/>
        </v-col>
      </v-row>

      <!-- Error -->

      <!-- Not Found -->
    </v-container>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      searchTerm: '',
    };
  },
  components: {
    MovieCard,
  },
  computed: {
    ...mapGetters(['movies', 'loadingMovies']),
    filteredResults() {
      // eslint-disable-next-line max-len
      return this.movies.filter((movie) => movie.title.toLowerCase().match(this.searchTerm.toLowerCase()));
    },
  },
  created() {
    this.$store.dispatch('fetchMovies', true);
  },
};
</script>
