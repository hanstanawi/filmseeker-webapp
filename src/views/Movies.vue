<template>
  <div class="movies">
    <v-container class="my-5">
      <h1 class="title">Top 100 Movies</h1>

      <!-- Search Bar -->
      <v-row class="justify-center">
        <v-col cols="12" sm="8" md="6" class="align-center">
          <v-text-field
            rounded
            v-model="searchTerm"
            label="Search"
            outlined
            clearable
            color="grey darken-3"
            prepend-inner-icon="mdi-movie-search"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Movies List -->
      <v-row v-if="!loadingMovies">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          v-for="movie in filteredResults"
          :key="movie.id"
        >
          <MovieCard :movie="movie" />
        </v-col>
      </v-row>

      <!-- Loading Bar -->
      <v-row v-if="loadingMovies" class="justify-center">
        <v-col cols="12" md="6" class="align-center">
          <v-progress-circular
            class="loading-bar"
            indeterminate
            color="amber"
            size="100"
            width="10"
          />
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
    </v-container>
  </div>
</template>

<script>
import MovieCard from '@/components/movies/MovieCard.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      searchTerm: '',
      searchNotFound: false,
    };
  },
  components: {
    MovieCard,
  },
  computed: {
    ...mapGetters({
      movies: 'movies/movies',
      loadingMovies: 'movies/loadingMovies',
      errorHandler: 'movies/errorHandler',
    }),
    filteredResults() {
      // The filter logic for search functionality
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
  created() {
    this.$store.dispatch('movies/fetchMovies', true);
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
