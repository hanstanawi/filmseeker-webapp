<template>
  <div class="movie-details">
    <v-container class="pa-5">
      <v-row justify="center" v-if="!loadingMovies">
        <!-- Poster -->
        <v-col cols="12" sm="5" md="4" xl="2" class="px-0">
          <v-row justify="center">
            <img class="movie-img" :src="moviePoster + movie.poster_path" />
          </v-row>
        </v-col>

        <!-- Content -->
        <v-col cols="12" sm="7" md="8" xl="10">
          <!-- Title  -->
          <h1 class="display-1 font-weight-bold">
            {{ movie.title }} ({{ movieReleaseDate }})
          </h1>
          <!-- Rating -->
          <p class="title font-weight-black">
            <span>
              <v-icon color="amber darken-1">mdi-star</v-icon>
            </span>
            {{ movie.vote_average }}
          </p>
          <!-- Genre -->
          <v-row class="my-3 mr-0">
            <v-chip
              class="ma-2 d-flex-inline black--text"
              color="amber darken-1"
              v-for="genre in movie.genres"
              :key="genre.id"
              >{{ genre.name }}
            </v-chip>
          </v-row>
          <!-- Info -->
          <p>
            <span class="font-weight-bold">Release Date:</span>
            {{ movie.release_date }}
          </p>
          <p>
            <span class="font-weight-bold">Runtime:</span>
            {{ movie.runtime }} mins
          </p>
          <p>
            <span class="font-weight-bold">Language:</span>
            <span
              v-for="language in movie.spoken_languages"
              :key="language.name"
            >
              {{ language.name }}
              <span v-if="language.length > 0">,</span>
            </span>
          </p>
          <!-- Plot -->
          <p class="plot">{{ movie.overview }}</p>
          <!-- Action Buttons -->
          <v-btn
            outlined
            color="black"
            @click="addMovie"
            v-if="!checkRecord"
            class="add-button"
          >
            <v-icon color="black" class="mx-1">mdi-plus</v-icon>
            Add Movie
          </v-btn>
          <v-btn
            outlined
            color="red darken-4"
            class="remove-button"
            @click="removeMovie"
            v-else
          >
            <v-icon color="red darken-4" class="mx-1">mdi-delete</v-icon>
            Remove Movie
          </v-btn>
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
      <!-- ERROR HANDLER -->
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
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MovieDetails',
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      watchlist: 'watchlist/watchlist',
      moviePoster: 'movies/moviePoster',
      loadingMovies: 'movies/loadingMovies',
      errorHandler: 'movies/errorHandler',
    }),
    // Checking if the movie is already added, to add the logic of the add/remove buttons
    checkRecord() {
      const record = this.watchlist.find((movie) => movie.id === this.movie.id);
      return !!record;
    },
    movieReleaseDate() {
      return this.movie.release_date.slice(0, 4);
    },
  },
  methods: {
    addMovie() {
      return this.$store.dispatch('watchlist/addMovie', this.movie);
    },
    removeMovie() {
      return this.$store.dispatch('watchlist/removeMovie', this.movie);
    },
  },
};
</script>

<style scoped>
.plot {
  text-align: justify;
  text-justify: inter-word;
}

.movie-img {
  min-height: 0;
  height: 425px;
}

.add-button:hover {
  background-color: #ffb300;
}

.remove-button:hover {
  background-color: #ef9a9a;
}

.loading-bar {
  margin-top: 10px;
  top: 20%;
  left: 37%;
}

.error-handler {
  text-align: center;
  color: #757575;
}
</style>
