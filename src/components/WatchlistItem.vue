<template>
  <div class="watchlist-item">
    <v-row class="pa-3">
      <v-col cols="6" sm="4">
        <v-img contain class="movie-img" :src="moviePoster + movie.poster_path" />
      </v-col>
      <v-col cols="12" md="6">
        <router-link
        tag="p"
        class="title"
        :to="{ name: 'MovieDetails', params: { id: movie.id } }"
        >
          <v-card-title
          class="title"
          v-text="`${movie.title} (${movie.release_date.slice(0, 4)})`"
          ></v-card-title>
        </router-link>
        <v-card-subtitle v-text="movie.vote_average"></v-card-subtitle>
        <v-card-subtitle v-text="movie.overview"></v-card-subtitle>
      </v-col>
      <v-col cols="6" sm="4" md="2" justify-center>
        <v-btn text color="grey" @click="removeMovie(movie)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'WatchlistItem',
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['moviePoster']),
  },
  methods: {
    removeMovie(movie) {
      return this.$store.dispatch('removeMovie', movie);
    },
  },
};
</script>

<style>
.title {
  cursor: pointer;
}

.title:hover {
  text-decoration: underline;
}

.movie-img {
  min-height: 0;
  height: 30vh;
}
</style>
