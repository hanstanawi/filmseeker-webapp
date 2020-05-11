<template>
  <div class="about">
    <h1 class="title grey--text">Your Watchlist</h1>
    <v-container class="ma-5">
      <v-row justify="center" align="center">
        <v-col cols="12" v-for="movie in watchlist" :key="movie.id" justify="center">
            <v-card max-width="400">
              <router-link :to="{ name: 'MovieDetails', params: { id: movie.id } }">
                <div class="d-flex flex-wrap justify-space-between">
                  <img height="180" :src="moviePoster + movie.poster_path">
                  <div class="justify-center">
                    <v-card-title
                      class="headline"
                      v-text="movie.title"
                    ></v-card-title>
                    <v-card-subtitle v-text="movie.vote_average"></v-card-subtitle>
                  </div>
                </div>
              </router-link>
            </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Watchlist',
  computed: {
    ...mapGetters(['watchlist', 'moviePoster']),
  },
  methods: {
    removeMovie(movie) {
      return this.$store.dispatch('removeMovie', movie);
    },
  },
};
</script>
