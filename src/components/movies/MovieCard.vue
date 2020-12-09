<template>
  <div class="movie-card">
    <v-card
      flat
      class="text-center ma-1 my-3 mx-auto card-style"
      max-width="400"
    >
      <!-- Movie Poster -->
      <v-responsive class="pa-1">
        <v-img
          :src="moviePoster + movie.poster_path"
          class="movie-img"
          contain
        ></v-img>
      </v-responsive>

      <!-- Movie Info -->
      <v-card-text class="ma-0 card-text">
        <router-link
          class="title"
          tag="p"
          :to="{ name: 'MovieDetails', params: { id: movie.id } }"
        >
          <span class="title font-weight-bold black--text"
            >{{ movie.title }} ({{ movieReleaseDate }})</span
          >
        </router-link>
        <span class="subtitle-1 font-weight-black black--text">
          <v-icon color="amber">mdi-star</v-icon>
          {{ movie.vote_average }}
        </span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // ...mapGetters(['moviePoster', 'watchlist']),
    ...mapGetters({
      moviePoster: 'movies/moviePoster',
      watchlist: 'watchlist/watchlist',
    }),
    movieReleaseDate() {
      return this.movie.release_date.slice(0, 4);
    },
  },
};
</script>

<style scoped>
p .title {
  cursor: pointer;
}

p .title:hover {
  text-decoration: underline;
}

.movie-img {
  height: 50vh;
}
</style>
