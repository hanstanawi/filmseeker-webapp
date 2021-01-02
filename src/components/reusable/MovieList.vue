/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <!-- Search Bar -->
    <v-row class="justify-center">
      <v-col
        cols="12"
        sm="8"
        md="6"
        class="align-center"
      >
        <v-text-field
          rounded
          v-model="searchTerm"
          label="Search"
          outlined
          clearable
          color="grey darken-3"
          prepend-inner-icon="mdi-movie-search"
        />
      </v-col>
    </v-row>

    <!-- Movies List -->
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
        v-for="movie in filteredResult"
        :key="movie.id"
      >
        <MovieCard :movie="movie" />
      </v-col>
    </v-row>

    <!-- Error Handler -->
    <v-row v-if="errorHandler" class="justify-center">
      <v-col cols="12" md="8" class="align-center">
        <p class="error-handler headline font-weight-bold">
          <span>
            <v-icon>mdi-emoticon-sad-outline</v-icon>
          </span>
          Ooops! Something went wrong
        </p>
      </v-col>
    </v-row>

    <!-- Not Found -->
    <v-row v-if="searchNotFound && !errorHandler" class="justify-center">
      <v-col cols="12" md="8" class="align-center">
        <p class="no-result headline font-weight-bold">
          Sorry, Results Not Found
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MovieCard from '@/components/reusable/MovieCard.vue';

export default {
  name: 'MovieList',
  data() {
    return {
      searchTerm: '',
      searchNotFound: false,
      errorHandler: false,
      page: 1,
    };
  },
  props: {
    movies: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    MovieCard,
  },
  computed: {
    filteredResult() {
      if (!this.searchTerm || this.searchTerm === '') {
        return this.movies;
      }
      // eslint-disable-next-line max-len
      const filteredResults = this.movies.filter((movie) => movie.title.toLowerCase().match(this.searchTerm.toLowerCase()));
      if (!filteredResults.length) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.searchNotFound = true;
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.searchNotFound = false;
      }
      return filteredResults;
    },
  },
};
</script>

<style scoped>
.no-result {
  text-align: center;
  color: #757575;
}
</style>
