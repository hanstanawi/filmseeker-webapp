<template>
  <div class="movie-details">
    <v-container class="pa-5 mt-10">
      <div v-if="!loading">
        <v-row
          justify="center"
          class="mt-8"
        >
          <!-- Poster -->
          <v-col
            cols="12"
            sm="5"
            md="4"
            xl="2"
            class="px-0"
          >
            <v-row justify="center">
              <img
                class="movie-img"
                :src="movie.details.poster_path ? movie.details.poster_path : ''"
              />
            </v-row>
          </v-col>

          <!-- Content -->
          <v-col
            cols="12"
            sm="7"
            md="8"
            xl="10"
          >
            <!-- Title  -->
            <h1 class="display-1 font-weight-bold">
              {{ movie.details.title }} ({{ movieReleaseDate }})
            </h1>
            <!-- Rating -->
            <p class="title font-weight-black">
              <span>
                <v-icon color="amber darken-1">mdi-star</v-icon>
              </span>
              {{ movie.details.vote_average }}
            </p>
            <!-- Genre -->
            <v-row class="my-3 mr-0">
              <v-chip
                class="ma-2 d-flex-inline black--text"
                color="amber darken-1"
                v-for="genre in movie.details.genres"
                :key="genre.id"
              >
                {{ genre.name }}
              </v-chip>
            </v-row>
            <!-- Info -->
            <p>
              <span class="font-weight-bold">Release Date:</span>
              {{ movie.details.release_date }}
            </p>
            <p>
              <span class="font-weight-bold">Runtime:</span>
              {{ movie.details.runtime }} mins
            </p>
            <p>
              <span class="font-weight-bold">Language:</span>
              <span
                v-for="language in movie.details.spoken_languages"
                :key="language.name"
              >
                {{ language.name }}
                <span v-if="language.length > 0">,</span>
              </span>
            </p>
            <!-- Plot -->
            <p class="plot">{{ movie.details.overview }}</p>
            <!-- Action Buttons -->
            <v-row>
              <v-col cols="4">
                <v-btn
                  outlined
                  color="black"
                  @click.prevent="addMovieToWatchlist"
                  v-if="!checkRecord"
                  class="add-button"
                >
                  <v-icon color="black" class="mx-1">mdi-plus</v-icon>
                  Add to Watchlist
                </v-btn>
                <v-btn
                  outlined
                  color="red darken-4"
                  class="remove-button"
                  @click.prevent="removeMovie(movie.details.id)"
                  v-else
                >
                  <v-icon color="red darken-4" class="mx-1">mdi-delete</v-icon>
                  Remove From Watchlist
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn
                  tag="a"
                  color="amber"
                  :href="`https://www.youtube.com/results?search_query=${movie.details.title} trailer`"
                  class="add-button"
                  target="_blank"
                >
                  <v-icon color="black" class="mx-1">mdi-plus</v-icon>
                  Watch Trailer
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          class="mt-15"
        >
          <v-col cols="12">
            <div class="headline font-weight-bold ml-5">Cast</div>
            <v-slide-group
              v-model="model"
              class="ml-5"
              active-class="success"
              show-arrows
              center-active
            >
              <v-slide-item
                v-for="cast in movie.credits"
                :key="cast.id"
                class="py-3"
              >
                <cast-card
                  :cast="cast"
                />
              </v-slide-item>
            </v-slide-group>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          class="mt-8"
        >
          <v-col cols="12">
            <div class="headline font-weight-bold ml-5">Recommended Movies</div>
            <movie-group-items
              :movie-items="movie.recommended"
            />
          </v-col>
        </v-row>
      </div>

      <!-- Loading Bar -->
      <v-row
        v-if="loading"
        justify="center"
      >
        <v-col
          cols="12"
          md="6"
          align="center"
        >
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
import { mapGetters, mapActions } from 'vuex';
import CastCard from '../components/reusable/CastCard.vue';
import MovieGroupItems from '../components/reusable/MovieGroupItems.vue';

export default {
  name: 'MovieDetails',
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  components: {
    CastCard,
    MovieGroupItems,
  },
  data() {
    return {
      loading: false,
      model: null,
    };
  },
  watch: {
    async id(val) {
      this.loading = true;
      await this.fetchSingleMovie(val);
      this.loading = false;
    },
  },
  computed: {
    ...mapGetters({
      watchlist: 'watchlist/watchlist',
      errorHandler: 'movies/errorHandler',
      movie: 'movies/singleMovie',
    }),
    checkRecord() {
      // eslint-disable-next-line eqeqeq
      const record = this.watchlist.find((movie) => movie.id == this.movie.details.id.toString());
      return !!record;
    },
    movieReleaseDate() {
      return this.movie.details.release_date.slice(0, 4);
    },
  },
  async created() {
    this.loading = true;
    await this.fetchSingleMovie(this.id);
    this.loading = false;
  },
  methods: {
    ...mapActions({
      addMovie: 'watchlist/addMovie',
      removeMovie: 'watchlist/removeMovie',
      fetchSingleMovie: 'movies/fetchSingleMovie',
    }),
    async addMovieToWatchlist() {
      const movieItem = {
        id: this.movie.details.id,
        title: this.movie.details.title,
        overview: this.movie.details.overview,
        release_date: this.movie.details.release_date,
        vote_average: this.movie.details.vote_average,
        poster_path: this.movie.details.poster_path,
        isMovie: true,
      };
      await this.addMovie(movieItem);
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
  transform: translate(0, 250%);
}

.error-handler {
  text-align: center;
  color: #757575;
}
</style>
